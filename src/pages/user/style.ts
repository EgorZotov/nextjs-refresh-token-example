import { Button } from "components/Button";
import styled from "styled-components";

export const Wrap = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

export const UserBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const Avatar = styled.img`
    border-radius: 50%;
    object-fit: cover;
    width: 100px;
    height: 100px;
`;

export const UserMeta = styled.div`
    margin: 15px 0;
`;

export const UserMetaLabel = styled.span`
    color: ${({ theme }) => theme.colors.Accent};
    font-size: 24px;
    margin-right: 10px;
`;

export const UserMetaValue = styled.span`
    font-size: 24px;
    color: ${({ theme }) => theme.colors.TextColor};
`;

export const LogoutButton = styled(Button)`
    margin-top: 20px;
`;
