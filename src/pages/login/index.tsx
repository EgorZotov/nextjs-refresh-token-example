import { GetStaticProps } from "next";
import * as Styled from "./style";
import { useFormik, Formik, FormikHelpers, FormikProps, Form } from "formik";
import { FC } from "react";
import * as Yup from "yup";
import { AdaptedInput } from "components/Input";
import { login } from "src/utils/api";
import { useRouter } from "next/router";

interface ILoginFormFields {
    email: string;
    password: string;
}

const Login: FC = () => {
    const router = useRouter();
    return (
        <Formik
            validationSchema={Yup.object({
                email: Yup.string().email("Invalid email address").required("Required"),
                password: Yup.string().required("No password provided."),
            })}
            initialValues={{
                email: "",
                password: "",
            }}
            onSubmit={async (values: ILoginFormFields) => {
                try {
                    await login(values);
                    router.push("/user");
                } catch (error) {
                    console.error("Login error", error);
                }
            }}
        >
            {(props: FormikProps<ILoginFormFields>) => (
                <Form>
                    <AdaptedInput name='email' type='email' label='Email' />
                    <AdaptedInput name='password' type='password' label='Password' />
                    <button type='submit'>Submit</button>
                </Form>
            )}
        </Formik>
    );
};

export default Login;
