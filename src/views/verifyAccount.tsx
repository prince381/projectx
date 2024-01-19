/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Loader from '../components/Loader';
import { verifyAccount } from '../services/auth';

export default function VerifyAccount() {
  const { code } = useParams();
  const [isVerifying, setIsVerifying] = useState(true);
  const [verficationError, setVerificationError] = useState('Failed to complete user verification!');

  useEffect(() => {
    if (code) {
      (async () => {
        try {
          const res = await verifyAccount(code);
          setVerificationError('');
          console.log(res);
        } catch(error: any) {
          const errorMessage = error.response.data.message;
          setVerificationError(`Failed to complete user verification! ${errorMessage}`);
        } finally {
          setIsVerifying(false);
        }
      })();
    }
  }, [code])

  return (
    <div className="w-screen h-full min-h-screen flex items-center justify-center">
      <div className="w-full max-w-[1280px] h-full p-4 flex flex-col items-center justify-center">
        {
          isVerifying ? (
            <div className="w-full h-max flex items-center justify-center">
              <div className="w-full max-w-[30rem] flex flex-col items-center">
                <Loader loading={isVerifying} color='bg-blue-500' />
                <p className="text-base text-center mt-5">Verifying your account. Please wait...</p>
              </div>
            </div>
          ) : verficationError ? (
            <div className="w-full h-max flex items-center justify-center">
              <div className="w-full max-w-[30rem] flex flex-col items-center">
                <i className="fas fa-exclamation-triangle font-bold text-7xl text-red-500 mb-5"></i>
                <p className="text-base text-center">
                  { verficationError }
                </p>
                <Link to="/users/login" className="text-blue-500 self-center mt-3 cursor-pointer flex items-center justify-center">
                    Go back to the login page
                </Link>
              </div>
            </div>
          ) : (
            <div className="w-full h-max flex items-center justify-center">
              <div className="w-full max-w-[30rem] flex flex-col items-center">
                <i className="fas fa-check-circle font-bold text-7xl text-green-500 mb-5"></i>
                <p className="text-base text-center">You have successfully verified your email account. Thank you and happy learning! 🎉🎉</p>
                <Link to="/users/login" className="text-blue-500 self-center mt-3 cursor-pointer flex items-center justify-center">
                    Go back to the login page
                </Link>
              </div>
            </div>
          )
        }
      </div>
    </div>
  )
}
