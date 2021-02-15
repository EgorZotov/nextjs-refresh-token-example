import styled from "styled-components";

export const Button = styled.button`
    position: relative;
    padding: 15px 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    background-color: ${({ theme }) => theme.colors.MainBackgroundColor};
    border: 2px solid ${({ theme, disabled }) => (disabled ? "#FF3232" : theme.colors.Accent)};
    color: ${({ theme }) => theme.colors.TextColor};
    font-weight: bold;
    opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
    cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
`;
