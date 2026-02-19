import { useEffect, useState } from "react";
import api from "../../services/api";

const AdminMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const res = await api.get("/contact/");
      setMessages(res.data);

      // 🔔 POPUP LOGIC
      if (res.data.length > 0) {
        const latestId = res.data[0].id; // newest message
        const lastSeenId = localStorage.getItem("last_seen_message_id");

        if (!lastSeenId || Number(lastSeenId) !== latestId) {
          setShowPopup(true);
          localStorage.setItem("last_seen_message_id", latestId);
        }
      }
    } catch (err) {
      console.error("Error fetching messages", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this message?")) return;

    try {
      await api.delete(`/contact/${id}`);
      localStorage.removeItem("last_seen_message_id");
      fetchMessages();
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Messages</h1>

      {/* 🔔 POPUP */}
      {showPopup && (
        <div className="mb-4 p-3 bg-green-100 text-green-800 rounded">
          🔔 New message received!
        </div>
      )}

      {loading ? (
        <p>Loading...</p>
      ) : messages.length === 0 ? (
        <p>No messages found</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 border">ID</th>
                <th className="p-3 border">Name</th>
                <th className="p-3 border">Email</th>
                <th className="p-3 border">Message</th>
                <th className="p-3 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((m) => (
                <tr key={m.id} className="text-center">
                  <td className="p-2 border">{m.id}</td>
                  <td className="p-2 border">{m.name}</td>
                  <td className="p-2 border">{m.email}</td>
                  <td className="p-2 border text-left">{m.message}</td>
                  <td className="p-2 border">
                    <button
                      onClick={() => handleDelete(m.id)}
                      className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminMessages;
