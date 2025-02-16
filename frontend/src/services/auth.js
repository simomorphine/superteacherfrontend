import API, { setAuthToken } from './api';

// Login function: sends user credentials to the API and sets the token on success.
export const login = async (email, password) => {
    try {
        const response = await API.post('/auth/login', { email, password });
        const { token, user } = response.data;
        setAuthToken(token);
        return { token, user };
    } catch (error) {
        throw error;
    }
};

// Register function: sends new user data to the API and sets the token on success.
export const register = async (username, email, password) => {
    try {
        const response = await API.post('/auth/register', { username, email, password });
        const { token, user } = response.data;
        setAuthToken(token);
        return { token, user };
    } catch (error) {
        throw error;
    }
};

// Logout function: clears the authorization token.
export const logout = () => {
    setAuthToken(null);
};