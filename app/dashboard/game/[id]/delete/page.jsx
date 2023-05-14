'use client'
import axios from 'axios';
import { Suspense } from 'react';
function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
const handleSubmit = async () => {
  alert('clicked')
  const res = await fetch(`http://localhost:3000/game/${2}`, {
    method: "delete",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    }
  })
  console.log(res)  
  return true;
}
const DeleteGame = async () => {
  return (
    <div className="p-4 sm:p-6 lg:p-8 w-full">
      <div className="flex items-center justify-center align-center h-full">
        <div className="bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Delete your account</h3>
            <div className="mt-2 max-w-xl text-sm text-gray-500">
              <p>Once you delete your account, you will lose all data associated with it.</p>
            </div>
            <div className="mt-5">
              <button
                onClick={handleSubmit}
                type="button"
                className="inline-flex items-center justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 font-medium text-red-700 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:text-sm"
              >
                Delete account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DeleteGame;