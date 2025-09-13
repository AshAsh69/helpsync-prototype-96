import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, 
  Users, 
  Calendar, 
  Building2, 
  MapPin, 
  Star, 
  Filter, 
  Search,
  X,
  UserPlus,
  Clock,
  Sparkles,
  TrendingUp,
  Target
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Layout } from '@/components/Layout';
import { useToast } from '@/hooks/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface Recommendation {
  id: string;
  type: 'person' | 'event' | 'organization';
  title: string;
  description: string;
  image?: string;
  location?: string;
  date?: string;
  rating: number;
  matchPercentage: number;
  tags: string[];
  members?: number;
  isConnected?: boolean;
}

const sampleRecommendations: Recommendation[] = [
  {
    id: '1',
    type: 'person',
    title: 'Sarah Chen',
    description: 'Community organizer passionate about local environmental initiatives and sustainable living.',
    location: 'Downtown Portland',
    rating: 4.9,
    matchPercentage: 95,
    tags: ['Environment', 'Community', 'Sustainability'],
    isConnected: false
  },
  {
    id: '2',
    type: 'event',
    title: 'Community Garden Workshop',
    description: 'Learn sustainable gardening techniques and connect with local green enthusiasts.',
    location: 'Riverside Park',
    date: '2024-01-15',
    rating: 4.7,
    matchPercentage: 88,
    tags: ['Gardening', 'Environment', 'Workshop']
  },
  {
    id: '3',
    type: 'organization',
    title: 'Portland Green Initiative',
    description: 'Local non-profit focused on environmental education and community sustainability projects.',
    location: 'Portland, OR',
    rating: 4.8,
    matchPercentage: 92,
    tags: ['Non-profit', 'Environment', 'Education'],
    members: 2847
  },
  {
    id: '4',
    type: 'person',
    title: 'Marcus Rodriguez',
    description: 'Tech professional who volunteers at local coding bootcamps and mentors aspiring developers.',
    location: 'Tech District',
    rating: 4.6,
    matchPercentage: 83,
    tags: ['Technology', 'Mentoring', 'Education'],
    isConnected: false
  },
  {
    id: '5',
    type: 'event',
    title: 'Neighborhood Safety Meeting',
    description: 'Monthly community meeting to discuss local safety initiatives and neighborhood watch programs.',
    location: 'Community Center',
    date: '2024-01-20',
    rating: 4.4,
    matchPercentage: 76,
    tags: ['Safety', 'Community', 'Meeting']
  }
];

export default function Recommendations() {
  const [recommendations, setRecommendations] = useState<Recommendation[]>(sampleRecommendations);
  const [filteredRecommendations, setFilteredRecommendations] = useState<Recommendation[]>(sampleRecommendations);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'person' | 'event' | 'organization'>('all');
  const [sortBy, setSortBy] = useState<'match' | 'rating' | 'recent'>('match');
  const [connectedIds, setConnectedIds] = useState<Set<string>>(new Set());
  const { toast } = useToast();

  // Filter and sort recommendations
  useEffect(() => {
    let filtered = recommendations.filter(rec => {
      const matchesSearch = rec.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           rec.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           rec.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesType = filterType === 'all' || rec.type === filterType;
      return matchesSearch && matchesType;
    });

    // Sort recommendations
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'match':
          return b.matchPercentage - a.matchPercentage;
        case 'rating':
          return b.rating - a.rating;
        case 'recent':
          return new Date(b.date || '2024-01-01').getTime() - new Date(a.date || '2024-01-01').getTime();
        default:
          return 0;
      }
    });

    setFilteredRecommendations(filtered);
  }, [recommendations, searchQuery, filterType, sortBy]);

  const handleConnect = (id: string, title: string, type: string) => {
    setConnectedIds(prev => new Set(prev).add(id));
    toast({
      title: "Connection sent!",
      description: `Your connection request to ${title} has been sent.`,
    });
  };

  const handleJoin = (id: string, title: string) => {
    toast({
      title: "Joined successfully!",
      description: `You've joined ${title}. Welcome!`,
    });
  };

  const handleInterest = (id: string, title: string) => {
    toast({
      title: "Interest registered!",
      description: `You've shown interest in ${title}. We'll notify you with updates.`,
    });
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'person': return Users;
      case 'event': return Calendar;
      case 'organization': return Building2;
      default: return Heart;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'person': return 'bg-blue-500';
      case 'event': return 'bg-green-500';
      case 'organization': return 'bg-purple-500';
      default: return 'bg-primary';
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary/10 via-secondary/5 to-tertiary/10 border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Personalized <span className="text-gradient">Recommendations</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Discover meaningful connections and opportunities tailored just for you
              </p>
            </motion.div>
          </div>
        </div>

        {/* Stats Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="border-b bg-card/50 backdrop-blur-sm"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-wrap items-center justify-center gap-8 text-sm">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-primary" />
                <span className="text-muted-foreground">Match Score: </span>
                <span className="font-semibold text-primary">94% Average</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-green-500" />
                <span className="text-muted-foreground">New Today: </span>
                <span className="font-semibold">12 recommendations</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-red-500" />
                <span className="text-muted-foreground">Success Rate: </span>
                <span className="font-semibold">89%</span>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Search and Filters */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-8 space-y-4"
          >
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search recommendations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
                {searchQuery && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                    onClick={() => setSearchQuery('')}
                  >
                    <X className="w-3 h-3" />
                  </Button>
                )}
              </div>
              
              <div className="flex gap-2">
                <Select value={filterType} onValueChange={(value: any) => setFilterType(value)}>
                  <SelectTrigger className="w-40">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="person">People</SelectItem>
                    <SelectItem value="event">Events</SelectItem>
                    <SelectItem value="organization">Organizations</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="match">Best Match</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="recent">Most Recent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Active Filters */}
            <div className="flex flex-wrap gap-2">
              {filterType !== 'all' && (
                <Badge variant="secondary" className="capitalize">
                  {filterType}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="ml-1 h-4 w-4 p-0"
                    onClick={() => setFilterType('all')}
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </Badge>
              )}
              {searchQuery && (
                <Badge variant="secondary">
                  "{searchQuery}"
                  <Button
                    variant="ghost"
                    size="sm"
                    className="ml-1 h-4 w-4 p-0"
                    onClick={() => setSearchQuery('')}
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </Badge>
              )}
            </div>
          </motion.div>

          {/* Results Count */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mb-6 flex items-center justify-between"
          >
            <p className="text-muted-foreground">
              Found <span className="font-semibold text-foreground">{filteredRecommendations.length}</span> recommendations
            </p>
            <div className="text-sm text-muted-foreground">
              Sorted by {sortBy === 'match' ? 'Best Match' : sortBy === 'rating' ? 'Highest Rated' : 'Most Recent'}
            </div>
          </motion.div>

          {/* Recommendations Grid */}
          <AnimatePresence mode="wait">
            <motion.div 
              key={`${searchQuery}-${filterType}-${sortBy}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredRecommendations.map((rec, index) => {
                const TypeIcon = getTypeIcon(rec.type);
                const isConnected = connectedIds.has(rec.id);
                
                return (
                  <motion.div
                    key={rec.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                  >
                    <Card className="h-full hover:shadow-xl transition-all duration-300 border-0 elegant-shadow">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 ${getTypeColor(rec.type)} rounded-xl flex items-center justify-center`}>
                              <TypeIcon className="w-5 h-5 text-white" />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-bold text-lg text-foreground line-clamp-1">
                                {rec.title}
                              </h3>
                              <div className="flex items-center gap-2 mt-1">
                                <div className="flex items-center gap-1">
                                  <Star className="w-3 h-3 text-yellow-500 fill-current" />
                                  <span className="text-sm font-medium">{rec.rating}</span>
                                </div>
                                <div className="w-1 h-1 bg-muted-foreground rounded-full" />
                                <Badge variant="outline" className="text-xs px-2 py-0">
                                  {rec.matchPercentage}% match
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      
                      <CardContent className="space-y-4">
                        <p className="text-muted-foreground text-sm line-clamp-2">
                          {rec.description}
                        </p>
                        
                        {rec.location && (
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <MapPin className="w-4 h-4" />
                            {rec.location}
                          </div>
                        )}
                        
                        {rec.date && (
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Clock className="w-4 h-4" />
                            {new Date(rec.date).toLocaleDateString()}
                          </div>
                        )}
                        
                        {rec.members && (
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Users className="w-4 h-4" />
                            {rec.members.toLocaleString()} members
                          </div>
                        )}
                        
                        <div className="flex flex-wrap gap-1">
                          {rec.tags.slice(0, 3).map(tag => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        
                        <div className="pt-2">
                          {rec.type === 'person' && (
                            <Button 
                              onClick={() => handleConnect(rec.id, rec.title, rec.type)}
                              disabled={isConnected}
                              className="w-full"
                              variant={isConnected ? "outline" : "default"}
                            >
                              {isConnected ? (
                                <>✓ Connected</>
                              ) : (
                                <>
                                  <UserPlus className="w-4 h-4 mr-2" />
                                  Connect
                                </>
                              )}
                            </Button>
                          )}
                          
                          {rec.type === 'event' && (
                            <Button 
                              onClick={() => handleInterest(rec.id, rec.title)}
                              className="w-full"
                              variant="outline"
                            >
                              <Heart className="w-4 h-4 mr-2" />
                              Show Interest
                            </Button>
                          )}
                          
                          {rec.type === 'organization' && (
                            <Button 
                              onClick={() => handleJoin(rec.id, rec.title)}
                              className="w-full"
                            >
                              <Building2 className="w-4 h-4 mr-2" />
                              Join Organization
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>

          {filteredRecommendations.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="w-24 h-24 bg-muted/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No recommendations found</h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your search terms or filters to find what you're looking for.
              </p>
              <Button 
                onClick={() => {
                  setSearchQuery('');
                  setFilterType('all');
                }}
                variant="outline"
              >
                Clear all filters
              </Button>
            </motion.div>
          )}
        </div>
      </div>
    </Layout>
  );
}