import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export const OAuth2RedirectHandler = () => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const token = params.get("token");

        if (token) {
            localStorage.setItem("token", token);
            console.log("Token received:", token);
            alert("Google login successful ✅");
            navigate("/dashboard"); // or wherever you want to go
        } else {
            alert("Google login failed ❌");
            navigate("/login");
        }
    }, [location]);

    return null;
};
