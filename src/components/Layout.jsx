import React from "react";
import Navbars from "./Navbar";

const Layout = ({ children }) => {
  return (
    <>
      <Navbars />

      <main>{children}</main>
    </>
  );
};

export default Layout;
