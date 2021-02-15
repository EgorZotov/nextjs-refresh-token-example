import axios, { AxiosInstance } from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import e, { Request, request, response, Response } from "express";
import { GetServerSidePropsContext } from "next";
import { setCookie } from "./cookies";

//                  __o      __o      o         __o        ,__o      o__,
//      __ -_     _ \<_     -\<,    _/\_>     _`\<,_     _-\_<,      ,>_/-_
// ((( (_)T(_)   (_)/(_)   O / O   O,> / O   (*)/ (*)   (*)/'(*)    (*)`\(*)
const clickupApiConfig = {
    baseURL: "http://localhost:3000/api/clickup",
    withCredentials: true,
};
export const clickupApi = axios.create(clickupApiConfig);

const getRefreshTokenFromHeader = (cookieHeader: string) => {
    return cookieHeader.replace("refresh_token=", "");
};

const createIsomorphicAuthRefreshInterceptor = (
    instance: AxiosInstance,
    ctx?: GetServerSidePropsContext,
) => {
    createAuthRefreshInterceptor(
        instance,
        async failedRequest => {
            try {
                const tokenRefreshResponse = await clickupApi.get("/refresh_token", {
                    headers: {
                        Authorization: `Bearer ${getRefreshTokenFromHeader(
                            instance.defaults.headers.cookie,
                        )}`,
                    },
                });
                if (ctx) {
                    console.log(
                        "Set cookie in intercepter",
                        tokenRefreshResponse.headers["set-cookie"],
                    );
                    ctx.res.setHeader("set-cookie", tokenRefreshResponse.headers["set-cookie"]);
                }
                failedRequest.config.headers.cookie = tokenRefreshResponse.headers["set-cookie"];
                return failedRequest;
            } catch (error) {
                console.error("Refresh fail", error);
            }
        },
        { statusCodes: [400, 401, 403] },
    );
};

const isomorphicRequest = (ctx?: GetServerSidePropsContext, intstance?: AxiosInstance) => {
    const requester = intstance ? intstance : axios.create(clickupApiConfig);
    if (ctx) {
        requester.defaults.headers.cookie = ctx?.req?.headers?.cookie;
    }
    createIsomorphicAuthRefreshInterceptor(requester, ctx);
    return requester;
};

export const login = async (user: { email: string; password: string }) => {
    try {
        const { data } = await clickupApi.post("/login?include_teams=true", {
            ...user,
        });
        if (data.token && data.refresh_token) {
            setCookie("refresh_token", data.refresh_token);
        }
    } catch (error) {
        console.error("login error", error);
    }
};

export const getUser = async (ctx?: GetServerSidePropsContext) => {
    try {
        if (ctx) {
            const { req } = ctx;
            console.log("Req cookies", req.cookies);
        }
        const {
            data: { user },
        } = await isomorphicRequest(ctx).get("/user");
        return user;
    } catch (error) {
        console.error("getUser error", error);
    }
};
