import axios, { AxiosInstance } from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import { GetServerSidePropsContext } from "next";
import { parse } from "cookie";
import cookie from "js-cookie";
import { Request, Response } from "express";

//                  __o      __o      o         __o        ,__o      o__,
//      __ -_     _ \<_     -\<,    _/\_>     _`\<,_     _-\_<,      ,>_/-_
// ((( (_)T(_)   (_)/(_)   O / O   O,> / O   (*)/ (*)   (*)/'(*)    (*)`\(*)

const clickupApiConfig = {
    baseURL: "http://localhost:3000/api/clickup",
};
const serverApiConfig = {
    baseURL: "http://localhost:3000/api",
};

export const serverApi = axios.create(serverApiConfig);
export const clickupApi = axios.create(clickupApiConfig);

export const setCookie = (key: string, value: string, expires?: number) => {
    cookie.set(key, value, {
        expires: expires || 1,
        path: "/",
    });
};

const createIsomorphicAuthRefreshInterceptor = (
    instance: AxiosInstance,
    ctx?: GetServerSidePropsContext,
) => {
    createAuthRefreshInterceptor(
        instance,
        async failedRequest => {
            try {
                const { refresh_token } = parse(
                    ctx ? instance.defaults.headers.cookie : document.cookie,
                );
                // it will be really good not to store token in cookie
                const tokenRefreshResponse = await instance.get("/refresh_token", {
                    headers: {
                        Authorization: `Bearer ${refresh_token}`,
                    },
                });
                if (ctx) {
                    console.log(
                        "Set cookie in intercepter",
                        tokenRefreshResponse.headers["set-cookie"],
                    );
                    ctx.res.setHeader("set-cookie", tokenRefreshResponse.headers["set-cookie"]);
                    failedRequest.config.headers.cookie =
                        tokenRefreshResponse.headers["set-cookie"];
                }
                return failedRequest;
            } catch (error) {
                console.error("Refresh fail", error);
            }
        },
        { statusCodes: [400, 401, 403] },
    );
};

export const isomorphicRequest = (ctx?: GetServerSidePropsContext, intstance?: AxiosInstance) => {
    const requester = intstance ? intstance : axios.create(clickupApiConfig);
    if (ctx) {
        requester.defaults.headers.cookie = ctx?.req?.headers?.cookie;
    }
    createIsomorphicAuthRefreshInterceptor(requester, ctx);
    return requester;
};

export const logoutRoute = (req: Request, res: Response) => {
    res.clearCookie("cu_jwt");
    res.clearCookie("refresh_token");
    res.statusCode = 200;
    res.end();
};
