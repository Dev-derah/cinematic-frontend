"use client";
import React from "react";
interface FooterProps{
    appName: string;
}

const Footer = ({appName}:FooterProps) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="text-center space-y-2 text-sm text-gray-400 opacity-50">
      <p>
        &copy; {currentYear} {appName}, All Rights Reserved
      </p>
    </footer>
  );
};

export default Footer;
