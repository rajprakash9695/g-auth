import { useEffect, useState } from 'react';
import { GOOGLE_CLIENT_ID } from '../config';
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { useMutation } from '@tanstack/react-query';
import { loginFn } from '../apis/auth.api';

const url = 'http://localhost:3000/api/auth/register';

export default function Login() {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { login } = useAuth();

  const handleGoogle = async (response: { credential: string }) => {
    setLoading(true);

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ credential: response.credential }),
      });
      setLoading(false);
      const data = await res.json();

      localStorage.setItem('token', data.user.token);

      if (data?.user) {
        console.log('log: data', data);

        await login(data.user.token);
        navigate('/dashboard');
        console.log('log: data', data.user);
      } else {
        // Handle case where data.user is not available
        console.error('User data not found in the response.');
      }
    } catch (error) {
      // Handle fetch or JSON parsing errors
      console.error('Error occurred while fetching or parsing data:', error);
    }
  };

  useEffect(() => {
    /* global google */
    if ((window as any).google) {
      (window as any).google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID as string,
        callback: handleGoogle,
      });

      (window as any).google.accounts.id.renderButton(
        document.getElementById('loginDiv'),
        {
          // type: "standard",
          theme: 'filled_black',
          // size: "small",
          text: 'signin_with',
          shape: 'pill',
        }
      );

      if ((window as any).google) (window as any).google.accounts.id.prompt();
    }
  }, [handleGoogle]);

  const mutation = useMutation({
    mutationFn: loginFn,
    onSuccess: (values) => {
      setSubmitting(false);
      console.log('log: success', values);
      login(values?.data?.token);
    },
    onError: (error) => {
      setSubmitting(false);
    },
  });

  const { values, handleChange, handleSubmit, isSubmitting, setSubmitting } =
    useFormik({
      initialValues: { email: '', password: '' },
      onSubmit: async (values, { setSubmitting }) => {
        console.log('log: ', values);

        mutation.mutate(values);
      },
    });

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  value={values.email}
                  onChange={handleChange}
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  value={values.password}
                  onChange={handleChange}
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>

            <div className="text-center">
              <button type="submit" id="loginDiv"></button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
