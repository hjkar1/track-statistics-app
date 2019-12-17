// Get token from local storage and add to authorization header.

export const getAuthHeader = () => {
  const token = window.localStorage.getItem('authToken');

  if (token) {
    return { Authorization: `Bearer ${token}` };
  }

  return null;
};
