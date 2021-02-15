import { createGlobalStyle } from "styled-components";
import "normalize.css";

export const GlobalStyles = createGlobalStyle`
    @font-face {
        font-family: 'Roboto';
        src: url("/fonts/Roboto-Regular.ttf");
        font-style: normal;
        font-weight: 400;
    }
    @font-face {
        font-family: Roboto;
        src: url("/fonts/Roboto-Bold.ttf");
        font-weight: 700;
        font-style: normal;
    }
    html,body,#__next {
        height: 100%;
    }
    body {
        font-family: 'Roboto';
        font-style: normal;
        background-color: ${({ theme }) => theme.colors.MainBackgroundColor};
        color: ${({ theme }) => theme.colors.TextColor};
    }
    input, button {
        outline:none;
    }
    * {
        box-sizing: border-box;
    }
`;
