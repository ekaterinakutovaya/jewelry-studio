import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from 'react-router';

export const RequireAuth = ({ children }) => {
    const { isLoggedIn } = useSelector(state => state.auth);

    return isLoggedIn === true
        ? children
        : <Navigate to="/login" replace />;
};
