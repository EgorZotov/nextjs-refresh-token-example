import * as Styled from "./style";
import { Formik, FormikProps, Form } from "formik";
import * as Yup from "yup";
import { AdaptedInput } from "components/Input";
import { login } from "src/utils/api";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

interface ILoginFormFields {
    email: string;
    password: string;
}

const Login = () => {
    const router = useRouter();
    return (
        <Styled.Wrap>
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
                        router.push("/");
                    } catch (error) {
                        toast.error(error.response.data.err);
                    }
                }}
            >
                {(props: FormikProps<ILoginFormFields>) => (
                    <Styled.Form>
                        <AdaptedInput name='email' type='email' label='Email' />
                        <AdaptedInput name='password' type='password' label='Password' />
                        <Styled.SumbitButton disabled={!props.isValid} type='submit'>
                            Submit
                        </Styled.SumbitButton>
                    </Styled.Form>
                )}
            </Formik>
        </Styled.Wrap>
    );
};

export default Login;
