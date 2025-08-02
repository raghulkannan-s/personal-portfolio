'use client';

import { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState('default');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const mouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };

    const mouseEnter = () => setIsVisible(true);
    const mouseLeave = () => setIsVisible(false);

    const mouseEnterLink = () => setCursorVariant('link');
    const mouseLeaveLink = () => setCursorVariant('default');

    // Add event listeners
    document.addEventListener('mousemove', mouseMove);
    document.addEventListener('mouseenter', mouseEnter);
    document.addEventListener('mouseleave', mouseLeave);

    // Add hover effects for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, input, textarea, select, [role="button"]');
    
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', mouseEnterLink);
      el.addEventListener('mouseleave', mouseLeaveLink);
    });

    return () => {
      document.removeEventListener('mousemove', mouseMove);
      document.removeEventListener('mouseenter', mouseEnter);
      document.removeEventListener('mouseleave', mouseLeave);
      
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', mouseEnterLink);
        el.removeEventListener('mouseleave', mouseLeaveLink);
      });
    };
  }, []);

  const variants = {
    default: {
      x: mousePosition.x - 6,
      y: mousePosition.y - 6,
      scale: 1,
    },
    link: {
      x: mousePosition.x - 8,
      y: mousePosition.y - 8,
      scale: 1.3,
    }
  };

  const followerVariants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
    },
    link: {
      x: mousePosition.x - 20,
      y: mousePosition.y - 20,
    }
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Main cursor - Premium pointy arrow */}
      <div
        className="fixed pointer-events-none z-[9999] transition-all duration-150 ease-out"
        style={{
          left: 0,
          top: 0,
          transform: `translate3d(${variants[cursorVariant].x}px, ${variants[cursorVariant].y}px, 0) scale(${variants[cursorVariant].scale})`,
          width: '0',
          height: '0',
          borderLeft: '8px solid transparent',
          borderRight: '8px solid transparent',
          borderBottom: `14px solid rgb(${getComputedStyle(document.documentElement).getPropertyValue('--accent').trim()})`,
          filter: `drop-shadow(0 0 ${cursorVariant === 'link' ? '12px' : '6px'} rgba(255, 215, 0, ${cursorVariant === 'link' ? '0.8' : '0.4'}))`,
          transform: `translate3d(${variants[cursorVariant].x}px, ${variants[cursorVariant].y}px, 0) scale(${variants[cursorVariant].scale}) rotate(-45deg)`,
        }}
      />
      
      {/* Cursor trail - Elegant glow */}
      <div
        className="fixed pointer-events-none z-[9998] transition-all duration-500 ease-out"
        style={{
          left: 0,
          top: 0,
          transform: `translate3d(${followerVariants[cursorVariant].x}px, ${followerVariants[cursorVariant].y}px, 0) scale(${cursorVariant === 'link' ? '1.4' : '1'})`,
          width: '24px',
          height: '24px',
          border: `2px solid rgba(255, 215, 0, ${cursorVariant === 'link' ? '0.6' : '0.25'})`,
          borderRadius: '50%',
          background: cursorVariant === 'link' ? 'rgba(255, 215, 0, 0.15)' : 'rgba(255, 215, 0, 0.05)',
        }}
      />
    </>
  );
}