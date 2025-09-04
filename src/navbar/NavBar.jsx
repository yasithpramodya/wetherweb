import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes, FaUser, FaSignOutAlt } from 'react-icons/fa';

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const navRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [user, setUser] = useState({
    name: 'Alex Johnson',
    email: 'alex.johnson@algominds.com',
    role: 'Developer'
  });

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => {
    setIsOpen(false);
    setUserDropdownOpen(false);
  };
  const toggleUserDropdown = () => setUserDropdownOpen(!userDropdownOpen);

  const handleSignOut = () => {
    setIsAuthenticated(false);
    setUser(null);
    closeMenu();
    navigate('/');
  };

  const getInitials = (name) => {
    return name ? name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : 'U';
  };

  // Close menus on route change
  useEffect(() => closeMenu(), [location.pathname]);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        closeMenu();
      }
    };

    if (isOpen || userDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, userDropdownOpen]);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <>
      <nav 
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all ${
          isScrolled ? 'bg-slate-800/95 backdrop-blur-sm shadow-lg' : 'bg-slate-500/70'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link 
              to="/" 
              className="flex items-center gap-2 text-white font-bold text-xl"
              onClick={closeMenu}
            >
              <div className="w-8 h-8 bg-gradient-to-br from-sky-400 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">AM</span>
              </div>
              <span>Algo Minds</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-2">
              <NavLinks 
                isAuthenticated={isAuthenticated} 
                user={user} 
                userDropdownOpen={userDropdownOpen}
                toggleUserDropdown={toggleUserDropdown}
                handleSignOut={handleSignOut}
                getInitials={getInitials}
                closeMenu={closeMenu}
              />
            </div>

            {/* Mobile menu button */}
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 text-white focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden bg-slate-800 transition-all duration-300 ${
          isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        }`}>
          <div className="px-4 py-2">
            <NavLinks 
              mobile 
              isAuthenticated={isAuthenticated} 
              user={user}
              handleSignOut={handleSignOut}
              getInitials={getInitials}
              closeMenu={closeMenu}
            />
          </div>
        </div>
      </nav>

      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden" 
          onClick={closeMenu}
        />
      )}
    </>
  );
}

function NavLinks({ 
  mobile = false, 
  isAuthenticated = false, 
  user = null,
  userDropdownOpen = false,
  toggleUserDropdown = () => {},
  handleSignOut = () => {},
  getInitials = () => 'U',
  closeMenu = () => {}
}) {
  const location = useLocation();
  
  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/tasks', label: 'Tasks' },
    { path: '/location', label: 'Location' },
    { path: '/contact', label: 'Contact Us' }
  ];

  const isActive = (path) => location.pathname === path || 
    (path !== '/' && location.pathname.startsWith(path));

  const getLinkClass = (path) => {
    return mobile
      ? `block px-4 py-3 text-white ${isActive(path) ? 'bg-slate-700/50' : 'hover:bg-slate-700/30'}`
      : `px-3 py-2 text-white ${isActive(path) ? 'bg-slate-700/70' : 'hover:bg-slate-700/50'}`;
  };

  return (
    <>
      {navItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={getLinkClass(item.path)}
          onClick={closeMenu}
        >
          {item.label}
        </Link>
      ))}
      
      {isAuthenticated ? (
        mobile ? (
          <>
            <div className="border-t border-slate-700 mt-2 pt-2 ">
              <Link
                to="/profile"
                className="block px-4 py-3 text-white hover:bg-slate-700/30 rounded-2xl"
                onClick={closeMenu}
              >
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-br from-sky-400 to-blue-600 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white text-sm font-bold">
                      {getInitials(user?.name)}
                    </span>
                  </div>
                  <div>
                    <div className="font-medium">{user?.name}</div>
                    <div className="text-sm text-slate-300">{user?.role}</div>
                  </div>
                </div>
              </Link>
              <button
                onClick={handleSignOut}
                className="w-full px-4 py-3 text-left text-white hover:bg-red-600/20 flex items-center"
              >
                <FaSignOutAlt className="mr-3 text-red-400" />
                Sign Out
              </button>
            </div>
          </>
        ) : (
          <div className="relative ml-2">
            <button
              onClick={toggleUserDropdown}
              className="flex items-center px-3 py-2 text-white bg-slate-700/70 rounded-lg"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-sky-400 to-blue-600 rounded-full flex items-center justify-center mr-2">
                <span className="text-white text-sm font-bold">
                  {getInitials(user?.name)}
                </span>
              </div>
              {user?.name}
            </button>
            {userDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-slate-800 rounded-lg shadow-lg py-1">
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-white hover:bg-slate-700/50 "
                  onClick={closeMenu}
                >
                  Profile
                </Link>
                <button
                  onClick={handleSignOut}
                  className="w-full text-left px-4 py-2 text-white hover:bg-red-600/20"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        )
      ) : (
        <Link
          to="/login"
          className={`block ${mobile ? 'w-full mt-2 px-4 py-3 bg-blue-600 hover:bg-blue-700' : 'px-4 py-2 ml-2 bg-blue-600 hover:bg-blue-700'} text-white rounded-lg text-center`}
          onClick={closeMenu}
        >
          Sign In
        </Link>
      )}
    </>
  );
}

export default NavBar;