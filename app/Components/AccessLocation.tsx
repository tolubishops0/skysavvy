"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import locationicom from "../Asset/locicon.svg";
import { ToastContainer } from "react-toastify";

interface Ierror {
  error: number | null;
}

const AccessLocation = ({ error }: Ierror) => {
  const [errorMessage, setErrorMessage] = useState("");
  useEffect(() => {
    if (error === 1) {
      setErrorMessage("Please enable your location");
    } else if (error === 2) {
      setErrorMessage("Network error. Please, try again.");
    } else if (error === 3) {
      setErrorMessage("TimeOut, Please try again");
    }
  }, [error]);

  return (
    <div className="mx-auto w-[80%] h-[100vh] flex flex-col justify-center items-center gap-y-10">
      <ToastContainer />
      <div className="w-[80%] lg:w-[50%] flex justify-center items-center">
        <Image
          src={locationicom}
          alt="weathericn"
          style={{
            width: "100%",
            height: "100%",
          }}
        />
      </div>
      <p> {errorMessage}</p>
    </div>
  );
};

export default AccessLocation;
