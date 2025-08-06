"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import { useSession } from "next-auth/react";

const ProfileForm = () => {
  const [formData, setFormData] = useState({
    _id: "",
    Name: "",
    ImageURL: "",
    Skills: "",
    Role: "",
    Projects: "",
    Price: "",
    Portfolio: "",
    Contact_Details: "",
  });

  const [expanded, setExpanded] = useState({});
  const [profileExists, setProfileExists] = useState(false);
  const [responseMsg, setResponseMsg] = useState("");
  const [loading, setLoading] = useState(true);

  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/profile?email=${session?.user?.email}`);

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const text = await res.text();
        const data = text ? JSON.parse(text) : null;

        if (data && data._id) {
          setFormData(data);
          setProfileExists(true);
        } else {
          setFormData({
            _id: "",
            Name: "",
            ImageURL: "",
            Skills: "",
            Role: "",
            Projects: "",
            Price: "",
            Portfolio: "",
            Contact_Details: "",
          });
          setProfileExists(false);
        }
      } catch (err) {
        console.error("Failed to fetch profile:", err);
      } finally {
        setLoading(false);
      }
    };

    if (session?.user?.email) {
      fetchProfile();
    }
  }, [session, pathname]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isEdit = !!formData._id;

    try {
      const payload = { ...formData, email: session?.user?.email };

      const res = await fetch(
        isEdit
          ? `api/profile/${formData._id}`
          : "api/profile",
        {
          method: isEdit ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();
      setResponseMsg(
        data.message || (isEdit ? "✅ Profile Updated!" : "✅ Profile Created!")
      );
      setProfileExists(true);
      setTimeout(() => setResponseMsg(""), 2000);
      router.refresh();
    } catch (err) {
      setResponseMsg("❌ Error saving profile.");
    }
  };

  const handleDelete = async () => {
    if (!formData._id) return;
    if (!confirm("Are you sure you want to delete this profile?")) return;

    try {
      await fetch(`api/profile/${formData._id}`, {
        method: "DELETE",
      });

      setFormData({
        _id: "",
        Name: "",
        ImageURL: "",
        Skills: "",
        Role: "",
        Projects: "",
        Price: "",
        Portfolio: "",
        Contact_Details: "",
      });

      setProfileExists(false);
      setResponseMsg("🗑️ Profile deleted!");
      setTimeout(() => {
        setResponseMsg("");
        router.refresh();
      }, 1500);
    } catch (error) {
      setResponseMsg("❌ Failed to delete profile.");
    }
  };

  const toggleExpanded = (key) => {
    setExpanded((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  if (loading) {
    return (
      <div className="text-center text-white mt-10">
        <p>Loading profile...</p>
      </div>
    );
  }

  return (
    <section className="mt-13 sm:mt-1">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl mt-5 font-bold text-center text-white">
          {profileExists ? "Your Profile" : "Make your Profile Setup"}
        </h1>

        {profileExists ? (
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-2xl mt-6 shadow-2xl border border-gray-700 text-white space-y-4">
            <div className="flex flex-col items-center space-y-3">
              <Image
                src={
                  typeof formData.ImageURL === 'string' &&
                    (formData.ImageURL.startsWith('http') || formData.ImageURL.startsWith('/'))
                    ? formData.ImageURL
                    : '/default-profile.png'
                }
                alt="Profile Image"
                width={100}
                height={100}
                className="rounded-full object-cover"
              />


              <h2 className="text-xl font-bold">{formData.Name}</h2>
              <p className="text-sm text-gray-400">{formData.Role}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm font-medium">
              <div
                className="bg-gray-700 p-3 rounded-lg col-span-2 cursor-pointer"
                onClick={() => toggleExpanded("Skills")}
                title="Click to expand/collapse"
              >
                <strong>💼 Skills:</strong>
                <p
                  className={`mt-1 ml-2 text-sm ${expanded["Skills"] ? "whitespace-normal" : "truncate"
                    } overflow-hidden text-ellipsis`}
                >
                  {formData.Skills}
                </p>
              </div>

              <p className="bg-gray-700 p-3 rounded-lg">
                <strong>💵 Price:</strong> ${formData.Price}
              </p>
              <p className="bg-gray-700 p-3 rounded-lg col-span-2">
                <strong>📁 Projects:</strong> {formData.Projects}
              </p>
              <p className="bg-gray-700 p-3 rounded-lg col-span-2">
                <strong>📞 Contact:</strong> {formData.Contact_Details}
              </p>
              {formData.Portfolio && (
                <p className="bg-gray-700 p-3 rounded-lg col-span-2">
                  <strong>🌐 Portfolio:</strong>{" "}
                  <a
                    href={
                      formData.Portfolio.startsWith("http")
                        ? formData.Portfolio
                        : `https://${formData.Portfolio}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 underline hover:text-blue-300"
                  >
                    {formData.Portfolio}
                  </a>
                </p>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-4">
              <button
                onClick={handleDelete}
                className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-semibold transition"
              >
                🗑️ Delete Profile
              </button>
              <Link href="/login-page" className="w-full">
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition">
                  🏠 Go to Home Page
                </button>
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 mt-6">
            {["Name", "ImageURL", "Skills", "Role", "Price", "Portfolio"].map((field) => (
              <input
                key={field}
                name={field}
                placeholder={`Your ${field}`}
                onChange={handleChange}
                value={formData[field]}
                required
                className="w-full border-b-2 border-gray-300 text-white bg-transparent focus:border-blue-500 px-2 py-2 outline-none transition duration-200"
              />
            ))}

            <textarea
              name="Projects"
              placeholder="Your Projects"
              onChange={handleChange}
              value={formData.Projects}
              required
              className="w-full border-b-2 border-gray-300 text-white bg-transparent focus:border-blue-500 px-2 py-2 outline-none transition duration-200"
            />

            <textarea
              name="Contact_Details"
              placeholder="Your Contact Details"
              onChange={handleChange}
              value={formData.Contact_Details}
              required
              rows="3"
              className="w-full border-b-2 border-gray-300 text-white bg-transparent focus:border-blue-500 px-2 py-2 outline-none transition duration-200"
            />

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
            >
              {formData._id ? "Update Profile" : "Save Profile"}
            </button>
          </form>
        )}

        {responseMsg && (
          <p className="mt-4 text-center text-sm text-green-500 font-medium">
            {responseMsg}
          </p>
        )}
      </div>
    </section>
  );
};

export default ProfileForm;
