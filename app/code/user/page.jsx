async function fetchRepos() {
  const response = await fetch(
    'https://api.github.com/users',
    {
      next: {
        revalidate: 60,
      },
    }
  );
  const repos = await response.json();
  return repos;
}

const ReposPage = async () => {
  const repos = await fetchRepos();

  return (
    <div className='repos-container'>
      <h2>Repositories</h2>
      <ul className='repo-list'>
        {repos.map((repo) => (
          <div>{repo.login}</div>
        ))}
      </ul>
    </div>
  );
};
export default ReposPage;
