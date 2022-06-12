// https://dev.to/vineethtrv/react-d3-donut-chart-49cm
import { useEffect, useRef } from "react";
import * as d3 from "d3";

type Slice = {
  name: string;
  cost: number;
  color: string;
};

export const Playground = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const data = [
      { name: "Money", cost: 86.66, color: "#ef3024" },
      { name: "Bonds", cost: 12.7, color: "#ffcb03" },
      { name: "Stocks", cost: 0.64, color: "#13a463" },
    ];

    const svg = d3.create("svg").attr("width", 240).attr("height", 240);
    const group = svg.append("g").attr("transform", "translate(120, 120)");

    const pie = d3.pie<Slice>().value(({ cost }) => cost);

    const slicesArc = d3
      .arc<d3.PieArcDatum<Slice>>()
      .outerRadius((_, i) => 120 - i * 5)
      .innerRadius(45)
      .padAngle(Math.PI / 180);

    const textArc = d3
      .arc<d3.PieArcDatum<Slice>>()
      .startAngle((d) => d.startAngle - Math.PI / 5)
      .endAngle((d) => d.endAngle)
      .outerRadius(125)
      .innerRadius(25);

    group
      .selectAll("path")
      .data(pie(data))
      .enter()
      .append("path")
      .attr("d", slicesArc)
      .attr("fill", ({ data: { color } }) => color);

    group
      .selectAll("text")
      .data(data)
      .enter()
      .append("text")
      .attr(
        "transform",
        (d, i) => `translate(${textArc.centroid(pie(data)[i])})`
      )
      .text((d) => (d.cost > 1 ? `${d.cost}%` : ""))
      .attr('font-size', '12px')
      .attr('font-family', 'Trebuchet MS')
      .attr('fill', 'white')

    ref.current.innerHTML = svg.node()?.outerHTML ?? "empty...";
  }, []);

  return <div ref={ref}></div>;
};
