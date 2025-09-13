import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Users, Star, MessageCircle, Shield, Phone, Globe, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/Layout';

interface Organization {
  id: string;
  name: string;
  description: string;
  category: string;
  location: string;
  avatar: string;
  isVerified: boolean;
  rating: number;
  members: number;
  founded: string;
  contact: {
    phone?: string;
    email?: string;
    website?: string;
  };
  services: string[];
  tags: string[];
}

const Organizations = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [locationFilter, setLocationFilter] = useState('all');

  const [organizations] = useState<Organization[]>([
    {
      id: '1',
      name: 'Austin Food Bank',
      description: 'Fighting hunger in Central Texas by providing food assistance to families in need. We partner with local farms and grocery stores to rescue food.',
      category: 'food',
      location: 'Austin, TX',
      avatar: '🏪',
      isVerified: true,
      rating: 4.9,
      members: 342,
      founded: '1982',
      contact: {
        phone: '(512) 684-2550',
        email: 'info@austinfoodbank.org',
        website: 'austinfoodbank.org'
      },
      services: ['Food Distribution', 'Mobile Food Pantry', 'Nutrition Education'],
      tags: ['food-security', 'nutrition', 'community']
    },
    {
      id: '2',
      name: 'American Red Cross - Austin',
      description: 'Providing emergency assistance, disaster relief and education in Central Texas. We help people prepare for, respond to and recover from emergencies.',
      category: 'emergency',
      location: 'Austin, TX',
      avatar: '🏥',
      isVerified: true,
      rating: 4.8,
      members: 156,
      founded: '1881',
      contact: {
        phone: '(512) 928-4271',
        email: 'austin@redcross.org',
        website: 'redcross.org'
      },
      services: ['Emergency Response', 'Disaster Relief', 'Blood Drives', 'Training'],
      tags: ['emergency', 'disaster-relief', 'first-aid']
    },
    {
      id: '3',
      name: 'Hope Center',
      description: 'Comprehensive support for homeless individuals and families. We provide shelter, meals, job training, and transitional housing programs.',
      category: 'shelter',
      location: 'Austin, TX',
      avatar: '🏠',
      isVerified: true,
      rating: 4.7,
      members: 89,
      founded: '1995',
      contact: {
        phone: '(512) 555-0123',
        email: 'contact@hopecenter.org',
        website: 'hopecenter.org'
      },
      services: ['Emergency Shelter', 'Meal Services', 'Job Training', 'Case Management'],
      tags: ['homelessness', 'shelter', 'job-training']
    },
    {
      id: '4',
      name: 'Austin Public Library Foundation',
      description: 'Supporting literacy and education in our community through library programs, technology access, and educational resources for all ages.',
      category: 'education',
      location: 'Austin, TX',
      avatar: '📚',
      isVerified: true,
      rating: 4.6,
      members: 234,
      founded: '1979',
      contact: {
        email: 'foundation@austinlibrary.com',
        website: 'library.austintexas.gov'
      },
      services: ['Digital Literacy', 'Adult Education', 'Youth Programs', 'Technology Access'],
      tags: ['education', 'literacy', 'technology']
    },
    {
      id: '5',
      name: 'Mental Health Alliance',
      description: 'Promoting mental health awareness and providing support services to individuals and families affected by mental health challenges.',
      category: 'health',
      location: 'Austin, TX',
      avatar: '🧠',
      isVerified: true,
      rating: 4.8,
      members: 167,
      founded: '2003',
      contact: {
        phone: '(512) 555-MIND',
        email: 'support@mhalliance.org',
        website: 'mentalhealthaustin.org'
      },
      services: ['Counseling', 'Support Groups', 'Crisis Intervention', 'Education'],
      tags: ['mental-health', 'counseling', 'support']
    },
    {
      id: '6',
      name: 'Austin Animal Center',
      description: 'No-kill animal shelter providing rescue, adoption, and veterinary services. We care for homeless pets and connect them with loving families.',
      category: 'animals',
      location: 'Austin, TX',
      avatar: '🐾',
      isVerified: true,
      rating: 4.9,
      members: 445,
      founded: '1970',
      contact: {
        phone: '(512) 978-0500',
        email: 'info@austinpetsalive.org',
        website: 'austinpetsalive.org'
      },
      services: ['Animal Rescue', 'Adoption Services', 'Veterinary Care', 'Foster Programs'],
      tags: ['animals', 'rescue', 'adoption']
    }
  ]);

  const filteredOrganizations = organizations.filter(org => {
    const matchesSearch = org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         org.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         org.services.some(service => service.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = categoryFilter === 'all' || org.category === categoryFilter;
    const matchesLocation = locationFilter === 'all' || org.location.includes(locationFilter);
    
    return matchesSearch && matchesCategory && matchesLocation;
  });

  const handleContact = (org: Organization) => {
    navigate('/messages', {
      state: {
        openChat: {
          userId: org.id,
          userName: org.name,
          userAvatar: org.avatar
        }
      }
    });
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-foreground">Organizations</h1>
          <Badge variant="secondary" className="text-sm">
            {filteredOrganizations.length} organizations
          </Badge>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Input
            placeholder="Search organizations..."
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
              <SelectItem value="emergency">Emergency Services</SelectItem>
              <SelectItem value="shelter">Housing & Shelter</SelectItem>
              <SelectItem value="education">Education</SelectItem>
              <SelectItem value="health">Health & Wellness</SelectItem>
              <SelectItem value="animals">Animal Welfare</SelectItem>
            </SelectContent>
          </Select>

          <Select value={locationFilter} onValueChange={setLocationFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              <SelectItem value="Austin">Austin</SelectItem>
              <SelectItem value="Central Texas">Central Texas</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            More Filters
          </Button>
        </div>

        {/* Organizations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredOrganizations.map((org) => (
              <motion.div
                key={org.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-12 h-12">
                          <AvatarFallback className="text-lg">{org.avatar}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold text-foreground leading-tight">
                            {org.name}
                          </h3>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="secondary" className="text-xs">
                              {org.category}
                            </Badge>
                            {org.isVerified && (
                              <Shield className="w-4 h-4 text-primary" />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span>{org.rating}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{org.members}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>{org.location}</span>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                      {org.description}
                    </p>

                    <div className="mb-4">
                      <h4 className="font-medium text-sm text-foreground mb-2">Services</h4>
                      <div className="flex flex-wrap gap-1">
                        {org.services.slice(0, 3).map((service) => (
                          <Badge key={service} variant="outline" className="text-xs">
                            {service}
                          </Badge>
                        ))}
                        {org.services.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{org.services.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mb-4 text-xs text-muted-foreground">
                      <span>Founded {org.founded}</span>
                      {org.contact.website && (
                        <>
                          <span>•</span>
                          <div className="flex items-center gap-1">
                            <Globe className="w-3 h-3" />
                            <span>{org.contact.website}</span>
                          </div>
                        </>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <Button 
                        variant="default" 
                        size="sm" 
                        className="flex-1"
                        onClick={() => handleContact(org)}
                      >
                        <MessageCircle className="w-4 h-4 mr-1" />
                        Contact
                      </Button>
                      {org.contact.phone && (
                        <Button variant="outline" size="sm">
                          <Phone className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredOrganizations.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No organizations found</h3>
            <p className="text-muted-foreground">Try adjusting your filters or search terms</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Organizations;