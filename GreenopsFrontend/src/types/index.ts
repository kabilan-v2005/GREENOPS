export interface User {
  id: string;
  name: string;
  email: string;
  role?: string;
}

export interface Report {
  id: string;
  userId: string;
  location: string;
  description: string;
  imageUrl?: string;
  status: 'Pending' | 'In Progress' | 'Resolved';
  createdAt: string;
}

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

export interface Complaint {
  complaintId: string;
  userId: string;
  complaintDescription: string;
  status: 'Pending' | 'Resolved';
  complaintDate: string;
}

export interface Feedback {
  id: string;
  userId: string;
  message: string;
  rating: number;
  createdAt: string;
}
