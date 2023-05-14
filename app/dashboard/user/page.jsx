import axios from "axios";

async function fetchRepos() {
  const response = await axios(
    'https://api.github.com/users',
    {
      next: {
        revalidate: 60,
      },
    }
  );
  return response.data;
}

const ReposPage = async () => {
  const data = await fetchRepos();

  return (
    <div className='container'>
      <h2>Repositories</h2>
      <ul className='repo-list'>
        {data.map((data) => (
          <div>{data.login}</div>
        ))}
      </ul>
    </div>
  );
};
export default ReposPage;
