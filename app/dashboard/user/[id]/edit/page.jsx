// document.getElementById("Action").click()
'use client'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { ExclamationCircleIcon } from '@heroicons/react/20/solid'
import React, { useEffect, useRef } from "react";
import { Formik, Form, Field, useField, useFormikContext } from "formik";
import { signIn } from "next-auth/react";
import * as Yup from "yup";
import Link from 'next/link'

let user = null;


const schema = Yup.object({
  name: Yup.string()
    .required("Required"),
  email: Yup.string()
    .required("Required"),
  phone: Yup.string()
    .required("Required"),
  password: Yup.string()
    .required("Required"),
  role: Yup.string()
    .required("Required")
});


const handleSubmit = async (values) => {
  const res = await fetch(`http://localhost:3000/user/${user.userId}`, {
    method: "put",
    body: JSON.stringify(values),
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    }
  })
  // window.location.replace(`http://localhost:3001/dashboard/user/${user.userId}`);
  console.log(res)
  // const result = axios(`http://localhost:3000/game/${game.gameId}`, {
  //   method: "put",
  //   data: values,
  //   headers: {
  //     "Accept": "application/json",
  //     "Content-Type": "application/json"
  //   }
  // });
  alert(JSON.stringify(values, null, 2));
  if (res.error) console.log(res.error)
  if (res.ok) {
    alert('Udpate success')
    const router = useRouter()
  }
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

const AddUser = async ({ params }) => {
  user = await (await fetch(`http://localhost:3000/user/${4}`)).json();
  if (!user) return <div>user not found</div>
  console.log(user)
  return (
    <Formik
      initialValues={{
        "name": user.name,
        "email": user.email,
        "phone": user.phone,
        "password": user.password,
        "role": user.role
      }}
      validationSchema={schema}
      onSubmit={(handleSubmit)}
    >
      <Form className="p-6 space-y-8 divide-y divide-gray-200">
        <div className="space-y-8 divide-y divide-gray-200">
          <div>
            <div>
              <h3 className="text-lg font-medium leading-6 text-gray-900">Edit User Info</h3>
              <p className="mt-1 text-sm text-gray-500">
                This information is sensitive so so be careful before saving.
              </p>
            </div>
            <div className="space-y-6">
              <TextInput
                label="Name"
                name='name'
                type="text"
                required
              />
              <TextInput
                label="Email"
                name='email'
                type="email"
                required
              />
              <TextInput
                label="Phone"
                name='phone'
                type="text"
                required
              />
              <TextInput
                label="Password"
                name='password'
                type="password"
                required
              />
              <TextInput
                label="Role"
                name='role'
                type="text"
              />
            </div>
          </div>
        </div>
        <div className="pt-3">
          <div className="flex justify-end">
            <button
              type="button"
              className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Save
            </button>
          </div>
        </div>
      </Form>
    </Formik >
  )
}

export default AddUser;