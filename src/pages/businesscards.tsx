import React, { useState, useEffect } from "react";

interface PersonalCardData {
  id: number;
  type: "personal";
  name: string;
  jobRole: string;
  email: string;
  phone: string;
  domain: string;
  profilePicture: string;
}

interface ProjectCardData {
  id: number;
  type: "projects";
  title: string;
  description: string;
  project1: string;
  project2: string;
  project3: string;
  portfolioUrl: string;
  profilePicture: string;
}

interface SocialCardData {
  id: number;
  type: "social";
  name: string;
  bio: string;
  linkedin: string;
  twitter: string;
  instagram: string;
  github: string;
  profilePicture: string;
}

type CardData = PersonalCardData | ProjectCardData | SocialCardData;

export default function PremiumBusinessCard() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [cards, setCards] = useState<CardData[]>([
    {
      id: 1,
      type: "personal",
      name: "Alex Sterling",
      jobRole: "Creative Director",
      email: "alex@sterling-creative.com",
      phone: "+1 (555) 123-4567",
      domain: "sterlingcreative.com",
      profilePicture: "",
    },
  ]);
  const [editingCard, setEditingCard] = useState<number | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleClick = (e: MouseEvent) => {
      // Don't close edit mode if clicking inside an input or button
      const target = e.target as HTMLElement;
      if (
        target.tagName === "INPUT" ||
        target.tagName === "BUTTON" ||
        target.closest("button")
      ) {
        return;
      }
      // Close edit mode when clicking outside
      if (editingCard !== null) {
        setEditingCard(null);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClick);
    };
  }, [editingCard]);

  const addProjectCard = () => {
    if (cards.length < 2) {
      const newCard: ProjectCardData = {
        id: Date.now(),
        type: "projects",
        title: "My Projects",
        description: "Showcasing creative work and innovations",
        project1: "Project Alpha - Web Application",
        project2: "Project Beta - Mobile App",
        project3: "Project Gamma - Brand Identity",
        portfolioUrl: "portfolio.example.com",
        profilePicture: "",
      };
      setCards([...cards, newCard]);
    }
  };

  const addSocialCard = () => {
    if (cards.length < 3) {
      const newCard: SocialCardData = {
        id: Date.now(),
        type: "social",
        name: "Alex Sterling",
        bio: "Creative professional connecting ideas with innovation",
        linkedin: "linkedin.com/in/alexsterling",
        twitter: "@alexsterling",
        instagram: "@alex.sterling",
        github: "github.com/alexsterling",
        profilePicture: "",
      };
      setCards([...cards, newCard]);
    }
  };

  const updateCard = (id: number, field: string, value: string) => {
    setCards(
      cards.map((card) => (card.id === id ? { ...card, [field]: value } : card))
    );
  };

  const removeCard = (id: number) => {
    if (cards.length > 1) {
      setCards(cards.filter((card) => card.id !== id));
    }
  };

  const toggleEdit = (cardId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingCard(editingCard === cardId ? null : cardId);
  };

  const PersonalCard = ({
    card,
    index,
  }: {
    card: PersonalCardData;
    index: number;
  }) => {
    const isHovered = hoveredCard === card.id;
    const isEditing = editingCard === card.id;

    return (
      <div
        className={`
          relative w-full max-w-4xl h-96 rounded-2xl backdrop-blur-sm bg-white/5 
          border border-white/10 shadow-2xl transition-all duration-500 ease-out mb-8
          ${isHovered ? "scale-105 shadow-3xl" : "scale-100"}
        `}
        style={{
          transform: `translate(${
            (mousePosition.x - window.innerWidth / 2) * (0.01 + index * 0.005)
          }px, ${
            (mousePosition.y - window.innerHeight / 2) * (0.01 + index * 0.005)
          }px) ${isHovered ? "scale(1.05)" : "scale(1)"}`,
        }}
        onMouseEnter={() => setHoveredCard(card.id)}
        onMouseLeave={() => setHoveredCard(null)}
      >
        <div className="absolute top-0 left-0 w-full h-2 rounded-t-2xl bg-gradient-to-r from-blue-500 to-blue-400" />

        <div className="absolute top-4 right-4 flex space-x-2 z-20">
          <button
            onClick={(e) => toggleEdit(card.id, e)}
            className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-all"
          >
            <span className="text-white text-xs">✏️</span>
          </button>
          {cards.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                removeCard(card.id);
              }}
              className="w-8 h-8 bg-red-500/20 hover:bg-red-500/40 rounded-lg flex items-center justify-center transition-all"
            >
              <span className="text-white text-xs">✕</span>
            </button>
          )}
        </div>

        <div className="relative z-10 p-12 h-full flex items-center">
          <div className="flex-shrink-0 mr-12">
            <div className="w-32 h-32 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center overflow-hidden">
              {card.profilePicture ? (
                <img
                  src={card.profilePicture}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-16 h-16 bg-blue-400/30 rounded-xl flex items-center justify-center">
                  <span className="text-white text-2xl font-light">
                    {card.name.charAt(0)}
                  </span>
                </div>
              )}
            </div>
            {isEditing && (
              <input
                type="text"
                placeholder="Image URL"
                value={card.profilePicture}
                onChange={(e) =>
                  updateCard(card.id, "profilePicture", e.target.value)
                }
                className="mt-3 w-32 px-2 py-1 text-xs bg-white/10 border border-white/20 rounded text-white placeholder-white/50 focus:outline-none focus:border-blue-400"
                onClick={(e) => e.stopPropagation()}
              />
            )}
          </div>

          <div className="flex-1">
            {isEditing ? (
              <input
                type="text"
                value={card.name}
                onChange={(e) => updateCard(card.id, "name", e.target.value)}
                className="text-4xl font-light text-white mb-3 tracking-wide bg-transparent border-b border-white/30 focus:outline-none focus:border-blue-400 w-full"
                onClick={(e) => e.stopPropagation()}
              />
            ) : (
              <h1 className="text-4xl font-light text-white mb-3 tracking-wide">
                {card.name}
              </h1>
            )}

            {isEditing ? (
              <input
                type="text"
                value={card.jobRole}
                onChange={(e) => updateCard(card.id, "jobRole", e.target.value)}
                className="text-lg text-gray-300 font-normal uppercase tracking-widest opacity-80 bg-transparent border-b border-white/30 focus:outline-none focus:border-blue-400 mb-8"
                onClick={(e) => e.stopPropagation()}
              />
            ) : (
              <p className="text-lg text-gray-300 font-normal uppercase tracking-widest opacity-80 mb-8">
                {card.jobRole}
              </p>
            )}

            <div className="w-24 h-px bg-white/20 mb-8"></div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                {isEditing ? (
                  <input
                    type="email"
                    value={card.email}
                    onChange={(e) =>
                      updateCard(card.id, "email", e.target.value)
                    }
                    className="text-white/80 text-lg font-light bg-transparent border-b border-white/30 focus:outline-none focus:border-blue-400 w-full"
                    onClick={(e) => e.stopPropagation()}
                  />
                ) : (
                  <div className="text-white/80 text-lg font-light">
                    {card.email}
                  </div>
                )}
              </div>

              <div>
                {isEditing ? (
                  <input
                    type="tel"
                    value={card.phone}
                    onChange={(e) =>
                      updateCard(card.id, "phone", e.target.value)
                    }
                    className="text-white/80 text-lg font-light bg-transparent border-b border-white/30 focus:outline-none focus:border-blue-400 w-full"
                    onClick={(e) => e.stopPropagation()}
                  />
                ) : (
                  <div className="text-white/80 text-lg font-light">
                    {card.phone}
                  </div>
                )}
              </div>

              <div className="md:col-span-2">
                {isEditing ? (
                  <input
                    type="text"
                    value={card.domain}
                    onChange={(e) =>
                      updateCard(card.id, "domain", e.target.value)
                    }
                    className="text-white/60 text-base font-light tracking-wide bg-transparent border-b border-white/30 focus:outline-none focus:border-blue-400 w-full"
                    onClick={(e) => e.stopPropagation()}
                  />
                ) : (
                  <div className="text-white/60 text-base font-light tracking-wide">
                    {card.domain}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Hover effects */}
        <div
          className={`absolute inset-0 rounded-2xl transition-all duration-500 ${
            isHovered ? "bg-white/5 shadow-2xl" : "bg-transparent"
          }`}
          style={{
            boxShadow: isHovered
              ? "0 25px 80px rgba(59, 130, 246, 0.2)"
              : "none",
          }}
        />
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none opacity-30"
          style={{
            background: `radial-gradient(circle 300px at ${
              (mousePosition.x / window.innerWidth) * 100
            }% ${
              (mousePosition.y / window.innerHeight) * 100
            }%, rgba(255,255,255,0.04) 0%, transparent 100%)`,
          }}
        />
        <div
          className={`absolute bottom-0 left-0 h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent transition-all duration-500 ${
            isHovered ? "w-full opacity-100" : "w-0 opacity-0"
          }`}
        />
      </div>
    );
  };

  const ProjectCard = ({
    card,
    index,
  }: {
    card: ProjectCardData;
    index: number;
  }) => {
    const isHovered = hoveredCard === card.id;
    const isEditing = editingCard === card.id;

    return (
      <div
        className={`relative w-full max-w-4xl h-96 rounded-2xl backdrop-blur-sm bg-white/5 border border-white/10 shadow-2xl transition-all duration-500 ease-out mb-8 ${
          isHovered ? "scale-105 shadow-3xl" : "scale-100"
        }`}
        style={{
          transform: `translate(${
            (mousePosition.x - window.innerWidth / 2) * (0.01 + index * 0.005)
          }px, ${
            (mousePosition.y - window.innerHeight / 2) * (0.01 + index * 0.005)
          }px) ${isHovered ? "scale(1.05)" : "scale(1)"}`,
        }}
        onMouseEnter={() => setHoveredCard(card.id)}
        onMouseLeave={() => setHoveredCard(null)}
      >
        <div className="absolute top-0 left-0 w-full h-2 rounded-t-2xl bg-gradient-to-r from-purple-500 to-pink-400" />

        <div className="absolute top-4 right-4 flex space-x-2 z-20">
          <button
            onClick={(e) => toggleEdit(card.id, e)}
            className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-all"
          >
            <span className="text-white text-xs">✏️</span>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              removeCard(card.id);
            }}
            className="w-8 h-8 bg-red-500/20 hover:bg-red-500/40 rounded-lg flex items-center justify-center transition-all"
          >
            <span className="text-white text-xs">✕</span>
          </button>
        </div>

        <div className="relative z-10 p-12 h-full flex items-center">
          <div className="flex-shrink-0 mr-12">
            <div className="w-32 h-32 rounded-2xl bg-purple-500/20 border border-purple-400/30 flex items-center justify-center overflow-hidden">
              {card.profilePicture ? (
                <img
                  src={card.profilePicture}
                  alt="Projects"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-16 h-16 bg-purple-400/30 rounded-xl flex items-center justify-center">
                  <span className="text-white text-2xl font-light">📁</span>
                </div>
              )}
            </div>
            {isEditing && (
              <input
                type="text"
                placeholder="Image URL"
                value={card.profilePicture}
                onChange={(e) =>
                  updateCard(card.id, "profilePicture", e.target.value)
                }
                className="mt-3 w-32 px-2 py-1 text-xs bg-white/10 border border-white/20 rounded text-white placeholder-white/50 focus:outline-none focus:border-purple-400"
                onClick={(e) => e.stopPropagation()}
              />
            )}
          </div>

          <div className="flex-1">
            {isEditing ? (
              <input
                type="text"
                value={card.title}
                onChange={(e) => updateCard(card.id, "title", e.target.value)}
                className="text-4xl font-light text-white mb-3 tracking-wide bg-transparent border-b border-white/30 focus:outline-none focus:border-purple-400 w-full"
                onClick={(e) => e.stopPropagation()}
              />
            ) : (
              <h1 className="text-4xl font-light text-white mb-3 tracking-wide">
                {card.title}
              </h1>
            )}

            {isEditing ? (
              <input
                type="text"
                value={card.description}
                onChange={(e) =>
                  updateCard(card.id, "description", e.target.value)
                }
                className="text-lg text-gray-300 font-normal tracking-wide opacity-80 bg-transparent border-b border-white/30 focus:outline-none focus:border-purple-400 mb-8 w-full"
                onClick={(e) => e.stopPropagation()}
              />
            ) : (
              <p className="text-lg text-gray-300 font-normal tracking-wide opacity-80 mb-8">
                {card.description}
              </p>
            )}

            <div className="w-24 h-px bg-purple-400/30 mb-8"></div>

            <div className="space-y-3">
              {["project1", "project2", "project3"].map((field) => (
                <div key={field}>
                  {isEditing ? (
                    <input
                      type="text"
                      value={card[field as keyof ProjectCardData] as string}
                      onChange={(e) =>
                        updateCard(card.id, field, e.target.value)
                      }
                      className="text-white/80 text-lg font-light bg-transparent border-b border-white/30 focus:outline-none focus:border-purple-400 w-full"
                      onClick={(e) => e.stopPropagation()}
                    />
                  ) : (
                    <div className="text-white/80 text-lg font-light">
                      • {card[field as keyof ProjectCardData] as string}
                    </div>
                  )}
                </div>
              ))}

              <div className="pt-4">
                {isEditing ? (
                  <input
                    type="text"
                    value={card.portfolioUrl}
                    onChange={(e) =>
                      updateCard(card.id, "portfolioUrl", e.target.value)
                    }
                    className="text-purple-300 text-base font-light tracking-wide bg-transparent border-b border-white/30 focus:outline-none focus:border-purple-400 w-full"
                    onClick={(e) => e.stopPropagation()}
                  />
                ) : (
                  <div className="text-purple-300 text-base font-light tracking-wide">
                    🔗 {card.portfolioUrl}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div
          className={`absolute inset-0 rounded-2xl transition-all duration-500 ${
            isHovered ? "bg-white/5 shadow-2xl" : "bg-transparent"
          }`}
          style={{
            boxShadow: isHovered
              ? "0 25px 80px rgba(147, 51, 234, 0.2)"
              : "none",
          }}
        />
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none opacity-30"
          style={{
            background: `radial-gradient(circle 300px at ${
              (mousePosition.x / window.innerWidth) * 100
            }% ${
              (mousePosition.y / window.innerHeight) * 100
            }%, rgba(147, 51, 234, 0.08) 0%, transparent 100%)`,
          }}
        />
        <div
          className={`absolute bottom-0 left-0 h-px bg-gradient-to-r from-transparent via-purple-400/50 to-transparent transition-all duration-500 ${
            isHovered ? "w-full opacity-100" : "w-0 opacity-0"
          }`}
        />
      </div>
    );
  };

  const SocialCard = ({
    card,
    index,
  }: {
    card: SocialCardData;
    index: number;
  }) => {
    const isHovered = hoveredCard === card.id;
    const isEditing = editingCard === card.id;

    return (
      <div
        className={`relative w-full max-w-4xl h-96 rounded-2xl backdrop-blur-sm bg-white/5 border border-white/10 shadow-2xl transition-all duration-500 ease-out mb-8 ${
          isHovered ? "scale-105 shadow-3xl" : "scale-100"
        }`}
        style={{
          transform: `translate(${
            (mousePosition.x - window.innerWidth / 2) * (0.01 + index * 0.005)
          }px, ${
            (mousePosition.y - window.innerHeight / 2) * (0.01 + index * 0.005)
          }px) ${isHovered ? "scale(1.05)" : "scale(1)"}`,
        }}
        onMouseEnter={() => setHoveredCard(card.id)}
        onMouseLeave={() => setHoveredCard(null)}
      >
        <div className="absolute top-0 left-0 w-full h-2 rounded-t-2xl bg-gradient-to-r from-green-500 to-teal-400" />

        <div className="absolute top-4 right-4 flex space-x-2 z-20">
          <button
            onClick={(e) => toggleEdit(card.id, e)}
            className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-all"
          >
            <span className="text-white text-xs">✏️</span>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              removeCard(card.id);
            }}
            className="w-8 h-8 bg-red-500/20 hover:bg-red-500/40 rounded-lg flex items-center justify-center transition-all"
          >
            <span className="text-white text-xs">✕</span>
          </button>
        </div>

        <div className="relative z-10 p-12 h-full flex items-center">
          <div className="flex-shrink-0 mr-12">
            <div className="w-32 h-32 rounded-2xl bg-green-500/20 border border-green-400/30 flex items-center justify-center overflow-hidden">
              {card.profilePicture ? (
                <img
                  src={card.profilePicture}
                  alt="Social"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-16 h-16 bg-green-400/30 rounded-xl flex items-center justify-center">
                  <span className="text-white text-2xl font-light">🌐</span>
                </div>
              )}
            </div>
            {isEditing && (
              <input
                type="text"
                placeholder="Image URL"
                value={card.profilePicture}
                onChange={(e) =>
                  updateCard(card.id, "profilePicture", e.target.value)
                }
                className="mt-3 w-32 px-2 py-1 text-xs bg-white/10 border border-white/20 rounded text-white placeholder-white/50 focus:outline-none focus:border-green-400"
                onClick={(e) => e.stopPropagation()}
              />
            )}
          </div>

          <div className="flex-1">
            {isEditing ? (
              <input
                type="text"
                value={card.name}
                onChange={(e) => updateCard(card.id, "name", e.target.value)}
                className="text-4xl font-light text-white mb-3 tracking-wide bg-transparent border-b border-white/30 focus:outline-none focus:border-green-400 w-full"
                onClick={(e) => e.stopPropagation()}
              />
            ) : (
              <h1 className="text-4xl font-light text-white mb-3 tracking-wide">
                {card.name}
              </h1>
            )}

            {isEditing ? (
              <input
                type="text"
                value={card.bio}
                onChange={(e) => updateCard(card.id, "bio", e.target.value)}
                className="text-lg text-gray-300 font-normal tracking-wide opacity-80 bg-transparent border-b border-white/30 focus:outline-none focus:border-green-400 mb-8 w-full"
                onClick={(e) => e.stopPropagation()}
              />
            ) : (
              <p className="text-lg text-gray-300 font-normal tracking-wide opacity-80 mb-8">
                {card.bio}
              </p>
            )}

            <div className="w-24 h-px bg-green-400/30 mb-8"></div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { field: "linkedin", label: "💼", placeholder: "LinkedIn URL" },
                {
                  field: "twitter",
                  label: "🐦",
                  placeholder: "Twitter Handle",
                },
                {
                  field: "instagram",
                  label: "📷",
                  placeholder: "Instagram Handle",
                },
                { field: "github", label: "💻", placeholder: "GitHub Profile" },
              ].map(({ field, label, placeholder }) => (
                <div key={field} className="flex items-center space-x-3">
                  <span className="text-lg">{label}</span>
                  {isEditing ? (
                    <input
                      type="text"
                      value={card[field as keyof SocialCardData] as string}
                      onChange={(e) =>
                        updateCard(card.id, field, e.target.value)
                      }
                      placeholder={placeholder}
                      className="text-white/80 text-base font-light bg-transparent border-b border-white/30 focus:outline-none focus:border-green-400 flex-1"
                      onClick={(e) => e.stopPropagation()}
                    />
                  ) : (
                    <div className="text-white/80 text-base font-light flex-1">
                      {card[field as keyof SocialCardData] as string}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div
          className={`absolute inset-0 rounded-2xl transition-all duration-500 ${
            isHovered ? "bg-white/5 shadow-2xl" : "bg-transparent"
          }`}
          style={{
            boxShadow: isHovered
              ? "0 25px 80px rgba(34, 197, 94, 0.2)"
              : "none",
          }}
        />
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none opacity-30"
          style={{
            background: `radial-gradient(circle 300px at ${
              (mousePosition.x / window.innerWidth) * 100
            }% ${
              (mousePosition.y / window.innerHeight) * 100
            }%, rgba(34, 197, 94, 0.08) 0%, transparent 100%)`,
          }}
        />
        <div
          className={`absolute bottom-0 left-0 h-px bg-gradient-to-r from-transparent via-green-400/50 to-transparent transition-all duration-500 ${
            isHovered ? "w-full opacity-100" : "w-0 opacity-0"
          }`}
        />
      </div>
    );
  };

  const renderCard = (card: CardData, index: number) => {
    switch (card.type) {
      case "personal":
        return <PersonalCard key={card.id} card={card} index={index} />;
      case "projects":
        return <ProjectCard key={card.id} card={card} index={index} />;
      case "social":
        return <SocialCard key={card.id} card={card} index={index} />;
      default:
        return null;
    }
  };

  const canAddProjects = !cards.some((card) => card.type === "projects");
  const canAddSocial = !cards.some((card) => card.type === "social");

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-blue-700 p-8 flex flex-col items-center">
      <div className="w-full max-w-6xl">
        {cards.map((card, index) => renderCard(card, index))}
      </div>

      <div className="flex space-x-4">
        {canAddProjects && (
          <button
            onClick={addProjectCard}
            className="px-8 py-4 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-400/30 rounded-xl text-white font-light tracking-wide transition-all duration-300 hover:scale-105"
          >
            + Add Projects Card
          </button>
        )}

        {canAddSocial && (
          <button
            onClick={addSocialCard}
            className="px-8 py-4 bg-green-500/20 hover:bg-green-500/30 border border-green-400/30 rounded-xl text-white font-light tracking-wide transition-all duration-300 hover:scale-105"
          >
            + Add Social Card
          </button>
        )}
      </div>

      <div className="mt-12 text-center text-white/60 text-sm max-w-2xl">
        <p>
          Click the edit button (✏️) on any card to customize. Personal card for
          contact info, Projects card for portfolio, Social card for
          connections.
        </p>
      </div>

      {/* Background elements */}
      <div className="absolute top-1/4 right-1/4 w-px h-32 bg-white/5 rotate-12"></div>
      <div className="absolute bottom-1/3 left-1/4 w-px h-24 bg-white/5 -rotate-12"></div>
      <div
        className="absolute top-1/2 left-1/2 w-3 h-3 bg-blue-400/20 rounded-full"
        style={{
          transform: `translate(${
            (mousePosition.x - window.innerWidth / 2) * 0.005
          }px, ${(mousePosition.y - window.innerHeight / 2) * 0.005}px)`,
        }}
      />
    </div>
  );
}
