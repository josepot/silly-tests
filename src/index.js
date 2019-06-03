import React from "react";
import ReactDOM from "react-dom";

import App from "./App";

import Providers from "./Providers";

export const render = AppComponent => {
  ReactDOM.render(
    <Providers>
      <AppComponent />
    </Providers>,
    document.getElementById("root")
  );
};

render(App);

if (process.env.NODE_ENV !== "production" && module.hot) {
  module.hot.accept(["./App"], () => {
    render(App);
  });
}
