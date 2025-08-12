import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo, loading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      toast.success('Registration successful!');
      navigate('/dashboard');
    }
  }, [userInfo, navigate]);

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register(formData));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">Register</h2>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          className="w-full border px-3 py-2 rounded"
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full border px-3 py-2 rounded"
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full border px-3 py-2 rounded"
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded w-full"
          disabled={loading}
        >
          {loading ? 'Registering...' : 'Register'}
        </button>

        <p className="text-sm text-center mt-2">
          Already have an account?{' '}
          <a href="/login" className="text-blue-600 underline">
            Login
          </a>
        </p>
      </form>
    </div>
  );
};

export default Register;
