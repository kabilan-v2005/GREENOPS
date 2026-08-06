// Auth Types
export interface AuthUser {
  userId: string;
  userName: string;
  email: string;
  phoneNumber?: string;
  district?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterFormData {
  userName: string;
  email: string;
  password: string;
  phoneNumber: string;
  district: string;
}

export interface AuthResponse {
  token: string;
  user?: AuthUser;
  message?: string;
}

// User Types
export interface User {
  id: string;
  name: string;
  email: string;
  role?: string;
}

// Report Types
export interface Report {
  id: string;
  userId: string;
  location: string;
  description: string;
  imageUrl?: string;
  status: 'Pending' | 'In Progress' | 'Resolved';
  createdAt: string;
}

// Item Types
export interface Item {
  id: string;
  userId: string;
  title: string;
  description: string;
  price: number;
  imageUrl?: string;
  isSold: boolean;
  createdAt: string;
}

// Complaint Types
export interface Complaint {
  complaintId: string;
  userId: string;
  complaintDescription: string;
  status: 'Pending' | 'Resolved';
  complaintDate: string;
}

// Feedback Types
export interface Feedback {
  id: string;
  userId: string;
  message: string;
  rating: number;
  createdAt: string;
}

// API Error Type
export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
  statusCode?: number;
}
