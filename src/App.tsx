/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useContext } from 'react'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import { IUser } from './interfaces';
import { userContext } from './context/userContext';

import Login from './views/login';
import Register from './views/register';
import VerifyAccount from './views/verifyAccount';
import CompleteAuth from './views/completeAuth';
// import PasswordReset from './views/resetPassword';
import GoogleAuth from './views/googleAuth';
// import GoogleAuthSuccess from './views/googleProtected';
import Home from './views/Index';
import PrivacyPolicy from './views/privacypolicy';
import TermsOfService from './views/termsofservice';

// import Protected from './layout/private';
import Guest from './layout/public';



function App() {
  const { user, saveUser } = useContext(userContext);

  useEffect(() => {
    const token = Cookies.get('accessToken');
    if (token) {
      console.log(token);
      const accessToken = jwtDecode(token) as { user: IUser };
      saveUser(accessToken.user);
      console.log(user);
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path='/' element={
          <Guest showNav={true}>
            <Home />
          </Guest>
        } />
        <Route path='/users/login' element={
          <Guest showNav={false}>
            <Login />
          </Guest>
        } />
        <Route path='/users/register' element={
          <Guest showNav={false}>
            <Register />
          </Guest>
        } />
        <Route path='/users/verify/:code' element={
          <Guest showNav={false}>
            <VerifyAccount />
          </Guest>
        } />
        <Route path='/users/complete_registration/:id' element={
          <Guest showNav={false}>
            <CompleteAuth />
          </Guest>
        } />
        <Route path='/privacy-policy' element={
          <Guest showNav={true}>
            <PrivacyPolicy />
          </Guest>
        } />
        <Route path='/terms-of-service' element={
          <Guest showNav={true}>
            <TermsOfService />
          </Guest>
        } />
        <Route path='/auth/google/callback' element={<GoogleAuth />} />
      </Routes>
    </Router>
  )
}

export default App
