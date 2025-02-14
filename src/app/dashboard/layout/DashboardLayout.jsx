// components/DashboardLayout.jsx
import React from 'react';
import { SideBar } from '../components/sidebar/SideBar';

const DashboardLayout = ({ children }) => {
  return (
    <div className="overflow-hidden p-8 bg-white rounded-3xl shadow-2xl max-md:px-5">
          <div className="flex gap-5 max-md:flex-col">
            <SideBar  />
            {children}
          </div>
        </div>
  );
};

export default DashboardLayout;