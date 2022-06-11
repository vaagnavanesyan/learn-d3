import React from "react";
import ReactDOM from "react-dom/client";
import { Playground } from "./playground";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<Playground />);
