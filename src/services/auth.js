import api, { setAuthToken } from '../api/axios';

export const login = async (email, password) => {
  const res = await api.post('/login', { email, password });
  // Adjust if your backend returns a different key
  const token = res.data.token || res.data.access_token || res.data.data?.token;
  if (!token) throw new Error('No token returned from API');
  setAuthToken(token);
  return res.data;
};

export const logout = async () => {
  await api.post('/logout');
  setAuthToken(null);
};

export const me = async () => {
  const res = await api.get('/me');
  return res.data?.user || res.data;
};
