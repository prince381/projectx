/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import Cookies from 'js-cookie';
import Loader from '../components/Loader';
import { parseQueryParams } from '../lib';
import { userContext } from '../context/userContext';
import jwtDecode from 'jwt-decode';
import { IUser } from '../interfaces';

export default function GoogleAuthComplete() {
  const { search } = useLocation();
  const [isVerifying, ] = useState(true);
  const { saveUser } = useContext(userContext);

  useEffect(() => {
    if (search) {
      const { token } = parseQueryParams(search);
      if (token) {
          // console.log(token);
        Cookies.set('accessToken', token, { expires: 1 });
        const accessToken = jwtDecode(token) as { user: IUser };
        saveUser(accessToken.user);
        // console.log(accessToken.user);
      }
    }
  }, [search])

  return (
    <div className="w-screen h-full min-h-screen flex items-center justify-center">
      <div className="w-full max-w-[1280px] h-full p-4 flex flex-col items-center justify-center">
        <div className="w-full h-max flex items-center justify-center">
          <div className="w-full max-w-[30rem] flex flex-col items-center">
            <Loader loading={isVerifying} color='bg-blue-500' />
            <p className="text-base text-center mt-5">Redirecting to dashboard. Please wait...</p>
          </div>
        </div>
      </div>
    </div>
  )
}
