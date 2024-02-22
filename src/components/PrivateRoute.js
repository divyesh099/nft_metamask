import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './context/auth-context';

function PrivateRoute({ element }) {
    const { isAuthenticated } = useAuth();

    if (isAuthenticated) {
        return element;
    } else {
        return <Navigate to="/" />;
    }
}

export default PrivateRoute;
