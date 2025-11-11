// i created this to react router 
import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

export default function UserLayout() {
  return (
    <>
      <Navbar />
      <div className="page-container">
        <Outlet />
      </div>
    </>
  );
}
