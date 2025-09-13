import { motion } from 'framer-motion';
import { X, MapPin, Star, MessageCircle, Shield, Calendar, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: {
    id: string;
    name: string;
    avatar: string;
    isVerified: boolean;
    location?: string;
    rating?: number;
    completedHelps?: number;
    skills?: string[];
    joinedAt?: string;
    responseTime?: string;
  };
}

const ProfileModal = ({ isOpen, onClose, user }: ProfileModalProps) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleContact = () => {
    navigate('/messages', {
      state: {
        openChat: {
          userId: user.id,
          userName: user.name,
          userAvatar: user.avatar
        }
      }
    });
    onClose();
  };

  const formatJoinDate = (dateString?: string) => {
    if (!dateString) return 'Recently joined';
    const date = new Date(dateString);
    return `Member since ${date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}`;
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-card rounded-lg shadow-xl w-full max-w-md mx-4"
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-foreground">Profile</h2>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>

          <div className="text-center mb-6">
            <Avatar className="w-20 h-20 mx-auto mb-4">
              <AvatarFallback className="text-2xl">{user.avatar}</AvatarFallback>
            </Avatar>
            
            <div className="flex items-center justify-center gap-2 mb-2">
              <h3 className="text-xl font-semibold text-foreground">{user.name}</h3>
              {user.isVerified && (
                <Shield className="w-5 h-5 text-primary" />
              )}
            </div>

            {user.location && (
              <div className="flex items-center justify-center gap-1 text-muted-foreground mb-4">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">{user.location}</span>
              </div>
            )}

            {user.rating && (
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{user.rating.toFixed(1)}</span>
                </div>
                {user.completedHelps && (
                  <div className="flex items-center gap-1">
                    <Award className="w-4 h-4 text-primary" />
                    <span className="font-medium">{user.completedHelps} helps</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {user.skills && user.skills.length > 0 && (
            <div className="mb-6">
              <h4 className="font-medium text-foreground mb-2">Skills & Expertise</h4>
              <div className="flex flex-wrap gap-2">
                {user.skills.map((skill) => (
                  <Badge key={skill} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-3 mb-6 text-sm">
            {user.responseTime && (
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Response Time</span>
                <span className="font-medium">{user.responseTime}</span>
              </div>
            )}
            
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Status</span>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="font-medium">Available</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Joined</span>
              <span className="font-medium">{formatJoinDate(user.joinedAt)}</span>
            </div>
          </div>

          <Button onClick={handleContact} className="w-full">
            <MessageCircle className="w-4 h-4 mr-2" />
            Send Message
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default ProfileModal;