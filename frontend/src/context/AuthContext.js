import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // Authentication state
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    // Function to log in the user
    const login = (userData, authToken) => {
        setIsAuthenticated(true);
        setUser(userData);
        setToken(authToken);
    };

    // Function to log out the user
    const logout = () => {
        setIsAuthenticated(false);
        setUser(null);
        setToken(null);
    };

    const value = {
        isAuthenticated,
        user,
        token,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;