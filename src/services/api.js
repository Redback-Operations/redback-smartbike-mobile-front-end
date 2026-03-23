// Change the local host to your backend device IP if you're running the app on mobile and not on the same device
const API_URL = "http://localhost:5000/api/auth";

export const register = async (email, password, username) => {
    const res = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email,
            password,
            username,
        }),
    });

    return res.json();
};

export const login = async (email, password) => {
    const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email,
            password,
        }),
    });

    return res.json();
};