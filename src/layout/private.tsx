import { Navigate } from 'react-router-dom';
import { ReactElement, useContext } from 'react';
import { userContext } from '../context/userContext';
import Header from '../components/layout/Header';

export default function Protected({ children }: { children: ReactElement }) {
    const { user } = useContext(userContext);
    const authorised = user && user.isVerified && user.registrationCompleted;

    return authorised ? (
        <>
            <Header showNav={true} />
            { children }
        </>
    ) : <Navigate to="/users/login" />;
}