"use client";

import React, { useState, useEffect } from "react";
import Navbar from '../components/Navbar';

const Reviews = () => {

  const [formData, setFormData] = useState({ Name: "", Message: "" });
  const [responseMsg, setResponseMsg] = useState("");
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch("/api/reviews");
        const data = await res.json();
        setReviews(data);
      } catch (err) {
        console.error("Error fetching reviews:", err);
      }
    };

    fetchReviews();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      Name: formData.Name,
      Review: formData.Review,
    };

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      setResponseMsg(data.message || "✅ Sent!");
      setFormData((prev) => ({ ...prev, Review: "" }));
      setReviews((prev) => [payload, ...prev]);
    } catch (err) {
      setResponseMsg("❌ Error sending message.");
    }

    setTimeout(() => setResponseMsg(""), 3000);
  };

  return (
    <>
    <Navbar/>
    <section className="bg-gray-900 text-gray-100 py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12">Community Reviews</h1>

        {/* Reviews Display */}
        <div className="bg-gray-800 rounded-xl p-6 mb-12 shadow-md">
          <h2 className="text-2xl font-semibold mb-4">What Others Say</h2>
          <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
            {reviews.length > 0 ? (
              reviews.map((review, index) => (
                <div
                  key={index}
                  className="bg-gray-700 p-4 rounded-lg transition hover:bg-gray-600"
                >
                  <p className="font-bold text-blue-400">{review.Name}</p>
                  <p className="text-gray-200 mt-1">{review.Review}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-400">No reviews yet.</p>
            )}
          </div>
        </div>

        {/* Review Form */}
        <div className="bg-gray-800 rounded-xl p-6 shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Leave Your Review</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm text-gray-300 mb-1">Name</label>
              <input
                type="text"
                name="Name"
                value={formData.Name}
                onChange={handleChange}
                placeholder="Enter your Name"
                className="w-full bg-gray-700 border border-gray-600 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-1">Message</label>
              <textarea
                name="Review"
                placeholder="Enter your Review"
                onChange={handleChange}
                value={formData.Review}
                required
                rows="4"
                className="w-full bg-gray-700 border border-gray-600 text-white px-4 py-2 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition"
            >
              Submit Review
            </button>
          </form>
          {responseMsg && (
            <p className="mt-4 text-center text-sm text-green-400 font-medium">
              {responseMsg}
            </p>
          )}
        </div>
      </div>
    </section>
    </>
  );
};

export default Reviews;
