/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:3000/api/v1/authentication/login";

// Data Display Component
const DataList = ({ data }) => (
  <div>
    <h3 className="text-xl font-bold mb-4">Data List</h3>
    <ul className="list-disc pl-5">
      {data.map((item) => (
        <li key={item.id} className="mb-2">
          {item.name} - {item.description}
        </li>
      ))}
    </ul>
  </div>
);

export const UserDashboard = () => {
  const [data, setData] = useState([]);

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

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">User Dashboard</h2>
      <DataList data={data} />
    </div>
  );
};