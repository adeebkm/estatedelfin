import React, { createContext, useContext, useReducer, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

// Create AuthContext
const AuthContext = createContext();

// API base URL - dynamic for development vs production
const isVercel = window.location.hostname.includes('vercel.app') || 
                 window.location.hostname.includes('vercel.dev') ||
                 process.env.NODE_ENV === 'production';

const API_URL = process.env.REACT_APP_API_URL || 
  (isVercel ? '/api' : 'http://localhost:5001/api');

console.log('🔧 AuthContext: Environment:', process.env.NODE_ENV);
console.log('🔧 AuthContext: Hostname:', window.location.hostname);
console.log('🔧 AuthContext: isVercel:', isVercel);
console.log('🔧 AuthContext: REACT_APP_API_URL:', process.env.REACT_APP_API_URL);
console.log('🔧 AuthContext: Final API_URL:', API_URL);

// Configure axios
axios.defaults.baseURL = API_URL;
axios.defaults.headers.common['Content-Type'] = 'application/json';

console.log('📡 AuthContext: Axios configured with baseURL:', axios.defaults.baseURL);

// Initial state
const initialState = {
  user: null,
  token: localStorage.getItem('token') || null,
  loading: false,
  isAuthenticated: false,
  tempUserId: null, // For OTP verification
  pendingVerification: false
};

// Auth reducer
const authReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        loading: false,
        tempUserId: null,
        pendingVerification: false
      };
    
    case 'REGISTER_SUCCESS':
      return {
        ...state,
        tempUserId: action.payload.userId,
        pendingVerification: true,
        loading: false
      };
    
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        tempUserId: null,
        pendingVerification: false
      };
    
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true
      };
    
    case 'VERIFICATION_PENDING':
      return {
        ...state,
        tempUserId: action.payload.userId,
        pendingVerification: true,
        loading: false
      };
    
    default:
      return state;
  }
};

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Set token in axios headers
  useEffect(() => {
    if (state.token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${state.token}`;
      localStorage.setItem('token', state.token);
    } else {
      delete axios.defaults.headers.common['Authorization'];
      localStorage.removeItem('token');
    }
  }, [state.token]);

  // Load user on app start
  useEffect(() => {
    const loadUser = async () => {
      if (state.token) {
        try {
          console.log('🔍 AuthContext: Attempting to load user profile...');
          console.log('🔑 AuthContext: Token exists:', state.token ? 'Yes' : 'No');
          
          // Add a small delay to prevent immediate logout after login
          await new Promise(resolve => setTimeout(resolve, 100));
          
          const response = await axios.get('/auth/profile');
          console.log('✅ AuthContext: User profile loaded successfully');
          dispatch({
            type: 'SET_USER',
            payload: response.data.user
          });
        } catch (error) {
          console.error('❌ AuthContext: Error loading user:', error);
          
          if (error.response?.status === 401) {
            console.log('🔑 AuthContext: Token invalid/expired - clearing and logging out');
            localStorage.removeItem('token');
            dispatch({ type: 'LOGOUT' });
          } else {
            console.error('❌ AuthContext: Other error:', error.response?.status, error.message);
            // Don't logout for network errors, just log the error
            console.log('🔄 AuthContext: Network error - not logging out automatically');
          }
        }
      } else {
        console.log('🔍 AuthContext: No token found, skipping user load');
      }
    };

    // Only load user if we have a token and no user is already loaded
    if (state.token && !state.user) {
      loadUser();
    }
  }, [state.token, state.user]);

  // Register user
  const register = async (userData) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      const response = await axios.post('/auth/register', userData);
      
      if (response.data.requiresVerification) {
        dispatch({
          type: 'REGISTER_SUCCESS',
          payload: { userId: response.data.userId }
        });
        toast.success('Registration successful! Please verify your email with the OTP sent.');
        return { success: true, requiresVerification: true };
      }
      
      return { success: true };
    } catch (error) {
      dispatch({ type: 'SET_LOADING', payload: false });
      const message = error.response?.data?.message || 'Registration failed';
      toast.error(message);
      return { success: false, message };
    }
  };

  // Login user
  const login = async (credentials) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      const response = await axios.post('/auth/login', credentials);
      
      if (response.data.requiresVerification) {
        dispatch({
          type: 'VERIFICATION_PENDING',
          payload: { userId: response.data.userId }
        });
        toast.info('Please verify your email with the OTP sent.');
        return { success: true, requiresVerification: true };
      }
      
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: {
          user: response.data.user,
          token: response.data.token
        }
      });
      
      toast.success('Login successful!');
      return { success: true };
    } catch (error) {
      dispatch({ type: 'SET_LOADING', payload: false });
      const message = error.response?.data?.message || 'Login failed';
      toast.error(message);
      return { success: false, message };
    }
  };

  // Admin login
  const adminLogin = async (credentials) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      // For demo purposes, accept hardcoded admin credentials
      if (credentials.email === 'admin@estatedeli.com' && credentials.password === 'admin123') {
        const adminUser = {
          name: 'Admin',
          email: 'admin@estatedeli.com',
          role: 'admin'
        };
        
        const fakeToken = 'admin-token-' + Date.now();
        
        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: {
            user: adminUser,
            token: fakeToken
          }
        });
        
        return { success: true };
      }
      
      // Try actual API call
      const response = await axios.post('/admin/login', credentials);
      
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: {
          user: response.data.user,
          token: response.data.token
        }
      });
      
      return { success: true };
    } catch (error) {
      dispatch({ type: 'SET_LOADING', payload: false });
      const message = error.response?.data?.message || 'Admin login failed';
      return { success: false, message };
    }
  };

  // Verify OTP
  const verifyOTP = async (otp) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      const response = await axios.post('/auth/verify-otp', {
        userId: state.tempUserId,
        otp
      });
      
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: {
          user: response.data.user,
          token: response.data.token
        }
      });
      
      toast.success('Email verified successfully!');
      return { success: true };
    } catch (error) {
      dispatch({ type: 'SET_LOADING', payload: false });
      const message = error.response?.data?.message || 'OTP verification failed';
      toast.error(message);
      return { success: false, message };
    }
  };

  // Resend OTP
  const resendOTP = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      await axios.post('/auth/resend-otp', {
        userId: state.tempUserId
      });
      
      dispatch({ type: 'SET_LOADING', payload: false });
      toast.success('OTP resent successfully!');
      return { success: true };
    } catch (error) {
      dispatch({ type: 'SET_LOADING', payload: false });
      const message = error.response?.data?.message || 'Failed to resend OTP';
      toast.error(message);
      return { success: false, message };
    }
  };

  // Logout
  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    toast.success('Logged out successfully!');
  };

  // Update profile
  const updateProfile = async (profileData) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      const response = await axios.put('/auth/profile', profileData);
      
      dispatch({
        type: 'SET_USER',
        payload: response.data.user
      });
      
      dispatch({ type: 'SET_LOADING', payload: false });
      toast.success('Profile updated successfully!');
      return { success: true };
    } catch (error) {
      dispatch({ type: 'SET_LOADING', payload: false });
      const message = error.response?.data?.message || 'Profile update failed';
      toast.error(message);
      return { success: false, message };
    }
  };

  const value = {
    user: state.user,
    token: state.token,
    loading: state.loading,
    isAuthenticated: state.isAuthenticated,
    tempUserId: state.tempUserId,
    pendingVerification: state.pendingVerification,
    register,
    login,
    adminLogin,
    logout,
    verifyOTP,
    resendOTP,
    updateProfile
  };

  return (
    <AuthContext.Provider value={{
      user: state.user,
      token: state.token,
      isAuthenticated: state.isAuthenticated,
      loading: state.loading,
      tempUserId: state.tempUserId,
      pendingVerification: state.pendingVerification,
      register,
      login,
      adminLogin,
      logout,
      verifyOTP,
      resendOTP
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext; 