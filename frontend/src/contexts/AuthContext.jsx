import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const stored = localStorage.getItem('kinetic_user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const handleLoginSuccess = (user, token) => {
    setCurrentUser(user);
    localStorage.setItem('kinetic_user', JSON.stringify(user));
    if (token) {
      localStorage.setItem('kinetic_access_token', token);
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('kinetic_user');
    localStorage.removeItem('kinetic_access_token');
  };

  const handleUpdateProfile = (updatedUser) => {
    setCurrentUser(updatedUser);
    localStorage.setItem('kinetic_user', JSON.stringify(updatedUser));
  };

  const value = {
    currentUser,
    handleLoginSuccess,
    handleLogout,
    handleUpdateProfile
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
