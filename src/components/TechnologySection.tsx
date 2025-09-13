import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { 
  Users, 
  MessageSquare, 
  Shield, 
  Zap, 
  Heart, 
  Globe,
  Smartphone,
  Lock
} from 'lucide-react';

export const TechnologySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0
    }
  };

  return (
    <section id="technology" ref={ref} className="relative py-32 bg-background overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-20"
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary mb-6"
          >
            <Zap className="w-4 h-4 mr-2" />
            <span className="text-sm font-medium">Advanced Technology</span>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-5xl md:text-6xl font-bold text-foreground mb-6"
          >
            A tech-centric approach to
            <br />
            <span className="text-gradient">distributed connection</span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-xl text-muted-foreground max-w-3xl mx-auto"
          >
            Transform the way you connect and help others with our cutting-edge platform, 
            powered by real-time communication and intelligent matching algorithms.
          </motion.p>
        </motion.div>

        {/* Technology Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20"
        >
          {[
            {
              icon: Users,
              title: "Smart Matching",
              description: "AI-powered algorithms connect helpers with those in need",
              color: "primary"
            },
            {
              icon: MessageSquare,
              title: "Real-time Chat",
              description: "Instant communication with built-in translation",
              color: "secondary"
            },
            {
              icon: Shield,
              title: "Trust & Safety",
              description: "Advanced verification and community moderation",
              color: "tertiary"
            },
            {
              icon: Globe,
              title: "Global Network",
              description: "Connect across borders and time zones seamlessly",
              color: "primary"
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.05, 
                y: -10,
                transition: { duration: 0.3 }
              }}
              className="group relative"
            >
              <div className={`absolute inset-0 bg-gradient-to-r from-${feature.color}/10 to-${feature.color}/5 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300`} />
              <div className="relative bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8 hover:border-primary/20 transition-all duration-300">
                <div className={`w-12 h-12 bg-${feature.color}/20 rounded-xl flex items-center justify-center mb-6`}>
                  <feature.icon className={`w-6 h-6 text-${feature.color}`} />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Central Feature Showcase */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="relative"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Features */}
            <motion.div variants={itemVariants}>
              <h3 className="text-4xl font-bold text-foreground mb-8">
                Take Control of
                <br />
                Your <span className="text-gradient">Community</span>
              </h3>
              <p className="text-xl text-muted-foreground mb-8">
                Unlock full visibility and control of your community connections with our 
                HC360 platform, real-time matching, and global network.
              </p>
              
              <div className="space-y-6">
                {[
                  {
                    icon: Smartphone,
                    title: "Mobile-First Design",
                    description: "Access help anytime, anywhere with our responsive platform"
                  },
                  {
                    icon: Lock,
                    title: "Privacy Protected",
                    description: "End-to-end encryption ensures your data stays secure"
                  },
                  {
                    icon: Heart,
                    title: "Community Driven",
                    description: "Built by helpers, for helpers, with community feedback"
                  }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="flex items-start space-x-4"
                  >
                    <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-foreground mb-1">{item.title}</h4>
                      <p className="text-muted-foreground">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right Side - Visual Element */}
            <motion.div
              variants={itemVariants}
              className="relative"
            >
              <div className="relative bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl p-12 min-h-[400px] flex items-center justify-center">
                <div className="absolute inset-0 bg-grid-pattern opacity-10 rounded-3xl" />
                <div className="relative text-center">
                  <div className="w-24 h-24 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Zap className="w-12 h-12 text-primary" />
                  </div>
                  <h4 className="text-2xl font-bold text-foreground mb-3">Powered by Innovation</h4>
                  <p className="text-muted-foreground">
                    Experience the future of community connection
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};