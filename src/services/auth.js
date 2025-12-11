import api, { setAuthToken } from '../api/axios';

// 🔑 Login flow with CSRF + token storage
export const login = async (email, password) => {
  // Step 1: Get CSRF cookie (required by Sanctum)
  await api.get('/sanctum/csrf-cookie');

  // Step 2: Send login request
  const res = await api.post('/api/login', { email, password });

  // Step 3: Extract token (supporting different API response formats)
  const token =
    res.data.access_token ||
    res.data.token ||
    res.data.data?.token;

  if (!token) throw new Error('No token returned from API');

  // Step 4: Save token and attach to future requests
  localStorage.setItem('token', token);
  setAuthToken(token);

  return res.data;
};

// 🚪 Logout flow
export const logout = async () => {
  try {
    await api.post('/api/logout');
  } catch (err) {
    console.warn("Logout API failed, clearing locally anyway:", err);
  }
  localStorage.removeItem('token');
  setAuthToken(null);
};

// 👤 Fetch current user info
export const me = async () => {
  const res = await api.get('/api/me');
  console.log("API /me response:", res.data);
  return res.data.user; // return full user object directly
};
