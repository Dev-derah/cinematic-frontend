"use client";
import React, { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { HiMenuAlt3 } from "react-icons/hi";
import { IoChatbubblesOutline, IoLogOutOutline } from "react-icons/io5";
import { FaRegPenToSquare } from "react-icons/fa6";
import { MenuItem } from "@/components/MenuItem";
import { useRouter, usePathname }  from "next/navigation";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";

export const Navbar = () => {
  const { user } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profilemenuOpen, setProfileMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  const navItems = [
    { label: "Home", route: "/" },
    { label: "Movies", route: "/movies" },
    { label: "TV Shows", route: "/tvshows" },
    { label: "Support", route: "/support" },
  ];

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  const toggleProfileMenu = () => {
    setProfileMenuOpen(!profilemenuOpen);
  };

  const handleNavigation = (
    label: string,
    route: string,
    deviceType: "mobile" | "desktop"
  ) => {
    setActiveNav(label);
    router.push(route);
    if (deviceType === "mobile") {
      toggleMenu();
    }
  };

  useEffect(() => {
    const currentPath = pathname;
    const activeItem = navItems.find((item) => item.route === currentPath);
    if (activeItem) {
      setActiveNav(activeItem.label); // Set active nav based on the current route
    } else {
      setActiveNav(null); // No active item for non-matching routes
    }
  }, [router, pathname]);

  return (
    <header className="h-[10vh] fixed z-50 w-full text-white">
      <section className="relative flex justify-between items-center px-10 pt-5 pb-2 gap-8 lg:grid lg:grid-cols-[1fr_auto_1fr]">
        {/* Left Section */}
        <div className="text-left">
          <Image
            src={"/Images/Brand/Cinematic_AI.png"}
            height={150}
            width={100}
            alt="Cinematic AI LOGO"
          />
        </div>

        {/* Middle Section */}
        <div className="text-center">
          <div className="hidden lg:block border-black-12 border-4 rounded-xl bg-black-06 px-6">
            <nav className="grid grid-cols-4 gap-8 py-2 text-grey-75 text-lg">
              {navItems.map(({ label, route }, index) => (
                <MenuItem
                  key={index}
                  item={label}
                  isActive={activeNav === label}
                  onClick={() => handleNavigation(label, route, "desktop")}
                  route={route}
                />
              ))}
            </nav>
          </div>
        </div>
        {/* Right Section */}
        <div className="hidden relative lg:block">
          <div
            className="flex items-center gap-1 justify-end cursor-pointer"
            onClick={toggleProfileMenu}
          >
            {user ? (
              <>
                <span className="right-0 text-right  max-w-48 text-wrap font-medium truncate">
                  Welcome {user.firstName || user.username || "User"}!
                </span>
                <Image
                  src={
                    "https://res.cloudinary.com/dcvpqwloa/image/upload/v1732898781/cinematic%20Avatars/ac2b8390-f045-4e70-a507-9955759808e4.png"
                  }
                  alt="Profile"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              </>
            ) : (
              <div className="flex gap-4">
                {/* <CustomButton label="Login" className="bg-red-50 px-6 py-2  rounded-lg"/> */}
                <button className="bg-red-50 px-6 py-2 rounded-lg">
                  Login
                </button>
                {/* <CustomButton
                    label="Sign Up"
                    className="border-2 border-gray-300 px-6 py-2 rounded-lg"
                  /> */}
                <button className="border-2 border-gray-300 px-6 py-2 rounded-lg">
                  Sign Up
                </button>
              </div>
            )}
          </div>

          {/* Profile Menu */}
          {profilemenuOpen && (
            <div
              className={`${
                user ? "block" : "hidden"
              } absolute right-0 top-full mt-1 w-48 bg-black-20 rounded-lg shadow-md py-2 z-50`}
            >
              {user ? (
                <>
                  <button
                    className="flex items-center gap-2 w-full text-left px-4 py-2 hover:font-bold"
                    onClick={() => router.push("/chats")}
                  >
                    <span>
                      <IoChatbubblesOutline />
                    </span>
                    Recommendations
                  </button>
                  <button className="flex items-center gap-2 w-full text-left px-4 py-2 hover:font-bold">
                    <span>
                      <IoLogOutOutline />
                    </span>
                    Logout
                  </button>
                </>
              ) : null}
            </div>
          )}
        </div>

        {/* Mobile Menu Icon */}
        <div className="bg-black-06 border-4 rounded-lg border-black-12 h-14 w-14 flex items-center justify-center lg:hidden">
          <HiMenuAlt3
            className="text-5xl text-grey-75 cursor-pointer"
            onClick={toggleMenu}
          />
        </div>
      </section>
      {/* Mobile Menu */}
      {menuOpen ? (
        <div className="fixed top-0 min-h-screen h-fit w-screen overflow-y-scroll">
          <div
            className={`${
              menuOpen ? "opacity-50" : "opacity-0"
            } transition-opacity duration-700 absolute delay-500 inset-0 bg-black bg-opacity-100`}
            onClick={toggleMenu}
          />

          <div
            className={`${
              menuOpen ? "translate-x-0" : "translate-x-full"
            } flex flex-col justify-between bg-black-12 h-screen w-1/2 absolute right-0 top-0 rounded-lg shadow-lg py-5 transition-transform duration-300`}
          >
            <div>
              <IoClose
                className="text-2xl m-2 cursor-pointer"
                onClick={toggleMenu}
              />
              <nav className="flex flex-col p-2 space-y-2">
                {user ? (
                  <div className="w-full space-y-3 mb-6">
                    <button className="flex w-full justify-center items-center bg-red-50 py-2 rounded-lg gap-2">
                      <span>
                        <FaRegPenToSquare className="text-2xl" />
                      </span>
                      New chat
                    </button>
                    <button className="w-full flex justify-center items-center border-2 py-2 rounded-lg gap-2">
                      <span>
                        <IoChatbubblesOutline className="text-2xl" />
                      </span>
                      All Chats
                    </button>
                  </div>
                ) : null}

                {navItems.map(({ label, route }) => (
                  <p
                    key={label}
                    className={`px-4 py-2 rounded-lg cursor-pointer hover:font-bold ${
                      activeNav === label
                        ? " bg-black-25 font-bold text-white"
                        : ""
                    }`}
                    onClick={() => handleNavigation(label, route, "mobile")}
                  >
                    {label}
                  </p>
                ))}
              </nav>
            </div>
            <div className="">
              {user ? (
                <>
                  <hr className="py-2" />
                  <div className="space-y-4 px-2">
                    <div className="flex items-center gap-2">
                      <Image
                        src={user.imageUrl}
                        alt="Profile"
                        width={30}
                        height={30}
                        className="rounded-full"
                      />
                      <span className=" text-right max-w-48 text-wrap font-medium truncate">
                        {user.fullName || user.username || "User"}
                      </span>
                    </div>
                    <button className="flex items-center gap-2 w-full text-left py-2 hover:font-bold">
                      <span>
                        <IoLogOutOutline className="text-2xl" />
                      </span>
                      Logout
                    </button>
                  </div>
                </>
              ) : (
                <div className="flex flex-col-reverse gap-4">
                  <button className="bg-red-50 px-6 py-2 h-fit rounded-lg">
                    Login
                  </button>
                  <button className="border-2 border-gray-300 px-6 py-2 rounded-lg">
                    Sign Up
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
};
