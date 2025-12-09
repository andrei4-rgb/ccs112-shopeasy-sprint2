import React, { useEffect, useState } from 'react';
import { me } from '../services/auth';

const AdminGuard = ({ children, fallback }) => {
  const [loading, setLoading] = useState(true);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    let mounted = true;
    me()
      .then((user) => {
        if (mounted) setAllowed(user?.role === 'admin');
      })
      .catch(() => {
        if (mounted) setAllowed(false);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => (mounted = false);
  }, []);

  if (loading) return <p>Checking access...</p>;
  if (!allowed) return fallback || <p>Unauthorized</p>;
  return children;
};

export default AdminGuard;
