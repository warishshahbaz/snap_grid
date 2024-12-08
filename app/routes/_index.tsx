import { Link } from "@remix-run/react";
import React, { useState } from "react";

const Main: React.FC = () => {
  return (
    <>
      <h3 className="md:text-3xl text-6xl font-bold mb-4 text-center mt-12">
        Snap Grid System
      </h3>
      <div className="w-full flex justify-center gap-4 md:mt-5 mt-2 ">
        <Link to={"/admin"}>
          <p className="md:p-4 p-2 bg-blue-400 md:w-[200px] w-[100px] text-white font-semibold rounded-[30px] text-center shadow-lg min-h-[50px] md:text-xl text-md hover:bg-blue-500 flex justify-center items-center ">
            <p>Admin View </p>
          </p>
        </Link>

        <Link to={"/view"}>
          <div className="md:p-4 p-2 bg-blue-400 md:w-[200px] w-[100px] text-white font-semibold rounded-[30px] text-center shadow-lg min-h-[50px] md:text-xl text-md hover:bg-blue-500 flex justify-center items-center ">
            User View
          </div>
        </Link>
      </div>
    </>
  );
};

export default Main;
