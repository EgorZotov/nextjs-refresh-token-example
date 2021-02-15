import * as Styled from "./style";
import { FieldAttributes, useField } from "formik";

export interface IInputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
}

export interface IAdaptedInputProps extends IInputProps {}

export const AdaptedInput = (props: IAdaptedInputProps) => {
    const [field, meta] = useField(props.name);
    return <Input {...props} {...field} error={meta.touched && meta.error} />;
};

export const Input = (props: IInputProps) => {
    return (
        <Styled.InputWrap>
            {props.label && (
                <Styled.Label htmlFor={props.id}>{props.label}</Styled.Label>
            )}
            <Styled.Input {...props} />
            {props.error && <Styled.Error>{props.error}</Styled.Error>}
        </Styled.InputWrap>
    );
};
