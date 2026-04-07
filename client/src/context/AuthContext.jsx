import React, { createContext, useState } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const apiUrl = 'http://localhost:3000/api/auth'; //  this matches backend URL

  const login = async (email, password) => {
    const res = await axios.post(`${apiUrl}/login`, { email, password });
    if (res.data) {
      localStorage.setItem('user', JSON.stringify(res.data));
      setUser(res.data);
      return res.data;
    }
  };

  const register = async (email, password) => {
    const res = await axios.post(`${apiUrl}/register`, { email, password });
    if (res.data) {
      localStorage.setItem('user', JSON.stringify(res.data));
      setUser(res.data);
      return res.data;
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
