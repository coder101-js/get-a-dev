'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const Home = () => {
  const fullText = 'Welcome to Get-a-Developer';
  const [displayedText, setDisplayedText] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    let timeout;
    if (index < fullText.length) {
      timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + fullText[index]);
        setIndex(index + 1);
      }, 100);
    } else {
      timeout = setTimeout(() => {
        setDisplayedText('');
        setIndex(0);
      }, 200); 
    }
    return () => clearTimeout(timeout);
  }, [index]);

  return (
    <section className="text-white min-h-screen bg-gray-900">
      {/* Header */}
      <header className="bg-gray-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Get-a-Developer</h1>
          <Link href="/login-page">
            <button className="bg-blue-700 active:bg-blue-800 hover:bg-blue-800 
            text-white font-semibold px-5 py-2 rounded transition">
              Sign In
            </button>
          </Link>
        </div>
      </header>

      {/* Typewriter Hero Section */}
      <div className="flex justify-center items-center h-[100px] bg-gradient-to-br from-gray-800 to-gray-900 text-center">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-wide">
          {displayedText}
          <span className="animate-pulse text-blue-400">|</span>
        </h1>
      </div>

      {/* About Section */}
      <section className="py-12 px-6 bg-gray-900 cursor-pointer">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-blue-500 underline underline-offset-4">About</h2>
          <p className="text-gray-300 text-lg leading-relaxed sm:px-8">
            <strong className="text-white">Get-a-Developer</strong> is a specialized developer hiring agency dedicated
            to helping you find skilled, pre-vetted web developers for your projects — whether it’s a personal website,
            startup MVP, or enterprise-grade platform. Unlike general freelancing marketplaces, we focus exclusively on
            web development, ensuring every hire is both relevant and reliable. With a modern interface, streamlined
            matching, and secure project management tools, Get-a-Developer makes hiring fast, easy, and trustworthy.
            It is a project by Butt Networks.
          </p>
          <Link href='/login-page'>
          <button className='mt-5 bg-blue-700 hover:bg-blue-800
           active:bg-blue-800 h-10 w-[200px] rounded-[10px] transition
           font-semibold'>Sign in to apply</button></Link>
        </div>
      </section>
    </section>
  );
};

export default Home;
