import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import service from "../appwrite/confg";
import {
  ArrowRight,
  Sparkles,
  PenLine,
  BookOpen,
  TrendingUp,
  Compass,
  CheckCircle2,
  Clock,
  Layers,
} from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const authStatus = useSelector((state) => state.auth.status);
  const userData = useSelector((state) => state.auth.userData);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const heroRef = useRef();
  const blogsRef = useRef();
  const readSecRef = useRef();
  const cardsRef = useRef();

  useEffect(() => {
    const fetchLatestPosts = async () => {
      try {
        setLoading(true);
        // Fetch posts without strict status filter to ensure all active posts appear
        const res = await service.getPosts([]);
        if (res && res.documents) {
          setPosts(res.documents.slice(0, 6)); // Showcase top 6 posts
        }
      } catch (error) {
        console.error("Error fetching home posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestPosts();
  }, []);

  useGSAP(() => {
    gsap.from(heroRef.current.children, {
      y: 60,
      opacity: 0,
      stagger: 0.2,
      duration: 0.9,
      ease: "power3.out",
    });

    const t2 = gsap.timeline({
      scrollTrigger: {
        trigger: readSecRef.current,
        start: "top 90%",
        end: "top 30%",
        scrub: true,
      },
    });

    t2.from(readSecRef.current.children, {
      y: 80,
      opacity: 0,
      stagger: 0.7,
      duration: 0.7,
      filter: "blur(5px)",
    });
  });

  useGSAP(
    () => {
      if (!posts.length || !blogsRef.current) return;

      const cards = blogsRef.current.querySelectorAll(".blog-card");
      if (!cards.length) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: blogsRef.current,
          start: "top 85%",
          toggleActions: "restart none none none",
          markers: false,
        },
      });

      tl.from(cards, {
        y: 40,
        opacity: 0,
        stagger: 0.12,
        duration: 0.6,
        filter: "blur(5px)",
        ease: "power2.out",
      });
    },
    { dependencies: [posts] },
  );

  return (
    <div className="w-full min-h-screen bg-white text-gray-900 font-sans selection:bg-[#FF5617] selection:text-white">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(255,86,23,0.15),rgba(255,255,255,0))]">
        <div
          ref={heroRef}
          className="max-w-6xl mx-auto px-6 text-center flex flex-col items-center"
        >
          {/* Main Headline */}
          <div>
            <h1 className="font-[font1] text-5xl md:text-7xl font-bold tracking-tight text-gray-950 max-w-4xl leading-[1.12]">
              Where Great Stories{" "}
              <span className="bg-gradient-to-r from-[#FF5617] via-[#FF7A45] to-[#E03A00] bg-clip-text text-transparent">
                Find Their Voice.
              </span>
            </h1>
          </div>

          {/* Subtitle */}
          <div>
            <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-2xl font-light leading-relaxed">
              Read insightful articles from curious thinkers, explore trending
              discussions, or publish your own stories for a growing global
              community.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            {authStatus ? (
              <>
                <Link
                  to="/create/add-post"
                  className="inline-flex items-center gap-2 bg-[#FF5617] hover:bg-[#E03A00] text-white px-7 py-3.5 rounded-xl font-medium shadow-md shadow-orange-500/20 hover:shadow-orange-500/30 transition-all duration-300 hover:-translate-y-0.5"
                >
                  <PenLine className="w-5 h-5" />
                  <span>Write a Story</span>
                </Link>
                <Link
                  to="/all-posts"
                  className="inline-flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-900 px-7 py-3.5 rounded-xl font-medium transition-all duration-200 hover:-translate-y-0.5"
                >
                  <span>Explore All Posts</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/auth/signup"
                  className="inline-flex items-center gap-2 bg-[#FF5617] hover:bg-[#E03A00] text-white px-7 py-3.5 rounded-xl font-medium shadow-md shadow-orange-500/20 hover:shadow-orange-500/30 transition-all duration-300 hover:-translate-y-0.5"
                >
                  <span>Start Reading Free</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/all-posts"
                  className="inline-flex items-center gap-2 border border-gray-300 hover:border-gray-400 bg-white text-gray-800 px-7 py-3.5 rounded-xl font-medium transition-all duration-200 hover:-translate-y-0.5 shadow-xs"
                >
                  <BookOpen className="w-4 h-4 text-gray-500" />
                  <span>Browse Articles</span>
                </Link>
              </>
            )}
          </div>

          {/* Community Badges / Highlights */}
          <div className="mt-14 pt-8 border-t border-gray-200/80 w-full max-w-3xl flex flex-wrap items-center justify-around gap-6 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#FF5617]" />
              <span>Free to Read & Publish</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#FF5617]" />
              <span>Modern Rich-Text Editor</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#FF5617]" />
              <span>Fast & Distraction-Free</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. RECENT & TRENDING POSTS SECTION */}
      <section
        ref={blogsRef}
        id="posts"
        className="max-w-7xl mx-auto px-6 py-14"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#FF5617] mb-2">
              <TrendingUp className="w-4 h-4" />
              <span>Explore Stories</span>
            </div>
            <h2 className="font-[font1] text-3xl md:text-4xl font-bold text-gray-900">
              Latest Published Articles
            </h2>
          </div>

          <Link
            to="/all-posts"
            className="inline-flex items-center gap-1 text-[#FF5617] hover:text-[#E03A00] font-semibold text-sm transition-colors group"
          >
            <span>View all articles</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Loading Skeletons */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="rounded-2xl border border-gray-200 p-4 space-y-4 animate-pulse bg-gray-50/50"
              >
                <div className="h-52 bg-gray-200 rounded-xl w-full"></div>
                <div className="h-6 bg-gray-200 rounded-md w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded-md w-1/2"></div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && posts.length === 0 && (
          <div className="text-center py-16 px-4 bg-gray-50 rounded-2xl border border-dashed border-gray-300">
            <Compass className="w-12 h-12 mx-auto text-gray-400 mb-3" />
            <h3 className="text-xl font-semibold text-gray-800">
              No stories yet
            </h3>
            <p className="text-gray-500 mt-1 max-w-sm mx-auto text-sm">
              Be the first to share your thoughts, stories, or technical
              insights with everyone.
            </p>
            <Link
              to="/create/add-post"
              className="mt-5 inline-flex items-center gap-2 bg-[#FF5617] text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-[#E03A00] transition-colors"
            >
              <PenLine className="w-4 h-4" />
              <span>Create First Post</span>
            </Link>
          </div>
        )}

        {/* Post Grid */}
        {!loading && posts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link
                to={`/post/${post.$id}`}
                key={post.$id}
                className="blog-card group flex flex-col bg-white rounded-2xl border border-gray-200 overflow-hidden hover:border-orange-300 hover:shadow-xl hover:shadow-orange-500/5 hover:-translate-y-1 "
              >
                {/* Thumbnail Image */}
                <div className="relative h-56 w-full overflow-hidden bg-gray-100">
                  {post.image ? (
                    <img
                      src={service.getFilePreview(post.image)}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-orange-50 text-orange-400">
                      <BookOpen className="w-10 h-10" />
                    </div>
                  )}
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-xs text-xs font-semibold px-2.5 py-1 rounded-full text-gray-700 shadow-xs">
                    Article
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 flex flex-col flex-1 justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#FF5617] transition-colors line-clamp-2 leading-snug">
                      {post.title}
                    </h3>
                  </div>

                  {/* Metadata: Author & Date */}
                  <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#FF5617] to-amber-400 text-white flex items-center justify-center font-bold text-xs">
                        {post.userName
                          ? post.userName.charAt(0).toUpperCase()
                          : "U"}
                      </div>
                      <span className="font-medium text-gray-800">
                        {post.userName || "Author"}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 text-gray-400">
                      <Clock className="w-3.5 h-3.5" />
                      <span>
                        {post.$createdAt
                          ? new Date(post.$createdAt).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                              },
                            )
                          : "Recent"}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* 3. WHY READ & WRITE SECTION */}
      <section className="bg-gray-50/70 border-y border-gray-200/80 py-20">
        <div ref={readSecRef} className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#FF5617]">
              Platform Features
            </span>
            <h2 className="font-[font1] text-3xl md:text-4xl font-bold text-gray-900 mt-2">
              Built for Writers, Loved by Readers
            </h2>
            <p className="text-gray-600 mt-3 text-base">
              A streamlined, modern publishing platform designed to let ideas
              speak for themselves.
            </p>
          </div>

          <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl border border-gray-200/80 shadow-xs hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-orange-100 text-[#FF5617] flex items-center justify-center mb-5">
                <PenLine className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Intuitive Story Editor
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Format your content seamlessly with rich text tools, embedded
                media, headings, and lists to make your thoughts stand out.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-gray-200/80 shadow-xs hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-orange-100 text-[#FF5617] flex items-center justify-center mb-5">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Fast Cloud Storage
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Powered by Appwrite backend for ultra-secure authentication,
                lightning-fast database queries, and automatic image hosting.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-gray-200/80 shadow-xs hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-orange-100 text-[#FF5617] flex items-center justify-center mb-5">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Clean Reading View
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Designed with legible typography, spacious layouts, and
                distraction-free viewing so readers can enjoy every paragraph.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
