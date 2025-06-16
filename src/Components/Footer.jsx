import React from "react";

const Footer = () => {
  return (
    <footer className="bg-zinc-900 text-zinc-400 text-sm text-center py-4">
      <p>
        &copy; {new Date().getFullYear()} Jordan Barone · Sine Innovations. All
        rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
