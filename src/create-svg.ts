import { create, pie, arc } from "d3";

type Slice = {
  color: string;
  value: number;
  showLabel?: boolean;
};
const TEXT_COLOR = "white";
const STROKE_COLOR = "white";
const TEXT_VALUE_THRESHOLD = 7;
const PI2 = 2 * Math.PI;
const SIZE = 240;
export const createSVG = (data: Slice[]) => {
  const svg = create("svg").attr("width", SIZE).attr("height", SIZE);
  const group = svg
    .append("g")
    .attr("transform", `translate(${SIZE / 2}, ${SIZE / 2})`);

  const pieChart = pie<Slice>().value(({ value }) => value);

  const slicesArc = arc<d3.PieArcDatum<Slice>>()
  .startAngle(({ startAngle }) => PI2 - startAngle)
  .endAngle(({ endAngle }) => PI2 - endAngle)
  .innerRadius(45)
  .outerRadius((_, i) => SIZE / 2 - i * 5)

  const textArc = arc<d3.PieArcDatum<Slice>>()
    .startAngle(({ startAngle }) => PI2 - startAngle)
    .endAngle(({ endAngle }) => PI2 - endAngle)
    .innerRadius(45)
    .outerRadius(SIZE / 2)

  group
    .selectAll("path")
    .data(pieChart(data))
    .enter()
    .append("path")
    .attr("d", slicesArc)
    .attr("stroke", STROKE_COLOR)
    .attr("stroke-width", "2px")
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
    .style('text-anchor', 'middle')
    .attr("font-size", "17px")
    .attr("font-family", "SF Pro Text")
    .attr("font-weight", "500")
    .attr("fill", TEXT_COLOR);

  return svg.node()?.outerHTML ?? "";
};
