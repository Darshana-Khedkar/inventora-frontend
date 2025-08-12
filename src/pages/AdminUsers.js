import React, { useEffect, useState } from 'react';
import API from '../utils/axiosInstance';
import { toast } from 'react-toastify';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const token = JSON.parse(localStorage.getItem('userInfo'))?.token;
      const { data } = await API.get('/admin/users', { headers: { Authorization: `Bearer ${token}` } });
      setUsers(data);
    } catch (err) {
      toast.error('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this user?')) return;
    try {
      const token = JSON.parse(localStorage.getItem('userInfo'))?.token;
      await API.delete(`/admin/users/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      toast.success('User deleted');
      fetchUsers();
    } catch (err) {
      toast.error('Delete failed');
    }
  };

  const changeRole = async (id, role) => {
    try {
      const token = JSON.parse(localStorage.getItem('userInfo'))?.token;
      await API.put(`/admin/users/${id}`, { role }, { headers: { Authorization: `Bearer ${token}` } });
      toast.success('Role updated');
      fetchUsers();
    } catch (err) {
      toast.error('Update failed');
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Manage Users</h1>
      {loading ? <p>Loading...</p> : (
        <table className="w-full border">
          <thead><tr className="bg-gray-200">
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Role</th>
            <th className="p-2 border">Actions</th>
          </tr></thead>
          <tbody>
            {users.map(u => (
              <tr key={u._id} className="hover:bg-gray-50">
                <td className="p-2 border">{u.name}</td>
                <td className="p-2 border">{u.email}</td>
                <td className="p-2 border">
                  <select value={u.role} onChange={(e)=>changeRole(u._id, e.target.value)} className="border p-1 rounded">
                    <option value="user">user</option>
                    <option value="admin">admin</option>
                  </select>
                </td>
                <td className="p-2 border">
                  <button onClick={()=>handleDelete(u._id)} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminUsers;
