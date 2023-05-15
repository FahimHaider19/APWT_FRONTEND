import axios from "axios";
import Link from "next/link";

async function fetchRepos(url) {
  const response = await axios(url, {
    next: {
      revalidate: 60,
    },
  }
  );
  return response.data;
}

const GameNewsPage = async ({ params }) => {
  const newsData = await fetchRepos(`http://localhost:3000/news/game/${params.id}`);
  return (
    <div className="p-4 sm:p-6 lg:p-8 w-full">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">News</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all the newsData in the system including their details
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
                      News ID
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      News Title
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      News Description
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      News Date
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Game
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {newsData.map((news) => (
                    <tr key={news.newsId}>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{news.newsId}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{news.newsTitle}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{news.newsDescription}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{news.newsDate}</td>
                      <Link href={`/dashboard/news/game/${news.game.gameId}`}>
                        <td className="px-1 py-3 text-indigo-600 hover:text-indigo-900">{news.game.gameName}</td>
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

export default GameNewsPage;