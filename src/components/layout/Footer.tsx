import React from 'react';
import { Linkedin } from 'lucide-react';

export default function Footer(){
    return (
        <footer className="bg-black text-white py-10">
            <div className="container mx-auto px-4 max-w-screen-xl">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="text-center md:text-left">
                        <p className="text-sm opacity-70">
                            © {new Date().getFullYear()} All rights reserved.
                        </p>
                    </div>
                    
                    <div className="flex items-center gap-4">
                        <a
                            href="https://www.linkedin.com/in/alexandrina-tofan"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:opacity-70 transition-opacity"
                            aria-label="LinkedIn Profile"
                        >
                            <Linkedin size={24} />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

