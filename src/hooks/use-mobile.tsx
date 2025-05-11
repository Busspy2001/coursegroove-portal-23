
import * as React from "react";

const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined);

  React.useEffect(() => {
    // Check if window exists (for SSR safety)
    if (typeof window === "undefined") return;
    
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    
    // Modern event listener approach
    try {
      mql.addEventListener("change", onChange);
    } catch (e) {
      // Fallback for older browsers
      mql.addListener(onChange);
    }
    
    // Initial check
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    
    // Cleanup function
    return () => {
      try {
        mql.removeEventListener("change", onChange);
      } catch (e) {
        // Fallback cleanup for older browsers
        mql.removeListener(onChange);
      }
    };
  }, []);

  return !!isMobile;
}

// Additional hook to check device orientation
export function useOrientation() {
  const [orientation, setOrientation] = React.useState<"portrait" | "landscape">("portrait");

  React.useEffect(() => {
    // Check if window exists (for SSR safety)
    if (typeof window === "undefined") return;
    
    const updateOrientation = () => {
      const isPortrait = window.matchMedia("(orientation: portrait)").matches;
      setOrientation(isPortrait ? "portrait" : "landscape");
    };
    
    // Initial check
    updateOrientation();
    
    // Setup listeners
    window.addEventListener("resize", updateOrientation);
    window.addEventListener("orientationchange", updateOrientation);
    
    // Cleanup
    return () => {
      window.removeEventListener("resize", updateOrientation);
      window.removeEventListener("orientationchange", updateOrientation);
    };
  }, []);
  
  return orientation;
}
