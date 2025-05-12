import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../contextapi/AuthContext";
import config from '../config'
const AdminProfile = () => {
  const { admin } = useAuth(); // get logged-in admin from AuthContext
  const [adminData, setAdminData] = useState({
    username: "",
    name: "",
    email: "",
    phone: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (admin?.username) {
      setLoading(true);
     
axios.get(`${config.url}/api/admin/${admin.username}`)
        .then(res => {
          setAdminData(res.data);
          setError(null);
        })
        .catch(err => {
          console.error("Error fetching admin:", err);
          setError("Failed to load profile information");
        })
        .finally(() => setLoading(false));
    }
  }, [admin]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdminData(prev => ({ ...prev, [name]: value }));
    // Clear any existing success/error messages when user edits
    setSuccess(false);
    setError(null);
  };

  const validateForm = () => {
    // Basic validation
    if (!adminData.email || !adminData.email.includes('@')) {
      setError("Please enter a valid email address");
      return false;
    }
    if (!adminData.name) {
      setError("Name is required");
      return false;
    }
    if (!adminData.username) {
      setError("Username is required");
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setLoading(true);
    setError(null);
    setSuccess(false);

    // Prepare data - remove password if it's empty (user didn't change it)
    const updatedData = { ...adminData };
    if (!updatedData.password) {
      delete updatedData.password;
    }

    axios.put(`${config.url}/api/admin/updateprofile`, updatedData, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(() => {
        setSuccess(true);
        if (updatedData.password) {
          // Clear password field after successful update
          setAdminData(prev => ({ ...prev, password: "" }));
        }
      })
      .catch(err => {
        console.error("Error updating profile:", err);
        // More specific error message based on status code or response
        if (err.response?.data?.message) {
          setError(err.response.data.message);
        } else if (err.response?.status === 400) {
          setError("Invalid profile data. Please check your information and try again.");
        } else {
          setError("Failed to update profile. Please try again later.");
        }
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Admin Profile</h1>
      
      {loading && <p className="text-blue-500">Loading...</p>}
      
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
          <p>{error}</p>
        </div>
      )}
      
      {success && (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4" role="alert">
          <p>Profile updated successfully!</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Username
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            id="username"
            type="text"
            name="username"
            value={adminData.username}
            onChange={handleChange}
            disabled={loading}
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Full Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            id="name"
            type="text"
            name="name"
            value={adminData.name}
            onChange={handleChange}
            disabled={loading}
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            id="email"
            type="email"
            name="email"
            value={adminData.email}
            onChange={handleChange}
            disabled={loading}
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
            Phone
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            id="phone"
            type="tel"
            name="phone"
            value={adminData.phone}
            onChange={handleChange}
            disabled={loading}
          />
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            New Password (leave blank to keep current)
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3"
            id="password"
            type="password"
            name="password"
            value={adminData.password}
            onChange={handleChange}
            disabled={loading}
            placeholder="Leave blank to keep current password"
          />
        </div>
        
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Profile"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminProfile;