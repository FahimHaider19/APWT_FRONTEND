import { Suspense } from 'react';
import axios from 'axios';

async function fetchRepo(id) {
  const response = await axios(
    `https://api.github.com/users/${id}`,
    {
      next: {
        revalidate: 60,
      },
    }
  );
  return response.data;
}

const RepoPage = async ({ params: { id } }) => {
  const data = await fetchRepo(id);
  return (
    <div className='card'>
      <Suspense fallback={<div>Loading data...</div>}>
        {data && (
          <>
            <h2>{data.login}</h2>
            <p>{data.node_id}</p>
          </>
        )}
      </Suspense>
    </div>
  );
};

export default RepoPage;
