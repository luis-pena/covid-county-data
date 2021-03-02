import { FunctionComponent } from "react";

import "styles/base.styles.css";
import "styles/fonts.styles.css";
import "styles/global.styles.css";

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component }: { Component: FunctionComponent }) {
  return <Component />;
}
