# GreenOps Frontend - Complete Authentication System

> A production-ready, full-featured authentication system for React + TypeScript + .NET 8 integration

## 🎯 Quick Overview

This project includes a **complete authentication system** with:
- ✅ User registration with validation
- ✅ Secure JWT-based login
- ✅ Protected routes with automatic redirects
- ✅ Token persistence and management
- ✅ Logout functionality
- ✅ Modern UI with Tailwind CSS
- ✅ Full TypeScript support
- ✅ Comprehensive error handling

---

## 📸 Screenshots

### Login Page
- Email & password input
- Remember me checkbox
- Error alerts
- Loading state
- Gradient background
- Responsive design

### Register Page
- Full name, email, password
- Phone number & district
- Password strength indicator
- Form validation
- Success message
- Responsive design

### Dashboard (Protected)
- Accessible only after login
- User name in navbar
- Logout dropdown menu
- Automatic token attachment to API calls

---

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ and npm
- .NET 8 Web API running at `https://localhost:7024`
- Git (optional)

### Installation

```bash
# 1. Clone or navigate to the project
cd GreenopsFrontend

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

### Backend Setup

Ensure your .NET backend has:
- ✅ `POST /api/auth/login` endpoint
- ✅ `POST /api/auth/register` endpoint
- ✅ CORS enabled for `http://localhost:5173`
- ✅ Users table with fields: UserId, UserName, Email, Password, PhoneNumber, District, CreatedAt

---

## 📁 File Structure

```
src/
├── services/
│   ├── api.ts                    # Axios + JWT interceptor
│   └── authService.ts            # Auth API calls
├── pages/
│   ├── Login.tsx                 # Login page
│   ├── Register.tsx              # Registration page
│   └── Dashboard.tsx             # Protected dashboard
├── components/
│   ├── Navbar.tsx                # Navigation + logout
│   ├── ProtectedRoute.tsx        # Route protection
│   └── ui/
│       ├── Button.tsx
│       ├── Card.tsx
│       └── Input.tsx
├── types/
│   └── index.ts                  # TypeScript interfaces
└── App.tsx                       # Routing configuration

docs/
├── AUTHENTICATION_GUIDE.md       # Complete documentation
├── QUICK_START.md                # Quick reference
├── IMPLEMENTATION_CHECKLIST.md   # Testing checklist
└── COMPLETE_SYSTEM_SUMMARY.md    # System overview
```

---

## 🔐 Authentication Flow

### Registration
```
User fills form → Validation → API call → Token stored → Redirect to dashboard
```

### Login
```
User enters credentials → Validation → API call → Token stored → Redirect to dashboard
```

### Protected Routes
```
Access route → Check token → Token exists? → Yes: Render → No: Redirect to /login
```

---

## 🛠️ Key Features

### 1. Auth Service (`src/services/authService.ts`)

```typescript
// Login
await authService.loginUser('email@example.com', 'password');

// Register
await authService.registerUser({
  userName: 'John Doe',
  email: 'john@example.com',
  password: 'SecurePass123',
  phoneNumber: '+1 (555) 123-4567',
  district: 'Downtown'
});

// Check authentication
authService.isAuthenticated(); // true/false

// Get current user
const user = authService.getCurrentUser();

// Logout
authService.logout();
```

### 2. Protected Routes

```typescript
// Routes wrapped automatically protect them
<Route
  path="/"
  element={
    <ProtectedRoute>
      <MainLayout />
    </ProtectedRoute>
  }
>
  {/* Protected pages */}
</Route>
```

### 3. Automatic Token Attachment

```typescript
// Token automatically added to all requests
const response = await api.get('/complaints');
// Header: Authorization: Bearer {token}
```

---

## 🎨 UI Components

### Login Page Features
- ✅ Email validation
- ✅ Password input
- ✅ Remember me option
- ✅ Error alert display
- ✅ Loading state
- ✅ Forgot password link
- ✅ Link to register

### Register Page Features
- ✅ Full name input
- ✅ Email validation
- ✅ Password strength meter
- ✅ Confirm password
- ✅ Phone number
- ✅ District selection
- ✅ Form validation
- ✅ Success confirmation
- ✅ Link to login

---

## 📋 Usage Examples

### Example 1: Login Component
```typescript
import authService from '../services/authService';

const handleLogin = async (email: string, password: string) => {
  try {
    await authService.loginUser(email, password);
    // Redirects happen automatically
  } catch (error: any) {
    console.error(error.message);
  }
};
```

### Example 2: Check Auth Status
```typescript
if (authService.isAuthenticated()) {
  const user = authService.getCurrentUser();
  console.log(`Welcome, ${user.userName}!`);
}
```

### Example 3: Make API Call with Token
```typescript
import api from '../services/api';

// Token is automatically attached!
const response = await api.get('/complaints');
```

### Example 4: Logout
```typescript
const handleLogout = () => {
  authService.logout();
  navigate('/login', { replace: true });
};
```

---

## 🔑 localStorage Keys

| Key | Purpose | Managed By |
|-----|---------|-----------|
| `token` | JWT authentication token | authService |
| `user` | User data (JSON) | authService |
| `rememberEmail` | Saved email for login | Login page |

---

## 🚦 Routes

### Public Routes
- `/login` - Login page
- `/register` - Registration page

### Protected Routes
- `/` - Dashboard (with MainLayout)
- `/dashboard` - Dashboard page
- `/complaints` - Complaints page
- `/feedback` - Feedback page
- `/reports` - Reports page
- `/resale` - Resale page
- `/my-orders` - Orders page
- `/my-listings` - Listings page

### Fallback
- `*` - Any unknown route redirects to `/login`

---

## 🧪 Testing

### Manual Testing Steps

#### 1. Register New Account
- Navigate to `/register`
- Fill all fields
- Verify password strength indicator
- Click "Create Account"
- Should redirect to dashboard

#### 2. Login
- Navigate to `/login`
- Enter registered email & password
- Check "Remember me"
- Click "Sign in"
- Should redirect to dashboard
- Check navbar shows your name

#### 3. Protected Routes
- Logout
- Try accessing `/dashboard`
- Should redirect to `/login`
- Login again
- Should access `/dashboard`

#### 4. Verify Token
- Open DevTools (F12)
- Go to Application → Storage
- Check `localStorage`
- Verify `token` key exists
- Verify `user` key contains JSON

#### 5. Logout
- Click user icon in navbar
- Click "Logout"
- Should redirect to `/login`
- Check `localStorage` cleared

---

## ⚠️ Common Issues & Solutions

### Issue: "Cannot POST /api/auth/login"
**Cause**: Backend not running  
**Solution**: 
- Start .NET backend: `dotnet run`
- Verify URL: `https://localhost:7024`
- Check firewall settings

### Issue: CORS Error
**Cause**: CORS not configured on backend  
**Solution**:
- Enable CORS in .NET backend
- Allow origin: `http://localhost:5173`

### Issue: Token not persisting
**Cause**: localStorage disabled  
**Solution**:
- Enable localStorage in browser
- Check privacy mode settings
- Clear browser cache

### Issue: Can't access protected routes
**Cause**: Not authenticated  
**Solution**:
- Login first
- Check token in localStorage
- Refresh page

---

## 📚 Documentation

### Available Documents
1. **AUTHENTICATION_GUIDE.md** - Complete reference documentation
2. **QUICK_START.md** - Quick reference guide
3. **IMPLEMENTATION_CHECKLIST.md** - Testing checklist
4. **IMPLEMENTATION_REFERENCE.ts** - Code examples & patterns
5. **COMPLETE_SYSTEM_SUMMARY.md** - System overview

### Reading Guide
1. Start with `QUICK_START.md` for overview
2. Read `AUTHENTICATION_GUIDE.md` for details
3. Use `IMPLEMENTATION_REFERENCE.ts` for code examples
4. Follow `IMPLEMENTATION_CHECKLIST.md` for testing
5. Refer to `COMPLETE_SYSTEM_SUMMARY.md` for system info

---

## 🔒 Security Features

✅ **Token Management**
- Secure storage in localStorage
- Automatic attachment to requests
- Clear on logout

✅ **Protected Routes**
- Authentication check before rendering
- Automatic redirects to login

✅ **Input Validation**
- Email format validation
- Password strength requirements
- Form field validation

✅ **Error Handling**
- Specific error messages
- No sensitive data exposed
- Secure error handling

---

## 🎯 Best Practices Implemented

✅ **Code Quality**
- TypeScript for type safety
- Modular architecture
- Clear separation of concerns
- Comprehensive comments

✅ **User Experience**
- Loading states
- Error messages
- Form validation
- Smooth redirects

✅ **Security**
- Secure token handling
- Input validation
- Protected routes
- Error handling

✅ **Performance**
- Lazy loading
- Optimized re-renders
- Efficient state management

---

## 🚀 Build & Deploy

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Linting
```bash
npm run lint
```

---

## 📦 Dependencies

- **react** - UI library
- **react-router-dom** - Routing
- **axios** - HTTP client
- **lucide-react** - Icons
- **tailwindcss** - Styling
- **typescript** - Type safety

---

## 🆘 Support & Help

### Debugging
1. Open DevTools (F12)
2. Check Console for errors
3. Check Network for API calls
4. Check Storage for localStorage
5. Check Elements for DOM structure

### Common Debugging Steps
```javascript
// Check authentication
console.log(localStorage.getItem('token'));

// Check user data
console.log(JSON.parse(localStorage.getItem('user')));

// Clear all storage
localStorage.clear();

// Check API base URL
console.log('https://localhost:7024/api');
```

---

## 📝 API Response Format

### Login Response
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "userId": "123",
    "userName": "John Doe",
    "email": "john@example.com"
  }
}
```

### Register Response
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "userId": "123",
    "userName": "John Doe",
    "email": "john@example.com"
  }
}
```

---

## 🔄 Next Steps

1. ✅ Test authentication flow
2. ✅ Verify backend integration
3. ✅ Customize UI/branding
4. ✅ Add additional pages
5. ✅ Implement refresh tokens (optional)
6. ✅ Add password reset (future)
7. ✅ Deploy to production

---

## 📞 Quick Reference

### Commands
```bash
npm install        # Install dependencies
npm run dev        # Start dev server
npm run build      # Build for production
npm run lint       # Run linter
```

### URLs
```
Frontend:  http://localhost:5173
Backend:   https://localhost:7024
API:       https://localhost:7024/api
```

### Test Credentials
```
Email:    test@example.com
Password: TestPass123
Phone:    +1 (555) 123-4567
District: Downtown
```

---

## ✅ Checklist

- [x] Authentication system implemented
- [x] Protected routes configured
- [x] Token management working
- [x] UI components created
- [x] Error handling implemented
- [x] Documentation complete
- [x] TypeScript types defined
- [x] Testing guidelines provided
- [x] Security best practices applied
- [x] Ready for production

---

## 📄 License

This project is part of GreenOps initiative.

---

## 👥 Contributors

- **Frontend Development**: Complete authentication system with modern React patterns

---

## 🎉 Summary

You have a **complete, production-ready authentication system** ready to:
- ✅ Register new users
- ✅ Authenticate with JWT tokens
- ✅ Protect routes with automatic redirects
- ✅ Manage user sessions
- ✅ Handle errors gracefully
- ✅ Provide excellent UX

**Status**: ✅ Ready for Development & Production

---

**Last Updated**: May 1, 2026  
**Version**: 1.0.0  
**Status**: Production Ready 🚀
