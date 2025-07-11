import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const AdminDashboard = () => {
    const navigate = useNavigate();
    const [projects, setProjects] = useState([]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        alert("Logged out successfully");
        navigate("/login");
    };

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    alert("Unauthorized! Please login again.");
                    navigate("/login");
                    return;
                }

                const response = await axios.get("http://localhost:8081/api/project", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setProjects(response.data);
                console.log("Fetched projects:", response.data);
            } catch (error) {
                console.error("Failed to fetch projects", error);
                alert("Error fetching projects ❌");
            }
        };
        fetchProjects();
    }, [navigate]);

    return (
        <div className="flex h-screen w-full">
            {/* Left Panel */}
            <div className="w-1/3 bg-indigo-600 flex items-center justify-center p-10">
                <div>
                    <h1 className="text-white text-5xl font-extrabold mb-4 leading-tight">
                        Admin <br /> Dashboard 🚀
                    </h1>
                    <p className="text-indigo-100 text-sm mt-2">Manage the entire system with full control</p>
                </div>
            </div>

            {/* Right Panel */}
            <div className="w-2/3 bg-white flex flex-col items-center justify-start px-6 py-10 overflow-y-auto">
                <div className="w-full max-w-3xl bg-white/60 backdrop-blur-md border border-gray-200 rounded-3xl p-10 shadow-md hover:shadow-xl transition duration-500">
                    <div className="text-center mb-10">
                        <h2 className="text-4xl font-bold text-gray-800 border-b-2 border-indigo-400 inline-block pb-1">
                            🔧 Admin Controls
                        </h2>
                        <p className="text-gray-500 mt-2 text-sm">Click a button to access a feature</p>
                    </div>

                    <div className="grid grid-cols-2 gap-6 mb-10">
                        <button onClick={() => navigate("/create-issue")} className="bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transform hover:scale-105 transition-all duration-300">
                            ➕ Create New Issue
                        </button>
                        <button onClick={() => navigate("/create-project")} className="bg-green-500 text-white py-3 rounded-xl font-semibold hover:bg-green-600 transform hover:scale-105 transition-all duration-300">
                            ➕ Create New Project
                        </button>
                        <button onClick={() => navigate("/assign-issue")} className="bg-yellow-500 text-white py-3 rounded-xl font-semibold hover:bg-yellow-600 transform hover:scale-105 transition-all duration-300">
                            👥 Assign Issue
                        </button>
                        {/* <button onClick={() => navigate("/admin/roles")} className="bg-purple-500 text-white py-3 rounded-xl font-semibold hover:bg-purple-600 transform hover:scale-105 transition-all duration-300">
                            🔁 Assign Roles
                        </button> */}
                        <button onClick={() => navigate("/view-issues")} className="bg-pink-500 text-white py-3 rounded-xl font-semibold hover:bg-pink-600 transform hover:scale-105 transition-all duration-300">
                            🧾 View All Issues
                        </button>
                        <button onClick={() => navigate("/admin/projects/delete")} className="w-171 bg-red-500 text-white py-3 rounded-xl font-semibold hover:bg-red-600 transform hover:scale-105 transition-all duration-300">
                            🗑️ Delete Project
                        </button>
                    </div>

                    {/* Fetched Projects Section */}
                    <div className="mb-8">
                        <h3 className="text-2xl font-semibold text-gray-800 mb-4">📋 Projects List</h3>
                        {projects.length === 0 ? (
                            <p className="text-sm text-gray-500">No projects found.</p>
                        ) : (
                            <ul className="space-y-3 max-h-60 overflow-y-auto pr-2">
                                {projects.map((project) => (
                                    <li key={project.id} className="p-4 bg-gray-100 rounded-xl border border-gray-200">
                                        <h4 className="text-lg font-bold text-indigo-700">{project.name}</h4>
                                        <p className="text-sm text-gray-600">{project.description}</p>
                                        <p className="text-xs text-gray-400 mt-1">Created At: {new Date(project.createdAt).toLocaleString()}</p>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    <div className="text-center">
                        <button onClick={handleLogout} className="text-red-600 font-medium hover:underline">
                            🚪 Logout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
