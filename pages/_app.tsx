import { createTheme, ThemeProvider, useTheme } from "@mui/material";
import { FunctionComponent } from "react";
import { Provider } from "react-redux";

import { store } from "slices/store";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import Head from "next/head";

export default function MyApp({ Component }: { Component: FunctionComponent }) {
  const theme = useTheme();
  const customTheme = createTheme(theme, {
    palette: {
      background: {
        default: theme.palette.grey[100],
      },
    },
  });
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/static/favicon.ico" />
      </Head>
      <Provider store={store}>
        <ThemeProvider theme={customTheme}>
          <Component />
        </ThemeProvider>
      </Provider>
    </>
  );
}
