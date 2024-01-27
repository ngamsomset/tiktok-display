import { useEffect, useState } from 'react';
import axios from 'axios';
import { TiktokResponseData } from '../model/TiktokResponseModel';
import VideoWrapper from './VideoWrapper';
import '../index.css';

const Redirect = () => {
  const [data, setData] = useState<TiktokResponseData[] | null>([]);

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const code = urlSearchParams.get('code');
    axios
      .post('http://localhost:3000/accesstoken', {
        code: code,
      })
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [data]);

  return (
    <>
      <div className='flex-container'>
        {data?.map((data) => (
          <VideoWrapper videoUrl={data.embed_link} key={data.id} />
        ))}
      </div>
    </>
  );
};

export default Redirect;
