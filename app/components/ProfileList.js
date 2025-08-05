"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Briefcase, DollarSign, Mail, Code2, Folder, Link as LinkIcon } from "lucide-react";

const ProfileList = () => {
  const { data: session } = useSession();
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expanded, setExpanded] = useState({});

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const res = await fetch("api/profile");
        if (!res.ok) throw new Error("Failed to fetch profiles");
        const data = await res.json();
        setProfiles(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProfiles();
  }, []);

  const toggleExpanded = (index, key) => {
    setExpanded((prev) => ({
      ...prev,
      [index]: {
        ...prev[index],
        [key]: !prev[index]?.[key],
      },
    }));
  };

  if (loading)
    return <p className="text-white text-center py-8">Loading profiles...</p>;
  if (error)
    return <p className="text-red-500 text-center py-8">❌ Error: {error}</p>;

  return (
    <section id="developers">
      <div className="min-h-screen py-12 px-4">
        <h1 className="text-4xl font-extrabold text-center text-white mb-12 drop-shadow-[0_1px_5px_rgba(59,130,246,0.5)]">
          💼 Hire a Developer
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
          {profiles.length === 0 ? (
            <p className="text-white text-center col-span-full">
              No profiles available.
            </p>
          ) : (
            profiles.map((p, i) => (
              <div
                key={p._id}
                className="bg-gradient-to-b from-[#1e293b] to-[#0f172a] rounded-3xl p-6 shadow-lg border border-blue-600 hover:border-blue-400 hover:shadow-blue-500/40 transition-all duration-300 group hover:scale-[1.02]"
              >
                <div className="flex justify-center mb-4">
                  <Image
                    src={
                      p.ImageURL?.startsWith('http') || p.ImageURL?.startsWith('/')
                        ? p.ImageURL
                        : '/default-profile.png'
                    }
                    alt={`${p.Name}'s profile`}
                    width={100}
                    height={100}
                    className="rounded-full"
                  />

                </div>

                {/* Name */}
                <div
                  className="flex items-center gap-4 mb-3 cursor-pointer"
                  onClick={() => toggleExpanded(i, "name")}
                >
                  <h2
                    className={`text-2xl font-extrabold text-white group-hover:text-blue-400 transition duration-200 ${expanded[i]?.name ? "" : "truncate max-w-[180px]"
                      }`}
                    title={p.Name}
                  >
                    {p.Name}
                  </h2>
                </div>

                {/* Role */}
                <InfoItem icon={<Briefcase size={18} />} label="Role" value={p.Role} />

                {/* Skills */}
                <div
                  className="flex items-start gap-3 mt-2 cursor-pointer"
                  onClick={() => toggleExpanded(i, "skills")}
                  title={p.Skills}
                >
                  <span className="bg-blue-500/10 text-blue-400 p-2 rounded-full">
                    <Code2 size={18} />
                  </span>
                  <div className="text-white text-sm font-semibold">
                    Skills:
                    {expanded[i]?.skills ? (
                      <ul className="list-disc pl-5 mt-1 text-blue-300 space-y-1">
                        {p.Skills.split(",").map((skill, idx) => (
                          <li key={idx}>{skill.trim()}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="truncate max-w-[200px] text-blue-300">
                        {p.Skills}
                      </p>
                    )}
                  </div>
                </div>

                {/* Projects */}
                <div
                  className="flex items-center gap-3 mt-2 cursor-pointer"
                  onClick={() => toggleExpanded(i, "projects")}
                  title={p.Projects}
                >
                  <span className="bg-blue-500/10 text-blue-400 p-2 rounded-full">
                    <Folder size={18} />
                  </span>
                  <p
                    className={`text-white font-semibold text-sm ${expanded[i]?.projects ? "" : "truncate max-w-[200px]"
                      }`}
                  >
                    Projects: <span className="text-blue-300">{p.Projects}</span>
                  </p>
                </div>

                {/* Price */}
                <InfoItem
                  icon={<DollarSign size={18} />}
                  label="Price"
                  value={`$${p.Price}`}
                />

                {/* Contact */}
                <div
                  className="flex items-center gap-3 cursor-pointer mt-3"
                  onClick={() => toggleExpanded(i, "email")}
                >
                  <span className="bg-blue-500/10 text-blue-400 p-2 rounded-full">
                    <Mail size={18} />
                  </span>
                  <p
                    className={`text-white font-semibold text-sm break-all ${expanded[i]?.email ? "" : "truncate max-w-[200px]"
                      }`}
                    title={p.Contact_Details}
                  >
                    Contact:{" "}
                    <span className="text-blue-300">{p.Contact_Details}</span>
                  </p>
                </div>

                {/* 🌐 Portfolio */}
                {p.Portfolio && (
                  <div className="flex items-center gap-3 mt-3">
                    <span className="bg-blue-500/10 text-blue-400 p-2 rounded-full">
                      <LinkIcon size={18} />
                    </span>
                    <a
                      href={p.Portfolio.startsWith("http") ? p.Portfolio : `https://${p.Portfolio}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-300 text-sm font-semibold underline break-all hover:text-blue-400 transition-all"
                    >
                      Visit Portfolio
                    </a>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

const InfoItem = ({ icon, label, value }) => (
  <div className="flex items-center gap-3 mt-2">
    <span className="bg-blue-500/10 text-blue-400 p-2 rounded-full">
      {icon}
    </span>
    <p className="text-white font-semibold text-sm">
      {label}: <span className="text-blue-300">{value}</span>
    </p>
  </div>
);

export default ProfileList;
