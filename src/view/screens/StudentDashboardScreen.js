import React from "react";

import SideNavigationMenu from "../components/SideNavigationMenu";
import HamburgerNavbar from "../components/HamburgerNavbar";

function StudentDashboardScreen() {

  return (
    <>
      <SideNavigationMenu />
      <HamburgerNavbar />
      <p>Dashboard</p>
    </>
  );
}

export default StudentDashboardScreen;