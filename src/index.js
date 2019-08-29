import React from "react";
import ReactDOM from "react-dom";

import App from "./components/App";
import RootProviders from "./RootProviders";

export const render = AppComponent => {
  ReactDOM.render(
    <RootProviders>
      <AppComponent />
    </RootProviders>,
    document.getElementById("root")
  );
};

render(App);

if (process.env.NODE_ENV !== "production" && module.hot) {
  module.hot.accept(["./components/App"], () => {
    render(App);
  });
}
