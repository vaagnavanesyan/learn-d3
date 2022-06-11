import { useEffect, useRef } from "react";
import * as d3 from "d3";

// const applyAttrs = (element: any, attributes: Record<string, any>) => {
//   Object.entries(attributes).forEach(([key, value]) => {
//     element.attr(key, value);
//   });
// };
// applyAttrs(svg, {
//   width: 600,
//   height: 600,
// });

export const Playground = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const svg = d3.create("svg").attr("width", 600).attr("height", 600);
    const group = svg.append('g')
    .attr('transform', 'translate(50, 100)')

    group
      .append("rect")
      .attr("width", 200)
      .attr("height", 100)
      .attr("fill", "blue")
      .attr("x", 20)
      .attr("y", 20);

      group
      .append("circle")
      .attr("r", 50)
      .attr("cx", 300)
      .attr("cy", 70)
      .attr("fill", "pink");

      group
      .append("line")
      .attr("x1", 370)
      .attr("x2", 400)
      .attr("y1", 20)
      .attr("y2", 120)
      .attr('stroke', 'red');

      group
      .append("text")
      .attr('x', 20)
      .attr('y', 200)
      .attr('fill', 'grey')
      .text('hello')
      .style('font-family', 'courier')
      .style('font-weight', 'bold')




    ref.current.innerHTML = svg.node()?.outerHTML ?? "empty...";
  }, []);

  return <div ref={ref}></div>;
};
