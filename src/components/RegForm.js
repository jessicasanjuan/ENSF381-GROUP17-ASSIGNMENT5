import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function RegForm() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    email: ''
  });
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const validateForm = () => {
    const { username, password, confirmPassword, email } = formData;
    const newErrors = [];

    const usernameRegex = /^[A-Za-z][A-Za-z0-9_-]{2,19}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+\[\]{}|;:'",.<>?/`~]).{8,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.(com|net|io)$/;

    if (!usernameRegex.test(username)) {
      newErrors.push("Invalid username.");
    }
    if (!passwordRegex.test(password)) {
      newErrors.push("Password must be at least 8 characters and include upper, lower, number, and special character.");
    }
    if (password !== confirmPassword) {
      newErrors.push("Passwords do not match.");
    }
    if (!emailRegex.test(email)) {
      newErrors.push("Invalid email format.");
    }

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await axios.post('http://localhost:5000/register', formData);
        navigate('/login');
      } catch (err) {
        if (err.response && err.response.status === 409) {
          setErrors([err.response.data.message]);
        } else {
          setErrors(["Something went wrong. Please try again."]);
        }
      }
    }
  };

  return (
    <div className="reg-form">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <input name="username" placeholder="Username" value={formData.username} onChange={handleChange} />
        <input name="password" type="password" placeholder="Password" value={formData.password} onChange={handleChange} />
        <input name="confirmPassword" type="password" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} />
        <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} />

        <button
          type="submit"
          style={{
            backgroundColor: '#4CAF50',
            padding: '10px',
            borderRadius: '5px',
            margin: '10px',
            opacity: 0.5,
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = '#45A049';
            e.target.style.opacity = 1.0;
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = '#4CAF50';
            e.target.style.opacity = 0.5;
          }}
        >
          Signup
        </button>
      </form>

      {errors.length > 0 && (
        <div style={{ backgroundColor: '#f8d7da', padding: '10px', marginTop: '10px' }}>
          <ul>
            {errors.map((err, idx) => <li key={idx}>{err}</li>)}
          </ul>
        </div>
      )}
    </div>
  );
}

export default RegForm;
