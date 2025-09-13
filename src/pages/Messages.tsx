import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Search, Phone, Video, MoreVertical, Users, Bell, Hash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useLocation } from 'react-router-dom';
import { Layout } from '@/components/Layout';

interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: string;
  type: 'text' | 'system';
  isRead: boolean;
}

interface Chat {
  id: string;
  type: 'direct' | 'group' | 'organization';
  name: string;
  avatar: string;
  participants: string[];
  lastMessage: Message;
  unreadCount: number;
  isOnline?: boolean;
  isTyping?: boolean;
}

const Messages = () => {
  const location = useLocation();
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Mock data
  const [chats, setChats] = useState<Chat[]>([
    {
      id: '1',
      type: 'direct',
      name: 'Maria Rodriguez',
      avatar: '👩‍🍳',
      participants: ['1', '2'],
      lastMessage: {
        id: '1',
        senderId: '1',
        content: 'Thank you for offering to help with food!',
        timestamp: new Date(Date.now() - 300000).toISOString(),
        type: 'text',
        isRead: false
      },
      unreadCount: 2,
      isOnline: true
    },
    {
      id: '2',
      type: 'group',
      name: 'Austin Food Bank Volunteers',
      avatar: '🍲',
      participants: ['1', '2', '3', '4'],
      lastMessage: {
        id: '2',
        senderId: '3',
        content: 'We have extra supplies this week',
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        type: 'text',
        isRead: true
      },
      unreadCount: 0,
      isTyping: true
    },
    {
      id: '3',
      type: 'organization',
      name: 'Red Cross Updates',
      avatar: '🏥',
      participants: ['1'],
      lastMessage: {
        id: '3',
        senderId: 'system',
        content: 'Emergency response training this Friday',
        timestamp: new Date(Date.now() - 7200000).toISOString(),
        type: 'system',
        isRead: true
      },
      unreadCount: 0
    }
  ]);

  const [messages, setMessages] = useState<Record<string, Message[]>>({
    '1': [
      {
        id: '1',
        senderId: '1',
        content: 'Hi! I saw your post about needing food assistance.',
        timestamp: new Date(Date.now() - 600000).toISOString(),
        type: 'text',
        isRead: true
      },
      {
          id: '2',
          senderId: '3',
          content: 'Yes, we really need help. Thank you for reaching out!',
        timestamp: new Date(Date.now() - 400000).toISOString(),
        type: 'text',
        isRead: true
      },
      {
        id: '3',
        senderId: '1',
        content: 'I can drop off groceries tomorrow. What time works?',
        timestamp: new Date(Date.now() - 350000).toISOString(),
        type: 'text',
        isRead: true
      },
      {
          id: '4',
          senderId: '3',
          content: 'Thank you for offering to help with food!',
        timestamp: new Date(Date.now() - 300000).toISOString(),
        type: 'text',
        isRead: false
      }
    ]
  });

  // Handle navigation from other pages
  useEffect(() => {
    if (location.state?.openChat) {
      const { userId, userName, userAvatar } = location.state.openChat;
      
      // Check if chat already exists
      const existingChat = chats.find(chat => 
        chat.type === 'direct' && chat.participants.includes(userId)
      );

      if (existingChat) {
        setSelectedChat(existingChat.id);
      } else {
        // Create new chat
        const newChat: Chat = {
          id: Date.now().toString(),
          type: 'direct',
          name: userName,
          avatar: userAvatar,
          participants: ['3', userId], // Current user and target user
        lastMessage: {
          id: Date.now().toString(),
          senderId: '3',
          content: 'Hello! I saw your post and would like to help.',
          timestamp: new Date().toISOString(),
          type: 'text',
          isRead: true
        },
          unreadCount: 0,
          isOnline: Math.random() > 0.3
        };

        setChats(prev => [newChat, ...prev]);
        setMessages(prev => ({
          ...prev,
          [newChat.id]: [{
            id: Date.now().toString(),
            senderId: '3', // Match current user ID
            content: 'Hello! I saw your post and would like to help.',
            timestamp: new Date().toISOString(),
            type: 'text',
            isRead: true
          }]
        }));
        setSelectedChat(newChat.id);
      }
    }
  }, [location.state, chats]);

  const sendMessage = () => {
    if (!message.trim() || !selectedChat) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: '3', // Current user
      content: message,
      timestamp: new Date().toISOString(),
      type: 'text',
      isRead: true
    };

    setMessages(prev => ({
      ...prev,
      [selectedChat]: [...(prev[selectedChat] || []), newMessage]
    }));

    // Update last message in chat
    setChats(prev => prev.map(chat => 
      chat.id === selectedChat 
        ? { ...chat, lastMessage: newMessage }
        : chat
    ));

    setMessage('');
    setIsTyping(false);
  };

  const filteredChats = chats.filter(chat =>
    chat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedChatData = chats.find(chat => chat.id === selectedChat);
  const chatMessages = selectedChat ? messages[selectedChat] || [] : [];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    
    if (diff < 60000) return 'Just now';
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <Layout>
      <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className="w-80 border-r border-border flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-border">
          <h1 className="text-xl font-semibold text-foreground mb-4">Messages</h1>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search conversations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Chat Types Tabs */}
        <div className="flex border-b border-border">
          <button className="flex-1 p-3 text-sm font-medium text-primary border-b-2 border-primary">
            All
          </button>
          <button className="flex-1 p-3 text-sm text-muted-foreground hover:text-foreground">
            Direct
          </button>
          <button className="flex-1 p-3 text-sm text-muted-foreground hover:text-foreground">
            Groups
          </button>
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto">
          <AnimatePresence>
            {filteredChats.map((chat) => (
              <motion.div
                key={chat.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`p-4 border-b border-border cursor-pointer hover:bg-muted/50 transition-colors ${
                  selectedChat === chat.id ? 'bg-muted' : ''
                }`}
                onClick={() => setSelectedChat(chat.id)}
              >
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Avatar className="w-12 h-12">
                      <AvatarFallback className="text-lg">{chat.avatar}</AvatarFallback>
                    </Avatar>
                    {chat.type === 'direct' && chat.isOnline && (
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-background rounded-full" />
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-foreground truncate">
                        {chat.name}
                      </h3>
                      <span className="text-xs text-muted-foreground">
                        {formatTime(chat.lastMessage.timestamp)}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-sm text-muted-foreground truncate">
                        {chat.isTyping ? (
                          <span className="text-primary">Typing...</span>
                        ) : (
                          chat.lastMessage.content
                        )}
                      </p>
                      
                      <div className="flex items-center space-x-2">
                        {chat.type === 'group' && <Users className="w-3 h-3 text-muted-foreground" />}
                        {chat.type === 'organization' && <Bell className="w-3 h-3 text-muted-foreground" />}
                        {chat.unreadCount > 0 && (
                          <Badge variant="secondary" className="text-xs px-1.5 py-0.5">
                            {chat.unreadCount}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedChatData ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-border flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Avatar className="w-10 h-10">
                  <AvatarFallback>{selectedChatData.avatar}</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="font-semibold text-foreground">{selectedChatData.name}</h2>
                  <p className="text-sm text-muted-foreground">
                    {selectedChatData.type === 'direct' && selectedChatData.isOnline ? 'Online' : 
                     selectedChatData.type === 'group' ? `${selectedChatData.participants.length} members` :
                     'Organization'}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="icon">
                  <Phone className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Video className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <AnimatePresence>
                {chatMessages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${msg.senderId === '3' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      msg.senderId === '3' 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      <p className="text-sm">{msg.content}</p>
                      <p className={`text-xs mt-1 ${
                        msg.senderId === '3' ? 'text-primary-foreground/70' : 'text-muted-foreground'
                      }`}>
                        {formatTime(msg.timestamp)}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-border">
              <div className="flex items-center space-x-2">
                <Input
                  placeholder="Type a message..."
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                    setIsTyping(e.target.value.length > 0);
                  }}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  className="flex-1"
                />
                <Button 
                  onClick={sendMessage}
                  disabled={!message.trim()}
                  className="shrink-0"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Send className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">Select a conversation</h3>
              <p className="text-muted-foreground">Choose from your existing conversations or start a new one</p>
            </div>
          </div>
        )}
      </div>
    </div>
    </Layout>
  );
};

export default Messages;