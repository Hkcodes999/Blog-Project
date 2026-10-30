import React, { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import service from "../appwrite/confg";
import parse from "html-react-parser";
import Errorcontainer from "../components/common/errorcontainer";
import Button from "../components/common/button";
import { useSelector } from "react-redux";
import { Eye, Clock9, Trash, Pen, MoveRight, Server, Lock } from "lucide-react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useGSAP } from "@gsap/react";
import gsap from "gsap/all";
import Postcard from "@/components/post/postcard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export const getReadingTime = (content) => {
  if (!content) return "1 min read";

  // 1. Strip HTML tags (e.g. <p>, <strong>, etc.)
  const plainText = content.replace(/<[^>]*>/g, " ").trim();

  // 2. Count words by splitting on whitespace
  const words = plainText.split(/\s+/).filter(Boolean).length;

  // 3. Calculate minutes at 200 WPM (minimum 1 min)
  const minutes = Math.max(1, Math.ceil(words / 200));

  return `${minutes} min read`;
};

const Post = () => {
  const userData = useSelector((state) => state.auth.userData);
  const authstatus = useSelector((state) => state.auth.status);
  const [post, setPost] = useState();
  const { slug } = useParams();
  const navigate = useNavigate();
  const [notFound, setNotfound] = useState(false);
  const [userImg, setUserimg] = useState();
  const isAuthor =
    post && userData
      ? post.userId === userData.$id || post.userName === userData.name
      : false;
  const loadingRef = useRef();
  const articleRef = useRef();
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // 1. Reset state immediately so loading skeleton shows and old post disappears
    setPost(null);
    setUserimg(null);
    setNotfound(false);
    setLoading(true);

    // 2. Scroll to top immediately
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    window.lenis?.scrollTo(0, { immediate: true });

    const getData = async () => {
      if (!slug) {
        navigate("/");
        return;
      }

      try {
        const postData = await service.getPost(slug);
        if (!postData) {
          setNotfound(true);
          return;
        }

        // Fetch avatar and more posts concurrently
        const [profile, postsData] = await Promise.all([
          postData.userAvatar ? service.getFilePreview(postData.userAvatar) : null,
          posts.length === 0 ? service.getPosts() : Promise.resolve(null),
        ]);

        setUserimg(profile);
        setPost(postData);

        if (postsData?.documents) {
          setPosts(postsData.documents);
        }
      } catch (error) {
        console.log("Fetch error:", error);
        setNotfound(true);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [slug, navigate]);

  console.log(post);

  const initials = post?.userName
    ? post.userName
        .trim()
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "U";

  const handleDelete = async () => {
    try {
      if (post?.$id) {
        await service.deletePost(post.$id);
        if (post?.image) {
          await service.deleteFile(post.image);
        }
        navigate("/all-posts");
      }
    } catch (error) {
      console.log("Delete error:", error);
    }
  };

  // Animate article content smoothly when new post finishes loading
  useGSAP(
    () => {
      if (loading || !articleRef.current) return;
      gsap.from(articleRef.current.children, {
        autoAlpha: 0,
        y: 20,
        duration: 1,
        stagger: 0.08,
        filter: "blur(6px)",
        ease: "power2.out",
        clearProps: "all",
      });
    },
    { dependencies: [loading], scope: articleRef },
  );

  if (notFound) {
    return (
      <Errorcontainer
        notFound={notFound}
        icon={"notFound"}
        message="Post not found"
        goBack={true}
        ButtonMessage="Go to all post"
        button={true}
        to="/all-posts"
      />
    );
  } else {
    // ─── Skeleton loading state ───────────────────────────────────────────────
    if (loading) {
      return (
        <div className="main min-h-[80vh] px-18 py-8 flex flex-col items-center">
          <div
            ref={loadingRef}
            className="content gap-10 flex flex-col items-center justify-start max-w-[700px] transition-[opacity] duration-500"
            style={{ opacity: loading ? 0.6 : 1 }}
          >
            {/* Title skeleton */}
            <div className="flex flex-col gap-3 justify-start ">
              <Skeleton width={40} height={22} borderRadius={8} />
              <Skeleton width={580} height={36} />
              <div className="flex items-center gap-3">
                <Skeleton circle width={40} height={40} />
                <Skeleton width={120} height={16} />
                <Skeleton width={80} height={16} />
              </div>
            </div>

            {/* Image skeleton */}
            <Skeleton height="40vh" width={"40vw"} borderRadius={12} />

            {/* Content lines skeleton */}
            <div className="flex flex-col gap-3 w-full">
              <Skeleton count={2} height={18} />
              <Skeleton width="80%" height={18} />
              <Skeleton count={3} height={18} />
              <Skeleton width="60%" height={18} />
            </div>
          </div>
        </div>
      );
    }

    // ─── Actual post content ──────────────────────────────────────────────────
    return (
      <div className="main min-h-[80vh] w-full py-8 flex justify-center flex-col items-center">
        <article
          key={slug}
          ref={articleRef}
          className="content flex flex-col gap-4 w-full max-w-[700px]"
        >
          {/* ── Header section ─────────────────────────────────────────── */}
          <header className="flex flex-col gap-3">
            {/* Category tag + edit/delete */}
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 text-xs md:text-[0.8vw] font-semibold uppercase tracking-widest border border-[#FF5617] text-[#FF5617] rounded-full hover:bg-[#FF5617] hover:text-white transition-[background-color,color] duration-300 cursor-pointer w-fit">
                Music
              </span>
              {isAuthor ? (
                <div className="buttons-right flex gap-4 h-fit justify-center items-center">
                  {/* Edit button with tooltip */}
                  <div className="relative group/edit">
                    <NavLink to={`/edit/${post.$id}`}>
                      <Button
                        children={
                          <Pen
                            size={18}
                            className="text-black/50 hover:text-black"
                          />
                        }
                        textColor="text-black"
                        className="capitalize rounded-lg cursor-pointer h-fit transition-all duration-300 flex items-center justify-center"
                      />
                    </NavLink>
                    <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover/edit:opacity-100 transition-opacity duration-200 pointer-events-none">
                      Edit post
                    </span>
                  </div>
                  {/* Delete button with tooltip */}
                  <div className="relative group/delete">
                    <Button
                      children={
                        <Trash
                          size={18}
                          className="text-red-400 hover:text-red-500 transition-[color] duration-300"
                        />
                      }
                      textColor="text-white"
                      className="h-fit flex items-center justify-center capitalize rounded-lg cursor-pointer text-gray-100"
                      onClick={() => handleDelete()}
                    />
                    <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-red-700 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover/delete:opacity-100 transition-opacity duration-200 pointer-events-none">
                      Delete post
                    </span>
                  </div>
                </div>
              ) : null}
            </div>

            {/* Title */}
            <h1
              className="font-[font1] text-4xl md:text-5xl font-bold leading-tight text-gray-900"
              style={{ textWrap: "balance" }}
            >
              {post.title}
            </h1>

            {/* Author + meta row */}
            <div className="flex items-center gap-4 pt-1">
              {userImg ? (
                <img
                  className="rounded-full h-11 w-11 object-cover ring-2 ring-[#FF5617]/20"
                  src={userImg}
                  alt={post.userName}
                  onError={() => setUserimg(null)} // fallback to initials if image URL fails
                />
              ) : (
                <span className="font-semibold select-none font-[font1] bg-[#FF6F3A] w-[42px] h-[42px] items-center justify-center flex text-base rounded-full text-white">
                  {initials}
                </span>
              )}
              <div className="flex flex-col gap-0.5">
                <span className="text-sm font-semibold text-gray-800">
                  By {post.userName}
                </span>
                <div className="flex items-center gap-3 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <Clock9 size={12} />
                    {new Date(post.$createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                  <span className="w-px h-3 bg-gray-300" />
                  <span className="flex items-center gap-1 justify-center">
                    <Eye size={15} />
                    <h4>{getReadingTime(post.content)}</h4>
                  </span>
                </div>
              </div>
            </div>

            {/* Divider */}
            <hr className="border-gray-200" />
          </header>

          {/* ── Hero image ─────────────────────────────────────────────── */}
          {post.image && (
            <figure className="flex flex-col items-center gap-3 -mx-6">
              <img
                src={service.getFilePreview(post.image)}
                className="block w-full h-[55vh] object-cover rounded-lg"
                alt={post.title}
              />
              <figcaption className="text-xs text-gray-400 italic text-center px-6">
                {post.title}
              </figcaption>
            </figure>
          )}

          {/* ── Blog content ───────────────────────────────────────────── */}

          <div className="relative">
            <div
              className={`blog-para text-gray-700 text-[1.05rem] leading-[1.85] tracking-[0.01em]
              [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:text-gray-900 [&_h1]:mt-8 [&_h1]:mb-3
              [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-gray-900 [&_h2]:mt-8 [&_h2]:mb-3
              [&_h3]:text-xl  [&_h3]:font-semibold [&_h3]:text-gray-800 [&_h3]:mt-6 [&_h3]:mb-2
              [&_p]:mb-5
              [&_strong]:text-gray-900 [&_strong]:font-semibold
              [&_a]:text-[#FF5617] [&_a]:underline [&_a:hover]:text-[#db5523]
              [&_blockquote]:border-l-4 [&_blockquote]:border-[#FF5617] [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-gray-500 [&_blockquote]:my-6
              [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-5
              [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-5
              [&_li]:mb-1
              [&_code]:bg-gray-100 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-sm [&_code]:font-mono ${
                !authstatus ? "max-h-[500px] overflow-hidden mb-5" : ""
              }`}
              style={{
                filter: authstatus ? "blur(0px)" : "blur(6px)",
                userSelect: authstatus ? "auto" : "none",
                transition: "filter 0.5s ease, max-height 0.5s ease",
                pointerEvents: authstatus ? "auto" : "none",
              }}
            >
              {post.content && parse(post.content)}
            </div>

            {/* ── Paywall CTA overlay when logged out ─────────────────── */}
            {!authstatus && (
              <div className="absolute inset-0 flex items-center justify-center p-4 ">
                <div className="w-full max-w-md bg-white/95 backdrop-blur-xl border border-gray-100 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.12)] rounded-3xl p-8 flex flex-col items-center text-center gap-4 transition-all duration-300 hover:shadow-[0_25px_60px_-10px_rgba(255,111,58,0.15)]">
                  {/* Text content */}
                  <div className="space-y-1.5">
                    <h3 className="text-2xl font-bold text-gray-900 font-[font1] tracking-tight">
                      Sign in to read the full article
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed max-w-xs mx-auto">
                      Join our reader community to access the complete story,
                      leave comments, and discover more curated blogs.
                    </p>
                  </div>

                  {/* Action buttons */}
                  <NavLink to="/auth/login" className="w-full mt-1">
                    <button className="w-full group py-3 px-6 rounded-xl bg-[#FF6F3A] text-white font-medium text-base  hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer hover:bg-[#e86333]">
                      <span>Continue with Login</span>
                      <MoveRight
                        size={18}
                        className="group-hover:translate-x-1 transition-transform duration-200"
                      />
                    </button>
                  </NavLink>

                  <p className="text-xs text-gray-400">
                    Don't have an account?{" "}
                    <NavLink
                      to="/auth/signup"
                      className="text-[#FF5617] font-semibold hover:underline"
                    >
                      Sign up free
                    </NavLink>
                  </p>
                </div>
              </div>
            )}
          </div>
        </article>
        {posts.length > 0 && (
          <div className="max-w-[60%] mt-6 pt-8 border-t border-gray-200">
            <h3 className="text-4xl font-semibold mb-6 text-center text-black/60">
              More Posts
            </h3>
            <Carousel className="w-full px-6 relative">
              <CarouselContent className="-ml-4">
                {posts
                  .filter((p) => p.$id !== post?.$id)
                  .map((p) => (
                    <CarouselItem
                      key={p.$id}
                      className="pl-4 basis-full sm:basis-1/2 lg:basis-1/2 flex justify-center"
                    >
                      <Postcard post={p} height={"450px"} sizeMove={true} />
                    </CarouselItem>
                  ))}
              </CarouselContent>

              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        )}
      </div>
    );
  }
};

export default Post;
