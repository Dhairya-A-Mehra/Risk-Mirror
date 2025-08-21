// web_app/components/RainRipples.tsx
"use client";
import React, { useEffect, useState } from "react";

interface Ripple {
  id: number;
  x: number;
  y: number;
}

export default function RainRipples() {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const id = Date.now();
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight;
      setRipples((prev) => [...prev, { id, x, y }].slice(-20)); // keep last 20 ripples
    }, 600);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none -z-10">
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          style={{
            left: ripple.x,
            top: ripple.y,
            position: "absolute",
            width: 60,
            height: 60,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(59,130,246,0.18) 0%, rgba(59,130,246,0) 70%)",
            animation: "ripple-fade 1.8s linear forwards",
          }}
        />
      ))}
      <style>{`
        @keyframes ripple-fade {
          0% { transform: scale(0.5); opacity: 1; }
          80% { transform: scale(1.2); opacity: 0.5; }
          100% { transform: scale(1.8); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
