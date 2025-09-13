import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Target, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRef } from 'react';
import heroBgImage from '@/assets/hero-bg-community.jpg';

export const HeroSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section 
      ref={ref} 
      className="relative min-h-screen overflow-hidden"
      style={{
        backgroundImage: `url(${heroBgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Enhanced Background */}
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute inset-0"
      >
        <div className="absolute inset-0 hero-gradient opacity-90" />
        <div className="absolute inset-0 bg-background/60" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-secondary/15 rounded-full blur-2xl animate-float" />
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-tertiary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />
        
        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="h-full w-full bg-grid-pattern animate-slide-up" />
        </div>
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="min-h-screen flex items-center py-8 sm:py-12">
          <motion.div 
            style={{ y: textY }}
            className="w-full text-center"
          >
            {/* Main Content */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="mb-8"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="inline-flex items-center px-3 sm:px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary mb-4 sm:mb-6 cursor-pointer hover:bg-primary/20 transition-all duration-300 text-sm"
                whileHover={{ scale: 1.05 }}
              >
                <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                <span className="text-xs sm:text-sm font-medium">Connecting Communities Worldwide</span>
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-4 sm:mb-6 leading-tight"
              >
                Our <span className="text-gradient">technology</span>
                <br />
                was built to solve
                <br />
                <span className="text-gradient">real-world</span> challenges.
              </motion.h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-lg sm:text-xl md:text-2xl text-white/80 mb-8 sm:mb-10 md:mb-12 max-w-4xl leading-relaxed text-center mx-auto px-4"
            >
              Whether you're aiming to reduce community isolation, streamline help workflows, 
              or eliminate barriers caused by inefficiencies, our platform is designed to deliver 
              meaningful connections—fast.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center mb-12 sm:mb-16 px-4"
            >
              <Button asChild size="lg" variant="hero" className="group w-full sm:min-w-[200px] hover:shadow-2xl hover:shadow-primary/25 transition-all duration-300">
                <Link to="/login">
                  Get Started Now
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="hero-outline" className="w-full sm:min-w-[200px] hover:shadow-xl transition-all duration-300">
                <Link to="#technology">See Our Technology</Link>
              </Button>
            </motion.div>

            {/* Enhanced Stats Grid */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.9 }}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-4xl mx-auto px-4"
            >
              <motion.div 
                whileHover={{ scale: 1.05, y: -5 }}
                className="relative group cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary-glow/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
                <div className="relative bg-card/20 backdrop-blur-sm border border-primary/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 hover:border-primary/40 transition-all duration-300">
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                      <Target className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                  <div className="text-3xl sm:text-4xl font-bold text-white mb-1 sm:mb-2">98%</div>
                  <div className="text-sm sm:text-base text-white/70">Connection Success</div>
                </div>
              </motion.div>

              <motion.div 
                whileHover={{ scale: 1.05, y: -5 }}
                className="relative group cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-secondary/20 to-secondary-glow/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
                <div className="relative bg-card/20 backdrop-blur-sm border border-secondary/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 hover:border-secondary/40 transition-all duration-300">
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center">
                      <div className="text-2xl font-bold text-secondary">12</div>
                    </div>
                  </div>
                  <div className="text-base sm:text-lg text-white/90 mb-1 sm:mb-2">Implementation</div>
                  <div className="text-sm sm:text-base text-white/70">In as little as <span className="text-secondary font-semibold">12 days</span></div>
                </div>
              </motion.div>

              <motion.div 
                whileHover={{ scale: 1.05, y: -5 }}
                className="relative group cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-tertiary/20 to-tertiary/30 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
                <div className="relative bg-card/20 backdrop-blur-sm border border-tertiary/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 hover:border-tertiary/40 transition-all duration-300">
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-12 h-12 bg-tertiary/20 rounded-full flex items-center justify-center">
                      <Zap className="w-6 h-6 text-tertiary" />
                    </div>
                  </div>
                  <div className="text-3xl sm:text-4xl font-bold text-white mb-1 sm:mb-2">50K+</div>
                  <div className="text-sm sm:text-base text-white/70">Lives Transformed</div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};