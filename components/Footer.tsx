"use client";

import React from 'react';
import Link from 'next/link';

// --- SVG Icon Components ---
const LocationIcon = () => (
    <svg className="w-5 h-5 mt-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 20l-4.95-6.05a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path></svg>
);
const MailIcon = () => (
    <svg className="w-5 h-5 mt-1" fill="currentColor" viewBox="0 0 20 20"><path d="M2.003 5.884L10 11.884l7.997-6M2 18h16a2 2 0 002-2V4a2 2 0 00-2-2H2a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
);

export default function Footer() {
  return (
    <footer className="bg-white pt-16 sm:pt-24 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="relative bg-[var(--darkgreen)] text-white rounded-3xl overflow-hidden px-8 py-12 md:p-16">
            {/* Subtle background grid pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-20"></div>

            <div className="relative z-10">
                {/* --- Top Section: Columns --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
                    {/* Column 1: Description */}
                    <div className="lg:col-span-2 text-gray-300 text-sm leading-relaxed">
                        <p>
                            Our objective is to be a primary contributing member of the diverse communities of Uptown, Chinatown, Des Plaines, Port Jervis (NYY), Stone Park, Wilmette and their neighboring communities. Our goal is to serve their consumer, commercial and retail needs while serving all ethnic backgrounds. By offering a varied staff of officers and employees we strive to provide services in related languages in a friendly, efficient and personal manner. Soundness, service and integrity are paramount.
                        </p>
                    </div>

                    {/* Column 2: Solutions */}
                    <div>
                        <h3 className="font-bold text-lg">Solutions</h3>
                        <ul className="mt-4 space-y-3 text-sm text-gray-300">
                            <li><Link href="#" className="hover:text-white transition-colors">Quick Account Opening</Link></li>
                            <li><Link href="/contact/general-inquiry" className="hover:text-white transition-colors">Contact Us</Link></li>
                            <li><Link href="/terms-of-use" className="hover:text-white transition-colors">Terms Of Service</Link></li>
                        </ul>
                    </div>

                    {/* Column 3: Loans & Insurance */}
                    <div>
                        <h3 className="font-bold text-lg">Loans & Insurance</h3>
                        <ul className="mt-4 space-y-3 text-sm text-gray-300">
                            <li><Link href="#" className="hover:text-white transition-colors">Business Loan</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Automobile Refinancing</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Mortgage Plans</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Core Insurance Program</Link></li>
                        </ul>
                    </div>

                    {/* Column 4: Contact Us */}
                    <div>
                        <h3 className="font-bold text-lg">Contact Us</h3>
                        <ul className="mt-4 space-y-4 text-sm text-gray-300">
                            <li className="flex gap-3">
                                <LocationIcon />
                                <span>Börsenstrasse 15 P.<br/>O. Box CH-8022 Zurich</span>
                            </li>
                            <li className="flex gap-3">
                                <MailIcon />
                                <a href="mailto:Support@uniongatebank.com" className="hover:text-white transition-colors">Support@ugfamily.com</a>
                            </li>
                             <li className="relative pl-8">
                                <div className="absolute left-0 top-1.5 w-3 h-3 bg-[var(--lemon)] rounded-full"></div>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* --- Bottom Section: Copyright & Socials --- */}
                <hr className="my-12 border-white/10" />
                <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
                    <p className="text-sm text-gray-400">Copyright © 2025 All Rights Reserved.</p>
                    <div className="flex items-center gap-4">
                        <Link href="#" aria-label="Facebook" className="w-8 h-8 rounded-full border border-[var(--lemon)]/50 hover:border-[var(--lemon)] transition-colors"></Link>
                        <Link href="#" aria-label="Twitter" className="w-8 h-8 rounded-full border border-[var(--lemon)]/50 hover:border-[var(--lemon)] transition-colors"></Link>
                        <Link href="#" aria-label="LinkedIn" className="w-8 h-8 rounded-full border border-[var(--lemon)]/50 hover:border-[var(--lemon)] transition-colors"></Link>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </footer>
  );
}