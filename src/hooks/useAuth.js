// hooks/useAuth.js
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export function useAuth() {
    const navigate = useNavigate();
    const [token, setToken] = useState(null);
    const [decodedUser, setDecodedUser] = useState(null);

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (!storedToken) {
            navigate('/login');
            return;
        }

        try {
            const decoded = jwtDecode(storedToken);
            setToken(storedToken);
            setDecodedUser(decoded);
        } catch (err) {
            console.error("Invalid token", err);
            navigate('/login');
        }
    }, [navigate]);

    return { token, decodedUser };
}