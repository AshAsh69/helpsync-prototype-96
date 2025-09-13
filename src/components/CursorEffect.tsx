import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const CursorEffect = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [trails, setTrails] = useState<{ x: number; y: number; id: number }[]>([]);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      const newPos = { x: e.clientX, y: e.clientY };
      setMousePosition(newPos);
      
      // Add trail particles occasionally
      if (Math.random() > 0.7) {
        setTrails(prev => [...prev.slice(-8), { ...newPos, id: Date.now() }]);
      }
    };

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'BUTTON' || target.tagName === 'A' || target.closest('button') || target.closest('a')) {
        setIsHovering(true);
      }
    };

    const handleMouseLeave = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'BUTTON' || target.tagName === 'A' || target.closest('button') || target.closest('a')) {
        setIsHovering(false);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', updateMousePosition);
    document.addEventListener('mouseenter', handleMouseEnter, true);
    document.addEventListener('mouseleave', handleMouseLeave, true);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      document.removeEventListener('mouseenter', handleMouseEnter, true);
      document.removeEventListener('mouseleave', handleMouseLeave, true);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <>
      {/* Trail particles */}
      <AnimatePresence>
        {trails.map((trail) => (
          <motion.div
            key={trail.id}
            className="fixed top-0 left-0 w-1 h-1 bg-primary/60 rounded-full pointer-events-none z-40"
            initial={{
              x: trail.x,
              y: trail.y,
              opacity: 1,
              scale: 1,
            }}
            animate={{
              x: trail.x,
              y: trail.y,
              opacity: 0,
              scale: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0,
            }}
            transition={{
              duration: 1,
              ease: "easeOut",
            }}
          />
        ))}
      </AnimatePresence>

      {/* Main cursor glow */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full pointer-events-none z-49 blur-sm"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          scale: isHovering ? 2 : 1,
          opacity: isHovering ? 0.8 : 0.4,
        }}
        transition={{
          type: "spring",
          damping: 25,
          stiffness: 150,
        }}
      />
      
      {/* Main cursor */}
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 border border-primary/80 rounded-full pointer-events-none z-50"
        animate={{
          x: mousePosition.x - 6,
          y: mousePosition.y - 6,
          scale: isHovering ? 2 : isClicking ? 0.8 : 1,
          borderWidth: isHovering ? 2 : 1,
        }}
        transition={{
          type: "spring",
          damping: 30,
          stiffness: 300,
        }}
      />
      
      {/* Inner cursor dot */}
      <motion.div
        className="fixed top-0 left-0 w-1 h-1 bg-primary rounded-full pointer-events-none z-50"
        animate={{
          x: mousePosition.x - 2,
          y: mousePosition.y - 2,
          scale: isClicking ? 2 : 1,
        }}
        transition={{
          type: "spring",
          damping: 35,
          stiffness: 400,
        }}
      />

      {/* Click ripple effect */}
      <AnimatePresence>
        {isClicking && (
          <motion.div
            className="fixed top-0 left-0 w-8 h-8 border border-primary/30 rounded-full pointer-events-none z-48"
            initial={{
              x: mousePosition.x - 16,
              y: mousePosition.y - 16,
              scale: 0,
              opacity: 1,
            }}
            animate={{
              scale: 3,
              opacity: 0,
            }}
            exit={{
              scale: 4,
              opacity: 0,
            }}
            transition={{
              duration: 0.6,
              ease: "easeOut",
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
};