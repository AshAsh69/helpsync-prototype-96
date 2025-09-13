import { create } from 'zustand';

export interface Post {
  id: string;
  title: string;
  description: string;
  category: 'food' | 'shelter' | 'medical' | 'education' | 'emergency' | 'other';
  urgency: 'low' | 'medium' | 'high' | 'critical';
  location: string;
  author: {
    id: string;
    name: string;
    avatar: string;
    isVerified: boolean;
  };
  images: string[];
  createdAt: string;
  likes: number;
  comments: Comment[];
  isLiked: boolean;
  tags: string[];
  goal?: number;
  raised?: number;
}

export interface Comment {
  id: string;
  author: {
    id: string;
    name: string;
    avatar: string;
  };
  content: string;
  createdAt: string;
  likes: number;
}

export interface Helper {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  completedHelps: number;
  skills: string[];
  location: string;
  responseTime: string;
  isVerified: boolean;
  availability: 'available' | 'busy' | 'offline';
}

interface FeedState {
  posts: Post[];
  helpers: Helper[];
  filters: {
    category: string;
    location: string;
    urgency: string;
  };
  loading: boolean;
  setFilters: (filters: Partial<FeedState['filters']>) => void;
  likePost: (postId: string) => void;
  addComment: (postId: string, content: string) => void;
  addPost: (post: Post) => void;
  updatePost: (postId: string, updates: Partial<Post>) => void;
  deletePost: (postId: string) => void;
  loadPosts: () => Promise<void>;
  getRecommendedHelpers: (postId: string) => Helper[];
}

// Mock data
const mockPosts: Post[] = [
  {
    id: '1',
    title: 'Emergency Food Assistance Needed',
    description: 'Family of 4 needs immediate food assistance. Lost job recently and struggling to put food on the table. Any help would be greatly appreciated.',
    category: 'food',
    urgency: 'critical',
    location: 'Austin, TX',
    author: {
      id: '3', // Now matches the current user 
      name: 'Sarah Johnson',
      avatar: '👩‍🦳',
      isVerified: true,
    },
    images: [],
    createdAt: '2024-01-15T10:30:00Z',
    likes: 42,
    comments: [
      {
        id: '1',
        author: { id: '4', name: 'John Smith', avatar: '👨‍🌾' },
        content: 'I can help! I run a local food bank. Please DM me.',
        createdAt: '2024-01-15T11:00:00Z',
        likes: 8,
      }
    ],
    isLiked: false,
    tags: ['urgent', 'family', 'food-security'],
    goal: 500,
    raised: 230,
  },
  {
    id: '2',
    title: 'Tutoring Help for High School Math',
    description: 'Looking for someone to help with calculus. Struggling with derivatives and integrals. Can meet online or in person.',
    category: 'education',
    urgency: 'medium',
    location: 'San Francisco, CA',
    author: {
      id: '5',
      name: 'Alex Chen',
      avatar: '🧑‍🎓',
      isVerified: false,
    },
    images: [],
    createdAt: '2024-01-14T15:45:00Z',
    likes: 18,
    comments: [],
    isLiked: true,
    tags: ['education', 'math', 'tutoring'],
  },
  {
    id: '3',
    title: 'Pet Care During Hospital Stay',
    description: 'Going in for surgery next week and need someone to care for my two cats. They are friendly and low maintenance.',
    category: 'other',
    urgency: 'medium',
    location: 'Portland, OR',
    author: {
      id: '6',
      name: 'Emma Wilson',
      avatar: '👩‍⚕️',
      isVerified: true,
    },
    images: [],
    createdAt: '2024-01-13T09:20:00Z',
    likes: 25,
    comments: [
      {
        id: '2',
        author: { id: '7', name: 'Pet Lover Sarah', avatar: '🐱' },
        content: 'I would love to help! I have experience with cats.',
        createdAt: '2024-01-13T10:00:00Z',
        likes: 5,
      }
    ],
    isLiked: false,
    tags: ['pets', 'temporary', 'cats'],
  },
];

const mockHelpers: Helper[] = [
  {
    id: '1',
    name: 'Dr. Sarah Mitchell',
    avatar: '👩‍⚕️',
    rating: 4.9,
    completedHelps: 127,
    skills: ['Medical Care', 'Emergency Response', 'Health Consultation'],
    location: 'Austin, TX',
    responseTime: '< 1 hour',
    isVerified: true,
    availability: 'available',
  },
  {
    id: '2',
    name: 'Chef Roberto',
    avatar: '👨‍🍳',
    rating: 4.8,
    completedHelps: 89,
    skills: ['Cooking', 'Food Preparation', 'Nutrition'],
    location: 'Austin, TX',
    responseTime: '< 2 hours',
    isVerified: true,
    availability: 'available',
  },
  {
    id: '3',
    name: 'Teacher Mary',
    avatar: '👩‍🏫',
    rating: 4.9,
    completedHelps: 156,
    skills: ['Math Tutoring', 'Science', 'Test Prep'],
    location: 'San Francisco, CA',
    responseTime: '< 30 min',
    isVerified: true,
    availability: 'available',
  },
  {
    id: '4',
    name: 'Handyman Joe',
    avatar: '🔧',
    rating: 4.7,
    completedHelps: 203,
    skills: ['Home Repair', 'Electrical', 'Plumbing'],
    location: 'Portland, OR',
    responseTime: '< 4 hours',
    isVerified: true,
    availability: 'busy',
  },
];

export const useFeedStore = create<FeedState>((set, get) => ({
  posts: mockPosts,
  helpers: mockHelpers,
  filters: {
    category: 'all',
    location: 'all',
    urgency: 'all',
  },
  loading: false,
  
  setFilters: (newFilters) => {
    set(state => ({
      filters: { ...state.filters, ...newFilters }
    }));
  },
  
  likePost: (postId) => {
    set(state => ({
      posts: state.posts.map(post =>
        post.id === postId
          ? {
              ...post,
              isLiked: !post.isLiked,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1
            }
          : post
      )
    }));
  },
  
  addComment: (postId, content) => {
    const newComment: Comment = {
      id: Date.now().toString(),
      author: {
        id: '3', // Match current user ID
        name: 'Sarah Johnson',
        avatar: '👩‍🦳',
      },
      content,
      createdAt: new Date().toISOString(),
      likes: 0,
    };
    
    set(state => ({
      posts: state.posts.map(post =>
        post.id === postId
          ? { ...post, comments: [...post.comments, newComment] }
          : post
      )
    }));
  },
  
  addPost: (post) => {
    set(state => ({
      posts: [post, ...state.posts]
    }));
  },

  updatePost: (postId, updates) => {
    set(state => ({
      posts: state.posts.map(post =>
        post.id === postId ? { ...post, ...updates } : post
      )
    }));
  },

  deletePost: (postId) => {
    set(state => ({
      posts: state.posts.filter(post => post.id !== postId)
    }));
  },
  
  loadPosts: async () => {
    set({ loading: true });
    await new Promise(resolve => setTimeout(resolve, 1000));
    set({ loading: false });
  },
  
  getRecommendedHelpers: (postId) => {
    const post = get().posts.find(p => p.id === postId);
    if (!post) return [];
    
    return get().helpers
      .filter(helper => helper.location === post.location)
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 3);
  },
}));