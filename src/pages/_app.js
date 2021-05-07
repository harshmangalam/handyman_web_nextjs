import React from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "../theme";
import Navbar from "../components/Header/Navbar";
import { grey } from "@material-ui/core/colors";
import Footer from "../components/Footer/Footer";
import "../styles/global.css";

import Axios from "axios";
import { useRouter } from "next/router";
import { SWRConfig } from "swr";

import { AuthProvider } from "../context/auth";
import { UIProvider } from "../context/ui";
import SnackbarAlert from "../components/SnackbarAlert";
import { Container, makeStyles } from "@material-ui/core";

Axios.defaults.baseURL = process.env.NEXT_PUBLIC_SERVER_BASE_URL + "/api";
Axios.defaults.withCredentials = true;

const fetcher = async (url) => {
  try {
    const res = await Axios.get(url);
    return res.data;
  } catch (err) {
    throw err.response.data;
  }
};

const useStyles = makeStyles((theme) => ({
  main: {
    flex: 1,
    padding: "80px 0px",
  },
}));

export default function App(props) {
  const classes = useStyles();
  const { Component, pageProps } = props;

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <React.Fragment>
      <SWRConfig
        value={{
          fetcher,
          dedupingInterval: 10000,
        }}
      >
        <AuthProvider>
          <UIProvider>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  minHeight: "100vh",
                }}
              >
                <nav>
                  <Navbar />
                </nav>

                <main className={classes.main}>
                  <Container maxWidth="xl">
                    <Component {...pageProps} />
                  </Container>
                </main>

                <footer>
                  <Footer />
                </footer>

                <SnackbarAlert />
              </div>
            </ThemeProvider>
          </UIProvider>
        </AuthProvider>
      </SWRConfig>
    </React.Fragment>
  );
}
