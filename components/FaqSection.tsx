"use client";

import React from 'react';
import Link from 'next/link';

// --- SVG Icon Components ---
const AsteriskIcon = () => (
    <svg className="w-5 h-5 text-[var(--darkgreen)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 3L12 8L14 3M10 21L12 16L14 21M3 10L8 12L3 14M21 10L16 12L21 14"></path></svg>
);
const ArrowIcon = () => (
    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
);

// --- Data for the FAQ items ---
const faqData = [
    {
        question: "How do I register for mobile banking at Swiss Community Bank?",
        answer: (
            <ul className="list-disc list-inside space-y-2">
                <li>If you are enrolled in Online Banking, simply use your user name and password to log in to your accounts through the Swiss Community Bank Savings app.</li>
                <li>After logging in, Android® and iPhone® users may also enroll in the Swiss Community Bank Savings Mobile Deposit service to deposit checks using the mobile app.</li>
                <li>To enroll, select Mobile Deposit from the Main Menu, then review and accept the If you are not currently registered for Online Banking, <Link href="/register" className="text-blue-600 font-semibold hover:underline">sign up online</Link>.</li>
            </ul>
        )
    },
    {
        question: "What is Mobile Deposit?",
        answer: (
            <p>
                Our Mobile Deposit allows you to deposit a check through the Swiss Community Bank Savings mobile app using your internet-enabled iPhone® or Android™ mobile device, provided your device has a camera. You must be an Online or Mobile banking customer, and enrolled in the Swiss Community Bank Savings Mobile Deposit service. In the Swiss Community Bank Savings mobile app, select "Mobile Deposit," then follow the steps to enroll or deposit a check.
            </p>
        )
    }
];

export default function FaqSection() {
  return (
    <section className="bg-[#fafafa] py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* --- Header Section --- */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-16">
          {/* Left Column */}
          <div>
            <div className="flex items-center space-x-2">
              <AsteriskIcon />
              <p className="text-base font-semibold text-[var(--darkgreen)]">Frequently Asked Questions</p>
            </div>
            <h1 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight text-[var(--darkgreen)] leading-tight">
              Common business & finance<br />questions and answers
            </h1>
          </div>
          {/* Right Column (Button) */}
          <div className="flex-shrink-0">
            <Link href="/contact" className="inline-flex items-center bg-[var(--lemon)] text-[var(--darkgreen)] font-bold px-6 py-3 rounded-full transition-transform hover:scale-105">
              Contact Now <ArrowIcon />
            </Link>
          </div>
        </div>

        {/* --- FAQ Grid --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-10">
            {faqData.map((item, index) => (
                <div key={index} className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-[var(--lemon)] text-[var(--darkgreen)] font-bold text-xl">
                        ?
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-[var(--darkgreen)]">{item.question}</h3>
                        <div className="mt-2 text-[var(--ptext)] leading-relaxed">
                            {item.answer}
                        </div>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </section>
  );
}