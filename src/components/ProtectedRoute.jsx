import React from 'react';
import { jwtDecode } from 'jwt-decode';
import { Navigate, useLocation } from 'react-router-dom';

export default function ProtectedRoute ({ children }) {
    const location = useLocation();

    const token = localStorage.getItem('token');

    const isValidToken = (token) => {
        if (!token) return false;

        try {
            const decoded = jwtDecode(token);

            if (!decoded.exp) return false;

            const now = Date.now() / 1000;
            return decoded.exp > now;
        } catch (error) {
            return false;
        }
        };

    if (!isValidToken(token)) {
        // Redirect to login, preserve the location to return after login
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
};

