import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // In-memory user state only - resets naturally on page refresh / new session
  const [currentUser, setCurrentUser] = useState(null);

  // Clean up any old profile keys from previous builds so fresh sessions are never restored
  useEffect(() => {
    try {
      localStorage.removeItem('acaderix_current_profile');
    } catch (e) {
      // Ignore if localStorage unavailable
    }
  }, []);

  /**
   * Temporary in-memory login for current session only
   * @param {Object} profile - { role, fullName, rollNumber/teacherId, instituteName, mobileNumber }
   */
  const loginProfile = (profile) => {
    setCurrentUser({
      ...profile,
      registeredAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });
  };

  /**
   * Log out and return to role selection
   */
  const logout = () => {
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        role: currentUser?.role || null,
        isAuthenticated: Boolean(currentUser),
        loginProfile,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
