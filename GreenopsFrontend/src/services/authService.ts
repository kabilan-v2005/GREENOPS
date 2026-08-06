import api from './api';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  userName: string;
  email: string;
  password: string;
  phoneNumber: string;
  district: string;
}

export interface AuthResponse {
  token: string;
  user?: {
    userId: string;
    userName: string;
    email: string;
  };
}

export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
}

class AuthService {
  /**
   * Login user with email and password
   * @param email User email
   * @param password User password
   * @returns Token and user data
   */
  async loginUser(email: string, password: string): Promise<AuthResponse> {
    try {
      const response = await api.post<AuthResponse>('/auth/login', {
        email,
        password,
      });
      
      // Store token in localStorage
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        if (response.data.user) {
          localStorage.setItem('user', JSON.stringify(response.data.user));
        }
      }
      
      return response.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Login failed. Please try again.';
      throw new Error(errorMessage);
    }
  }

  /**
   * Register new user
   * @param userData User registration data
   * @returns Token and user data
   */
  async registerUser(userData: RegisterRequest): Promise<AuthResponse> {
    try {
      const response = await api.post<AuthResponse>('/auth/register', userData);
      
      // Store token in localStorage
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        if (response.data.user) {
          localStorage.setItem('user', JSON.stringify(response.data.user));
        }
      }
      
      return response.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Registration failed. Please try again.';
      throw new Error(errorMessage);
    }
  }

  /**
   * Logout user by removing token and user data
   */
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  /**
   * Check if user is authenticated
   * @returns True if token exists
   */
  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  /**
   * Get current user from localStorage
   * @returns User data or null
   */
  getCurrentUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  /**
   * Get token from localStorage
   * @returns Token or null
   */
  getToken(): string | null {
    return localStorage.getItem('token');
  }
}

export default new AuthService();

export const loginUser = async (data: any) => {
  const res = await api.post('/auth/login', data);
  return res.data;
};

export const registerUser = async (data: any) => {
  const res = await api.post('/auth/register', data);
  return res.data;
};