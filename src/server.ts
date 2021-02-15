// const express = require("express");
// const next = require("next");
// const { createProxyMiddleware } = require("http-proxy-middleware");

// const port = parseInt(process.env.PORT, 10) || 3000;
// const dev = process.env.NODE_ENV !== "production";
// const app = next({ dev });
// const handle = app.getRequestHandler();

import express, { Response } from "express";
import next from "next";
import { createProxyMiddleware } from "http-proxy-middleware";

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
    const server = express();

    server.use(
        "/api/clickup",
        createProxyMiddleware({
            logLevel: "debug",
            target: "https://app.clickup.com/v1",
            pathRewrite: { "/api/clickup": "" },
            changeOrigin: true,
            cookieDomainRewrite: "localhost",
            onProxyRes(proxyRes) {
                if (proxyRes.headers["set-cookie"]) {
                    // Это плохо, злые хипстеры из старбакса своруют мою куку
                    proxyRes.headers["set-cookie"][0] = proxyRes.headers["set-cookie"][0].replace(
                        "; Secure",
                        "",
                    );
                }
            },
            onProxyReq(proxyReq, req) {
                // console.log("Proxy req", req.headers, req.cookies);
            },
        }),
    );

    server.all("*", (req, res) => {
        handle(req, res);
    });

    server.listen(port, () => {
        console.log(`> Ready on http://localhost:${port}`);
    });
});
