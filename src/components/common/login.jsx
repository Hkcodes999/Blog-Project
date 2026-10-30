import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Input from "./input";
import Button from "./button";
import authservice from "../../appwrite/auth";
import { login } from "../../store/authslice";
import { useGSAP } from "@gsap/react";
import gsap from "gsap/all";
import { AlertCircle } from "lucide-react";
import { sileo } from "sileo";

const Login = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispath = useDispatch();
  const { register, handleSubmit } = useForm();
  const loginRef = useRef();
  const loginFromRef = useRef();
  const errorRef = useRef();
  const [userData, setUserdata] = useState()

  const UserLogin = async (data) => {
    setError("");
    try {
      const session = await authservice.LoginAccount(data);
      if (session) {
        const UserData = await authservice.GetCurrentUser();
        if (UserData) {
          dispath(login(UserData));
          setUserdata(userData)
          navigate(-1);
          sileo.success({
            title: "Welcome back!",
            roundness: 9,
            fill: "#FF5617",
            description: `Logged in successfully as ${UserData.name}`,
            styles: {
              title: "text-white!",
              description: "text-white/90!",
              badge: "bg-white/40!",
            },
          });
        }
      }
    } catch (error) {
      setError(error.message);
      
    }
  };

  useGSAP(() => {
    const tl = gsap.timeline();
    tl.from(
      loginRef.current,
      {
        opacity: 0,
        y: 15,
        duration: 0.6,
        ease: "power3.inOut",
        filter: "blur(3px)",
      },
      "anime",
    );
    tl.from(
      loginFromRef.current.children,
      {
        opacity: 0,
        duration: 0.6,
        stagger: 0.2,
        ease: "power3.inOut",
        filter: "blur(3px)",
      },
      "anime",
    );
  });

  // Smooth entrance animation for error message
  useGSAP(
    () => {
      if (error && errorRef.current) {
        gsap.fromTo(
          errorRef.current,
          {
            autoAlpha: 0,
            y: -8,
            scale: 0.99,
            duration: 0.8,
            height:0,
            filter: "blur(4px)",
          },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            height:"auto",
            filter: "blur(0px)",
            duration: 0.8,
            ease: "back.inOut(1.4)",
          },
        );
      }
    },
    { dependencies: [error] },
  );

  return (
    <div
      ref={loginRef}
      className="h-fit w-[30vw] rounded-2xl p-8 border-1 border-gray-400 transition-[height] duration-300"
    >
      <div className="flex items-center justify-center w-full text-3xl font-[font1] border-b-1 border-gray-500/70 pb-4 mb-5">
        Login
      </div>
      <div>
        <form
          ref={loginFromRef}
          onSubmit={handleSubmit(UserLogin)}
          className="flex flex-col gap-3"
        >
          <Input
            label="Email: "
            className="h-10 border-1 rounded-lg border-gray-400 p-3"
            labelClassName="capitalize text-xl font-[font1]"
            placeholder="Enter Email"
            {...register("email", { required: true })}
          />
          <Input
            label="Password: "
            className="h-10 border-1 rounded-lg border-gray-400 p-3"
            labelClassName="capitalize text-xl font-[font1]"
            placeholder="Enter Password"
            type="password"
            {...register("password", { required: true })}
          />
          {error && (
            <div
              ref={errorRef}
              className="flex items-center gap-2 text-sm text-red-600  rounded-xl"
            >
              <span className="font-medium">Error: {error}</span>
            </div>
          )}

          <Link to={"/auth/signup"} className="group">
            Don't have account?{" "}
            <span className="text-blue-400 group-hover:text-blue-600 transition-[color,padding] duration-300 group-hover:px-2">
              {" "}
              Signup here.
            </span>{" "}
          </Link>

          <Button
            type="submit"
            children="Login"
            textColor="text-white"
            className="h-10 flex items-center justify-center rounded-lg cursor-pointer text-lg mt-2 bg-[#FF6F3A] hover:bg-[#e3683b]  transition-[background-color,scale] duration-300 hover:scale-98"
          />
        </form>
      </div>
    </div>
  );
};

export default Login;
