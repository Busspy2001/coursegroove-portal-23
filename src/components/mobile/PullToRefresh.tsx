
import React, { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

interface PullToRefreshProps {
  onRefresh: () => Promise<void> | void;
  children: React.ReactNode;
  pullDistance?: number;
  backgroundColor?: string;
  colorIndicator?: string;
}

const PullToRefresh: React.FC<PullToRefreshProps> = ({
  onRefresh,
  children,
  pullDistance = 100,
  backgroundColor = "bg-background",
  colorIndicator = "text-schoolier-blue",
}) => {
  const [isPulling, setIsPulling] = useState(false);
  const [pullY, setPullY] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const touchStartY = React.useRef<number>(0);
  const scrollTop = React.useRef<number>(0);

  const handleTouchStart = (e: TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
    scrollTop.current = window.scrollY;
    
    if (window.scrollY === 0) {
      setIsPulling(true);
    }
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isPulling || refreshing) return;
    
    const touchY = e.touches[0].clientY;
    const deltaY = touchY - touchStartY.current;
    
    // Only allow pull down when at the top of the page
    if (scrollTop.current === 0 && deltaY > 0) {
      // Apply resistance to make the pull feel more natural
      const resistance = 0.4;
      const newPullY = Math.min(pullDistance * 1.5, deltaY * resistance);
      setPullY(newPullY);
      
      // Prevent default scrolling when we're handling the pull
      e.preventDefault();
    }
  };

  const handleTouchEnd = async () => {
    if (!isPulling || refreshing) return;
    
    // If pulled enough, trigger refresh
    if (pullY >= pullDistance) {
      setRefreshing(true);
      try {
        await onRefresh();
      } finally {
        setTimeout(() => {
          setRefreshing(false);
          setPullY(0);
        }, 1000); // Minimum time to show the refresh indicator
      }
    } else {
      // Not pulled enough, reset
      setPullY(0);
    }
    
    setIsPulling(false);
  };

  useEffect(() => {
    document.addEventListener("touchstart", handleTouchStart);
    document.addEventListener("touchmove", handleTouchMove, { passive: false });
    document.addEventListener("touchend", handleTouchEnd);
    
    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isPulling, pullY, refreshing]);

  return (
    <div className="relative min-h-full">
      {/* Pull indicator */}
      <motion.div
        className={`absolute left-0 right-0 flex justify-center items-center ${backgroundColor} z-10 overflow-hidden`}
        style={{
          height: refreshing ? `${pullDistance}px` : `${pullY}px`,
          top: -pullDistance,
        }}
        animate={{ 
          y: refreshing ? pullDistance : pullY 
        }}
        transition={{ 
          type: "spring", 
          stiffness: 200, 
          damping: 20 
        }}
      >
        {refreshing ? (
          <Loader2 className={`animate-spin ${colorIndicator}`} size={24} />
        ) : (
          <motion.div
            animate={{ 
              rotate: Math.min(180 * (pullY / pullDistance), 180) 
            }}
            className={colorIndicator}
          >
            ↓
          </motion.div>
        )}
      </motion.div>
      
      {/* Content */}
      <motion.div
        animate={{ 
          y: refreshing ? pullDistance : pullY 
        }}
        transition={{ 
          type: "spring", 
          stiffness: 200, 
          damping: 20 
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default PullToRefresh;
