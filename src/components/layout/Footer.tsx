import React from "react";
import { Linkedin } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white py-10">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <p className="text-sm opacity-70">© {new Date().getFullYear()} All rights reserved.</p>
          </div>

          <div className="flex items-center">
            <a href="https://www.linkedin.com/in/alexandrina-tofan" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity" aria-label="LinkedIn Profile">
              <div><Linkedin size={24} /> </div>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
