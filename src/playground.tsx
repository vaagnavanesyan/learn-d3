// https://dev.to/vineethtrv/react-d3-donut-chart-49cm
import { useEffect, useRef } from "react";
import { createSVG } from "./create-svg";

export const Playground = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const pieCharts = [
      [
        { color: "#2FC26E", value: 43 },
        { color: "#EF3124", value: 30 },
        { color: "#B6BCC3", value: 27 },
      ],
      [
        { color: "#EF3124", value: 43 },
        { color: "#2FC26E", value: 30 },
        { color: "#B6BCC3", value: 20 },
        { color: "#007AFF", value: 7 },
      ],
      [{ color: "#B6BCC3", value: 100, showLabel: false }],
      [
        { color: "#9E0C00", value: 80 },
        { color: "#B6BCC3", value: 20 },
      ],
      [{ color: "#9E0C00", value: 100 }],
    ];

    ref.current.innerHTML = pieCharts.map(createSVG).join("<br/>");
  }, []);

  return <div ref={ref}></div>;
};
