import { Suspense } from 'react';

async function fetchRepo(name) {
  const response = await fetch(
    `https://api.github.com/users/${name}`,
    {
      next: {
        revalidate: 60,
      },
    }
  );
  const repo = await response.json();
  return repo;
}

const RepoPage = async ({ params: { name } }) => {
  const repo = await fetchRepo(name);
  return (
    <div className='card'>
      <Suspense fallback={<div>Loading repo...</div>}>
        {repo && (
          <>
            <h2>{repo.login}</h2>
            <p>{repo.node_id}</p>
          </>
        )}
      </Suspense>
    </div>
  );
};

export default RepoPage;
