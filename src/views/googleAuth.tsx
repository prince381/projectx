/* eslint-disable @typescript-eslint/no-unused-vars */
import { useLocation } from 'react-router';
import Loader from '../components/Loader';
import { useEffect, useState } from 'react';
// import { parseQueryParams } from '../lib';

export default function GoogleAuth() {
  const { search } = useLocation();
  const [isVerifying, ] = useState(true);

  useEffect(() => {
    if (search) {
      // const params = parseQueryParams(search);
      const api_url = import.meta.env.VITE_API_URL;
      const authUrl = `${api_url}/auth/google/callback${search}`;
      window.location.href = authUrl;
    }
  }, [search])

  return (
    <div className="w-screen h-full min-h-screen flex items-center justify-center">
      <div className="w-full max-w-[1280px] h-full p-4 flex flex-col items-center justify-center">
        <div className="w-full h-max flex items-center justify-center">
          <div className="w-full max-w-[30rem] flex flex-col items-center">
            <Loader loading={isVerifying} color='bg-blue-500' />
            <p className="text-base text-center mt-5">Creating your account. Please wait...</p>
          </div>
        </div>
      </div>
    </div>
  )
}
