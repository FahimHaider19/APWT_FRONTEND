import axios from "axios";
import Link from "next/link";

async function fetchRepos(url) {
  const response = await axios(url,
    {
      next: {
        revalidate: 60,
      },
    }
  );
  return response.data;
}

const GameTable = async ({params}) => {
  const payments = await fetchRepos('http://localhost:3000/payment/userpayment/'+params.id);
  return (
    <div className="p-4 sm:p-6 lg:p-8 w-full">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Payments</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all the payments in the system including their details
          </p>
        </div>
      </div>
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr className="w-full">
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                      Payment ID
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Payment Method
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Payment Date
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Amount
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      User
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {payments.map((payment) => (
                    <tr key={payment.paymentId}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                        <div className="flex items-center">
                          <div className="ml-4">
                            <div className="font-medium text-gray-900">{payment.paymentId}</div>
                            {/* <div className="text-gray-500">{person.email}</div> */}
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <div className="text-gray-900">{payment.paymentMethod}</div>
                        {/* <div className="text-gray-500">{person.department}</div> */}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{payment.date}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{payment.amount}</td>
                      <Link href={`/dashboard/payment/user/${payment.user.userId}`}>
                        <td className="px-1 py-3 text-indigo-600 hover:text-indigo-900">{payment.user.name}</td>
                      </Link>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GameTable;