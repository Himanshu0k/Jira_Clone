import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ViewIssues = () => {
    const navigate = useNavigate();
    const [projects, setProjects] = useState([]);
    const [selectedProjectId, setSelectedProjectId] = useState(null);
    const [issues, setIssues] = useState([]);

    // Fetch all projects on mount
    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get("http://localhost:8081/api/project", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setProjects(response.data);
            } catch (error) {
                console.error("Failed to fetch projects:", error);
                alert("❌ Error fetching projects");
            }
        };
        fetchProjects();
    }, []);

    // Fetch issues for selected project
    const handleProjectClick = async (projectId) => {
        setSelectedProjectId(projectId);
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get(`http://localhost:8081/api/issue/project/${projectId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setIssues(response.data);
        } catch (error) {
            console.error("Failed to fetch issues:", error);
            alert("❌ Error fetching issues");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="bg-white p-10 rounded-3xl shadow-md w-full max-w-6xl border border-gray-200">
                <h2 className="text-3xl font-bold text-center text-indigo-600 mb-8">
                    🗂️ View Issues by Project
                </h2>

                {/* Projects List */}
                <div className="mb-6 space-y-4 max-h-60 overflow-y-auto pr-2">
                    {projects.length === 0 ? (
                        <p className="text-center text-gray-500">No projects found.</p>
                    ) : (
                        projects.map((project) => (
                            <div
                                key={project.id}
                                className={`cursor-pointer p-4 rounded-xl border ${
                                    selectedProjectId === project.id
                                        ? "bg-indigo-100 border-indigo-400"
                                        : "bg-gray-50 border-gray-200"
                                } shadow hover:shadow-md transition`}
                                onClick={() => handleProjectClick(project.id)}
                            >
                                <h3 className="text-lg font-semibold text-indigo-700">
                                    📁 {project.name}
                                </h3>
                                <p className="text-sm text-gray-600">{project.description}</p>
                            </div>
                        ))
                    )}
                </div>

                {/* Issues List */}
                {selectedProjectId && (
                    <div className="mt-6">
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">
                            🧾 Issues for Project ID: {selectedProjectId}
                        </h3>

                        {issues.length === 0 ? (
                            <p className="text-sm text-gray-500">No issues for this project.</p>
                        ) : (
                            <ul className="space-y-6 max-h-[500px] overflow-y-auto pr-2">
                                {issues.map((issue) => (
                                    <li
                                        key={issue.id}
                                        className="bg-gray-50 border border-gray-200 rounded-xl p-5 shadow-sm"
                                    >
                                        <h4 className="text-xl font-semibold text-indigo-700 mb-2">
                                            {issue.title} ... ID : {issue.id}
                                        </h4>
                                        <p className="text-gray-700 mb-2">{issue.description}</p>

                                        <div className="grid grid-cols-2 gap-x-6 text-sm text-gray-600">
                                            <p><span className="font-semibold text-gray-800">Priority:</span> {issue.priority}</p>
                                            <p><span className="font-semibold text-gray-800">Status:</span> {issue.status}</p>
                                            <p><span className="font-semibold text-gray-800">Created At:</span> {new Date(issue.createdAt).toLocaleString()}</p>
                                            <p><span className="font-semibold text-gray-800">Updated At:</span> {new Date(issue.updatedAt).toLocaleString()}</p>
                                            <p>
                                                <span className="font-semibold text-gray-800">Assigned To:</span>{" "}
                                                {issue.assignedTo
                                                    ? issue.assignedTo.username
                                                    : "Unassigned"}
                                            </p>
                                            <p>
                                                <span className="font-semibold text-gray-800">Created By:</span>{" "}
                                                {issue.createdBy
                                                    ? issue.createdBy.username
                                                    : "N/A"}
                                            </p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                )}

                <div className="mt-8 text-center">
                    <button
                        onClick={() => navigate("/admin-dashboard")}
                        className="text-indigo-500 hover:underline"
                    >
                        🔙 Back to Dashboard
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ViewIssues;
