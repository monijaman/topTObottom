import { yupResolver } from "@hookform/resolvers/yup";
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as Yup from "yup";
import styles from '../styles/Home.module.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { getUserState, login, setName } from '../store/slices/userSlice';
import { useDispatch, useSelector } from '../store/store';

interface IFormInput {
  email: string;
  password: string;
}

let userStorageInfo: string | null;

const schema = Yup.object().shape({

  email: Yup.string()
    .required('Email is required')
    .email('Email is invalid'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
    .max(40, 'Password must not exceed 40 characters')
});

// const [name, setName] = useState("")
// const [option, setOption] = useState("")




const Register: NextPage = () => {
  // const notify = () => toast("Wow so easy!");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
  });


  const router = useRouter();
  const redirect = router.query.redirect as string;
  //const { state, dispatch } = useContext(StoreContext);
  //const { userInfo } = state;


  const dispatch = useDispatch();
  const { email, password } = useSelector(getUserState);

  const onClick = () => {
    setTimeout(() => {
      dispatch(setName('9898998'));
      // dispatch(setEmail('sulhadin@hotmail.com'));
    }, 1000);
  };

 

  const { userinfo, isLoading, isError, isSuccess } = useSelector(
    (state) => state.user
  )


  useEffect(() => {
    if (isError) {
      toast.error("There is error")
    }

    if (isSuccess) {
   
      router.push(redirect || "/dashboard");
 
    }

    if (userStorageInfo) {
      router.push(redirect || "/dashboard");

    } else {
      router.push(redirect || "/login");
    }

     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError, isSuccess, dispatch])

  const onSubmit = async (data: IFormInput) => {
    try {
      dispatch(
        login(data)
      );


      // dispatch({ type: "USER_LOGIN", payload: data });
      toast.success("Successfully Signup")

    } catch (err: any) {

    }
    // setJson(JSON.stringify(data));
  };


  const onChangeSelect = (event: any) => {
    //setOption(event.target.value)
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        {/* <link href="//netdna.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet" /> */}
      </Head>
      <main className={styles.main}>


        <ToastContainer position="bottom-center" />

        <h3>
          Sign in Form
        </h3>




        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control  {...register('email')} type="email"
              className={`form-control ${errors.email ? 'is-invalid' : ''}`} placeholder="Enter email" />
            <Form.Text className="text-muted">
              We&apos;ll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control type="password"  {...register('password')}
              className={`form-control ${errors.email ? 'is-invalid' : ''}`} placeholder="Password" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Signin
          </Button>
        </Form>




      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}

export default Register


