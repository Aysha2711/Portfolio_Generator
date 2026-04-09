import React, { createContext, useState } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = sessionStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const apiUrl = `${API_URL}/api/auth`;

  const login = async (email, password) => {
    const res = await axios.post(`${apiUrl}/login`, { email, password });
    if (res.data) {
      sessionStorage.setItem('user', JSON.stringify(res.data));
      setUser(res.data);
      return res.data;
    }
  };

  const register = async (email, password) => {
    const res = await axios.post(`${apiUrl}/register`, { email, password });
    if (res.data) {
      sessionStorage.setItem('user', JSON.stringify(res.data));
      setUser(res.data);
      return res.data;
    }
  };

  const logout = () => {
    sessionStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
