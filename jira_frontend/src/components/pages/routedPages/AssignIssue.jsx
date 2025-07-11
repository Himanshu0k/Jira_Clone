import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AssignIssue = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState("");
    const [issueId, setIssueId] = useState("");

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get("http://localhost:8081/api/user", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUsers(response.data);
            } catch (error) {
                console.error("Failed to fetch users:", error);
                alert("❌ Error fetching users");
            }
        };
        fetchUsers();
    }, []);

    const handleAssign = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");

            await axios.put(
                `http://localhost:8081/api/issue/${issueId}/assign/${selectedUserId}`,
                {}, // No body
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            alert("✅ Issue assigned successfully!");
            navigate("/admin-dashboard");
        } catch (error) {
            console.error("Failed to assign issue:", error);
            alert("❌ Failed to assign issue");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-10 rounded-3xl shadow-md w-full max-w-md border border-gray-200">
                <h2 className="text-3xl font-bold text-center text-indigo-600 mb-6">
                    🔁 Assign Issue to User
                </h2>

                <form onSubmit={handleAssign} className="space-y-6">
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Issue ID</label>
                        <input
                            type="text"
                            value={issueId}
                            onChange={(e) => setIssueId(e.target.value)}
                            required
                            placeholder="Enter issue ID"
                            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Select User</label>
                        <select
                            value={selectedUserId}
                            onChange={(e) => setSelectedUserId(e.target.value)}
                            required
                            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        >
                            <option value="" disabled>Select a user</option>
                            {users.map((user) => (
                                <option key={user.id} value={user.id}>
                                    {user.name} ({user.email})
                                </option>
                            ))}
                        </select>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition duration-300"
                    >
                        Assign Issue ✅
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

export default AssignIssue;
