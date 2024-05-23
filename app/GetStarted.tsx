import React from "react";
import Link from "next/link";
import Image from "next/image";
import weathericon from "./Asset/weathericon.svg";
import { ToastContainer } from "react-toastify";

const GetStarted = () => {
  return (
    <div className="mx-auto w-[80%] h-[100vh] flex flex-col justify-center items-center gap-y-10">
      <ToastContainer />
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
        }}>
        <Image
          src={weathericon}
          alt="weathericn"
          style={{
            width: "100%",
            height: "100%",
          }}
        />
      </div>
      <button className="shadow bg-[rgb(255,215,0)] w-full h-[3rem] rounded font-semibold">
        <Link href={"/homepage"}> Get Started</Link>
      </button>
    </div>
  );
};

export default GetStarted;
