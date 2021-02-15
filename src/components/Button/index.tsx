import * as Styled from "./style";
import { FieldAttributes, useField } from "formik";

export interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button = (props: IButtonProps) => {
    return <Styled.Button {...props} />;
};
