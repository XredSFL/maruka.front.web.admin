import * as React from "react";
import Link from "next/link";
import DashboardLayout from "./layout/DashboardLayout";
import { DashboardMainSection } from "./components/dashboard/DashboardMainSection";
import {AdministratorMainSection } from "./components/administrator/AdministratorMainSection";
import { SideBar } from "./components/sidebar/SideBar";


const visitorStats = [
  { value: "10,000", label: "This Month" },
  { value: "5,000", label: "Last Month", highlighted: true },
  { value: "15,000", label: "Total" }
];


function DashboardPage() {
  return (
    <DashboardLayout>
      <DashboardMainSection />
    </DashboardLayout>
  );
}

export default DashboardPage;