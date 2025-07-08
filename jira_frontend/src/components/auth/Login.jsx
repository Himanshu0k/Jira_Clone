import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Login = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8081/api/auth/login", formData);
            const token = response.data.token;
            localStorage.setItem("token", token);
            console.log("Login successful:", response.data);
            alert("Login successful ✅");
            navigate("/dashboard");
        } catch (error) {
            console.error("Login failed:", error);
            alert("Invalid credentials ❌");
        }
    };

    const handleGoogleLogin = () => {
        // 👇 Redirect user to Spring Boot Google OAuth2 endpoint
        window.location.href = "http://localhost:8081/oauth2/authorization/google";
        console.log("Login successfull ....");
    };

    // 🔡 Typing animation logic
    const words = ["back!", "to", "TeamSpace 👋"];
    const [displayedText, setDisplayedText] = useState("");
    const [wordIndex, setWordIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        const currentWord = words[wordIndex];
        let timeout;

        if (!deleting && charIndex <= currentWord.length) {
            timeout = setTimeout(() => {
                setDisplayedText(currentWord.substring(0, charIndex));
                setCharIndex(charIndex + 1);
            }, 150);
        } else if (deleting && charIndex >= 0) {
            timeout = setTimeout(() => {
                setDisplayedText(currentWord.substring(0, charIndex));
                setCharIndex(charIndex - 1);
            }, 80);
        } else {
            setTimeout(() => {
                setDeleting(!deleting);
                if (deleting) {
                    setWordIndex((wordIndex + 1) % words.length);
                }
            }, 1000);
        }

        return () => clearTimeout(timeout);
    }, [charIndex, deleting, wordIndex]);

    return (
        <div className="flex h-screen w-full">
            {/* Left Animation */}
            <div className="w-1/2 bg-indigo-600 flex items-center justify-center">
                <h1 className="text-white text-6xl font-extrabold text-center leading-snug whitespace-pre-line">
                    Welcome <br />{displayedText}
                    <span className="text-white animate-ping ml-2">|</span>
                </h1>
            </div>

            {/* Right Form */}
            <div className="w-1/2 bg-white flex items-center justify-center px-6">
                <div className="w-full max-w-lg bg-white/60 backdrop-blur-md border border-gray-200 rounded-3xl p-10 shadow-md hover:shadow-xl transition duration-500">
                    <div className="text-center mb-8">
                        <h2 className="text-4xl font-bold text-gray-800 border-b-2 border-blue-300 inline-block pb-1">
                            🔐 Login
                        </h2>
                        <p className="text-gray-500 mt-2 text-sm">Glad to see you again 😊</p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="grid gap-6">
                            <div>
                                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                                    Username
                                </label>
                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    placeholder="your_username"
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none bg-white"
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none bg-white"
                                />
                            </div>

                            {/* 🔐 Login Buttons */}
                            <button
                                type="submit"
                                className="w-full bg-indigo-600 text-white py-2 rounded-xl font-semibold hover:bg-indigo-700 transform hover:scale-[1.02] transition-all duration-300"
                            >
                                Login
                            </button>

                            <button
                                type="button"
                                onClick={handleGoogleLogin}
                                className="w-full bg-red-500 text-white py-2 rounded-xl font-semibold hover:bg-red-600 transform hover:scale-[1.02] transition-all duration-300"
                            >
                                Sign in with Google
                            </button>
                        </div>
                    </form>

                    <p className="text-sm text-center text-gray-600 mt-6">
                        New here?{" "}
                        <span className="text-indigo-600 hover:underline cursor-pointer"
                        onClick={() => navigate("/register")}>
                            Create an account
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
};
