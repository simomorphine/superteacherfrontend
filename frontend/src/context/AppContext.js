import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    // Global states that you want to share across the app
    const [user, setUser] = useState(null);
    const [theme, setTheme] = useState('light');

    const value = {
        user,
        setUser,
        theme,
        setTheme,
        // Add more global methods or states here as needed.
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};

export default AppContext;