'use client';
import React, { useEffect } from "react";
import ReactGA from "react-ga4";

export default function ClientLayout({ children }) {
  useEffect(() => {
    ReactGA.initialize("G-2PNF17646X");
  }, []);

  return <>{children}</>;
}