/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react'
import { useForm, SubmitHandler } from "react-hook-form"
import googleImage from '../assets/images/google.png'
import { Link } from 'react-router-dom'
import { IFormInput } from '../interfaces'
import Loader from '../components/Loader'

export default function Login() {
  const [loading, ] = useState(false);
  const [authError, ] = useState('');
  const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>({
    mode: "all"
  });

  const onSubmitForm: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
  };

  return (
    <>
      <div className='relative flex h-max min-h-[100vh] w-screen items-center justify-center'>
        <div className='modal-card flex h-max w-[95%] max-w-[500px] flex-col items-center rounded-lg shadow-lg'>
          <form
            className='flex h-max w-full flex-col items-center px-5 py-8 md:p-12'
            onSubmit={handleSubmit(onSubmitForm)}
          >
            <h3 className='text-center text-lg font-bold mb-5'>
              Login to your account
            </h3>
            <p className={`w-full text-red-600 text-sm transition-all ${
              authError ? 'mb-2.5 h-max flex' : 'hidden'
            }`}>
              <i className="fas fa-exclamation-circle text-xl mr-2"></i>
              { authError }
            </p>
            <input
              type='email'
              className="sub-card w-full rounded-sm border-2 p-2 focus:outline-none"
              placeholder='Email address'
              { ...register('email', {
                required: true,
                pattern: /\w+@[a-zA-Z_]+?(\.[a-zA-Z]{2,6})+/i
              })}
            />
            {
              errors.email && (
                <span className="text-xs text-red-500 self-start mt-1 inline-block">
                  A valid email address is required
                </span>
              )
            }
            <input
              type='password'
              className="sub-card w-full mt-4 rounded-sm border-2 p-2 focus:outline-none"
              placeholder='Password'
              { ...register('password', {
                required: true,
                pattern: /((?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,15})/
              })}
            />
            {
              errors.password && (
                <span className="text-xs text-red-500 self-start mt-1 inline-block">
                  Password must be 8 characters minimum and must contain at least one lowercase, uppercase, and digit
                </span>
              )
            }
            <button
              className="w-full max-w-[300px] mt-4 rounded-sm py-4 px-10 text-white bg-blue-500 flex items-center justify-center"
            >
              {
                loading ? <Loader loading={true} color="bg-white" /> : 'Sign in'
              }
            </button>
            <p className='my-5 text-sm md:text-base'>
              Don't have an account? &nbsp;
              <Link to="/users/register" className={
                `cursor-pointer text-blue-500 ${
                  loading ? 'pointer-events-none opacity-50' : ''
                }`}
              >
                Sign up
              </Link>
            </p>
            <span className='mb-5 block text-sm'>Or</span>
            <button
              className={`flex w-full max-w-[300px] items-center rounded-sm border border-blue-500 py-4 px-10 ${loading ? 'pointer-events-none opacity-20 cursor-not-allowed' : ''}`}
              onClick={(e) => { e.preventDefault() }}
            >
              <img
                src={googleImage}
                alt='Google icon'
                className='mr-2 h-6 w-6'
              />
              <span className="text-sm md:text-base">Login with Google</span>
            </button>
          </form>
        </div>
      </div>
    </>
  )
}
