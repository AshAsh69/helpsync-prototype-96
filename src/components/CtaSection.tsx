import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, Sparkles, Users, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export const CtaSection = () => {
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
    <section ref={ref} className="relative py-32 overflow-hidden">
      {/* Enhanced Background */}
      <div className="absolute inset-0 hero-gradient" />
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/15 rounded-full blur-2xl animate-float" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-tertiary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center"
        >
          {/* Main Content */}
          <motion.div
            variants={itemVariants}
            className="mb-12"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : { scale: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center px-6 py-3 rounded-full bg-primary/20 border border-primary/30 text-primary mb-8"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              <span className="font-medium">Join the Community Revolution</span>
            </motion.div>

            <motion.h2
              variants={itemVariants}
              className="text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-tight"
            >
              Ready to
              <br />
              <span className="text-gradient">Transform Lives?</span>
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-xl md:text-2xl text-white/80 mb-12 max-w-4xl mx-auto leading-relaxed"
            >
              Join thousands of helpers and seekers who are already making a difference. 
              Start your journey today and be part of the change you want to see.
            </motion.p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-6 justify-center mb-16"
          >
            <Button asChild size="xl" variant="hero" className="group min-w-[250px]">
              <Link to="/login">
                Start Helping Today
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button asChild size="xl" variant="hero-outline" className="min-w-[250px]">
              <Link to="#contact">Talk to Our Team</Link>
            </Button>
          </motion.div>

          {/* Bottom Stats */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
          >
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -5 }}
              className="group"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary-glow/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
                <div className="relative bg-card/10 backdrop-blur-sm border border-primary/30 rounded-2xl p-8">
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-12 h-12 bg-primary/30 rounded-full flex items-center justify-center">
                      <Users className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-white mb-2">100K+</div>
                  <div className="text-white/70">Active Community Members</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -5 }}
              className="group"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-secondary/20 to-secondary-glow/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
                <div className="relative bg-card/10 backdrop-blur-sm border border-secondary/30 rounded-2xl p-8">
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-12 h-12 bg-secondary/30 rounded-full flex items-center justify-center">
                      <Zap className="w-6 h-6 text-secondary" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-white mb-2">1M+</div>
                  <div className="text-white/70">Successful Connections</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -5 }}
              className="group"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-tertiary/20 to-tertiary/30 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
                <div className="relative bg-card/10 backdrop-blur-sm border border-tertiary/30 rounded-2xl p-8">
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-12 h-12 bg-tertiary/30 rounded-full flex items-center justify-center">
                      <div className="text-xl font-bold text-tertiary">24/7</div>
                    </div>
                  </div>
                  <div className="text-lg text-white/90 mb-2">Always Available</div>
                  <div className="text-white/70">Support When You Need It</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};