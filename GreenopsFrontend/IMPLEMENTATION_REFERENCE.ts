// ============================================================================
// GREENOPS AUTHENTICATION - COMPLETE IMPLEMENTATION REFERENCE
// ============================================================================

/**
 * FILE STRUCTURE:
 * ├── src/
 * │   ├── services/
 * │   │   ├── api.ts                 - Axios configuration with JWT interceptor
 * │   │   └── authService.ts         - Authentication API calls
 * │   ├── pages/
 * │   │   ├── Login.tsx              - Login form with JWT integration
 * │   │   ├── Register.tsx           - Registration form with validation
 * │   │   └── Dashboard.tsx          - Protected dashboard page
 * │   ├── components/
 * │   │   ├── Navbar.tsx             - Navigation with logout
 * │   │   ├── ProtectedRoute.tsx     - Route protection wrapper
 * │   │   └── ui/
 * │   │       ├── Button.tsx
 * │   │       ├── Card.tsx
 * │   │       └── Input.tsx
 * │   ├── types/
 * │   │   └── index.ts               - TypeScript interfaces
 * │   └── App.tsx                    - Main routing configuration
 * └── docs/
 *     ├── AUTHENTICATION_GUIDE.md    - Complete documentation
 *     ├── QUICK_START.md             - Quick reference
 *     └── IMPLEMENTATION_CHECKLIST.md- Testing checklist
 */

// ============================================================================
// 1. AUTH SERVICE USAGE
// ============================================================================

import authService from '../services/authService';

/**
 * Example: Login User
 */
export async function exampleLogin() {
  try {
    const response = await authService.loginUser(
      'user@example.com',
      'password123'
    );
    console.log('Login successful:', response.user);
    // Token is automatically stored in localStorage
    // User can now access protected routes
  } catch (error: any) {
    console.error('Login failed:', error.message);
  }
}

/**
 * Example: Register User
 */
export async function exampleRegister() {
  try {
    const userData = {
      userName: 'John Doe',
      email: 'john@example.com',
      password: 'SecurePass123',
      phoneNumber: '+1 (555) 123-4567',
      district: 'Downtown'
    };
    
    const response = await authService.registerUser(userData);
    console.log('Registration successful:', response.user);
    // Token is automatically stored
    // User is automatically logged in
  } catch (error: any) {
    console.error('Registration failed:', error.message);
  }
}

/**
 * Example: Logout User
 */
export function exampleLogout() {
  authService.logout();
  // Token and user data removed from localStorage
  // User should be redirected to login page
}

/**
 * Example: Check Authentication
 */
export function exampleCheckAuth() {
  if (authService.isAuthenticated()) {
    console.log('User is logged in');
  } else {
    console.log('User is not logged in');
  }
}

/**
 * Example: Get Current User
 */
export function exampleGetCurrentUser() {
  const user = authService.getCurrentUser();
  if (user) {
    console.log(`Hello, ${user.userName}!`);
    console.log(`Email: ${user.email}`);
    console.log(`ID: ${user.userId}`);
  }
}

/**
 * Example: Get Token
 */
export function exampleGetToken() {
  const token = authService.getToken();
  if (token) {
    console.log('Token exists (it will be auto-attached to API requests)');
  }
}

// ============================================================================
// 2. REACT COMPONENT EXAMPLES
// ============================================================================

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';

/**
 * Example: Component that checks authentication
 */
export function ProtectedComponent() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!authService.isAuthenticated()) {
      navigate('/login', { replace: true });
    }
  }, [navigate]);

  const user = authService.getCurrentUser();

  return (
    <div>
      <h1>Welcome, {user?.userName}!</h1>
      <p>Email: {user?.email}</p>
      <button onClick={() => {
        authService.logout();
        navigate('/login');
      }}>
        Logout
      </button>
    </div>
  );
}

/**
 * Example: Conditional rendering based on authentication
 */
export function ConditionalComponent() {
  if (authService.isAuthenticated()) {
    return <div>You are logged in!</div>;
  } else {
    return <div>Please log in to continue</div>;
  }
}

/**
 * Example: Manual logout button
 */
export function LogoutButtonExample() {
  const navigate = useNavigate();

  const handleLogout = () => {
    authService.logout();
    navigate('/login', { replace: true });
  };

  return (
    <button onClick={handleLogout} className="px-4 py-2 bg-red-500 text-white rounded">
      Logout
    </button>
  );
}

// ============================================================================
// 3. API CALLS WITH AUTOMATIC TOKEN
// ============================================================================

import api from '../services/api';

/**
 * Example: Make API call with automatic JWT token
 */
export async function fetchUserComplaints() {
  try {
    // Token is automatically attached by the interceptor!
    const response = await api.get('/complaints');
    console.log('Complaints:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('Error fetching complaints:', error.message);
  }
}

/**
 * Example: Post data with automatic token
 */
export async function createComplaint(complaintData: any) {
  try {
    // Token is automatically attached!
    const response = await api.post('/complaints', complaintData);
    console.log('Complaint created:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('Error creating complaint:', error.message);
  }
}

/**
 * Example: Update data with automatic token
 */
export async function updateReport(reportId: string, updateData: any) {
  try {
    // Token is automatically attached!
    const response = await api.put(`/reports/${reportId}`, updateData);
    console.log('Report updated:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('Error updating report:', error.message);
  }
}

/**
 * Example: Delete with automatic token
 */
export async function deleteItem(itemId: string) {
  try {
    // Token is automatically attached!
    const response = await api.delete(`/items/${itemId}`);
    console.log('Item deleted');
    return response.data;
  } catch (error: any) {
    console.error('Error deleting item:', error.message);
  }
}

// ============================================================================
// 4. ROUTING CONFIGURATION
// ============================================================================

/**
 * This is already implemented in src/App.tsx
 * 
 * Structure:
 * - /login              → Public (Login page)
 * - /register           → Public (Register page)
 * - /                   → Protected (MainLayout with sub-routes)
 *   - /dashboard        → Protected (Dashboard)
 *   - /complaints       → Protected (Complaints)
 *   - /feedback         → Protected (Feedback)
 *   - /reports          → Protected (Reports)
 *   - /resale           → Protected (Resale)
 *   - /my-orders        → Protected (My Orders)
 *   - /my-listings      → Protected (My Listings)
 * - *                   → Fallback (Redirects to /login)
 */

// ============================================================================
// 5. LOCAL STORAGE MANAGEMENT
// ============================================================================

/**
 * Keys stored in localStorage:
 * 
 * 'token'        - JWT authentication token (managed by authService)
 * 'user'         - User data JSON (managed by authService)
 * 'rememberEmail'- Email for remember me (managed by Login component)
 */

export function exampleStorageAccess() {
  // Get token
  const token = localStorage.getItem('token');
  console.log('Token:', token);

  // Get user data
  const userJson = localStorage.getItem('user');
  if (userJson) {
    const user = JSON.parse(userJson);
    console.log('User:', user);
  }

  // Get remember email
  const rememberedEmail = localStorage.getItem('rememberEmail');
  console.log('Remembered email:', rememberedEmail);
}

// ============================================================================
// 6. TYPE DEFINITIONS
// ============================================================================

interface AuthUser {
  userId: string;
  userName: string;
  email: string;
  phoneNumber?: string;
  district?: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterFormData {
  userName: string;
  email: string;
  password: string;
  phoneNumber: string;
  district: string;
}

interface AuthResponse {
  token: string;
  user?: AuthUser;
  message?: string;
}

interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
  statusCode?: number;
}

// ============================================================================
// 7. COMMON PATTERNS
// ============================================================================

/**
 * Pattern 1: Protected Page Component
 */
export function ProtectedPagePattern() {
  const navigate = useNavigate();

  useEffect(() => {
    // Check authentication
    if (!authService.isAuthenticated()) {
      navigate('/login', { replace: true });
      return;
    }
  }, [navigate]);

  const user = authService.getCurrentUser();

  return (
    <div>
      <h1>Welcome, {user?.userName}</h1>
      {/* Page content */}
    </div>
  );
}

/**
 * Pattern 2: API Call with Error Handling
 */
export async function ApiCallPattern() {
  try {
    // Make API call (token auto-attached)
    const response = await api.get('/endpoint');
    
    // Handle success
    console.log(response.data);
    return response.data;
  } catch (error: any) {
    // Check if error is due to unauthorized (401)
    if (error.response?.status === 401) {
      // Token might be expired
      authService.logout();
      // Redirect to login handled by ProtectedRoute
    }
    
    // Handle other errors
    const errorMessage = error.response?.data?.message || error.message;
    console.error('Error:', errorMessage);
    throw error;
  }
}

/**
 * Pattern 3: Form Submission with Loading State
 */
export function FormSubmissionPattern() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      // API call here
      const response = await api.post('/endpoint', {});
      console.log('Success:', response.data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="text-red-500">{error}</div>}
      <button disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Submit'}
      </button>
    </form>
  );
}

/**
 * Pattern 4: Conditional Rendering
 */
export function ConditionalRenderingPattern() {
  const isAuthenticated = authService.isAuthenticated();
  const user = authService.getCurrentUser();

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <p>Hello, {user?.userName}</p>
          <button onClick={() => authService.logout()}>Logout</button>
        </div>
      ) : (
        <div>
          <p>Please log in</p>
          <a href="/login">Go to Login</a>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// 8. TESTING SCENARIOS
// ============================================================================

/**
 * Test Scenario 1: New User Registration
 * 1. Click on /register
 * 2. Fill in all fields
 * 3. Check password strength indicator
 * 4. Click "Create Account"
 * 5. Verify redirect to dashboard
 * 6. Check localStorage for token
 * 7. Verify user name in navbar
 */

/**
 * Test Scenario 2: User Login
 * 1. Click on /login
 * 2. Enter email and password
 * 3. Check "Remember me"
 * 4. Click "Sign in"
 * 5. Verify redirect to dashboard
 * 6. Refresh page - should stay on dashboard
 * 7. Check saved email is pre-filled on next login
 */

/**
 * Test Scenario 3: Protected Routes
 * 1. Logout
 * 2. Try to access /dashboard directly
 * 3. Verify redirect to /login
 * 4. Login again
 * 5. Verify access to /dashboard
 */

/**
 * Test Scenario 4: API Calls with Token
 * 1. Login
 * 2. Open DevTools → Network tab
 * 3. Navigate to any page that makes API call
 * 4. Check request headers
 * 5. Verify Authorization: Bearer {token} is present
 */

// ============================================================================
// 9. TROUBLESHOOTING GUIDE
// ============================================================================

/**
 * Issue: "Cannot POST /api/auth/login"
 * Solution: 
 * - Ensure .NET backend is running at https://localhost:7024
 * - Check firewall isn't blocking port 7024
 * - Verify backend has /api/auth/login endpoint
 */

/**
 * Issue: CORS error "No 'Access-Control-Allow-Origin' header"
 * Solution:
 * - Add CORS middleware to .NET backend
 * - Allow origin: http://localhost:5173
 * - Check backend CORS configuration
 */

/**
 * Issue: Token not persisting between page refreshes
 * Solution:
 * - Check localStorage is enabled (F12 → Application → Storage)
 * - Verify token is being saved (authService.loginUser saves it)
 * - Check browser privacy mode isn't blocking localStorage
 */

/**
 * Issue: Logged in but can't access protected routes
 * Solution:
 * - Clear localStorage: localStorage.clear()
 * - Login again
 * - Check ProtectedRoute.tsx is checking authentication
 * - Verify MainLayout is wrapped with ProtectedRoute
 */

/**
 * Issue: Password strength indicator not showing
 * Solution:
 * - Ensure Register.tsx is imported correctly
 * - Check formData.password has value
 * - Verify password state updates on input change
 */

// ============================================================================
// 10. QUICK COMMAND REFERENCE
// ============================================================================

/**
 * Install dependencies:
 * npm install
 * 
 * Run dev server:
 * npm run dev
 * 
 * Build for production:
 * npm run build
 * 
 * Run linter:
 * npm run lint
 * 
 * Clear browser storage:
 * localStorage.clear() in browser console
 * 
 * Check backend status:
 * Open https://localhost:7024 in browser (should work or show error)
 */

// ============================================================================
// END OF REFERENCE FILE
// ============================================================================
