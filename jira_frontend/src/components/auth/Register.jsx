import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Register = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        emailID: "",
        password: "",
        role: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8081/api/auth/register", formData);
            console.log("User registered:", response.data);
            alert("Registration successful ✅");
            navigate("/login");
        } catch (error) {
            console.error("Registration failed:", error);
            alert("Something went wrong ❌");
        }
    };

    // Typing animation
    const words = ["to Your", "TeamSpace!", "Register Now 🚀"];
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
            {/* Left Side */}
            <div className="w-1/2 bg-indigo-600 flex items-center justify-center">
                <h1 className="text-white text-6xl font-extrabold text-center leading-snug whitespace-pre-line">
                    Welcome <br />{displayedText}
                    <span className="text-white animate-ping ml-2">|</span>
                </h1>
            </div>

            {/* Right Side */}
            <div className="w-1/2 bg-white flex items-center justify-center px-6">
                <div className="w-full max-w-lg bg-white/60 backdrop-blur-md border border-gray-200 rounded-3xl p-10 shadow-md hover:shadow-xl transition duration-500">
                    <div className="text-center mb-8">
                        <h2 className="text-4xl font-bold text-gray-800 border-b-2 border-blue-300 inline-block pb-1">
                            👤 Sign Up
                        </h2>
                        <p className="text-gray-500 mt-2 text-sm">Join us and start your journey 🚀</p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="grid gap-5">
                            <div>
                                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    placeholder="e.g., himanshu_k"
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none bg-white"
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="emailID"
                                    value={formData.emailID}
                                    onChange={handleChange}
                                    placeholder="you@example.com"
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none bg-white"
                                />
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Choose a strong password"
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none bg-white"
                                />
                            </div>

                            <div>
                                <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                                <select
                                    id="role"
                                    name="role"
                                    value={formData.role}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-xl bg-white focus:ring-2 focus:ring-blue-400 focus:outline-none"
                                >
                                    <option value="">🎭 Select a role</option>
                                    <option value="ADMIN">🛡️ ADMIN</option>
                                    <option value="MANAGER">📋 MANAGER</option>
                                    <option value="DEVELOPER">💻 DEVELOPER</option>
                                    <option value="TESTER">🧪 TESTER</option>
                                </select>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-indigo-600 text-white py-2 rounded-xl font-semibold hover:bg-indigo-700 transform hover:scale-[1.02] transition-all duration-300"
                            >
                                Create Account
                            </button>
                        </div>
                    </form>

                    <p className="text-sm text-center text-gray-600 mt-6">
                        Already registered?{" "}
                        <span
                            className="text-indigo-600 hover:underline cursor-pointer"
                            onClick={() => navigate("/login")}
                        >
                            Login here
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
};
