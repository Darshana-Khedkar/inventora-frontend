import React, { useEffect, useState } from 'react';
import API from '../utils/axiosInstance';
import { useSelector, useDispatch } from 'react-redux';
import { register } from '../redux/slices/authSlice'; // reuse register reducer to update localStorage token (or create separate action)
import { toast } from 'react-toastify';

const Profile = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = userInfo?.token;
        const { data } = await API.get('/users/profile', { headers: { Authorization: `Bearer ${token}` } });
        setForm({ name: data.name, email: data.email, password: '' });
      } catch (err) {
        toast.error('Failed to load profile');
      }
    };
    if (userInfo) fetchProfile();
  }, [userInfo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = userInfo?.token;
      const payload = { name: form.name, email: form.email };
      if (form.password) payload.password = form.password;

      const { data } = await API.put('/users/profile', payload, { headers: { Authorization: `Bearer ${token}` } });
      // update localStorage userInfo
      localStorage.setItem('userInfo', JSON.stringify(data));
      toast.success('Profile updated');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Update failed');
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">My Profile</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input className="w-full border p-2 rounded" placeholder="Name" value={form.name} onChange={(e)=>setForm({...form, name: e.target.value})} />
        <input className="w-full border p-2 rounded" placeholder="Email" value={form.email} onChange={(e)=>setForm({...form, email: e.target.value})} />
        <input type="password" className="w-full border p-2 rounded" placeholder="New password (leave blank to keep)" value={form.password} onChange={(e)=>setForm({...form, password: e.target.value})} />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Update Profile</button>
      </form>
    </div>
  );
};

export default Profile;
