/* eslint-disable @typescript-eslint/no-unused-vars */
import Loader from '../components/Loader';

export default function GoogleAuth() {

  return (
    <div className="w-screen h-full min-h-screen flex items-center justify-center">
      <div className="w-full max-w-[1280px] h-full p-4 flex flex-col items-center justify-center">
        <div className="w-full h-max flex items-center justify-center">
          <div className="w-full max-w-[30rem] flex flex-col items-center">
            <Loader loading={true} color='bg-blue-500' />
            <p className="text-base text-center mt-5">Creating your account. Please wait...</p>
          </div>
        </div>
      </div>
    </div>
  )
}
