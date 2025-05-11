
import React, { ReactElement } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { ResponsiveContainer } from "recharts";

interface ResponsiveChartContainerProps {
  children: ReactElement;
  desktopHeight?: number | string;
  mobileHeight?: number | string;
  aspectRatio?: number;
}

const ResponsiveChartContainer: React.FC<ResponsiveChartContainerProps> = ({
  children,
  desktopHeight = 300,
  mobileHeight = 200,
  aspectRatio,
}) => {
  const isMobile = useIsMobile();
  const height = isMobile ? mobileHeight : desktopHeight;
  
  return (
    <div 
      className="w-full" 
      style={{ 
        height: typeof height === "number" ? `${height}px` : height,
      }}
    >
      <ResponsiveContainer width="100%" height="100%" aspect={aspectRatio}>
        {children}
      </ResponsiveContainer>
    </div>
  );
};

export default ResponsiveChartContainer;
