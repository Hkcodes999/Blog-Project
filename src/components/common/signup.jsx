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
import { FolderUp } from "lucide-react";
import service from "../../appwrite/confg";
import { sileo } from "sileo";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState();
  const { register, handleSubmit } = useForm();
  const signupRef = useRef();
  const signupFormRef = useRef();
  const errorRef = useRef();
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [defaultProfile, setDefaultProfile] = useState(true);
  const [initials, setInitials] = useState("U");
  const defaultProfileRef = useRef();
  const previewRef = useRef();

  console.log(initials);

  const signup = async (data) => {
    setError("");

    const signupProcess = async () => {
      const session = await authservice.CreateAccount(data);
      if (session) {
        if (selectedFile instanceof File) {
          const updatedAvatar = await service.uploadFile(selectedFile);
          if (updatedAvatar) {
            await authservice.updateAvatar(updatedAvatar.$id);
          }
        }

        const userData = await authservice.GetCurrentUser();
        if (userData) {
          dispatch(login(userData));
          navigate("/");
        }
        return userData;
      }
    };

    sileo.promise(signupProcess(), {
      loading: {
        title: "Creating account...",
        fill: "#FF5617",
        roundness: 9,
        styles: {
          title: "text-white!",
          description: "text-white/90!",
          badge: "bg-white/40!",
        },
      },
      success: (userData) => ({
        title: "Account created!",
        fill: "#FF5617",
        roundness: 9,
        description: `Welcome, ${userData?.name}`,
        styles: {
          title: "text-white!",
          description: "text-white/90!",
          badge: "bg-white/40!",
        },
      }),
      error: (err) => {
        setError(err?.message);
        return {
          title: "Signup failed",
          fill: "#FF5617",
          roundness: 9,
          description: err.message,
          styles: {
            title: "text-white!",
            description: "text-white/90!",
            badge: "bg-white/40!",
          },
        };
      },
    });
  };

  useGSAP(() => {
    const tl = gsap.timeline();
    tl.from(signupRef.current, {
      opacity: 0,
      y: 15,
      duration: 0.6,
      ease: "power3.inOut",
      filter: "blur(3px)",
    });
    tl.from(signupFormRef.current.children, {
      opacity: 0,
      duration: 0.45,
      stagger: 0.2,
      ease: "power3.inOut",
      filter: "blur(3px)",
    });
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
            height: 0,
            filter: "blur(4px)",
          },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            height: "auto",
            filter: "blur(0px)",
            duration: 0.8,
            ease: "back.inOut(1.4)",
          },
        );
      }
    },
    { dependencies: [error] },
  );

  useGSAP(
    () => {
      if (defaultProfile && defaultProfileRef.current) {
        gsap.fromTo(
          defaultProfileRef.current,
          {
            autoAlpha: 0,
            scale: 0.8,
            duration: 0.8,
            filter: "blur(4px)",
            ease: "power2.in",
          },
          {
            autoAlpha: 1,
            scale: 1,
            duration: 0.5,
            filter: "blur(0px)",
            ease: "power2.out",
          },
        );
      } else {
        gsap.fromTo(
          previewRef.current,
          {
            scale: 0.8,
            ease: "power2.in",
            autoAlpha: 0,
            duration: 0.8,
            filter:"blur(4px)"
          },
          {
            scale: 1,
            autoAlpha: 1,
            duration: 0.6,
            ease: "power2.out",
            filter:"blur(0px)"
          },
        );
      }
    },
    { dependencies: [defaultProfile, previewUrl] },
  );

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file); // File object → for uploading
      setPreviewUrl(URL.createObjectURL(file)); // blob URL → for <img> preview
      setDefaultProfile(false);
    }
  };

  return (
    <div
      ref={signupRef}
      className="h-fit w-[60vw] rounded-2xl p-8 border-1 border-gray-400"
    >
      <div className="flex items-center justify-center w-full text-3xl font-[font1] border-b-1 border-gray-500/70 pb-4 mb-5 ">
        Sign up
      </div>
      <div className="w-full">
        <form
          ref={signupFormRef}
          onSubmit={handleSubmit(signup)}
          className="flex gap-3 w-full"
        >
          <div className="left-form w-[50%] flex flex-col items-center justify-center gap-15">
            <div className="img-section h-[60%] w-full flex justify-center">
              {defaultProfile ? (
                <div
                  className="h-[250px] w-[250px] rounded-full bg-orange-500 items-center justify-center flex text-white text-8xl font-[font1] select-none pointer-events-none "
                  ref={defaultProfileRef}
                >
                  <h3>
                    {initials ? initials.trim().slice(0, 2).toUpperCase() : "U"}
                  </h3>
                </div>
              ) : (
                <>
                  <img
                    ref={previewRef}
                    src={previewUrl}
                    alt="Profile-img"
                    className="w-[250px] h-[250px] bg-[#FF6F3A] rounded-full object-cover"
                  />
                </>
              )}
            </div>
            <div className="profile-buttons flex gap-3 ">
              <button
                type="button"
                onClick={() => {
                  setSelectedFile(null);
                  setPreviewUrl(null);
                  setDefaultProfile(true);
                }}
                className="px-4 py-3 bg-[#FF6F3A] hover:bg-[#e86433] text-white rounded-lg cursor-pointer  hover:scale-95 transition-[scale, colors] duration-300"
              >
                Default
              </button>
              <label
                htmlFor="profile-image"
                className="px-4 py-3 border-1 border-gray-400  hover:border-[#FF6F3A] rounded-lg cursor-pointer text-center hover:scale-95 transition-[scale, colors] duration-300 hover:text-[#FF6F3A] flex items-center justify-center gap-2"
              >
                <span>
                  <FolderUp size={25} strokeWidth={0.8} />
                </span>
                Upload Image
              </label>
              <input
                type="file"
                name="image"
                id="profile-image"
                accept="image/*"
                className="hidden"
                onChange={handleImage}
              />
            </div>
          </div>
          <div className="right-form w-[50%] flex flex-col gap-3">
            <Input
              label="Name: "
              labelClassName="capitalize text-xl font-[font1]"
              placeholder="Enter Name"
              className=" h-10 px-3 rounded-lg border-1 border-gray-400"
              {...register("name", {
                required: true,
                onChange: (e) => setInitials(e.target.value),
              })}
            />
            <Input
              label="Email: "
              labelClassName="capitalize text-xl font-[font1]"
              placeholder="Enter Email"
              className=" h-10 px-3 rounded-lg border-1 border-gray-400"
              {...register("email", { required: true })}
            />
            <Input
              label="Password: "
              type="password"
              labelClassName="capitalize text-xl font-[font1]"
              placeholder="Enter password"
              className=" h-10 px-3 rounded-lg border-1 border-gray-400"
              {...register("password", { required: true })}
            />
            {error && (
              <div
                ref={errorRef}
                className="flex items-center gap-2 text-sm text-red-600 rounded-xl"
              >
                <span className="font-medium">Error: {error}</span>
              </div>
            )}

            <Link to="/auth/login" className="group ">
              Already have account?{" "}
              <span className="text-blue-400 group-hover:text-blue-600 transition-[color,padding] duration-300 group-hover:px-2">
                {" "}
                Login here.
              </span>{" "}
            </Link>

            <Button
              type="submit"
              children="Sign up"
              textColor="text-white"
              className="h-10 flex items-center justify-center rounded-lg cursor-pointer text-lg mt-2 hover:scale-98 transition-[scale, background-color] duration-300 bg-[#FF6F3A] hover:bg-[#e35d2b] w-full"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
