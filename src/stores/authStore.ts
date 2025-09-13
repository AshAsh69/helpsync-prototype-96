import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'user' | 'admin';
  location: string;
  skills: string[];
  interests: string[];
  joinedAt: string;
  isVerified: boolean;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
}

// Mock users for demo
const mockUsers: Record<string, User> = {
  'admin@helpconnect.com': {
    id: '1',
    name: 'Admin User',
    email: 'admin@helpconnect.com',
    avatar: '👨‍💼',
    role: 'admin',
    location: 'San Francisco, CA',
    skills: ['Management', 'Analytics', 'Support'],
    interests: ['Technology', 'Community Building'],
    joinedAt: '2023-01-01',
    isVerified: true,
  },
  'user@helpconnect.com': {
    id: '3', // Change to match Maria's post 
    name: 'Sarah Johnson',
    email: 'user@helpconnect.com',
    avatar: '👩‍🦳',
    role: 'user',
    location: 'Austin, TX',
    skills: ['Teaching', 'Cooking', 'Pet Care'],
    interests: ['Education', 'Animals', 'Cooking'],
    joinedAt: '2023-06-15',
    isVerified: true,
  },
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      
      login: async (email: string, password: string) => {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const user = mockUsers[email];
        if (user && password === 'password') {
          set({ user, isAuthenticated: true });
          return true;
        }
        return false;
      },
      
      logout: () => {
        set({ user: null, isAuthenticated: false });
        localStorage.removeItem('auth-storage');
      },
      
      updateProfile: (updates) => {
        const { user } = get();
        if (user) {
          const updatedUser = { ...user, ...updates };
          set({ user: updatedUser });
        }
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);