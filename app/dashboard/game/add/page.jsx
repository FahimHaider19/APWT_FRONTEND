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

const categories = [
  {
    "categoryId": 1,
    "categoryName": "Action"
  },
  {
    "categoryId": 2,
    "categoryName": "Open World"
  },
  {
    "categoryId": 3,
    "categoryName": "RPG"
  },
]

const schema = Yup.object({
  gameName: Yup.string()
    .required("Required"),
  gamePrice: Yup.number()
    .required("Required"),
    // .min(0, "Must be greater than 0"),
  gameDescription: Yup.string(),
    // .required("Required"),
  gamePublisher: Yup.string(),
    // .required("Required"),
  gameReleaseDate: Yup.date(),
    // .required("Required"),
  gameRating: Yup.number(),
    // .required("Required")
    // .min(0, "Must be greater than 0")
    // .max(5, "Must be less than 5"),
  systemRequirments: Yup.string(),
    // .required("Required"),
  gameCategory: Yup.array()
});

const handleSubmit = async (values) => {
  let array = []
  for (let i = 0; i < categories.length; i++) {
    for(let j = 0; j < values.gameCategory.length; j++)
      if (categories[i].categoryName === values.gameCategory[j]) {
        array.push(categories[i])
      }
  }
  console.log(JSON.stringify(values))
  values.gameCategory = array
  const res = await fetch(`http://localhost:3000/game`, {
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
    alert('Added game successfully')
    const router = useRouter()
    // window.location.replace(`http://localhost:3001/dashboard/game`);
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

const TextArea = ({ label, value, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <div className="sm:col-span-6">
        <label htmlFor={props.id || props.name} className="block text-sm font-medium text-gray-700">
          {label}
        </label>
        <div className="mt-1">
          <textarea
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            {value}
          </textarea>
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

export default async function AddGame() {
  return (
    <Formik
      initialValues={{
        gameName: '',
        gamePrice: '',
        gameDescription: '',
        gamePublisher: '',
        gameReleaseDate: '',
        gameRating: '',
        discount: '',
        categories: [],
        systemRequirments: '',
      }}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      <Form className="p-6 space-y-8 divide-y divide-gray-200">
        <div className="space-y-8 divide-y divide-gray-200">
          <div>
            <div>
              <h3 className="text-lg font-medium leading-6 text-gray-900">Edit Game Info</h3>
              <p className="mt-1 text-sm text-gray-500">
                This information will be displayed publicly so be careful before saving.
              </p>
            </div>
            <div className="space-y-6">
              <TextInput
                label="Title"
                name='gameName'
                type="text"
                required
              />
              <TextInput
                label="Price"
                name='gamePrice'
                type="number"
                required
              />
              <TextInput
                label="Publisher"
                name='gamePublisher'
                type="text"
                required
              />
              <TextInput
                label="Rating"
                name='gameRating'
                type="number"
                required
              />
              <TextInput
                label="Release Date"
                name='gameReleaseDate'
                type="datetime"
              />
              <TextInput
                label="Discount"
                name='discount'
                type="number"
                required
              />
              <TextInput
                label="Description"
                name='gameDescription'
                required
              />
              <TextInput
                label="System Requirments"
                name='systemRequirments'
                required
              />
            </div>
          </div>

          <div className="pt-3">
            <div>
              <h3 className="text-lg my-2 font-medium leading-6 text-gray-900">Genre</h3>
            </div>
            <div role="group" aria-labelledby="checkbox-group">
              {categories.map((genre) => (
                <label className='font-medium text-gray-700 mr-2'>
                  <Field
                    id={genre.categoryName}
                    type="checkbox"
                    name="gameCategory"
                    value={genre.categoryName}
                    className="h-4 w-4 m-1 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  {genre.categoryName}
                </label>
              ))}
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
