import { Navigate } from 'react-router-dom';
import { ReactElement, useContext } from 'react';
import { userContext } from '../context/userContext';
import Header from '../components/layout/Header';

export default function Guest({ children, showNav }: {
    children: ReactElement,
    showNav: boolean
}) {
    const { user } = useContext(userContext);
    const authorised = user && user.isVerified && user.registrationCompleted;

    return authorised ? <Navigate to="/users/protected" /> : (
        <>
            <Header showNav={showNav} />
            { children }
        </>
    );
}