import styled from "styled-components";
import { Form as FormikForm } from "formik";
import { Button } from "components/Button";

export const Wrap = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

export const Form = styled(FormikForm)`
    width: 320px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

export const SumbitButton = styled(Button)`
    margin-top: 20px;
`;
