import { AppProps } from "next/app";
import { GlobalStyles } from "styles/globalStyles";
import { ThemeProvider } from "styled-components";
import { useState } from "react";
import Themes from "styles/themes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ThemeProvider theme={Themes["dark"]}>
            <ToastContainer />
            <GlobalStyles />
            <Component {...pageProps} />
        </ThemeProvider>
    );
}

export default MyApp;
