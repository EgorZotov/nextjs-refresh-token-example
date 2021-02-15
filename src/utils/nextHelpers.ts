import { GetServerSidePropsContext } from "next";

export const serverSideRedirect = (to: string, ctx: GetServerSidePropsContext) => {
    ctx.res.statusCode = 302;
    ctx.res.setHeader("Location", to); // Replace <link> with your url link
};
