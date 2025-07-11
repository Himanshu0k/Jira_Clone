import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CreateIssue = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("LOW");
    const [projectId, setProjectId] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");

            const response = await axios.post(
                "http://localhost:8081/api/issue",
                {
                    title,
                    description,
                    priority,
                    projectId
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log("Issue created:", response.data);
            alert("✅ Issue created successfully!");
            navigate("/admin-dashboard");
        } catch (error) {
            console.error("Issue creation failed:", error);
            alert("❌ Failed to create issue");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-10 rounded-3xl shadow-md w-full max-w-md border border-gray-200">
                <h2 className="text-3xl font-bold text-center text-indigo-600 mb-6">
                    🐞 Create New Issue
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Issue Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
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

                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Priority</label>
                        <select
                            value={priority}
                            onChange={(e) => setPriority(e.target.value)}
                            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        >
                            <option value="LOW">LOW</option>
                            <option value="MEDIUM">MEDIUM</option>
                            <option value="HIGH">HIGH</option>
                            <option value="CRITICAL">CRITICAL</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Project ID</label>
                        <input
                            type="text"
                            value={projectId}
                            onChange={(e) => setProjectId(e.target.value)}
                            required
                            placeholder="Enter the associated project ID"
                            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition duration-300"
                    >
                        Create Issue 🧾
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

export default CreateIssue;
