// import api from './api';

/**
 * Auth service — currently mocked, ready for backend integration.
 *
 * When backend is ready, uncomment the api import and replace
 * the mock implementations with real API calls.
 */
const authService = {
  /**
   * Login with email, password, and role.
   * TODO: Replace with `api.post('/auth/login', { email, password, role })`
   */
  async login(email, password, role = 'Patient') {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 900));

    const username = email.split('@')[0];
    
    return {
      name: username.charAt(0).toUpperCase() + username.slice(1),
      email,
      role,
      joined: new Date().toLocaleDateString('en-IN', { month: 'long', year: 'numeric' }),
      avatar: username.charAt(0).toUpperCase(),
    };
  },

  /**
   * Register a new user.
   * TODO: Replace with `api.post('/auth/register', { name, email, password, role })`
   */
  async register(name, email, password, role = 'Patient') {
    await new Promise((resolve) => setTimeout(resolve, 900));

    return {
      name,
      email,
      role,
      joined: new Date().toLocaleDateString('en-IN', { month: 'long', year: 'numeric' }),
      avatar: name.charAt(0).toUpperCase(),
    };
  },
};

export default authService;
