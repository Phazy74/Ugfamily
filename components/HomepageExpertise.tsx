"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// ... (all the SVG icon components remain the same)
const AsteriskIcon = () => (
    <svg className="w-5 h-5 text-[var(--darkgreen)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 3L12 8L14 3M10 21L12 16L14 21M3 10L8 12L3 14M21 10L16 12L21 14"></path></svg>
);
const IconInvestment = () => <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>;
const IconSocialSecurity = () => <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>;
const IconBusinessFinancial = () => <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m-1 4h1m5-4h1m-1 4h1"></path></svg>;

// ... (the expertiseData array remains the same)
const expertiseData = [
  {
    tabName: 'Financial Planning',
    title: 'Benefits Of Our Financial:',
    description: 'Empower your financial journey with expert advice, personalized strategies, and solutions designed to help you achieve long-term stability, growth, and peace of mind.',
    features: [
      { text: 'Expert Investment Management', icon: <IconInvestment /> },
      { text: 'Social Security And Pension Optimization', icon: <IconSocialSecurity /> },
      { text: 'Business Financial Planning', icon: <IconBusinessFinancial /> },
    ],
    imageSrc: 'https://res.cloudinary.com/dastvrhur/image/upload/v1765374914/expertise-financial-img_qtjnj4.jpg',
    contactHref: '/contact/financial-planning',
  },
  {
    tabName: 'Business Consulting',
    title: 'Benefits Of Our Consulting:',
    description: 'Drive your business forward with strategic insights, operational improvements, and data-driven guidance to maximize profitability and market position.',
    features: [
        { text: 'Market Entry Strategy', icon: <IconInvestment /> },
        { text: 'Operational Efficiency', icon: <IconSocialSecurity /> },
        { text: 'Growth Hacking', icon: <IconBusinessFinancial /> },
    ],
    imageSrc: 'https://res.cloudinary.com/dastvrhur/image/upload/v1765374914/expertise-financial-img_qtjnj4.jpg',
    contactHref: '/contact/business-consulting',
  },
];


// MODIFIED: Renamed the function to HomepageExpertise
export default function HomepageExpertise() {
  const [activeTab, setActiveTab] = useState('Financial Planning');
  const currentContent = expertiseData.find(item => item.tabName === activeTab);

  const allTabs = ['Financial Planning', 'Business Consulting', 'Risk Management', 'Investment Management'];

  // ... (the rest of the return JSX remains exactly the same)
  return (
    <section className="bg-[#fafafa] py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-10 mb-16">
          <div>
            <div className="flex items-center space-x-2">
              <AsteriskIcon />
              <p className="text-base font-semibold text-[var(--darkgreen)]">Our Expertise</p>
            </div>
            <h1 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight text-[var(--darkgreen)] leading-tight">
              Driving innovation and success in Industry Insights
            </h1>
          </div>
          <div className="lg:pt-16">
            <p className="text-lg text-[var(--ptext)] leading-relaxed">
              Swiss Community Bank Savings Invent is our enterprise approach to innovation and supports our business strategy as a forward-focused bank. It's about using emerging technology to engage with our customers and exceeding their rapidly evolving expectations.
            </p>
          </div>
        </div>
        {/* Interactive Tabs */}
        <div className="flex flex-wrap gap-4 mb-12">
          {allTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-full text-sm font-semibold transition-colors duration-300 ease-in-out
                ${activeTab === tab 
                  ? 'bg-[var(--darkgreen)] text-white' 
                  : 'bg-white text-[var(--darkgreen)] hover:bg-[var(--darkgreen)] hover:text-white shadow-sm'
                }`}
            >
              {tab}
            </button>
          ))}
        </div>
        {/* Dynamic Content Section */}
        {currentContent && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-10 items-center">
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h2 className="text-2xl font-bold text-[var(--darkgreen)]">{currentContent.title}</h2>
              <p className="mt-4 text-[var(--ptext)]">{currentContent.description}</p>
              <ul className="mt-6 space-y-5">
                {currentContent.features.map((feature) => (
                  <li key={feature.text} className="flex items-center gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-[#fafafa] rounded-lg flex items-center justify-center">{feature.icon}</div>
                    <span className="font-semibold text-gray-700">{feature.text}</span>
                  </li>
                ))}
              </ul>
              <Link href="/contact" className="inline-flex items-center gap-2 mt-8 bg-[var(--lemon)] text-[var(--darkgreen)] font-bold px-6 py-3 rounded-full transition-transform hover:scale-105">
                Contact Now →
              </Link>
            </div>
            <div className="w-full h-[500px] relative">
              <Image src={currentContent.imageSrc} alt={currentContent.tabName} fill className="rounded-2xl object-cover shadow-lg" />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}