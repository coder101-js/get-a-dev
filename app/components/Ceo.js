"use client";
import React from "react";
import { Typewriter } from "react-simple-typewriter";
import Link from "next/link";
import { User2 } from "lucide-react";

const Ceo = () => {
  return (
    <section className="w-full py-8 px-4 text-white">
      <div className="w-full max-w-5xl mx-auto bg-gray-800 bg-opacity-90 rounded-3xl shadow-xl p-10 border border-gray-700">
        <div className="mb-8 text-center">
          <h1 className="text-5xl font-bold tracking-wide">CEO Message</h1>
          <div className="w-24 h-1 bg-blue-500 mx-auto mt-3 rounded-full" />
        </div>

        <p className="text-[18px] text-gray-300 leading-8 text-justify">
          <Typewriter
            words={[
              "As CEO of Butt Networks and Get-a-Developer, I’m proud to lead two platforms empowering businesses through modern web development and developer hiring. We deliver quality websites and connect clients with skilled developers—fast, reliable, and built for the future."
            ]}
            typeSpeed={35}
            deleteSpeed={0}
            delaySpeed={99999999}
            cursor
            cursorStyle="|"
          />
        </p>

        {/* Review Message + Button */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <h1 className="text-base font-extrabold sm:text-lg text-gray-400">
            Go to the Review Section and share your thoughts about our website.
          </h1>
          <Link href="/reviews">
            <button className="bg-purple-700 hover:bg-purple-800 text-white px-5 py-2 rounded-lg transition duration-200">
              Give Review
            </button>
          </Link>
        </div>

        {/* CEO Signature */}
        <div className="mt-10 flex items-center justify-end text-right">
          <div>
            <h2 className="text-lg text-blue-400 font-semibold">Shahnawaz Saddam Butt</h2>
            <p className="text-sm text-gray-400">CEO, Butt Networks & Get-a-Developer</p>
          </div>
          <User2 className="ml-3 text-blue-400 w-8 h-8" />
        </div>
        <div className="mt-10 flex items-center justify-end text-right">
          <div>
            <h2 className="text-lg text-blue-400 font-semibold">Wahb Amir</h2>
            <p className="text-sm text-gray-400">CEO, Butt Networks & Get-a-Developer</p>
          </div>
          <User2 className="ml-3 text-blue-400 w-8 h-8" />
        </div>

        {/* Buttons Section */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6 text-center">
          <div>
            <h2 className="text-xl font-semibold mb-2 text-gray-300">View Butt Networks</h2>
            <Link href="https://buttnetworks.com/" target="_blank">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg">
                Visit Site
              </button>
            </Link>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2 text-gray-300">View My Personal Profile</h2>
            <Link href="https://shahnawaz.buttnetworks.com/" target="_blank">
              <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg">
                Visit Profile
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Ceo;
