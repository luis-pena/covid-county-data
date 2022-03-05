import { FunctionComponent } from "react";
import { Provider } from "react-redux";

import { store } from "store";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { useTheme } from "@mui/material";

export default function App({ Component }: { Component: FunctionComponent }) {
  const theme = useTheme();
  return (
    <Provider store={store}>
      <Component />
      <style jsx global>{`
        body {
          background-color: ${theme.palette.grey[100]};
        }
      `}</style>
    </Provider>
  );
}
