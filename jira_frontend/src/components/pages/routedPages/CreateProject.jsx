import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CreateProject = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            const response = await axios.post(
                "http://localhost:8081/api/project/create",
                { name, description },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
                
            );
            console.log("Project created:", response.data)

            alert("✅ Project created successfully!");
            navigate("/admin-dashboard");
        } catch (error) {
            console.error("Project creation failed:", error);
            alert("❌ Failed to create project");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-10 rounded-3xl shadow-md w-full max-w-md border border-gray-200">
                <h2 className="text-3xl font-bold text-center text-indigo-600 mb-6">
                    ➕ Create New Project
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Project Title</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition duration-300"
                    >
                        Create Project 🚀
                    </button>
                </form>
                <div className="mt-4 text-center">
                    <button onClick={() => navigate("/admin-dashboard")} className="text-indigo-500 hover:underline">
                        🔙 Back to Dashboard
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateProject;
