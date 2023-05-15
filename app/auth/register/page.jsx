'use client'
import { ExclamationCircleIcon } from '@heroicons/react/20/solid'
import React, { useEffect, useRef } from "react";
import { Formik, Form, useField, useFormikContext } from "formik";
import { signIn } from "next-auth/react";
import * as Yup from "yup";
import Link from 'next/link'

const schema = Yup.object({
  name: Yup.string()
    .required("Required")
    .matches(/^[a-zA-Z_ ]+$/, "Must be only letters"),
  email: Yup.string()
    .email("Invalid email addresss`")
    .required("Required"),
  password: Yup.string()
    .required("Required")
    .min(8, "Must be 8 characters or more")
    .matches(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,}$/, "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character."),
  phone: Yup.string()
    .required("Required"),

});

const handleSubmit = async (values) => {
  console.log(values)
  const res = await fetch(`http://localhost:3000/register`, {
    method: "POST",
    body: JSON.stringify(values),
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    }
  })
  // console.log(res)
  alert(JSON.stringify(values, null, 2));
  if (res.error) console.log(res.error)
  if (res.ok) {
    alert('Registation successful')
    // const router = useRouter()
    window.location.replace(`http://localhost:3001/game/1`);
  }
  if (result.error) console.log(result.error)
  console.log(result)
};

const TextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <div>
        <label htmlFor={props.id || props.name} className="block text-sm font-medium text-gray-700">
          {label}
        </label>
        <div className="relative mt-1 rounded-md shadow-sm">
          <input
            className={meta.touched && meta?.error ? (
              "block w-full rounded-md border-red-300 pr-10 text-red-900 placeholder-red-300 focus:border-red-500 focus:outline-none focus:ring-red-500 sm:text-sm"
            ) : "block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            }
            {...field} {...props}
          />
          {meta.touched && meta.error ? (
            //red error icon
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
            </div>
          ) : null}
        </div>
        {meta.touched && meta.error ? (
          <p className="mt-2 text-sm text-red-600" id="email-error">
            {meta.error}
          </p>
        ) : null}
      </div>
    </>
  );
};

export default function RegisterPage() {
  return (
    <>
      <div className="flex min-h-screen flex-col content-center justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <div className="mb-6 sm:mx-auto sm:w-full sm:max-w-md">
              <img
                className="mx-auto h-12 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt="Your Company"
              />
              <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Create a new account</h2>
            </div>
            <Formik
              initialValues={{
                name: "",
                email: "",
                password: "",
                phone: "",
                role: "customer"
              }}
              validationSchema={schema}
              onSubmit={handleSubmit}
            >
              <Form className="space-y-6">
                <TextInput
                  id="name"
                  label="Name"
                  name="name"
                  type="text"
                  required
                />
                <TextInput
                  id="email"
                  label="Email"
                  name="email"
                  type="email"
                  required
                />
                <TextInput
                  id="password"
                  label="Password"
                  name="password"
                  type="password"
                  required
                />
                <TextInput
                  id="phone"
                  label="Phone"
                  name="phone"
                  type="text"
                  required
                />
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="rememberme"
                      name="rememberme"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                      Remember me
                    </label>
                  </div>

                  <div className="text-sm">
                    <Link href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                      Forgot your password?
                    </Link>
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="my-3 group relative flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Sign in
                  </button>
                </div>
              </Form>
            </Formik>

            <div className="my-4">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-white px-2 text-gray-500">Already Have an Account? </span>
                </div>
              </div>

              <Link href='/auth/login'>
                <button
                  type="submit"
                  className="group mt-3 relative flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Register
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}