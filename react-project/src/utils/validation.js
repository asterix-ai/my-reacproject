export const isValidEmail = (email) => {
  // Basic email regex for client-side validation
  return /^[^s@]+@[^s@]+\.[^s@]+$/.test(email);
};

export const isValidPassword = (password) => {
  // Password should be at least 6 characters (Firebase default minimum)
  return password.length >= 6;
};
