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
let game = null;

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
    .required("Required")
    .min(0, "Must be greater than 0"),
  gameDescription: Yup.string()
    .required("Required"),
  gamePublisher: Yup.string()
    .required("Required"),
  gameReleaseDate: Yup.date()
    .required("Required"),
  gameRating: Yup.number("")
    .required("Required")
    .min(0, "Must be greater than 0")
    .max(5, "Must be less than 5"),
  systemRequirments: Yup.string()
    .required("Required"),
  gameCategory: Yup.array()
});

// const sub = async(values) => {
//   alert(await axios.patch(`http://localhost:3000/game/${game.gameId}`, { data:{values} }))
// }

const handleSubmit = async (values) => {
  const res = await fetch(`http://localhost:3000/game/${game.gameId}`, {
    method: "put",
    body: JSON.stringify(values),
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    }
  })
  window.location.replace(`http://localhost:3001/dashboard/game/${game.gameId}`);
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
  if(res.ok){
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

export default async function EditGame() {
  game = await (await fetch('http://localhost:3000/game/details/1')).json();
  console.log(game)
  return (
    <Formik
      initialValues={{
        gameId: game.gameId,
        gameName: game.gameName,
        gamePrice: game.gamePrice,
        gameDescription: game.gameDescription,
        gamePublisher: game.gamePublisher,
        gameReleaseDate: game.gameReleaseDate,
        gameRating: game.gameRating,
        gameCategory: [],
        discount: game.discount,
        systemRequirments: game.systemRequirments,
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
                type="text"
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
                type="text"
                required
              />
              <TextInput
                label="Release Date"
                name='gameReleaseDate'
                type="text"
                required
              />
              <TextInput
                label="Discount"
                name='discount'
                type="number"
                required
              />
              <TextArea
                value={game.gameDescription}
                label="Description"
                name='gameDescription'
                required
              />
              <TextArea
                value={game.systemRequirments}  
                label="System Requirments"
                name='systemRequirments'
                required
              />
            </div>
          
          <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-6">
              <label htmlFor="photo" className="block text-sm font-medium text-gray-700">
                Photo
              </label>
              <div className="mt-1 flex items-center">
                <span className="h-12 w-12 overflow-hidden rounded-full bg-gray-100">
                  <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </span>
                <button
                  type="button"
                  className="ml-5 rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Change
                </button>
              </div>
            </div>

            <div className="sm:col-span-6">
              <label htmlFor="cover-photo" className="block text-sm font-medium text-gray-700">
                Cover photo
              </label>
              <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                <div className="space-y-1 text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                    >
                      <span>Upload a file</span>
                      <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
            </div>
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
    // <Formik
    //   initialValues={{
    //     checked: [],
    //   }}
    //   onSubmit={async (values) => {
    //     alert(JSON.stringify(values, null, 2));
    //   }}
    // >
    //     <Form>
    //       <div id="checkbox-group">Checked</div>
    //       <div role="group" aria-labelledby="checkbox-group">
    //         <label>
    //           <Field type="checkbox" name="checked" value="One" />
    //           One
    //         </label>
    //         <label>
    //           <Field type="checkbox" name="checked" value="Two" />
    //           Two
    //         </label>
    //         <label>
    //           <Field type="checkbox" name="checked" value="Three" />
    //           Three
    //         </label>
    //       </div>

    //       <button type="submit">Submit</button>
    //     </Form>
    // </Formik>
  )
}
