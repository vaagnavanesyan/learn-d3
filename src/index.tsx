import { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";

const Playground = lazy(() =>
  import(/* webpackChunkName: "playground" */ "./playground").then(
    (module) => ({
      default: module.Playground,
    })
  )
);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Suspense fallback={<div>Loading </div>}>
    <Playground />
  </Suspense>
);
