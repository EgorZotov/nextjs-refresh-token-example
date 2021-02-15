import {
    GetServerSideProps,
    GetServerSidePropsContext,
    GetStaticProps,
    NextPageContext,
} from "next";
import { useEffect } from "react";
import { getUser } from "src/utils/api";
import * as Styled from "./style";

interface HomeProps {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
}

const User = (props: HomeProps) => {
    const fetchUser = async () => {
        // Request method can work with both SSR and CSR at the same time
        const user = await getUser();
    };
    useEffect(() => {
        fetchUser();
    }, []);
    return <h1>User page: {JSON.stringify(props, null, 2)}</h1>;
};

export const getServerSideProps: GetServerSideProps = async ctx => {
    // SSR request
    const user = await getUser(ctx);
    return {
        props: {
            user,
        },
    };
};

export default User;
