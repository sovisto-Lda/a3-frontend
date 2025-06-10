// hooks/useAuth.js
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export function useAuth() {
    const navigate = useNavigate();
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);
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

            fetch('http://localhost:5000/account', {
                headers: { Authorization: `Bearer ${storedToken}` }
            })
                .then(res => {
                    if (!res.ok) throw new Error("Failed to fetch user data");
                    return res.json();
                })
                .then(data => {
                    setUser(data);
                })
                .catch(err => {
                    console.error("Fetch error", err);
                    navigate('/login');
                });
        } catch (err) {
            console.error("Invalid token", err);
            navigate('/login');
        }
    }, [navigate]);

    return { token, user, decodedUser };
}