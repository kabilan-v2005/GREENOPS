# GreenOps Frontend - Complete Authentication Guide

## 📋 Overview

This guide provides a complete working authentication system for the GreenOps React TypeScript frontend integrated with a .NET 8 Web API backend.

---

## 🔧 Setup & Configuration

### 1. **Backend API Endpoint**
- Base URL: `https://localhost:7024/api`
- Login: `POST /api/auth/login`
- Register: `POST /api/auth/register`

### 2. **Project Dependencies**
Ensure these are installed in `package.json`:
```json
{
  "dependencies": {
    "axios": "^1.13.6",
    "react": "^19.2.4",
    "react-router-dom": "^7.13.1",
    "lucide-react": "^0.577.0"
  }
}
```

### 3. **Environment Setup**
The axios instance is configured in `src/services/api.ts` with:
- Automatic JWT token attachment from localStorage
- Proper headers and base URL
- Error handling interceptors

---

## 📁 File Structure

```
src/
├── services/
│   ├── api.ts              # Axios configuration with interceptors
│   └── authService.ts      # Authentication API calls
├── pages/
│   ├── Login.tsx           # Login page with JWT integration
│   ├── Register.tsx        # Registration page
│   └── Dashboard.tsx       # Protected dashboard
├── components/
│   ├── Navbar.tsx          # Navigation with logout
│   ├── ProtectedRoute.tsx  # Route protection component
│   └── ui/
│       ├── Button.tsx
│       ├── Card.tsx
│       └── Input.tsx
├── types/
│   └── index.ts            # TypeScript interfaces
└── App.tsx                 # Main routing configuration
```

---

## 🔐 Authentication Service (`authService.ts`)

### Key Methods:

#### **1. `loginUser(email: string, password: string)`**
```typescript
try {
  const response = await authService.loginUser('user@example.com', 'password123');
  // Token is automatically stored in localStorage
  console.log(response.user); // User data
} catch (error) {
  console.error(error.message); // Error handling
}
```

#### **2. `registerUser(userData: RegisterRequest)`**
```typescript
const newUser = {
  userName: 'John Doe',
  email: 'john@example.com',
  password: 'SecurePass123',
  phoneNumber: '+1 (555) 000-0000',
  district: 'Downtown'
};

try {
  await authService.registerUser(newUser);
  // User is created and logged in automatically
} catch (error) {
  console.error(error.message);
}
```

#### **3. `logout()`**
```typescript
authService.logout(); // Clears token and user data
```

#### **4. `isAuthenticated()`**
```typescript
if (authService.isAuthenticated()) {
  // User has valid token
}
```

#### **5. `getCurrentUser()`**
```typescript
const user = authService.getCurrentUser();
console.log(user); // { userId, userName, email }
```

#### **6. `getToken()`**
```typescript
const token = authService.getToken();
// Token is automatically used in API requests
```

---

## 🔑 Login Page Features

### Functionality:
- ✅ Email and password validation
- ✅ Error messages display
- ✅ Loading state during API call
- ✅ Remember me functionality
- ✅ Redirect to dashboard on success
- ✅ Clear password on error
- ✅ Password auto-clear for security

### Component Location:
[src/pages/Login.tsx](src/pages/Login.tsx)

### Usage:
```tsx
import Login from './pages/Login';

// Automatically handled in routing
<Route path="/login" element={<Login />} />
```

---

## 📝 Register Page Features

### Form Fields:
- **Full Name** (userName)
- **Email Address**
- **Password** (with strength indicator)
- **Confirm Password**
- **Phone Number**
- **District**

### Validation:
- Email format validation
- Password strength checker (weak/medium/strong)
- Password confirmation match
- Required fields validation

### Component Location:
[src/pages/Register.tsx](src/pages/Register.tsx)

### Usage:
```tsx
import Register from './pages/Register';

// Automatically handled in routing
<Route path="/register" element={<Register />} />
```

---

## 🛡️ Protected Routes

### ProtectedRoute Component
Prevents unauthorized access to protected pages.

### Location:
[src/components/ProtectedRoute.tsx](src/components/ProtectedRoute.tsx)

### Usage in App.tsx:
```tsx
<Route
  path="/"
  element={
    <ProtectedRoute>
      <MainLayout />
    </ProtectedRoute>
  }
>
  {/* Protected routes */}
</Route>
```

### Behavior:
- ✅ Checks if user has valid token
- ✅ Redirects to `/login` if not authenticated
- ✅ Renders protected component if authenticated

---

## 🔄 Routing Configuration

### Public Routes:
- `/login` → Login Page
- `/register` → Register Page

### Protected Routes (Require Authentication):
- `/` → Dashboard (MainLayout wrapper)
- `/dashboard` → Dashboard
- `/complaints` → Complaints page
- `/feedback` → Feedback page
- `/reports` → Reports page
- `/resale` → Resale page
- `/my-orders` → My Orders page
- `/my-listings` → My Listings page

### Fallback:
- `*` (any unknown route) → Redirects to `/login`

### Configuration:
[src/App.tsx](src/App.tsx)

---

## 💾 Token Storage

### localStorage Keys:
| Key | Content | Type |
|-----|---------|------|
| `token` | JWT authentication token | string |
| `user` | User data object | JSON string |
| `rememberEmail` | Email for "Remember me" | string |

### Automatic Management:
- Token is **automatically attached** to all API requests
- Token is **automatically cleared** on logout
- User data is **persisted** for display purposes

---

## 🌐 API Interceptor Setup

The axios interceptor in `api.ts` automatically:
1. ✅ Adds Authorization header: `Bearer {token}`
2. ✅ Handles request/response errors
3. ✅ Manages token lifecycle

### Code:
```typescript
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});
```

---

## 🎨 UI Components Used

### Built-in Components:
- **Button** - Primary action button with loading state
- **Card** - Form container
- **Input** - Text input with icons and labels

### Icons (from lucide-react):
- `Mail`, `Lock` - Form field icons
- `User`, `Phone`, `MapPin` - Additional form icons
- `AlertCircle`, `Check` - Status indicators
- `LogOut` - Logout button
- `Bell` - Notifications

---

## 📋 Type Definitions

### Key Types in `src/types/index.ts`:

```typescript
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
```

---

## 🚀 Usage Examples

### Example 1: Manual Login Call
```typescript
import authService from '../services/authService';

async function myLoginFunction() {
  try {
    const response = await authService.loginUser(
      'user@example.com',
      'password123'
    );
    console.log('Logged in as:', response.user?.userName);
  } catch (error: any) {
    console.error('Login error:', error.message);
  }
}
```

### Example 2: Check if User is Authenticated
```typescript
import authService from '../services/authService';

function MyComponent() {
  if (!authService.isAuthenticated()) {
    return <Navigate to="/login" />;
  }
  
  const user = authService.getCurrentUser();
  return <div>Welcome, {user.userName}!</div>;
}
```

### Example 3: Logout from Navbar
```typescript
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';

function LogoutButton() {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    authService.logout();
    navigate('/login', { replace: true });
  };
  
  return <button onClick={handleLogout}>Logout</button>;
}
```

---

## ✅ Error Handling

### Login Errors:
```
❌ Email and password are required
❌ Invalid email format
❌ Login failed. Please try again.
```

### Register Errors:
```
❌ Name is required
❌ Email is required
❌ Invalid email format
❌ Password must be at least 6 characters
❌ Passwords do not match
❌ Phone number is required
❌ District is required
❌ Registration failed. Please try again.
```

### API Error Handling:
All errors from the backend are caught and displayed to the user with appropriate messages.

---

## 🔍 Password Strength Indicator

### Strength Levels:
| Level | Criteria | Color |
|-------|----------|-------|
| **Weak** | Less than 6 characters | 🔴 Red |
| **Medium** | 6-8 characters | 🟡 Yellow |
| **Strong** | 8+ characters with uppercase + numbers | 🟢 Green |

### Implementation:
Located in Register.tsx with visual progress bars and text indicators.

---

## 🎯 Best Practices Implemented

✅ **Security**
- JWT token storage in localStorage
- Automatic token attachment to requests
- Secure password storage (hashed on backend)
- Protected routes with authentication checks

✅ **User Experience**
- Loading states during API calls
- Clear error messages
- Form validation before submission
- "Remember me" functionality
- Password strength indicators
- Smooth transitions and redirects

✅ **Code Quality**
- TypeScript for type safety
- Modular service-based architecture
- Reusable components
- Proper error handling
- Clean, readable code
- Comprehensive documentation

✅ **Performance**
- Lazy loading with route protection
- Efficient state management
- Minimal re-renders
- Optimized form handling

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Update Backend URL
If your backend runs on a different URL, update `src/services/api.ts`:
```typescript
const api = axios.create({
  baseURL: 'YOUR_BACKEND_URL/api',
  headers: {
    'Content-Type': 'application/json',
  },
});
```

### 3. Run Development Server
```bash
npm run dev
```

### 4. Test Authentication
- Navigate to `http://localhost:5173/login`
- Try registering a new account
- Login with the created credentials
- Navigate to protected routes
- Click logout from navbar dropdown

---

## 📞 Support

For questions or issues with the authentication system:
1. Check error messages in the console
2. Verify backend API is running at correct URL
3. Ensure JWT token structure matches expected format
4. Check that all required fields are provided

---

## 📚 Additional Resources

- [React Router Documentation](https://reactrouter.com/)
- [Axios Documentation](https://axios-http.com/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Lucide Icons](https://lucide.dev/)

---

**Last Updated:** May 1, 2026
**Version:** 1.0.0
