export const signup = async (email, password) => {
    try {
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
  
      // Get existing users from localStorage
      const users = JSON.parse(localStorage.getItem('users')) || [];
  
      // Check if the email already exists
      const userExists = users.some((user) => user.email === email);
  
      if (userExists) {
        throw new Error('Email already in use. Please use a different email.');
      }
  
      // Add new user to the users array
      users.push({ email, password });
  
      // Save the updated users list back to localStorage
      localStorage.setItem('users', JSON.stringify(users));
  
      // Create a mock token (replace this with real authentication logic)
      const mockToken = 'mock-signup-token-12345';
  
      console.log('Sign up successful, token:', mockToken); // Debugging log
  
      // Return success response with the mock token
      return {
        status: 200,
        message: 'Sign up successful',
        token: mockToken, // Mock token for demo
      };
    } catch (error) {
      console.error('Error in signup:', error); // Log any errors
      throw error; // Rethrow the error for handling by the caller
    }
  };
  
  // Mock signin function to log in an existing user
  export const signin = async (email, password) => {
    try {
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
  
      // Get existing users from localStorage
      const users = JSON.parse(localStorage.getItem('users')) || [];
  
      // Find the user by email
      const user = users.find((user) => user.email === email);
  
      if (!user) {
        console.log('User not found:', email); // Debugging log
        throw new Error('Email not registered. Please sign up first.');
      }
  
      // Check if the password matches
      if (user.password !== password) {
        console.log('Password mismatch for:', email); // Debugging log
        throw new Error('Invalid password. Please try again.');
      }
  
      // If credentials are correct, generate a mock token (replace with real auth logic)
      const mockToken = 'mock-token-12345';
  
      // Store the token in localStorage for demo purposes
      localStorage.setItem('token', mockToken);
  
      console.log('Sign in successful, token:', mockToken); // Debugging log
  
      // Return success response with the mock token
      return {
        status: 200,
        message: 'Sign in successful',
        token: mockToken,
      };
    } catch (error) {
      console.error('Error in signin:', error); // Log any errors
      throw error; // Rethrow the error for handling by the caller
    }
  };  