import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
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
        <div className="absolute inset-0 bg-background/30" />
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
                <span className="text-xs sm:text-sm font-medium">Connecting Communities</span>
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white mb-4 sm:mb-6 leading-[1.1] tracking-tight"
              >
                <motion.span
                  className="inline-block"
                  whileHover={{ 
                    scale: 1.05,
                    textShadow: "0px 0px 8px rgba(255,255,255,0.8)"
                  }}
                  transition={{ duration: 0.3 }}
                >
                  Our
                </motion.span>{" "}
                <motion.span 
                  className="text-gradient inline-block cursor-pointer"
                  whileHover={{ 
                    scale: 1.1,
                    rotate: [0, -2, 2, -1, 1, 0],
                    textShadow: "0px 0px 20px rgba(139, 92, 246, 0.8)"
                  }}
                  transition={{ 
                    duration: 0.6,
                    rotate: { duration: 0.5 }
                  }}
                >
                  technology
                </motion.span>
                <br />
                <motion.span
                  className="inline-block"
                  whileHover={{ 
                    y: -5,
                    textShadow: "0px 5px 10px rgba(0,0,0,0.3)"
                  }}
                  transition={{ duration: 0.3 }}
                >
                  was built to solve
                </motion.span>
                <br />
                <motion.span 
                  className="text-gradient inline-block cursor-pointer relative"
                  whileHover={{ 
                    scale: 1.08,
                    rotateX: 10,
                    textShadow: "0px 0px 15px rgba(59, 130, 246, 0.9)"
                  }}
                  transition={{ duration: 0.4 }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  real-world
                </motion.span>{" "}
                <motion.span
                  className="inline-block font-extrabold"
                  whileHover={{ 
                    scale: 1.1,
                    color: "#ffffff",
                    textShadow: "0px 0px 25px rgba(255,255,255,1)"
                  }}
                  transition={{ duration: 0.3 }}
                >
                  challenges.
                </motion.span>
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
              className="flex justify-center mb-12 sm:mb-16 px-4"
            >
              <Button asChild size="lg" variant="hero" className="group min-w-[200px] hover:shadow-2xl hover:shadow-primary/25 transition-all duration-300">
                <Link to="/login">
                  Get Started Now
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </motion.div>

          </motion.div>
        </div>
      </div>
    </section>
  );
};