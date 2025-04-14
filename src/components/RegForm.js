import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles.css";

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
    const backendEndpoint = 'http://localhost:5000/register';
    e.preventDefault();
    if (validateForm()) {
      try {
        await fetch(backendEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData),
        })
        .then(response => { return response.json(); })
        .then(data => {
          console.log(data.message);
          navigate('/login');
      })
        
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
    <div className="login-main">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div id="login-form">
          <label for="username">Username:</label>
          <input className='inputfield' id="username" name="username" placeholder="Username" value={formData.username} onChange={handleChange} />
          <label for="password">Password:</label>
          <input className='inputfield' id="password" name="password" type="password" placeholder="Password" value={formData.password} onChange={handleChange} />
          <label for="confirm-password">Confirm Password:</label>
          <input className='inputfield' id="confirm-password" name="confirmPassword" type="password" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} />
          <label for="email">Email:</label>
          <input className='inputfield' id="email" name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} />
          <button type="submit" className='signup-button'>Sign Up</button>
        </div>
        
      </form>

      {errors.length > 0 && (
        <div style={{ backgroundColor: 'white', padding: '10px', marginTop: '10px', border: '1px solid black', textAlign: 'center', width: '90%', marginLeft: '4%' }}>
            {errors.map((err, idx) => <p>{err} </p>)}
        </div>
      )}
      <br></br>
    </div>
  );
}

export default RegForm;