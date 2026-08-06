import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, User, Phone, MapPin, AlertCircle, Check } from 'lucide-react';
import { Card, CardContent } from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import authService, { RegisterRequest } from '../services/authService';

const Register: React.FC = () => {
  const navigate = useNavigate();
  
  // Form state
  const [formData, setFormData] = useState<RegisterRequest>({
    userName: '',
    email: '',
    password: '',
    phoneNumber: '',
    district: '',
  });

  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Validation state
  const [passwordStrength, setPasswordStrength] = useState<'weak' | 'medium' | 'strong' | null>(null);

  /**
   * Check password strength
   */
  const checkPasswordStrength = (password: string): 'weak' | 'medium' | 'strong' => {
    if (password.length < 6) return 'weak';
    if (password.length < 8) return 'medium';
    if (/[A-Z]/.test(password) && /[0-9]/.test(password)) return 'strong';
    return 'medium';
  };

  /**
   * Handle input change
   */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Check password strength
    if (name === 'password') {
      setPasswordStrength(checkPasswordStrength(value));
    }
  };

  /**
   * Validate form
   */
  const validateForm = (): string | null => {
    if (!formData.userName.trim()) return 'Name is required';
    if (!formData.email.trim()) return 'Email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) return 'Invalid email format';
    if (!formData.password) return 'Password is required';
    if (formData.password.length < 6) return 'Password must be at least 6 characters';
    if (formData.password !== confirmPassword) return 'Passwords do not match';
    if (!formData.phoneNumber.trim()) return 'Phone number is required';
    if (!formData.district.trim()) return 'District is required';
    return null;
  };

  /**
   * Handle registration
   */
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validate form
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsLoading(true);

    try {
      // Call register service
      await authService.registerUser(formData);
      setSuccess(true);

      // Show success message briefly, then redirect
      setTimeout(() => {
        navigate('/', { replace: true });
      }, 1500);
    } catch (err: any) {
      const errorMessage = err.message || 'Registration failed. Please try again.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900">
            GreenOps
          </h1>
          <h2 className="mt-2 text-xl font-semibold text-gray-700">
            Create Account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Join us to manage your green initiatives
          </p>
        </div>

        {/* Success Alert */}
        {success && (
          <div className="rounded-lg bg-green-50 border border-green-200 p-4 flex gap-3">
            <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium text-green-800">
                Account created successfully! Redirecting...
              </p>
            </div>
          </div>
        )}

        {/* Error Alert */}
        {error && (
          <div className="rounded-lg bg-red-50 border border-red-200 p-4 flex gap-3">
            <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium text-red-800">{error}</p>
            </div>
          </div>
        )}

        {/* Registration Form */}
        <Card>
          <CardContent className="pt-6">
            <form className="space-y-4" onSubmit={handleRegister}>
              {/* Full Name */}
              <Input
                label="Full Name"
                type="text"
                name="userName"
                value={formData.userName}
                onChange={handleInputChange}
                leftIcon={<User className="h-5 w-5" />}
                placeholder="John Doe"
                required
                disabled={isLoading}
              />

              {/* Email */}
              <Input
                label="Email Address"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                leftIcon={<Mail className="h-5 w-5" />}
                placeholder="john@example.com"
                required
                disabled={isLoading}
              />

              {/* Password */}
              <div className="space-y-1">
                <Input
                  label="Password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  leftIcon={<Lock className="h-5 w-5" />}
                  placeholder="••••••••"
                  required
                  disabled={isLoading}
                />
                {/* Password Strength Indicator */}
                {formData.password && (
                  <div className="flex gap-1">
                    <div
                      className={`h-1 flex-1 rounded ${
                        passwordStrength === 'weak'
                          ? 'bg-red-400'
                          : passwordStrength === 'medium'
                          ? 'bg-yellow-400'
                          : 'bg-green-400'
                      }`}
                    />
                    <div
                      className={`h-1 flex-1 rounded ${
                        passwordStrength === 'strong'
                          ? 'bg-green-400'
                          : passwordStrength === 'medium'
                          ? 'bg-yellow-400'
                          : 'bg-gray-200'
                      }`}
                    />
                    <div
                      className={`h-1 flex-1 rounded ${
                        passwordStrength === 'strong' ? 'bg-green-400' : 'bg-gray-200'
                      }`}
                    />
                  </div>
                )}
                <p className="text-xs text-gray-500">
                  {passwordStrength === 'weak' && '❌ Weak password'}
                  {passwordStrength === 'medium' && '⚠️ Medium strength'}
                  {passwordStrength === 'strong' && '✅ Strong password'}
                </p>
              </div>

              {/* Confirm Password */}
              <Input
                label="Confirm Password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                leftIcon={<Lock className="h-5 w-5" />}
                placeholder="••••••••"
                required
                disabled={isLoading}
              />

              {/* Phone Number */}
              <Input
                label="Phone Number"
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                leftIcon={<Phone className="h-5 w-5" />}
                placeholder="+1 (555) 000-0000"
                required
                disabled={isLoading}
              />

              {/* District */}
              <Input
                label="District"
                type="text"
                name="district"
                value={formData.district}
                onChange={handleInputChange}
                leftIcon={<MapPin className="h-5 w-5" />}
                placeholder="Your district"
                required
                disabled={isLoading}
              />

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full"
                isLoading={isLoading}
                disabled={isLoading || success}
              >
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Sign In Link */}
        <p className="text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link
            to="/login"
            className="font-semibold text-indigo-600 hover:text-indigo-500 transition-colors"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
