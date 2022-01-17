import React from "react";
import NavbarHome from "./Navbar/NavbarHome";

export default function Layouts({ children }) {
  return (
    <>
      <div className="dark:bg-slate-900 dark:text-gray-50">
        <NavbarHome />
        <div className="animate__animated animate__fadeIn">{children}</div>
      </div>
    </>
  );
}
