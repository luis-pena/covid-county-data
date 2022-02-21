import { FunctionComponent } from "react";
import { Provider } from "react-redux";

import { store } from "store";

import "styles/base.styles.css";
import "styles/global.styles.css";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component }: { Component: FunctionComponent }) {
  return (
    <Provider store={store}>
      <Component />;
    </Provider>
  );
}
