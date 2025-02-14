// components/SidebarMenuItem.jsx
import React from 'react';

const SidebarMenuItem = ({ icon, label, active, onClick }) => {
  return (
    <div
      className={`flex gap-3 justify-center items-center px-4 py-3 w-full cursor-pointer ${
        active ? 'bg-white bg-opacity-20' : ''
      }`}
      onClick={onClick}
    >
      <img
        loading="lazy"
        src={icon}
        alt=""
        className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
      />
      <div className="flex-auto my-auto">{label}</div>
    </div>
  );
};

export default SidebarMenuItem;