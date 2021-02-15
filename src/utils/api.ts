import { GetServerSidePropsContext } from "next";
import { clickupApi, serverApi, isomorphicRequest, setCookie } from "./requester";

export const login = async (user: { email: string; password: string }) => {
    try {
        const { data } = await clickupApi.post("/login?include_teams=true", {
            ...user,
        });
        if (data.token && data.refresh_token) {
            setCookie("refresh_token", data.refresh_token);
        }
    } catch (error) {
        console.error("login error in requester", error);
        throw error;
    }
};

export const logout = async () => {
    try {
        await serverApi.get("/logout");
    } catch (error) {
        console.error("login error in requester", error);
        throw error;
    }
};

export const getUser = async (ctx?: GetServerSidePropsContext) => {
    try {
        const {
            data: { user },
        } = await isomorphicRequest(ctx).get("/user");
        return user;
    } catch (error) {
        console.error("getUser error", error);
        throw error;
    }
};
