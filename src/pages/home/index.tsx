import { GetStaticProps } from "next";
import * as Styled from "./style";

interface HomeProps {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
}

const Home = (props: HomeProps) => {
    return (
        <Styled.Header>
            <h1>Home page: {JSON.stringify(props, null, 2)}</h1>
        </Styled.Header>
    );
};

export const getStaticProps: GetStaticProps = async ctx => {
    return {
        props: {},
    };
};

export default Home;
