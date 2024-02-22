import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './context/auth-context';
import Header from './common/Header';

function PrivateRoute({ element }) {
    const { isAuthenticated } = useAuth();

    if (isAuthenticated) {
        return (
            <div className='app home-page'>
                <Header />
                {element}
            </div>
        );
    } else {
        return <Navigate to="/" />;
    }
}

export default PrivateRoute;
