import React, { useEffect, useRef, useState } from "react";
import Postcard from "../components/post/postcard";
import service from "../appwrite/confg";
import Errorcontainer from "../components/common/errorcontainer";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const PostCardSkeleton = () => (

  <div
    style={{ height: "500px" }}
    className="w-full max-w-[480px] rounded-lg flex flex-col border border-gray-200 shrink-0 overflow-hidden select-none bg-white shadow-xs"
  >
    {/* Thumbnail placeholder */}
    <div className="h-[60%] w-full overflow-hidden bg-gray-100">
      <Skeleton height="100%" borderRadius={0} />
    </div>

    {/* Content placeholder */}
    <div className="h-[40%] flex flex-col justify-center w-full px-6 py-4 gap-3">
      {/* Author row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Skeleton circle width={38} height={38} />
          <Skeleton width={90} height={14} />
        </div>
        <Skeleton width={60} height={12} />
      </div>

      {/* Title */}
      <Skeleton height={22} width="85%" />

      {/* Content lines */}
      <div className="flex flex-col gap-1.5 mt-1">
        <Skeleton height={12} width="100%" />
        <Skeleton height={12} width="70%" />
      </div>
    </div>
  </div>
);

const Allpostpage = () => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const textRef = useRef();
  const cardsRef = useRef();
  gsap.registerPlugin(ScrollTrigger);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await service.getPosts();
      setPost(data);
    } catch (err) {
      console.log(err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    window.lenis?.scrollTo(0, { immediate: true });
  }, []);

  // ── Heading animation: runs ONCE on mount (text is always in DOM)
  useGSAP(() => {
    if (!textRef.current) return;
    gsap.from(textRef.current, {
      autoAlpha: 0,
      y: -20,
      duration: 0.7,
      filter: "blur(4px)",
      ease: "power2.out",
    });
  });

  // ── Cards animation: runs only after post data loads
  useGSAP(
    () => {
      if (!post || !cardsRef.current || loading) return;
      const cards = gsap.utils.toArray(cardsRef.current.children);
      if (!cards.length) return;

      cards.forEach((card, i) => {
        gsap.from(card, {
          autoAlpha: 0,
          y: 30,
          duration: 1,
          filter: "blur(6px)",
          delay: i < 3 ? i * 0.1 : 0, // stagger first 3 on load
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        });
      });
    },
    { dependencies: [post, loading] },
  );

  

  return (
    <Errorcontainer error={error} onRetry={fetchData}>
      <SkeletonTheme baseColor="#e5e7eb" highlightColor="#f3f4f6">
        <div className="min-h-[90vh] w-full p-5 py-6 flex gap-8 flex-wrap items-center flex-col mb-4">
          <div ref={textRef}>
            <h2 className="font-[font1] text-5xl font-thin opacity-65">
              All Blog Posts
            </h2>
          </div>

          <div className="w-full flex items-center justify-center">
            {loading ? (
              <div className="flex flex-wrap items-center justify-center gap-8 w-full max-w-10xl">
                {Array.from({ length: 6 }).map((_, index) => (
                  <PostCardSkeleton key={index} />
                  
                ))}
              </div>
            ) : post?.documents?.length === 0 ? (
              <div className="text-gray-400 font-[font1] text-xl py-16">
                No blog posts found.
              </div>
            ) : (
              <div
                ref={cardsRef}
                className="flex flex-wrap items-center justify-center gap-8 w-full max-w-9xl"
              >
                {post?.documents?.map((p) => (
                  <Postcard key={p.$id} post={p} />
                ))}
              </div>
            )}
          </div>
        </div>
      </SkeletonTheme>
    </Errorcontainer>
  );
};

export default Allpostpage;
