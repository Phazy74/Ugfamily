"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

// --- SVG Icon Component ---
const AsteriskIcon = () => (
    <svg className="w-5 h-5 text-[var(--lemon)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 3L12 8L14 3M10 21L12 16L14 21M3 10L8 12L3 14M21 10L16 12L21 14"></path></svg>
);

export default function CtaSection() {
  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Main dark green container */}
        <div className="relative bg-[var(--darkgreen)] text-white rounded-3xl overflow-hidden">
          {/* Subtle background grid pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-20"></div>

          {/* Decorative yellow dot */}
          <div className="absolute -top-3 -left-3 w-8 h-8 bg-[var(--lemon)] rounded-full opacity-30"></div>

          {/* Content Grid */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center p-8 md:p-16">
            
            {/* Left Column: Image */}
            <div className="flex items-center justify-center">
              <Image
                src="https://res.cloudinary.com/dastvrhur/image/upload/v1765380440/cta-box-image_1_xsexdm.jpg"
                alt="Financial App on Phone"
                width={350}
                height={700}
                className="w-auto h-auto max-w-xs md:max-w-sm"
              />
            </div>

            {/* Right Column: Text and Buttons */}
            <div>
              <div className="flex items-center space-x-2">
                <AsteriskIcon />
                <p className="text-sm font-semibold text-gray-300">FDIC-Insured - Backed By The Full Faith And Credit Of The U.S. Government</p>
              </div>
              <h2 className="mt-4 text-4xl md:text-5xl font-bold leading-tight">
                Take control of your financial future today!
              </h2>
              <p className="mt-6 text-lg text-gray-300 leading-relaxed">
                We've made it easy for GreenTop Bank employees to harness their creativity, bring their ideas to life, and solve customer and colleague problems.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/register" className="bg-[var(--lemon)] text-[var(--darkgreen)] font-bold px-6 py-3 rounded-full transition-transform hover:scale-105">
                  Get Started Today
                </Link>
                <Link href="/about" className="bg-white/10 text-white font-bold px-6 py-3 rounded-full border border-white/20 hover:bg-white/20 transition-colors">
                  Explore Our Services
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}