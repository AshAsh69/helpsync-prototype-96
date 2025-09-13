import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, MessageCircle, Share2, MapPin, Clock, Filter, Users, DollarSign, Plus, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Layout } from '@/components/Layout';
import { useFeedStore, Post } from '@/stores/feedStore';
import { useAuthStore } from '@/stores/authStore';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import CreatePostModal from '@/components/CreatePostModal';
import EditPostModal from '@/components/EditPostModal';
import ProfileModal from '@/components/ProfileModal';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const urgencyColors = {
  low: 'bg-green-500/20 text-green-400',
  medium: 'bg-yellow-500/20 text-yellow-400',
  high: 'bg-orange-500/20 text-orange-400',
  critical: 'bg-red-500/20 text-red-400',
};

const categoryColors = {
  food: 'bg-orange-500/20 text-orange-400',
  shelter: 'bg-blue-500/20 text-blue-400',
  medical: 'bg-red-500/20 text-red-400',
  education: 'bg-purple-500/20 text-purple-400',
  emergency: 'bg-red-600/20 text-red-300',
  other: 'bg-gray-500/20 text-gray-400',
};

function formatTimeAgo(dateString: string) {
  const now = new Date();
  const date = new Date(dateString);
  const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
  
  if (diffInHours < 1) return 'Just now';
  if (diffInHours < 24) return `${diffInHours}h ago`;
  return `${Math.floor(diffInHours / 24)}d ago`;
}

export default function Feed() {
  const { posts, filters, likePost, addComment, getRecommendedHelpers, setFilters, addPost, updatePost, deletePost } = useFeedStore();
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [expandedPost, setExpandedPost] = useState<string | null>(null);
  const [commentText, setCommentText] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<string | null>(null);
  
  const editingPostData = editingPost ? posts.find(p => p.id === editingPost) : null;

  const filteredPosts = posts.filter(post => {
    if (filters.category !== 'all' && post.category !== filters.category) return false;
    if (filters.urgency !== 'all' && post.urgency !== filters.urgency) return false;
    if (filters.location !== 'all' && !post.location.includes(filters.location)) return false;
    return true;
  });

  const handleComment = (postId: string) => {
    if (commentText.trim()) {
      addComment(postId, commentText);
      setCommentText('');
    }
  };

  const handleCreatePost = (newPost: any) => {
    addPost(newPost);
    setIsCreateModalOpen(false);
  };

  const handleOfferHelp = (post: any) => {
    navigate('/messages', {
      state: {
        openChat: {
          userId: post.author.id,
          userName: post.author.name,
          userAvatar: post.author.avatar
        }
      }
    });
  };

  const handleDeletePost = (postId: string) => {
    deletePost(postId);
    toast({
      title: "Post Deleted",
      description: "Your post has been deleted successfully.",
    });
  };

  const handleEditPost = (updates: Partial<Post>) => {
    if (editingPost) {
      updatePost(editingPost, updates);
      setEditingPost(null);
    }
  };

  const isPostOwner = (post: any) => {
    return user?.id === post.author.id;
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Feed */}
          <div className="lg:col-span-3 space-y-6">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div>
                <h1 className="text-3xl font-bold text-gradient">Community Feed</h1>
                <p className="text-muted-foreground">Help requests from your community</p>
              </div>
              
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-muted-foreground" />
                <Select value={filters.category} onValueChange={(value) => setFilters({ category: value })}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="food">Food</SelectItem>
                    <SelectItem value="shelter">Shelter</SelectItem>
                    <SelectItem value="medical">Medical</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="emergency">Emergency</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={filters.urgency} onValueChange={(value) => setFilters({ urgency: value })}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Urgency</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </motion.div>

            {/* Posts */}
            <AnimatePresence>
              {filteredPosts.map((post, index) => {
                const recommendedHelpers = getRecommendedHelpers(post.id);
                
                return (
                  <motion.div
                    key={post.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="card-gradient elegant-shadow hover:shadow-xl transition-all duration-300">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-secondary rounded-full flex items-center justify-center text-lg">
                              {post.author.avatar}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center space-x-2">
                                <h3 className="font-semibold">{post.author.name}</h3>
                                {post.author.isVerified && (
                                  <Badge variant="secondary" className="text-xs">Verified</Badge>
                                )}
                              </div>
                              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                                <MapPin className="w-3 h-3" />
                                <span>{post.location}</span>
                                <Clock className="w-3 h-3 ml-2" />
                                <span>{formatTimeAgo(post.createdAt)}</span>
                              </div>
                            </div>
                            {isPostOwner(post) && (
                              <div className="flex items-center space-x-1">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => setEditingPost(post.id)}
                                  className="h-8 px-2"
                                >
                                  Edit
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleDeletePost(post.id)}
                                  className="h-8 px-2 text-red-500 hover:text-red-600"
                                >
                                  Delete
                                </Button>
                              </div>
                            )}
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <Badge className={urgencyColors[post.urgency]}>{post.urgency}</Badge>
                            <Badge className={categoryColors[post.category]}>{post.category}</Badge>
                          </div>
                        </div>
                      </CardHeader>
                      
                      <CardContent className="space-y-4">
                        <div>
                          <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                          <p className="text-muted-foreground">{post.description}</p>
                        </div>

                        {post.goal && (
                          <div className="bg-muted/50 rounded-lg p-4">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-medium">Goal Progress</span>
                              <span className="text-sm text-muted-foreground">
                                ${post.raised} / ${post.goal}
                              </span>
                            </div>
                            <div className="w-full bg-background rounded-full h-2">
                              <div 
                                className="bg-gradient-primary h-2 rounded-full transition-all duration-300"
                                style={{ width: `${((post.raised || 0) / post.goal) * 100}%` }}
                              />
                            </div>
                          </div>
                        )}

                        <div className="flex flex-wrap gap-2">
                          {post.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              #{tag}
                            </Badge>
                          ))}
                        </div>

                        {/* Actions */}
                        <div className="flex items-center justify-between pt-4 border-t border-border">
                          <div className="flex items-center space-x-4">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => likePost(post.id)}
                              className={post.isLiked ? 'text-red-500' : ''}
                            >
                              <Heart className={`w-4 h-4 mr-1 ${post.isLiked ? 'fill-current' : ''}`} />
                              {post.likes}
                            </Button>
                            
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setExpandedPost(expandedPost === post.id ? null : post.id)}
                            >
                              <MessageCircle className="w-4 h-4 mr-1" />
                              {post.comments.length}
                            </Button>
                            
                            <Button variant="ghost" size="sm">
                              <Share2 className="w-4 h-4 mr-1" />
                              Share
                            </Button>
                          </div>
                          
                          <div className="flex space-x-2">
                            {post.goal && (
                              <Button variant="gradient" size="sm">
                                <DollarSign className="w-4 h-4 mr-1" />
                                Donate
                              </Button>
                            )}
                            <Button variant="hero" size="sm" onClick={() => handleOfferHelp(post)}>
                              <Users className="w-4 h-4 mr-1" />
                              Help
                            </Button>
                          </div>
                        </div>

                        {/* Comments Section */}
                        <AnimatePresence>
                          {expandedPost === post.id && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="space-y-4 pt-4 border-t border-border"
                            >
                              {/* Existing Comments */}
                              {post.comments.map((comment) => (
                                <div key={comment.id} className="flex space-x-3">
                                  <div className="w-8 h-8 bg-gradient-secondary rounded-full flex items-center justify-center text-sm">
                                    {comment.author.avatar}
                                  </div>
                                  <div className="flex-1 bg-muted/50 rounded-lg p-3">
                                    <div className="flex items-center space-x-2 mb-1">
                                      <span className="font-medium text-sm">{comment.author.name}</span>
                                      <span className="text-xs text-muted-foreground">
                                        {formatTimeAgo(comment.createdAt)}
                                      </span>
                                    </div>
                                    <p className="text-sm">{comment.content}</p>
                                  </div>
                                </div>
                              ))}
                              
                              {/* Add Comment */}
                              <div className="flex space-x-3">
                                <div className="w-8 h-8 bg-gradient-secondary rounded-full flex items-center justify-center text-sm">
                                  {user?.avatar}
                                </div>
                                <div className="flex-1 flex space-x-2">
                                  <input
                                    type="text"
                                    value={commentText}
                                    onChange={(e) => setCommentText(e.target.value)}
                                    placeholder="Add a comment..."
                                    className="flex-1 bg-input border border-border rounded-lg px-3 py-2 text-sm"
                                    onKeyDown={(e) => {
                                      if (e.key === 'Enter') {
                                        handleComment(post.id);
                                      }
                                    }}
                                  />
                                  <Button
                                    size="sm"
                                    onClick={() => handleComment(post.id)}
                                    disabled={!commentText.trim()}
                                  >
                                    Post
                                  </Button>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* Recommended Helpers */}
                        {recommendedHelpers.length > 0 && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="bg-muted/30 rounded-lg p-4 mt-4"
                          >
                            <h4 className="font-medium mb-3 text-sm">Recommended Helpers</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                              {recommendedHelpers.map((helper) => (
                                <div key={helper.id} className="bg-card rounded-lg p-3 text-center">
                                  <div className="w-10 h-10 bg-gradient-secondary rounded-full flex items-center justify-center text-lg mx-auto mb-2">
                                    {helper.avatar}
                                  </div>
                                  <p className="font-medium text-sm">{helper.name}</p>
                                  <p className="text-xs text-muted-foreground">⭐ {helper.rating}</p>
                                  <Button variant="outline" size="sm" className="mt-2 w-full">
                                    Contact
                                  </Button>
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card className="card-gradient">
              <CardHeader>
                <h3 className="font-semibold">Today's Impact</h3>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Requests Posted</span>
                  <span className="font-semibold">127</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Helps Completed</span>
                  <span className="font-semibold">89</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Active Helpers</span>
                  <span className="font-semibold">2.3K</span>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="card-gradient">
              <CardHeader>
                <h3 className="font-semibold">Recent Activity</h3>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-2 text-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span>5 new helpers joined</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <div className="w-2 h-2 bg-blue-500 rounded-full" />
                  <span>12 requests fulfilled</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <div className="w-2 h-2 bg-purple-500 rounded-full" />
                  <span>New event posted</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Floating Create Post Button */}
        <motion.div
          className="fixed bottom-6 right-6 z-50"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            onClick={() => setIsCreateModalOpen(true)}
            className="w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition-shadow bg-gradient-primary"
            size="icon"
          >
            <Plus className="w-6 h-6" />
          </Button>
        </motion.div>

        {/* Create Post Modal */}
        <CreatePostModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onSubmit={handleCreatePost}
        />

        {/* Edit Post Modal */}
        <EditPostModal
          isOpen={!!editingPost}
          onClose={() => setEditingPost(null)}
          onSubmit={handleEditPost}
          post={editingPostData}
        />
      </div>
    </Layout>
  );
}
