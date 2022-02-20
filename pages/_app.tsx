import { FunctionComponent } from "react";
import { Provider } from "react-redux";

import { store } from "store";

import "styles/base.styles.css";
import "styles/fonts.styles.css";
import "styles/global.styles.css";

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component }: { Component: FunctionComponent }) {
  return (
    <Provider store={store}>
      <Component />;
    </Provider>
  );
}
