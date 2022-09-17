import { create, pie, arc } from "d3";

type Slice = {
  color: string;
  value: number;
  showLabel?: boolean;
};
const TEXT_COLOR = "white";
const STROKE_COLOR = "white";
const TEXT_VALUE_THRESHOLD = 7;
export const createSVG = (data: Slice[]) => {
  const svg = create("svg").attr("width", 240).attr("height", 240);
  const group = svg.append("g").attr("transform", "translate(120, 120)");

  const pieChart = pie<Slice>().value(({ value }) => value);

  const slicesArc = arc<d3.PieArcDatum<Slice>>()
    .outerRadius((_, i) => 120 - i * 5)
    .innerRadius(45)
    .padAngle(Math.PI / 180);

  const textArc = arc<d3.PieArcDatum<Slice>>()
    .startAngle((d) => d.startAngle - Math.PI / 5)
    .endAngle((d) => d.endAngle)
    .outerRadius(125)
    .innerRadius(25);

  group
    .selectAll("path")
    .data(pieChart(data))
    .enter()
    .append("path")
    .attr("d", slicesArc)
    .attr("stroke", STROKE_COLOR)
    .attr("fill", ({ data: { color } }) => color);

  group
    .selectAll("text")
    .data(data)
    .enter()
    .append("text")
    .attr(
      "transform",
      (d, i) => `translate(${textArc.centroid(pieChart(data)[i])})`
    )
    .text(({ showLabel, value }) => {
      return showLabel === false || value <= TEXT_VALUE_THRESHOLD
        ? ""
        : `${value}%`;
    })
    .attr("font-size", "17px")
    .attr("font-family", "SF Pro Text")
    .attr("font-weight", '500')
    .attr("fill", TEXT_COLOR);

  return svg.node()?.outerHTML ?? "";
};
