'use client'
import { Fragment } from 'react'
import { StarIcon } from '@heroicons/react/20/solid'
import Test from '../../components/GameCarousel'
import axios from "axios";
import { useSession } from 'next-auth/react';

async function fetchData(id) {
  // const token = await useSession();
  // console.log(token);
  const response = await axios(
    `http://localhost:3000/game/details/${id}`,
    {
      next: {
        revalidate: 60,
      },
    }
  );
  return response.data;
}

const product = {
  name: 'Application UI Icon Pack',
  version: { name: '1.0', date: 'June 5, 2021', datetime: '2021-06-05' },
  price: '$220',
  description:
    'The Application UI Icon Pack comes with over 200 icons in 3 styles: outline, filled, and branded. This playful icon pack is tailored for complex application user interfaces with a friendly and legible look.',
  highlights: [
    '200+ SVG icons in 3 unique styles',
    'Compatible with Figma, Sketch, and Adobe XD',
    'Drawn on 24 x 24 pixel grid',
  ],
  imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-05-product-01.jpg',
  imageAlt: 'Sample of 30 icons with friendly and fun details in outline, filled, and brand color styles.',
}
const reviews = [
  {
    id: 1,
    rating: 5,
    content: `
        <p>This icon pack is just what I need for my latest project. There's an icon for just about anything I could ever need. Love the playful look!</p>
      `,
    date: 'July 16, 2021',
    datetime: '2021-07-16',
    author: 'Emily Selman',
    avatarSrc:
      'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80',
  },
  {
    id: 2,
    rating: 5,
    content: `
        <p>Blown away by how polished this icon pack is. Everything looks so consistent and each SVG is optimized out of the box so I can use it directly with confidence. It would take me several hours to create a single icon this good, so it's a steal at this price.</p>
      `,
    date: 'July 12, 2021',
    datetime: '2021-07-12',
    author: 'Hector Gibbons',
    avatarSrc:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80',
  },
  // More reviews...
]

// const game = {
//   name: 'Forza Horizon 5',
//   shortDescription: 'Your Ultimate Horizon Adventure awaits! Explore the vibrant open world landscapes of Mexico with limitless, fun driving action in the world’s greatest cars. Conquer the rugged Sierra Nueva in the ultimate Horizon Rally experience. Requires Forza Horizon 5 game, expansion sold separately.',
//   rating: 4,
//   releaseDate: 'November 9, 2021',
//   developer: 'Playground Games',
//   publisher: 'Xbox Game Studios',
//   genre: ['Role-playing', 'Simulation', 'Farming'],
//   price: '$14.99',
//   version: '1.1.5',
//   lastUpdated: 'January 15, 2021',
// }

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const GamePage = async ({ params: { id } }) => {
  const game = await fetchData(id);
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl py-8 px-6 lg:px-8">
        {/* Product */}
        <div className="lg:grid lg:grid-cols-7 lg:grid-rows-1 lg:gap-x-8 lg:gap-y-10 xl:gap-x-16">
          {/* Product image */}
          <div className="lg:col-span-4 lg:row-end-1">
            <div className="rounded-lg bg-gray-100">
              {/* <img src={product.imageSrc} alt={product.imageAlt} className="object-cover object-center" /> */}
              <Test />
            </div>
          </div>
          
          {/* Product details */}
          <div className="mx-auto mt-14 max-w-xl sm:mt-16 lg:col-span-3 lg:row-span-2 lg:row-end-2 lg:mt-0">
            <div className="flex flex-col-reverse">
              <div className="mt-4">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{game.gameName}</h1>

                <h2 id="information-heading" className="sr-only">
                  Product information
                </h2>
                <p className="mt-2 text-sm text-gray-500">
                  {/* Version {game.version} (Updated{' '} */}
                  {/* <time dateTime={game.lastUpdated}>{game.lastUpdated}</time>) */}
                </p>
              </div>

              <div>
                <h3 className="sr-only">Reviews</h3>
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={rating}
                      className={classNames(
                        game.gameRating > rating ? 'text-yellow-400' : 'text-gray-300',
                        'h-5 w-5 flex-shrink-0'
                      )}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <p className="sr-only">{game.gameRating} out of 5 stars</p>
              </div>
            </div>
            
            <p className="my-6 text-gray-500">{game.gameDescription}</p>

            <div className='my-3'>
              <h3 class="font-medium text-gray-900">Information</h3>
              <dl class="mt-2 divide-y divide-gray-200 border-t border-b border-gray-200">
                <div class="flex justify-between py-3 text-sm font-medium">
                  <dt class="text-gray-500">Release Date</dt>
                  <dd class="whitespace-nowrap text-gray-900">{game.gameReleaseDate}</dd>
                </div>

                <div class="flex justify-between py-3 text-sm font-medium">
                  <dt class="text-gray-500">Developer</dt>
                  <dd class="whitespace-nowrap text-gray-900">{game.gamePublisher}</dd>
                </div>

                <div class="flex justify-between py-3 text-sm font-medium">
                  <dt class="text-gray-500">Publisher</dt>
                  <dd class="whitespace-nowrap text-gray-900">{game.gamePublisher}</dd>
                </div>

                <div class="flex justify-between py-3 text-sm font-medium">
                  <dt class="text-gray-500">Genre</dt>
                  <dd class="whitespace-nowrap text-gray-900">{
                    game.gameCategory.map((genre) => (
                      <span key={genre.categoryName} className="inline-flex items-center rounded bg-purple-100 mx-1 px-2 py-0.5 text-xs font-medium text-purple-800">{genre.categoryName}</span>
                    ))}</dd>
                </div>
              </dl>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
              <button
                type="button"
                className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
              >
                Pay {game.price}
              </button>
              <button
                type="button"
                className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-50 py-3 px-8 text-base font-medium text-indigo-700 hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
              >
                Add to wishlist
              </button>
            </div>

            {/* <div className="mt-10 border-t border-gray-200 pt-10">
              <h3 className="text-sm font-medium text-gray-900">Highlights</h3>
              <div className="prose prose-sm mt-4 text-gray-500">
                <ul role="list">
                  {product.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              </div>
            </div> */}

            {/* <div className="mt-10 border-t border-gray-200 pt-10">
              <h3 className="text-sm font-medium text-gray-900">License</h3>
              <p className="mt-4 text-sm text-gray-500">
                <a href={'#'} className="font-medium text-indigo-600 hover:text-indigo-500">
                  Read full license
                </a>
              </p>
            </div> */}
          </div>
        </div>
      </div>

      {/* Reviews */}
      <div className="mx-auto max-w-7xl py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <h2 className="text-lg font-medium text-gray-900">Recent reviews</h2>
        <div className="mt-6 space-y-10 divide-y divide-gray-200 border-t border-b border-gray-200 pb-10">
          {reviews.map((review) => (
            <div key={review.id} className="pt-10 lg:grid lg:grid-cols-12 lg:gap-x-8">
              <div className="lg:col-span-8 lg:col-start-5 xl:col-span-9 xl:col-start-4 xl:grid xl:grid-cols-3 xl:items-start xl:gap-x-8">
                <div className="flex items-center xl:col-span-1">
                  <div className="flex items-center">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <StarIcon
                        key={rating}
                        className={classNames(
                          review.rating > rating ? 'text-yellow-400' : 'text-gray-200',
                          'h-5 w-5 flex-shrink-0'
                        )}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <p className="ml-3 text-sm text-gray-700">
                    {review.rating}
                    <span className="sr-only"> out of 5 stars</span>
                  </p>
                </div>

                <div className="mt-4 lg:mt-6 xl:col-span-2 xl:mt-0">
                  <h3 className="text-sm font-medium text-gray-900">{review.title}</h3>

                  <div
                    className="mt-3 space-y-6 text-sm text-gray-500"
                    dangerouslySetInnerHTML={{ __html: review.content }}
                  />
                </div>
              </div>

              <div className="mt-6 flex items-center text-sm lg:col-span-4 lg:col-start-1 lg:row-start-1 lg:mt-0 lg:flex-col lg:items-start xl:col-span-3">
                <p className="font-medium text-gray-900">{review.author}</p>
                <time
                  dateTime={review.datetime}
                  className="ml-4 border-l border-gray-200 pl-4 text-gray-500 lg:ml-0 lg:mt-2 lg:border-0 lg:pl-0"
                >
                  {review.date}
                </time>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default GamePage;