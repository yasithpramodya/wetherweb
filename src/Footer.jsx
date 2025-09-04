import React from 'react';

function Footer() {
  return (
    <footer className="bg-slate-800 text-white text-[11px]">
      <div className="max-w-6xl mx-auto px-3 py-2">
        <div className="flex flex-col md:flex-row justify-between items-center gap-2">
          {/* Logo */}
          <div className="flex items-center gap-1">
            <div className="w-5 h-5 bg-gradient-to-br from-sky-400 to-blue-600 rounded flex items-center justify-center text-[9px] font-bold">
              AM
            </div>
            <span className="text-[12px] font-medium">Algo Minds</span>
          </div>

          {/* Quick Links */}
          <div className="flex gap-3 flex-wrap justify-center text-slate-400">
            <a href="/" className="hover:text-sky-300">Home</a>
            <a href="/tasks" className="hover:text-sky-300">Tasks</a>
            <a href="/location" className="hover:text-sky-300">Location</a>
            <a href="/contact" className="hover:text-sky-300">Contact</a>
          </div>

          {/* Account Links */}
          <div className="flex gap-3 flex-wrap justify-center text-slate-400">
            <a href="/signin" className="hover:text-sky-300">Sign In</a>
            <a href="/signup" className="hover:text-sky-300">Sign Up</a>
            <a href="/profile" className="hover:text-sky-300">Profile</a>
          </div>
        </div>

        {/* Bottom line */}
        <div className="mt-2 border-t border-slate-700 pt-1 flex flex-col md:flex-row justify-between items-center text-slate-500 text-[10px]">
          <span>© 2025 Algo Minds. All rights reserved.</span>
          <div className="flex gap-3 mt-1 md:mt-0">
            <a href="#" className="hover:text-sky-300">Privacy</a>
            <a href="#" className="hover:text-sky-300">Terms</a>
            <a href="#" className="hover:text-sky-300">Support</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
