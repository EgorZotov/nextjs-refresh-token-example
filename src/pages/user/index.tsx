import e from "express";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { getUser, logout } from "src/utils/api";
import { serverSideRedirect } from "src/utils/nextHelpers";
import * as Styled from "./style";

interface UserProps {
    user: {
        username: string;
        email: string;
        profilePicture: string;
        timezone: string;
    };
}

const User = (props: UserProps) => {
    const router = useRouter();
    const fetchUser = async () => {
        // Request method can work with both SSR and CSR at the same time
        const user = await getUser();
        console.log("User fetched in CSR", user);
    };
    useEffect(() => {
        fetchUser();
    }, []);

    const deauth = async () => {
        try {
            await logout();
            router.push("/login");
        } catch (error) {
            console.error("Logout error", error);
        }
    };

    return (
        <Styled.Wrap>
            <Styled.UserBox>
                <Styled.Avatar src={props.user.profilePicture} />
                <Styled.UserMeta>
                    <Styled.UserMetaLabel>Username</Styled.UserMetaLabel>
                    <Styled.UserMetaValue>{props.user.username}</Styled.UserMetaValue>
                </Styled.UserMeta>
                <Styled.UserMeta>
                    <Styled.UserMetaLabel>Email</Styled.UserMetaLabel>
                    <Styled.UserMetaValue>{props.user.email}</Styled.UserMetaValue>
                </Styled.UserMeta>
                <Styled.UserMeta>
                    <Styled.UserMetaLabel>Timezone</Styled.UserMetaLabel>
                    <Styled.UserMetaValue>{props.user.timezone}</Styled.UserMetaValue>
                </Styled.UserMeta>
                <Styled.LogoutButton onClick={deauth}>Logout</Styled.LogoutButton>
            </Styled.UserBox>
        </Styled.Wrap>
    );
};

export const getServerSideProps: GetServerSideProps = async ctx => {
    // SSR request
    try {
        const user = await getUser(ctx);
        return {
            props: {
                user,
            },
        };
    } catch (error) {
        console.error("Cannot see this page", error);
        serverSideRedirect("/login", ctx);
    }
};

export default User;
