import { useEffect, useRef } from "react";
import { renderToString } from "react-dom/server";

export const Playground = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    ref.current.innerHTML = renderToString(
      <svg width={600} height={600} style={{ border: "2px solid black" }}>
        <path
          d='M 150 50 L 75 200 L 225 200 C 225 200 150 150 150 50 '
          fill='orange'
          strokeWidth={4}
        />
        <circle cx={150} cy={150} r={5} fill='grey' />
        <line
          x1={225}
          y1={200}
          x2={150}
          y2={150}
          stroke='grey'
          strokeWidth={2}
        />
      </svg>
    );
  }, []);

  return <div ref={ref}></div>;
};
