import axios from 'axios';

const Home = () => {
  const getToken = async () => {
    const response = await axios.get('http://localhost:3000/auth');
    window.location.href = `${response.data.url}`;
  };

  return (
    <div>
      <h1>Home page</h1>
      <button onClick={getToken}>get Token</button>
    </div>
  );
};

export default Home;
