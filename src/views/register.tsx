/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, MouseEvent } from 'react'
import googleImage from '../assets/images/google.png'
import { Link } from 'react-router-dom'
import { useForm, SubmitHandler } from "react-hook-form"
import { IFormInput } from '../interfaces'
import Loader from '../components/Loader'
import { signupUser } from '../services/auth'

export default function Register() {
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState('');
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<IFormInput>({
    mode: "all"
  });

  const onSubmitForm: SubmitHandler<IFormInput> = async (data) => {
    // console.log(data);
    setLoading(true);

    try {
      const res = await signupUser(data);
      console.log(res);

      setLoading(false);
      setShowVerificationModal(true);
      reset();

    } catch(error: any) {
      const message = error.response ? error.response.data?.message : error.message;
      setAuthError(message);
      setLoading(false);
    }
  };

  const toggleModal = (e: MouseEvent<HTMLElement>) => {
    const modalContent = document.querySelector('.modal-content') as HTMLDivElement;
    const target = e.target as HTMLElement;

    if (!modalContent.contains(target) || target.classList.contains('close-modal')) {
      setShowVerificationModal(false);
    }
  }

  return (
    <>
      <div className={`modal-container absolute left-0 top-0 z-[100] w-screen h-screen bg-[rgba(0,0,0,0.4)] flex justify-center items-center transition-all ${
        showVerificationModal ?
          'opacity-100 visible pointer-events-auto' :
          'opacity-0 invisible pointer-events-none'
      }`} onClick={toggleModal}>
        <div className="modal-content relative modal-card flex h-max w-[95%] max-w-[500px] p-10 flex-col items-center rounded-lg shadow-lg bg-white">
          <i className="close-modal fas fa-times-circle absolute top-3 right-3 cursor-pointer text-xl" onClick={() => setShowVerificationModal(false)}></i>
          <i className="fas fa-envelope-open-text text-[6rem] text-blue-400"></i>
          <h3 className="text-base text-blue-500 font-bold mt-2 mb-5">Email Sent!</h3>
          <p className="text-sm text-center text-slate-700 mb-4">We have just sent you an email to verify and activate your account. If you don't see the email in your inbox, be sure to check your spam folder as well.</p>
          <p className="text-sm text-blue-500 font-bold">Happy secure logging in! 🎉🎉</p>
        </div>
      </div>
      <div className='relative flex h-max min-h-[100vh] w-screen items-center justify-center'>
        <div className='modal-card flex h-max w-[95%] max-w-[500px] flex-col items-center rounded-lg shadow-lg'>
          <form
            className='flex h-max w-full flex-col items-center px-5 py-8 md:p-12'
            onSubmit={handleSubmit(onSubmitForm)}
          >
            <h3 className='text-center mb-5 text-lg font-bold'>
              Create a new account
            </h3>
            <p className={`w-full text-red-600 text-sm transition-all ${
              authError ? 'mb-2.5 h-max flex items-center' : 'hidden'
            }`}>
              <i className="fas fa-exclamation-circle text-xl mr-2"></i>
              { authError }
            </p>
            <input
              type='text'
              className="sub-card w-full rounded-sm p-2 focus:outline-none"
              placeholder='Username'
              { ...register('username', {
                required: true,
                minLength: 8,
                maxLength: 16
              })}
            />
            {
              errors.username && (
                <span className="text-xs text-red-500 self-start mt-1 inline-block">
                  Username must not be shorter than 8 characters.
                </span>
              )
            }
            <input
              type='email'
              className="sub-card w-full mt-4 rounded-sm p-2 focus:outline-none"
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
              className="sub-card w-full mt-4 rounded-sm p-2 focus:outline-none"
              placeholder='Password'
              { ...register('password', {
                required: true,
                pattern: /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$&!%]).{8,15})/
              })}
            />
            {
              errors.password && (
                <span className="text-xs text-red-500 self-start mt-1 inline-block">
                  Password must be 8 characters minimum and must contain at least one lowercase, uppercase, and digit
                </span>
              )
            }
            <input
              type='password'
              className="sub-card w-full mt-4 rounded-sm p-2 focus:outline-none"
              placeholder='Confirm Password'
              { ...register('confirm_password', {
                required: true,
                pattern: /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$&!%]).{8,15})/,
                validate: (value, { password }) => value && value === password
              })}
            />
            {
              errors.confirm_password && (
                <span className="text-xs text-red-500 self-start mt-1 inline-block">
                  Make sure the passwords provided match.
                </span>
              )
            }
            <button
              className="w-full max-w-[300px] mt-4 rounded-sm py-4 px-10 text-white bg-blue-500 flex items-center justify-center"
            >
              {
                loading ? <Loader loading={true} color="bg-white" /> : 'Sign up'
              }
            </button>
            <p className='my-5 text-sm'>
              Already have an account? &nbsp;
              <Link to="/users/login" className={
                `cursor-pointer text-blue-500 ${
                  loading ? 'pointer-events-none opacity-50' : ''
                }`}
              >
                Sign in
              </Link>
            </p>
            <span className='mb-5 block text-sm md:text-base'>Or</span>
            <button
              className={`flex w-full max-w-[300px] items-center rounded-sm border border-blue-500 py-4 px-10 ${loading ? 'pointer-events-none opacity-20 cursor-not-allowed' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                const api_url = import.meta.env.VITE_API_URL;
                const authUrl = `${api_url}/auth/google`;
                window.location.href = authUrl;
              }}
            >
              <img
                src={googleImage}
                alt='Google icon'
                className='mr-2 h-6 w-6'
              />
              <span className="text-sm md:text-base">Sign up with Google</span>
            </button>
          </form>
        </div>
      </div>
    </>
  )
}
