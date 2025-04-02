import { useEffect, useState, useRef } from "react";
import type { Counter } from "@/types/Counter";

export function Counter({ value, duration = 2000, start = 0, decimals = 0 }: Counter ) {
    const [count, setCount] = useState<number>(0);
    const countRef = useRef<number>(0);
    const [shouldStart, setShouldStart] = useState(start === 0);
  
    useEffect(() => {
      if (start > 0) {
        const timer = setTimeout(() => {
          setShouldStart(true);
        }, start * 1000);
        
        return () => clearTimeout(timer);
      }
    }, [start]);

    useEffect(() => {
      if (!shouldStart) return;

      let animationFrameId: number;
      let startTime: number | null = null;
      const startValue: number = countRef.current;
  
      const step = (timestamp: number): void => {
        if (!startTime) startTime = timestamp;
        const elapsedTime = timestamp - startTime;
        const progress: number = Math.min(elapsedTime / duration, 1);

        const easedProgress = 1 - Math.pow(1 - progress, 3);
        const currentCount: number = 
          startValue + (value - startValue) * easedProgress;
  
        setCount(currentCount);
  
        if (progress < 1) {
          animationFrameId = requestAnimationFrame(step);
        } else {
          countRef.current = value;
        }
      };
  
      animationFrameId = requestAnimationFrame(step);
  
      return () => {
        cancelAnimationFrame(animationFrameId);
      };
    }, [value, duration, shouldStart]);
  
    return count.toFixed(decimals);
}