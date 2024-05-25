import React, { useState, useRef, forwardRef } from "react";
import weatherState from "./State/WeatherState";
import { IGetCity, IIconSize } from "@/global";
import Loader from "./Components/Loader";
import locationicom from "../app/Asset/locicon.svg";
import Image from "next/image";
import { CiSearch } from "react-icons/ci";
import { RiMenu3Line } from "react-icons/ri";
import useFetchLoc from "./hooks/useFetchLoc";
import { useClickAway } from "react-use";
import { AnimatePresence, motion } from "framer-motion";
import { NavContentType } from "@/global";
import { navContent } from "./util";

const SearchInput = ({ getCityTerm, setCityTerm, cityTerm }: IGetCity) => {
  return (
    <form className="flex items-center h-12 bg-[transparent] ">
      <input
        onChange={(e) => setCityTerm(e.target.value)}
        className="input"
        type="text"
        placeholder="enter text"
        value={cityTerm}
      />
      <button
        onClick={getCityTerm}
        style={{
          borderRadius: "0 .5rem .5rem 0",
          border: "1px solid rgb(234 179 8 1)",
        }}
        className="w-[25%] sm:w-[15%] lg:w-[10%] h-full flex items-center justify-center bg-goldColor">
        <CiSearch fontWeight={"bold"} />
      </button>
    </form>
  );
};

const Nav = () => {
  const { cityWeather } = weatherState;
  const ref = useRef<HTMLDivElement>(null);
  const { getCityWeather } = useFetchLoc();
  const [showMenu, setShowMenu] = useState<Boolean>(false);
  const [showSubMenu, setShowSubMenu] = useState<Boolean>(false);
  const [cityTerm, setCityTerm] = useState<string | "">("");
  const [activeTab, setActiveTab] = useState<string>("");

  useClickAway(ref, () => setShowMenu(false));

  const city = cityWeather?.city;
  const list = cityWeather?.list;

  const getCityTerm = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    getCityWeather(cityTerm);
  };

  const menuButtonToggle = () => {
    setShowMenu(!showMenu);
  };
  const SubMenuButtonToggle = () => {
    setShowSubMenu(!showSubMenu);
  };

  const handleTabClick = (
    e: React.MouseEvent<HTMLParagraphElement>,
    tab: string,
    label: string
  ) => {
    e.preventDefault();
    setShowMenu(false);
    setActiveTab(tab);
    const section = document.getElementById(tab);
    if (section) {
      section?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div>
      {!cityWeather ? (
        <Loader />
      ) : (
        <div className="shadow-gold">
          <div className="w-[90%] mx-auto h-48 lg:h-40 flex flex-col justify-center gap-y-10">
            <div className="flex justify-between items-center ">
              <div className=" z-[50]">
                <p className="italic font-black font-[briem-hand] text-2xl md:text-4xl text-[rgb(255,215,0)]">
                  SkySavvy
                </p>
              </div>
              <div className="hidden md:block w-[50%]">
                <SearchInput
                  getCityTerm={getCityTerm}
                  setCityTerm={setCityTerm}
                  cityTerm={cityTerm}
                />
              </div>
              <div className="flex gap-x-2 justify-center items-center">
                <p>{city?.name}</p>
                <Image
                  width={20}
                  height={20}
                  src={locationicom}
                  alt="location-icon"
                />
              </div>
              <div>
                <button onClick={menuButtonToggle} className="lg:hidden">
                  <RiMenu3Line size="2em" />
                </button>
                <AnimatePresence mode="wait" initial={false}>
                  {showMenu && (
                    <>
                      <motion.div
                        {...framerSidebarBackground}
                        aria-hidden="true"
                        className="fixed bottom-0 left-0 right-0 top-0 z-40 bg-[rgba(0,0,0,0.1)] backdrop-blur-sm"></motion.div>
                      <motion.div
                        {...framerSidebarPanel}
                        className="fixed top-0 bottom-0 left-0 z-40 w-1/2 h-screen border-r-2 border-[transparent] bg-white dark:bg-[#121212]"
                        ref={ref}
                        aria-label="Sidebar">
                        <>
                          <div
                            ref={ref}
                            className="w-[80%] flex flex-col items-center justify-start mx-auto gap-10 p-5 mt-28">
                            {navContent.map((item, index) => {
                              return (
                                <motion.p
                                  {...framerText(index)}
                                  onClick={(e) =>
                                    handleTabClick(e, item.link, item.label)
                                  }
                                  className=" py-1 w-full text-medium font-semibold cursor-pointer "
                                  key={index}>
                                  <a
                                    className={`flex items-center justify-start gap-x-4
          ${
            activeTab === item.link
              ? `transition duration-1000 pb-1 border-b-2 border-[rgb(255,215,0)]`
              : ""
          }`}>
                                    <p> {item.label}</p>
                                    {item.label === "units" ? (
                                      <span>
                                        <span>
                                          <item.icon size={item.size} />
                                          {item.label === "units" && (
                                            <div className="sub-menu-container">
                                              <div className="sub-menu-item">
                                                Submenu Item 1
                                              </div>
                                              <div className="sub-menu-item">
                                                Submenu Item 2
                                              </div>
                                            </div>
                                          )}
                                        </span>
                                      </span>
                                    ) : (
                                      <item.icon size={item.size} />
                                    )}
                                  </a>
                                </motion.p>
                              );
                            })}
                          </div>
                        </>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
            </div>
            <div className=" block md:hidden">
              <SearchInput
                getCityTerm={getCityTerm}
                setCityTerm={setCityTerm}
                cityTerm={cityTerm}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Nav;

const framerSidebarBackground = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0, transition: { delay: 0.2 } },
  transition: { duration: 0.5 },
};

const framerSidebarPanel = {
  initial: { y: "-100%" },
  animate: { y: 0 },
  exit: { y: "-100%" },
  transition: { duration: 0.3 },
};

const framerText = (delay: number) => {
  return {
    initial: { opacity: 0, y: -10 },
    animate: { opacity: 1, x: 0 },
    transition: {
      delay: 0.3 + delay / 30,
    },
  };
};

const subMenuAnimate = {
  enter: {
    opacity: 1,
    rotateX: 0,
    transition: {
      duration: 0.5,
    },
    display: "block",
  },
  exit: {
    opacity: 0,
    rotateX: -15,
    transition: {
      duration: 0.5,
      delay: 0.3,
    },
    transitionEnd: {
      display: "none",
    },
  },
};
