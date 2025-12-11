import React, { useState } from 'react';
import { login, me } from '../services/auth';
import { useNavigate, useLocation } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const mode = params.get('mode') || 'user';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      const user = await me();

      if (mode === 'admin') {
        if (user.role === 'admin') {
          navigate('/admin');
        } else {
          setError('You are not authorized as admin.');
        }
      } else {
        navigate('/home'); // ✅ redirect to home instead of products
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 360, margin: '40px auto', padding: '0 16px' }}>
      {/* ✅ Back button */}
      <button
        onClick={() => navigate('/')}
        style={{
          backgroundColor: '#1F2937',
          color: '#fff',
          border: 'none',
          padding: '6px 12px',
          borderRadius: '6px',
          marginBottom: '24px',
          cursor: 'pointer',
        }}
      >
        ← Back
      </button>

      <h3 style={{ textAlign: 'center', marginBottom: '24px' }}>
        {mode === 'admin' ? 'Admin Login' : 'User Login'}
      </h3>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <label style={{ textAlign: 'left' }}>Email</label>
        <input
          type="email"
          value={email}
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }}
        />

        <label style={{ textAlign: 'left' }}>Password</label>
        <input
          type="password"
          value={password}
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }}
        />

        <button
          type="submit"
          disabled={loading}
          style={{
            backgroundColor: '#EF4444',
            color: '#fff',
            border: 'none',
            padding: '10px',
            borderRadius: '6px',
            cursor: 'pointer',
            marginTop: '12px',
          }}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      {error && <p style={{ color: 'red', marginTop: '12px', textAlign: 'center' }}>{error}</p>}
    </div>
  );
};

export default Login;
