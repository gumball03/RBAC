import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:3000/api/v1/items";

export const AdminDashboard = () => {
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({ name: "", description: "" });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_URL);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCreate = async () => {
    try {
      const response = await axios.post(API_URL, formData);
      setData([...data, response.data]);
      setFormData({ name: "", description: "" });
    } catch (error) {
      console.error("Error creating data:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setData(data.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const handleUpdate = async (id, updatedItem) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, updatedItem);
      setData(data.map((item) => (item.id === id ? response.data : item)));
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>

      {/* Add New Item Form */}
      <div className="mb-6">
        <h3 className="text-xl font-bold mb-2">Add New Item</h3>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleInputChange}
          className="border rounded p-2 mb-2 w-full"
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleInputChange}
          className="border rounded p-2 mb-2 w-full"
        />
        <button
          onClick={handleCreate}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Item
        </button>
      </div>

      {/* Display and Manage Data */}
      <h3 className="text-xl font-bold mb-4">Manage Items</h3>
      <ul className="list-disc pl-5">
        {data.map((item) => (
          <li key={item.id} className="mb-2">
            <span>{item.name} - {item.description}</span>
            <button
              onClick={() => handleDelete(item.id)}
              className="ml-4 bg-red-500 text-white px-2 py-1 rounded"
            >
              Delete
            </button>
            <button
              onClick={() =>
                handleUpdate(item.id, {
                  name: prompt("Enter new name:", item.name) || item.name,
                  description:
                    prompt("Enter new description:", item.description) ||
                    item.description,
                })
              }
              className="ml-2 bg-yellow-500 text-white px-2 py-1 rounded"
            >
              Edit
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};