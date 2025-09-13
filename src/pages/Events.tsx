import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, Clock, Users, Star, Plus, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Layout } from '@/components/Layout';

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  organizer: {
    id: string;
    name: string;
    avatar: string;
    isVerified: boolean;
  };
  category: string;
  attendees: number;
  maxAttendees?: number;
  isRegistered: boolean;
  image?: string;
  tags: string[];
}

const Events = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [locationFilter, setLocationFilter] = useState('all');

  const [events] = useState<Event[]>([
    {
      id: '1',
      title: 'Community Food Drive',
      description: 'Join us for a community-wide food drive to help local families in need. We will be collecting non-perishable items and fresh produce.',
      date: '2024-01-20',
      time: '09:00 AM',
      location: 'Austin Community Center',
      organizer: {
        id: '1',
        name: 'Austin Food Bank',
        avatar: '🏪',
        isVerified: true
      },
      category: 'food',
      attendees: 45,
      maxAttendees: 100,
      isRegistered: false,
      tags: ['volunteer', 'food-security', 'community']
    },
    {
      id: '2',
      title: 'Emergency Response Training',
      description: 'Learn essential emergency response skills including first aid, CPR, and disaster preparedness. Certification provided.',
      date: '2024-01-22',
      time: '10:00 AM',
      location: 'Red Cross Training Center',
      organizer: {
        id: '2',
        name: 'American Red Cross',
        avatar: '🏥',
        isVerified: true
      },
      category: 'training',
      attendees: 23,
      maxAttendees: 30,
      isRegistered: true,
      tags: ['training', 'emergency', 'certification']
    },
    {
      id: '3',
      title: 'Homeless Shelter Volunteer Day',
      description: 'Help serve meals and organize donations at the local homeless shelter. All volunteers welcome.',
      date: '2024-01-25',
      time: '06:00 PM',
      location: 'Downtown Shelter',
      organizer: {
        id: '3',
        name: 'Hope Center',
        avatar: '🏠',
        isVerified: true
      },
      category: 'volunteer',
      attendees: 18,
      maxAttendees: 25,
      isRegistered: false,
      tags: ['volunteer', 'shelter', 'community-service']
    },
    {
      id: '4',
      title: 'Mental Health Awareness Workshop',
      description: 'Interactive workshop on mental health awareness and support techniques. Open to community members.',
      date: '2024-01-28',
      time: '02:00 PM',
      location: 'Community Health Center',
      organizer: {
        id: '4',
        name: 'Mental Health Alliance',
        avatar: '🧠',
        isVerified: true
      },
      category: 'health',
      attendees: 32,
      isRegistered: false,
      tags: ['mental-health', 'awareness', 'support']
    }
  ]);

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || event.category === categoryFilter;
    const matchesLocation = locationFilter === 'all' || event.location.includes(locationFilter);
    
    return matchesSearch && matchesCategory && matchesLocation;
  });

  const handleRegister = (eventId: string) => {
    toast({
      title: "Registration Successful",
      description: "You have been registered for this event!",
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-foreground">Community Events</h1>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Create Event
          </Button>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Input
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="food">Food & Nutrition</SelectItem>
              <SelectItem value="training">Training</SelectItem>
              <SelectItem value="volunteer">Volunteer</SelectItem>
              <SelectItem value="health">Health & Wellness</SelectItem>
            </SelectContent>
          </Select>

          <Select value={locationFilter} onValueChange={setLocationFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              <SelectItem value="Austin">Austin</SelectItem>
              <SelectItem value="Downtown">Downtown</SelectItem>
              <SelectItem value="Community">Community Centers</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            More Filters
          </Button>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredEvents.map((event) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between mb-3">
                      <Badge variant="secondary" className="text-xs">
                        {event.category}
                      </Badge>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Users className="w-3 h-3" />
                        <span>{event.attendees}</span>
                        {event.maxAttendees && <span>/{event.maxAttendees}</span>}
                      </div>
                    </div>
                    
                    <h3 className="font-semibold text-foreground leading-tight">
                      {event.title}
                    </h3>
                    
                    <div className="flex items-center space-x-2 mt-2">
                      <Avatar className="w-6 h-6">
                        <AvatarFallback className="text-xs">{event.organizer.avatar}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-muted-foreground">{event.organizer.name}</span>
                      {event.organizer.isVerified && (
                        <Badge variant="outline" className="text-xs px-1">✓</Badge>
                      )}
                    </div>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                      {event.description}
                    </p>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="w-4 h-4 text-primary" />
                        <span>{formatDate(event.date)}</span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="w-4 h-4 text-primary" />
                        <span>{event.time}</span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="w-4 h-4 text-primary" />
                        <span>{event.location}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {event.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <Button 
                      className="w-full"
                      variant={event.isRegistered ? "outline" : "default"}
                      onClick={() => handleRegister(event.id)}
                      disabled={event.maxAttendees && event.attendees >= event.maxAttendees}
                    >
                      {event.isRegistered ? 'Registered' : 
                       event.maxAttendees && event.attendees >= event.maxAttendees ? 'Full' :
                       'Register'}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No events found</h3>
            <p className="text-muted-foreground">Try adjusting your filters or search terms</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Events;