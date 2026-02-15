/** @format */

import React from "react";
import { Outlet } from "react-router";

export default function DashboardLayout() {
  return (
    <div>
      <h1>Sidebar</h1>
      <h1>Header</h1>
      <Outlet />
    </div>
  );
}
