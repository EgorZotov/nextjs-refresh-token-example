import express, { Response } from "express";
import next from "next";
import { createProxyMiddleware } from "http-proxy-middleware";
import { logoutRoute } from "./utils/requester";

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
    const server = express();

    server.get("/api/logout", logoutRoute);
    server.use(
        "/api/clickup",
        createProxyMiddleware({
            target: "https://app.clickup.com/v1",
            pathRewrite: { "/api/clickup": "" },
            changeOrigin: true,
            cookieDomainRewrite: "localhost",
            onProxyRes(proxyRes, req, res) {
                if (proxyRes.headers["set-cookie"]) {
                    // This is really bad! Be careful with angry starbucks hackers and don't use this on production.
                    proxyRes.headers["set-cookie"][0] = proxyRes.headers["set-cookie"][0].replace(
                        "; Secure",
                        "",
                    );
                }
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
