import React, { useEffect, useState } from "react";
import authservice from "./appwrite/auth";
import { useDispatch } from "react-redux";
import { login, logout } from "./store/authslice";
import { RouterProvider } from "react-router-dom";
import router from "./router/router";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useNetwork from "./hooks/useNetwork";

gsap.registerPlugin(ScrollTrigger);

const App = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const isOnline = useNetwork();

  // Lenis + GSAP ScrollTrigger integration
  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis();

    // Expose on window so any page can call: window.lenis?.scrollTo(0, { immediate: true })
    window.lenis = lenis;

    // Tell ScrollTrigger to use Lenis's scroll position (not native window.scrollY)
    ScrollTrigger.scrollerProxy(document.body, {
      scrollTop(value) {
        if (arguments.length) {
          lenis.scrollTo(value, { immediate: true });
        }
        return lenis.scroll; // lenis.scroll = current virtual scroll position
      },
      getBoundingClientRect() {
        return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
      },
    });

    // Sync Lenis scroll position with GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    // Drive Lenis via GSAP ticker (instead of autoRaf)
    const tickerFn = (time) => {
      lenis.raf(time * 1000); // GSAP time is in seconds, Lenis expects ms
    };
    gsap.ticker.add(tickerFn);

    // Prevent GSAP from adding lag smoothing that would desync scroll
    gsap.ticker.lagSmoothing(0);

    // Cleanup on unmount
    return () => {
      gsap.ticker.remove(tickerFn);
      lenis.destroy();
      window.lenis = null;
      ScrollTrigger.clearScrollMemory();
    };

    
  }, []);

  useEffect(() => {
    authservice
      .GetCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login(userData));
        } else {
          dispatch(logout());
        }
      })
      .catch((error) => {
        dispatch(logout());
        console.log(error);
      })
      .finally(() => setLoading(false));
  }, []);

  return !loading ? <RouterProvider router={router} /> : null;
};

export default App;
