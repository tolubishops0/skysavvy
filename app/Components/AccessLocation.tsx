import React from "react";
import Image from "next/image";
import locationicom from "../Asset/locicon.svg";
import { ToastContainer } from "react-toastify";

const AccessLocation = () => {
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
          src={locationicom}
          alt="weathericn"
          style={{
            width: "100%",
            height: "100%",
          }}
        />
      </div>
      <p> Pls, enable your location</p>
    </div>
  );
};

export default AccessLocation;
