import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import Logo from "../common/logo";
import Logoutbtn from "./logoutbtn";
import Profile from "../common/profile";
import service from "../../appwrite/confg";
import { FilePen } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap/all";

const Header = () => {
  const status = useSelector((state) => state.auth.status);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const userData = useSelector((state) => state.auth.userData);
  const previewProfile = userData?.prefs?.avatar
    ? service.getFilePreview(userData.prefs.avatar)
    : null;
  const profileRef = useRef();
  const profileButtonRef = useRef();
  const tl = useRef(null);

  console.log(userData);
  console.log(open);

  const addPostRef = useRef();
  const avatarWrapperRef = useRef();
  const linksRef = useRef();
  const prevStatusRef = useRef(status);

  const navItems = [
    { name: "Home", path: "/", active: true },
    { name: "About", path: "/about", active: true },
    { name: "All posts", path: "/all-posts", active: true },
    { name: "Add post", path: "create/add-post", active: status },
    { name: "Login", path: "/auth/login", active: !status },
  ];

  useEffect(() => {
    const handleScroll = () => {
      // window.scrollY = number of pixels scrolled vertically (no "px" string)
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll); // cleanup on unmount
  }, []);

  useEffect(() => {
    if (status === false) {
      setOpen(false);
    }
  }, [status]);

  // Click outside to close profile dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(e.target) &&
        avatarWrapperRef.current &&
        !avatarWrapperRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 1. Initial page load entrance animation for all nav items (plays only once per session)
  useGSAP(() => {
    if (sessionStorage.getItem("header_nav_animated")) return;

    if (linksRef.current) {
      const allNavItems = [
        ...linksRef.current.children,
        ...(avatarWrapperRef.current ? [avatarWrapperRef.current] : []),
      ];
      sessionStorage.setItem("header_nav_animated", "true");
      gsap.fromTo(
        allNavItems,
        {
          autoAlpha: 0,
          x: 14,
          filter: "blur(4px)",
        },
        {
          autoAlpha: 1,
          x: 0,
          filter: "blur(0px)",
          duration: 0.45,
          stagger: 0.07,
          ease: "power2.out",
          clearProps: "all",
        },
      );
    }
  }, []);

  // 2. Smooth entrance animation specifically when user logs in or out during session
  useGSAP(
    () => {
      // Skip on initial mount so it doesn't conflict with page-load animation
      if (prevStatusRef.current === status) return;
      prevStatusRef.current = status;

      if (status) {
        const targets = [addPostRef.current, avatarWrapperRef.current].filter(
          Boolean,
        );
        if (targets.length > 0) {
          gsap.fromTo(
            targets,
            {
              autoAlpha: 0,
              x: 18,
              scale: 0.85,
              duration: 0.8,
              filter: "blur(6px)",
            },
            {
              autoAlpha: 1,
              x: 0,
              scale: 1,
              filter: "blur(0px)",
              duration: 0.5,
              stagger: 0.1,
              ease: "back.out(1.5)",
              clearProps: "all",
            },
          );
        }
      } else if (linksRef.current) {
        gsap.fromTo(
          linksRef.current.children,
          {
            autoAlpha: 0,
            x: 14,
            filter: "blur(4px)",
          },
          {
            autoAlpha: 1,
            x: 0,
            filter: "blur(0px)",
            duration: 0.45,
            stagger: 0.07,
            ease: "power2.out",
            clearProps: "all",
          },
        );
      }
    },
    { dependencies: [previewProfile] },
  );

  // 1. Build timeline once on mount
  useGSAP(() => {
    if (!profileRef.current || !profileButtonRef.current) return;

    tl.current = gsap
      .timeline({ paused: true })
      .fromTo(
        profileRef.current,
        {
          autoAlpha: 0,
          y: -10,
          height: "30px",
          scale: 0.95,
          filter: "blur(4px)",
          pointerEvents: "none",
        },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          height: "auto",
          filter: "blur(0px)",
          pointerEvents: "all",
          duration: 0.3,
          ease: "power2.out",
        },
      )
      .fromTo(
        profileButtonRef.current.children,
        {
          autoAlpha: 0,
          y: -10,
          duration: 0.8,
          filter: "blur(2px)",
          ease: "power3.inOut",
        },
        {
          autoAlpha: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.2,
          stagger: 0.05,
          ease: "power2.out",
        },
        "-=0.2",
      );
  }, []);

  // 2. Play or reverse when `open` changes
  useGSAP(() => {
    if (!tl.current) return;
    if (open) {
      tl.current.play();
    } else {
      tl.current.reverse();
    }
  }, [open]);

  return (
    <>
      <div
        className={`w-full h-fit px-6 py-2 flex justify-between items-center sticky top-0 z-20 backdrop-blur-md font-[font1] transition-all duration-300 ${
          scrolled
            ? "border-b border-gray-300 shadow-xs bg-white/40"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="">
          <Logo width="14vw" />
        </div>

        <div className="flex gap-5 items-center justify-center">
          <ul ref={linksRef} className="flex gap-7 items-center justify-center">
            {navItems.map((items) =>
              items.active ? (
                <li
                  key={items.name}
                  ref={items.name === "Add post" ? addPostRef : null}
                  className="list-none"
                >
                  <NavLink
                    to={items.path}
                    className={({ isActive }) =>
                      `px-3 py-2 rounded-xl transition-all duration-300 block ${
                        items.name === "Login" || items.name === "Sign up"
                          ? "bg-[#ff5517d8] text-white hover:bg-[#ff5617] px-6 shadow-sm hover:shadow-orange-500/20 active:scale-95 hover:scale-96"
                          : isActive
                            ? "text-orange-500 font-medium"
                            : "text-gray-700 hover:text-orange-500"
                      }`
                    }
                  >
                    {items.name}
                  </NavLink>
                </li>
              ) : null,
            )}
          </ul>
          {status && (
            <div
              ref={avatarWrapperRef}
              onClick={() => setOpen((prev) => !prev)}
              onMouseEnter={() => setOpen(true)}
              className="cursor-pointer transition-[scale] duration-300 hover:scale-105 active:scale-95 rounded-full ring-2 ring-transparent hover:ring-orange-300/80"
            >
              <Profile size={42} />
            </div>
          )}
        </div>
      </div>

      <div
        ref={profileRef}
        onMouseLeave={() => setOpen(false)}
        className="fixed top-25 right-5 w-60 h-fit rounded-xl backdrop-blur-xl border border-black/10 z-10 bg-white/60 shadow-lg"
      >
        <div
          ref={profileButtonRef}
          className="w-full h-full px-5 py-5 flex flex-col gap-3"
        >
          <div className="user-profile w-full h-fit flex items-center flex-col border-black/30 ">
            <div className="user-profile-img flex flex-col justify-center items-center w-full gap-1">
              <Profile size={70} />
              <h2 className="capitalize font-semibold text-black/70 mt-2">
                {userData?.name}
              </h2>
              <p className="text-sm text-black/60 lowercase">
                {userData?.email}
              </p>
              <hr className="border-gray-200 w-[70%] mt-2" />
            </div>
          </div>
          <div className="user-buttons h-fit w-full flex flex-col gap-1">
            {/* My Blogs */}
            <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer hover:bg-black/5 transition-colors duration-200 group">
              <FilePen size={16} strokeWidth={1.5} className="text-[#FF5617]" />
              <span className="text-sm text-black/70 group-hover:text-[#FF5617] transition-colors duration-200 font-medium">
                My Blogs
              </span>
            </div>
            {/* Logout */}
            <div onClick={() => setOpen((prev) => !prev)}>
              {status && <Logoutbtn />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
