import cookie from "js-cookie";

export const setCookie = (key: string, value: string, expires?: number) => {
    cookie.set(key, value, {
        expires: 1,
        path: "/",
    });
};

export const removeCookie = (key: string) => {
    cookie.remove(key, {
        expires: 1,
    });
};
