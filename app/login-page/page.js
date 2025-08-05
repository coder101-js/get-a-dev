"use client";
import { useSession, signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ProfileList from "../components/ProfileList";
import Footer from '../components/Footer';
import Ceo from '../components/Ceo';
import Link from "next/link";
import Image from "next/image";

export default function Page() {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (session?.user?.email) {
      const sendUserToBackend = async () => {
        try {
          const res = await fetch("api/user/oauth", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: session.user.name,
              email: session.user.email,
              image: session.user.image,
            }),
          });

          const data = await res.json();
          console.log("✅ User sent to backend:", data);
        } catch (error) {
          console.error("❌ Failed to send user to backend:", error);
        }
      };

      sendUserToBackend();
    }
  }, [session]);

  if (status === "loading") return null;

  if (!session) {
    return (
      <section className="w-full min-h-screen bg-gray-900">
        <div className="w-full h-10 bg-gray-800">
          <div className="flex">
            <div className="flex items-center">
              <Image
                className="rounded-full ml-2"
                src="/butt.png"
                width={40}
                height={40}
                alt="Logo"
              />
              <h1 className="ml-4 text-white text-[20px] font-extrabold">
                Get-a-Developer
              </h1>
            </div>
          </div>
        </div>
        <div className="w-full max-w-md mt-10 mx-auto h-auto rounded-[10px] p-6 flex flex-col items-center">
          <p className="text-[30px] text-white font-bold text-center mb-5">
            Continue with:
          </p>
          <button
            onClick={() => signIn("github")}
            className="w-full flex items-center justify-center gap-2 px-4 py-2
             bg-black text-white rounded mt-3 font-semibold transition hover:bg-gray-950"
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M12 .5a12 12 0 00-3.8 23.4c.6.1.8-.2.8-.5v-2c-3.3.7-4-1.6-4-1.6-.5-1.3-1.2-1.6-1.2-1.6-1-.7.1-.7.1-.7 1.1.1 1.7 1.1 1.7 1.1 1 .1.9 1.6 1.9 2 .4-.3.8-.6 1.1-.9-2.6-.3-5.3-1.3-5.3-5.9a4.7 4.7 0 011.2-3.3 4.4 4.4 0 01.1-3.3s1-.3 3.4 1.2a11.8 11.8 0 016.3 0c2.3-1.5 3.3-1.2 3.3-1.2a4.4 4.4 0 01.1 3.3 4.6 4.6 0 011.2 3.3c0 4.6-2.7 5.6-5.3 5.9.5.4 1 .9 1 1.9v2.9c0 .3.2.6.8.5A12 12 0 0012 .5z"
                clipRule="evenodd"
              />
            </svg>
            Sign in with GitHub
          </button>

          <button
            onClick={() => signIn("google")}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-800
             text-white rounded mt-3 font-semibold transition hover:bg-blue-700"
          >
            <svg
              className="w-5 h-5"
              viewBox="0 0 533.5 544.3"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M533.5 278.4c0-17.4-1.5-35-4.8-51.8H272v98.2h147.3c-6.4 34-25.6 62.8-54.7 82.2v68h88.4c51.7-47.6 80.5-117.6 80.5-196.6z"
                fill="#4285F4"
              />
              <path
                d="M272 544.3c73.5 0 135.2-24.5 180.3-66.7l-88.4-68c-24.6 16.5-56.2 26-91.9 26-70.7 0-130.6-47.9-152-112.2H28.1v70.5a272 272 0 00243.9 150.4z"
                fill="#34A853"
              />
              <path
                d="M120 323.3c-10.6-31.7-10.6-66.3 0-98L28 154.8A272.5 272.5 0 000 272c0 43.1 10 83.8 28 117.2l92-65.9z"
                fill="#FBBC05"
              />
              <path
                d="M272 107.7c39.9 0 75.8 13.7 104.1 40.7l78.1-78.1C407 24.4 345.4 0 272 0A272 272 0 0028 154.8l92 70.5C141.3 155.7 201.3 107.7 272 107.7z"
                fill="#EA4335"
              />
            </svg>
            Sign in with Google
          </button>
        </div>
      </section>
    );
  }

  return (
    <>
      <Navbar />
<div
  className="relative w-full mt-10 rounded-xl overflow-hidden 
  bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 shadow-lg"
>
  <div className="px-8 py-6 backdrop-blur-sm bg-black/20 flex items-center justify-between">
    <div>
      <h1 className="text-white text-3xl font-bold">
        Welcome back,
        <span className="text-blue-400 ml-2">{session.user.name}</span>
      </h1>
      <p className="text-gray-400 text-sm mt-1 mb-5">
        Lets continue building something great.
      </p>
      <Link href="/profile">
      <button className="bg-blue-700 px-4 py-2 rounded-[5px]
      hover:bg-blue-800 active:bg-blue-800 transition text-white font-bold">Make your Profile</button></Link>
    </div>
  </div>
</div>

<section>
  <div className="mt-15">
  <ProfileList/>
  </div>
</section>
<Ceo/>
<Footer/>
    </>
  );
}
