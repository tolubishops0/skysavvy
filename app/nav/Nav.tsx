import React, { useState, useRef, forwardRef } from "react";
import weatherState from "../State/WeatherState";
import { IGetCity } from "@/global";
import Loader from "../Components/Loader";
import locationicom from "../Asset/locicon.svg";
import Image from "next/image";
import { CiSearch } from "react-icons/ci";
import { RiMenu3Line } from "react-icons/ri";
import { BsMenuButtonFill } from "react-icons/bs";
import { MdOutlineArrowDropDown } from "react-icons/md";
import useFetchLoc from "../hooks/useFetchLoc";
import { useClickAway } from "react-use";
import { AnimatePresence, motion } from "framer-motion";
import { NavContentType } from "@/global";
import { navContent } from "../util";
import ContextNavBar from "./ContextMenuBar";

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
const initialContextMenu = {
  show: false,
  x: 0,
  y: 0,
};

const Nav = () => {
  const { cityWeather } = weatherState;
  const ref = useRef<HTMLDivElement>(null);
  const { getCityWeather } = useFetchLoc();
  const [showMenu, setShowMenu] = useState<Boolean>(false);
  const [showSubMenu, setShowSubMenu] = useState<Boolean>(false);
  const [showContextMenu, setShowContextMenu] = useState(initialContextMenu);
  const [cityTerm, setCityTerm] = useState<string | "">("");
  const [activeTab, setActiveTab] = useState<string>("");
  const textAreaRef = useRef<HTMLDivElement>(null);
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

  const SubMenuButtonToggle = (e: React.MouseEvent<HTMLParagraphElement>) => {
    setShowSubMenu(!showSubMenu);
    e.preventDefault();
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
  const handleTabClickLg = (
    e: React.MouseEvent<HTMLParagraphElement>,
    tab: string,
    label: string
  ) => {
    e.preventDefault();
    onCloseContextMenu();
    const section = document.getElementById(tab);
    if (section) {
      section?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const openContextMenu = (e: any) => {
    e.preventDefault();
    const { pageY, pageX } = e;
    setShowContextMenu({ show: true, x: pageX, y: pageY });
  };

  const onCloseContextMenu = () => {
    setShowContextMenu(initialContextMenu);
  };

  return (
    <div>
      {!cityWeather ? (
        <Loader />
      ) : (
        <div className="shadow-gold">
          {showContextMenu.show && (
            <ContextNavBar
              parentRef={textAreaRef}
              onCloseContextMenu={onCloseContextMenu}
              y={showContextMenu.y}
              x={showContextMenu.x}>
              <div className="flex flex-col gap-3">
                {navContent.map((item, index) => (
                  <div
                    className="flex gap-1 items-center cursor-pointer "
                    key={index}>
                    <motion.p
                      {...framerText(index)}
                      onClick={(e) =>
                        item.link === "units"
                          ? SubMenuButtonToggle(e)
                          : handleTabClickLg(e, item.link, item.label)
                      }
                      className=" py-1 w-full text-medium font-semibold cursor-pointer "
                      key={index}>
                      <a
                        className={`${
                          activeTab === item.link
                            ? `transition duration-1000 `
                            : ""
                        }`}>
                        {item.link === "units" ? (
                          <div>
                            <span className="flex items-center justify-start gap-x-4 ">
                              <p> {item.label}</p>
                              <MdOutlineArrowDropDown className="text-4xl text-[rgb(255,215,0)]" />
                            </span>
                            {showSubMenu && (
                              <motion.div
                                className="sub-menu"
                                initial="exit"
                                animate={showSubMenu ? "enter" : "exit"}
                                variants={subMenuAnimate}>
                                <div className="pl-6 flex flex-col gap-y-4 mt-3">
                                  {item.subMenu &&
                                    item.subMenu.map((item, index) => {
                                      return (
                                        <div
                                          onClick={() => onCloseContextMenu()}
                                          key={index}
                                          className="">
                                          {item.label === "C" ? (
                                            <p className="text-sm">
                                              To &deg;{item.label}
                                            </p>
                                          ) : (
                                            <p>To {item.label}</p>
                                          )}
                                        </div>
                                      );
                                    })}
                                </div>
                              </motion.div>
                            )}
                          </div>
                        ) : (
                          <motion.span className="flex items-center justify-start gap-x-4 ">
                            <p> {item.label}</p>
                            <item.icon className="text-2xl text-[rgb(255,215,0)]" />
                          </motion.span>
                        )}
                      </a>
                    </motion.p>
                  </div>
                ))}
              </div>
            </ContextNavBar>
          )}
          <div
            ref={textAreaRef}
            className="w-[90%] mx-auto h-48 lg:h-40 flex flex-col justify-center gap-y-10">
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
              <div
                onClick={openContextMenu}
                onContextMenu={(e) => openContextMenu(e)}
                className="hidden lg:block cursor-pointer">
                <BsMenuButtonFill className="text-4xl text-[rgb(255,215,0)]" />
              </div>
              <div className="lg:hidden">
                <button onClick={menuButtonToggle}>
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
                        className="fixed top-0 bottom-0 left-0 z-40 w-[70%] h-screen border-r-2 border-[transparent] bg-white dark:bg-[#121212]"
                        ref={ref}
                        aria-label="Sidebar">
                        <>
                          <div
                            // ref={ref}
                            className="w-[80%] flex flex-col items-center justify-start mx-auto gap-y-6 mt-36">
                            {navContent.map((item, index) => {
                              return (
                                <motion.p
                                  {...framerText(index)}
                                  onClick={(e) =>
                                    item.link === "units"
                                      ? SubMenuButtonToggle(e)
                                      : handleTabClick(e, item.link, item.label)
                                  }
                                  className=" py-1 w-full text-medium font-semibold cursor-pointer "
                                  key={index}>
                                  <a
                                    className={`${
                                      activeTab === item.link
                                        ? `transition duration-1000 `
                                        : ""
                                    }`}>
                                    {item.link === "units" ? (
                                      <div>
                                        <span className="flex items-center justify-start gap-x-4 ">
                                          <p> {item.label}</p>
                                          <MdOutlineArrowDropDown className="text-4xl text-[rgb(255,215,0)]" />
                                        </span>
                                        {showSubMenu && (
                                          <motion.div
                                            className="sub-menu"
                                            initial="exit"
                                            animate={
                                              showSubMenu ? "enter" : "exit"
                                            }
                                            variants={subMenuAnimate}>
                                            <div
                                              // ref={ref}
                                              className="pl-6 flex flex-col gap-y-4 mt-3">
                                              {item.subMenu &&
                                                item.subMenu.map(
                                                  (item, index) => {
                                                    return (
                                                      <div
                                                        onClick={() =>
                                                          setShowMenu(false)
                                                        }
                                                        key={index}
                                                        className="">
                                                        {item.label === "C" ? (
                                                          <p className="text-sm">
                                                            To &deg;{item.label}
                                                          </p>
                                                        ) : (
                                                          <p>To {item.label}</p>
                                                        )}
                                                      </div>
                                                    );
                                                  }
                                                )}
                                            </div>
                                          </motion.div>
                                        )}
                                      </div>
                                    ) : (
                                      <motion.span className="flex items-center justify-start gap-x-4 ">
                                        <p> {item.label}</p>
                                        <item.icon className="text-2xl text-[rgb(255,215,0)]" />
                                      </motion.span>
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
