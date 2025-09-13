import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, Briefcase, Home, Heart, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const UseCasesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0
    }
  };

  const useCases = [
    {
      id: "01",
      title: "Professional Services",
      description: "Connect professionals with clients who need specialized skills and expertise",
      icon: Briefcase,
      image: "/api/placeholder/600/400",
      color: "primary",
      stats: { connections: "12K+", satisfaction: "94%" }
    },
    {
      id: "02", 
      title: "Community Support",
      description: "Build stronger neighborhoods through local help and mutual assistance",
      icon: Home,
      image: "/api/placeholder/600/400",
      color: "secondary",
      stats: { connections: "8K+", satisfaction: "97%" }
    },
    {
      id: "03",
      title: "Healthcare Assistance",
      description: "Support patients and families with care coordination and emotional support",
      icon: Heart,
      image: "/api/placeholder/600/400",
      color: "tertiary",
      stats: { connections: "15K+", satisfaction: "99%" }
    },
    {
      id: "04",
      title: "Educational Support",
      description: "Connect learners with mentors and tutors for academic and skill development",
      icon: GraduationCap,
      image: "/api/placeholder/600/400", 
      color: "primary",
      stats: { connections: "6K+", satisfaction: "92%" }
    }
  ];

  return (
    <section ref={ref} className="relative py-32 bg-muted/30 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-secondary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
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
            <span className="text-sm font-medium">Use Cases</span>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-5xl md:text-6xl font-bold text-foreground mb-6"
          >
            Designed to Solve the Challenges
            <br />
            <span className="text-gradient">You Face Every Day</span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-xl text-muted-foreground max-w-4xl mx-auto mb-8"
          >
            From connecting communities to enabling professional services, our platform helps 
            eliminate barriers and streamline connections—saving you both time and effort from day one.
          </motion.p>

          <motion.div variants={itemVariants}>
            <Button size="lg" variant="outline" className="group">
              See Our Technology
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </motion.div>

        {/* Use Cases Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12"
        >
          {useCases.map((useCase, index) => (
            <motion.div
              key={useCase.id}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.3 }
              }}
              className="group relative"
            >
              <div className="relative bg-card rounded-3xl overflow-hidden elegant-shadow hover:shadow-2xl transition-all duration-500">
                {/* Image Section */}
                <div className="relative h-64 bg-gradient-to-br from-primary/20 to-secondary/20 overflow-hidden">
                  <div className="absolute inset-0 bg-grid-pattern opacity-20" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className={`w-20 h-20 bg-${useCase.color}/20 rounded-2xl flex items-center justify-center`}>
                      <useCase.icon className={`w-10 h-10 text-${useCase.color}`} />
                    </div>
                  </div>
                  
                  {/* Floating Number */}
                  <div className="absolute top-6 left-6">
                    <div className="w-12 h-12 bg-card/90 backdrop-blur-sm rounded-xl flex items-center justify-center">
                      <span className="text-lg font-bold text-primary">{useCase.id}</span>
                    </div>
                  </div>

                  {/* Stats Card */}
                  <div className="absolute bottom-4 right-4 bg-card/90 backdrop-blur-sm rounded-xl p-3">
                    <div className="flex items-center space-x-4 text-sm">
                      <div className="text-center">
                        <div className="font-bold text-foreground">{useCase.stats.connections}</div>
                        <div className="text-muted-foreground">Connected</div>
                      </div>
                      <div className="w-px h-8 bg-border" />
                      <div className="text-center">
                        <div className="font-bold text-primary">{useCase.stats.satisfaction}</div>
                        <div className="text-muted-foreground">Success</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                    {useCase.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {useCase.description}
                  </p>
                  
                  <Button variant="ghost" className="group/btn p-0 h-auto font-semibold">
                    Learn More
                    <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};