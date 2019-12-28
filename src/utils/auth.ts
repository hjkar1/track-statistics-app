// Get token from local storage and add to authorization header.

export const getAuthHeaderConfig = () => {
  const token = window.localStorage.getItem('authToken');

  if (token) {
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    return config;
  }

  return;
};

export const logout = () => window.localStorage.removeItem('authToken');

export const login = (authToken: string) =>
  window.localStorage.setItem('authToken', authToken);

export const authToken = window.localStorage.getItem('authToken');
