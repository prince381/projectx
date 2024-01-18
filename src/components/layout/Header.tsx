/* eslint-disable @typescript-eslint/no-unused-vars */
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { userContext } from '../../context/userContext';
import logo from '../../assets/images/logo.png'


export default function Header({ showNav }: { showNav: boolean }) {
  const { user } = useContext(userContext);

  const logout = () => {
    
  };

  return (
    <header className='header fixed top-0 left-0 z-10 h-max w-screen py-2 sm:py-4'>
      <div className='mx-auto flex h-max w-[95%] max-w-[1280px] items-center justify-between'>
        <Link to="/" className='text-base font-bold md:text-lg'>
          <img src={logo} alt="app logo" className="w-[120px] h-[50px]" />
        </Link>
        <div className='flex items-center'>
          <nav className='sm:ml-8 inline-block'>
            <ul className='flex items-center justify-between space-x-5 transition-all duration-75'>
              {
                showNav && (
                  <>
                    {user ? (
                      <li>
                        <button
                          className='border-none bg-none text-sm transition-all duration-75 hover:text-blue-400'
                          onClick={logout}
                        >
                          Log out
                        </button>
                      </li>
                      ) : (
                        <>
                          <li>
                            <Link
                              to='/users/login'
                              className='text-sm transition-all duration-75 hover:text-blue-400'
                            >
                              Log in
                            </Link>
                          </li>
                          <li>
                            <Link
                              to='/users/register'
                              className='text-sm transition-all duration-75 hover:text-blue-400'
                            >
                              Sign up
                            </Link>
                          </li>
                        </>
                      )
                    }
                  </>
                )
              }
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
