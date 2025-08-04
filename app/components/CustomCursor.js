'use client';

import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';

export default function CustomCursor() {
  const { theme } = useTheme();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState('default');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const mouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const mouseEnter = () => setIsVisible(true);
    const mouseLeave = () => setIsVisible(false);
    const mouseEnterLink = () => setCursorVariant('link');
    const mouseLeaveLink = () => setCursorVariant('default');

    document.addEventListener('mousemove', mouseMove);
    document.addEventListener('mouseenter', mouseEnter);
    document.addEventListener('mouseleave', mouseLeave);

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
      scale: 1.2,
    }
  };

  const followerVariants = {
    default: {
      x: mousePosition.x - 12,
      y: mousePosition.y - 12,
    },
    link: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
    }
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Main cursor */}
      <div
        className={`fixed pointer-events-none z-[9999] transition-all duration-150 ease-out ${
          theme === 'light' ? 'cursor-light' : 'cursor-dark'
        }`}
        style={{
          left: 0,
          top: 0,
          transform: `translate3d(${variants[cursorVariant].x}px, ${variants[cursorVariant].y}px, 0) scale(${variants[cursorVariant].scale})`,
          width: '12px',
          height: '12px',
          borderRadius: '50%',
        }}
      />
      
      {/* Cursor trail */}
      <div
        className={`fixed pointer-events-none z-[9998] transition-all duration-300 ease-out ${
          theme === 'light' ? 'cursor-trail-light' : 'cursor-trail-dark'
        }`}
        style={{
          left: 0,
          top: 0,
          transform: `translate3d(${followerVariants[cursorVariant].x}px, ${followerVariants[cursorVariant].y}px, 0) scale(${cursorVariant === 'link' ? '1.3' : '1'})`,
          width: '24px',
          height: '24px',
          borderRadius: '50%',
        }}
      />
    </>
  );
}