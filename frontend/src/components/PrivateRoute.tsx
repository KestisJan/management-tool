import React from "react";
import { Route, Navigate, Outlet } from 'react-router-dom';
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const PrivateRoute: React.FC<{ redirectTo?: string }> = ({ redirectTo = '/login' }) => {
    const isAuthenticated = useSelector(( state: RootState ) => state.auth.accessToken !== null);

    return isAuthenticated ? <Outlet /> : <Navigate to={redirectTo} />;
}

export default PrivateRoute;