import React from "react";
import { connect } from "react-redux";
import LayoutTeacher from "./LayoutTeacher";
import NavbarHome from "./Navbar/NavbarHome";
import NavbarStudent from "./Navbar/NavbarStudent";
import NavbarTeacher from "./Navbar/NavbarTeacher";

function Layouts({ children, user_data }) {
  return (
    <>
      {user_data === null ? (
        <NavbarHome />
      ) : user_data.level === "m" ? (
        <NavbarStudent />
      ) : user_data.level === "a" ? (
        <LayoutTeacher>
          <NavbarTeacher />
        </LayoutTeacher>
      ) : (
        ""
      )}

      <div className="animate__animated animate__fadeIn h-full">{children}</div>
    </>
  );
}

export default connect((state) => {
  return state;
})(Layouts);
