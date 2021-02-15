import styled from "styled-components";

export const Wrap = styled.div`
    position: relative;
    padding-bottom: 20px;
    display: flex;
    flex-direction: column;
    width: 100%;
`;

export const InputWrap = styled.div<{ error: string }>`
    /* border: 2px solid ${({ theme, error }) => (error ? "#FF3232" : theme.colors.Accent)}; */
    background-color: ${({ theme }) => theme.colors.MainBackgroundColor};
    width: inherit;
`;

export const Input = styled.input<{ error?: string }>`
    border: 2px solid ${({ theme, error }) => (error ? "#FF3232" : theme.colors.Accent)};
    background-color: ${({ theme }) => theme.colors.MainBackgroundColor};
    color: ${({ theme }) => theme.colors.TextColor};
    padding: 8px 15px;
    width: inherit;
`;

export const Label = styled.label`
    font-size: 18px;
    margin-bottom: 8px;
`;

export const Error = styled.span`
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    text-align: center;
    color: #ff3232;
`;
