export interface User {
  id: string;
  email: string;
  fullName: string;
  avatarUrl?: string;
  bio?: string;
  location?: string;
  phoneNumber?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
}

export interface Trip {
  id: string;
  creatorId: string;
  creatorName: string;
  title: string;
  description: string;
  destination: string;
  startDate: string;
  endDate: string;
  maxTravelers: number;
  currentTravelers: number;
  pricePerPerson: number;
  status: 'open' | 'full' | 'completed' | 'cancelled';
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  message: string;
  timestamp: string;
}

export interface Payment {
  id: string;
  tripId: string;
  userId: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  paymentMethod: string;
  transactionId?: string;
  createdAt: string;
}

export interface TransportOption {
  id: string;
  tripId: string;
  type: 'bus' | 'train' | 'flight' | 'car' | 'other';
  provider: string;
  departureTime: string;
  arrivalTime: string;
  price: number;
  seatsAvailable: number;
}

export interface EmergencyAlert {
  id: string;
  userId: string;
  userName: string;
  tripId?: string;
  location: string;
  message: string;
  latitude?: number;
  longitude?: number;
  status: 'active' | 'resolved' | 'false_alarm';
  createdAt: string;
}
