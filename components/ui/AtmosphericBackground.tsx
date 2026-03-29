"use client";

import { useEffect } from "react";

export function AtmosphericBackground() {
  useEffect(() => {
    const handleScroll = () => {
      const orb = document.getElementById("scroll-orb");
      if (orb) {
        const offset = window.scrollY * 0.2;
        orb.style.transform = `translateY(${offset}px)`;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Fixed gradient mesh */}
      <div className="fixed inset-0 -z-20 bg-[#030303]">
        {/* Animated orb 1 — cyan, top left */}
        <div
          className="absolute -top-40 -left-40 w-[700px] h-[700px] rounded-full opacity-[0.07]"
          style={{
            background: "radial-gradient(circle, #00d4ff 0%, transparent 70%)",
            animation: "orb1 20s ease-in-out infinite alternate",
          }}
        />
        {/* Animated orb 2 — violet, bottom right */}
        <div
          className="absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full opacity-[0.06]"
          style={{
            background: "radial-gradient(circle, #7c3aed 0%, transparent 70%)",
            animation: "orb2 25s ease-in-out infinite alternate",
          }}
        />
        {/* Animated orb 3 — cyan, center right — reacts to scroll */}
        <div
          id="scroll-orb"
          className="absolute top-1/2 right-0 w-[400px] h-[400px] rounded-full opacity-[0.04]"
          style={{
            background: "radial-gradient(circle, #00d4ff 0%, transparent 70%)",
          }}
        />
      </div>

      {/* Grain overlay */}
      <div
        className="fixed inset-0 -z-10 pointer-events-none opacity-[0.4]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.15'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px 128px",
        }}
      />
    </>
  );
}
