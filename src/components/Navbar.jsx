import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Sun, Moon } from "lucide-react";
import { FaUser } from "react-icons/fa";
import { useEffect, useState } from "react";
import apiClient from "../api/apiClient";
import CustomButton from "./Button";
import logo from "../assets/greenlogo.jpeg";
import { useTheme } from "../context/ThemeContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isUserLogin, setIsUserLogin] = useState(false);
  const [role, setRole] = useState("user");
  const { isDarkMode, toggleTheme } = useTheme();

  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (user && user.token) {
      setIsUserLogin(true);
      setRole(user.role);
    } else {
      setIsUserLogin(false);
      setRole('user');
    }
  }, []);

  const navItems = [
    { title: "Home", path: "/" },
    { title: "Properties", path: "/listing-post" },
    { title: "City", path: "/city" },
    { title: "About", path: "/about" },
    { title: "Contact", path: "/contact" },
    { title: "Service", path: "/service" },
    { title: "Project", path: "/NewsProject" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 w-full border-b border-slate-200/80 dark:border-slate-800/80 bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl shadow-md transition-all duration-300">
      {/* Powerful Executive Corporate Strip with Live Advisory Beacon */}
      <div className="overflow-hidden bg-gradient-to-r from-[#291217] via-[#3d1e24] to-[#4e222d] text-rose-50 border-b border-rose-900/50 shadow-inner">
        <div className="animate-marquee pause-hover whitespace-nowrap py-2 text-xs font-bold tracking-[0.25em] uppercase flex items-center">
          <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 animate-pulse mr-2.5 ml-4 shadow-sm shadow-emerald-400/80"></span>
          <span>GREEN VIJAYA INFRA WORKS PVT. LTD. • PREMIER GOVT-APPROVED REAL ESTATE & LUXURY TOWNSHIPS • DIRECT EXECUTIVE ADVISORY: +91-9450058323</span>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-1.5 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-3.5">
            <Link to="/" className="group flex items-center gap-3.5">
              <div className="relative overflow-hidden rounded-full p-0.5 border-2 border-[#753441]/30 ">
                <img src={logo} alt="Green Vijaya Logo" className="h-11 w-11 sm:h-12 sm:w-12 rounded-full object-cover" />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-xl sm:text-2xl font-black bg-gradient-to-r from-[#291217] via-[#461e27] to-[#753441] dark:from-rose-300 dark:via-rose-400 dark:to-rose-500 bg-clip-text text-transparent tracking-tight">
                  Green Vijaya
                </span>
                <span className="text-[10px] sm:text-xs font-extrabold uppercase tracking-widest text-[#753441]/90">
                  Infra Works Pvt. Ltd.
                </span>
              </div>
            </Link>
          </div>

          <div className="hidden items-center gap-4 lg:gap-7 md:flex">
            <div className="flex items-center gap-6 bg-slate-50/80 dark:bg-slate-900/80 border border-slate-200/60 dark:border-slate-800/60 p-1.5 rounded-full shadow-inner">
              {navItems.map((item) => (
                <Link
                  key={item.title}
                  to={item.path || "#"}
                  className="px-4 py-2 rounded-full text-sm font-bold text-slate-700 dark:text-slate-300 transition-all duration-300 hover:bg-white dark:hover:bg-slate-800 hover:text-[#3d1e24] dark:hover:text-white hover:shadow-xl active:scale-110"
                >
                  {item.title}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-5 pl-4 border-l border-slate-200 dark:border-slate-800">
              
              {isUserLogin ? (
                (role === 'admin' || role === 'Admin') ? (
                  <button
                    className="inline-flex items-center gap-2.5 rounded-full border-2 border-[#753441] bg-[#753441] px-5 py-2 font-extrabold text-sm text-white transition-all duration-300 hover:bg-[#56252f] hover:shadow-md active:scale-95"
                    onClick={() => navigate("/admin")}
                  >
                    <span>Admin Panel</span>
                  </button>
                ) : (
                  <button
                    className="inline-flex items-center gap-2.5 rounded-full border-2 border-rose-200 bg-rose-50/90 px-5 py-2 font-extrabold text-sm text-[#3d1e24] transition-all duration-300 hover:border-[#753441] hover:bg-white hover:shadow-md active:scale-95"
                    onClick={() => navigate("/profile")}
                  >
                    <FaUser className="text-[#753441] text-sm" />
                    <span>My Profile</span>
                  </button>
                )
              ) : (
                <button
                  onClick={() => navigate("/login")}
                  className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#3d1e24] via-[#56252f] to-[#753441] px-7 py-2.5 text-sm font-extrabold text-white shadow-md shadow-[#3d1e24]/25 transition-all duration-300 hover:scale-[1.03] hover:shadow-lg active:scale-95"
                >
                  Login
                </button>
              )}

              {/* Theme Toggle Button (Moved to end) */}
              <button
                onClick={toggleTheme}
                className="flex items-center justify-center h-10 w-10 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              >
                {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            </div>
          </div>

          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="inline-flex items-center justify-center rounded-full border border-slate-200/90 dark:border-slate-800/90 bg-slate-50 dark:bg-slate-800 p-2.5 text-slate-800 dark:text-slate-200 shadow-sm hover:bg-white dark:hover:bg-slate-700 hover:text-[#3d1e24] dark:hover:text-white transition-colors"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              onClick={toggleMenu}
              aria-label="Toggle Navigation Menu"
              className="inline-flex items-center justify-center rounded-full border border-slate-200/90 dark:border-slate-800/90 bg-slate-50 dark:bg-slate-800 p-2.5 text-slate-800 dark:text-slate-200 shadow-sm hover:bg-white dark:hover:bg-slate-700 hover:text-[#3d1e24] dark:hover:text-white transition-colors"
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="border-t border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 px-5 py-5 shadow-xl backdrop-blur-xl md:hidden transition-all">
          <div className="space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.title}
                to={item.path || "#"}
                className="block rounded-xl px-4 py-3 text-base font-extrabold text-slate-800 dark:text-slate-200 transition-all hover:bg-rose-50 dark:hover:bg-slate-800 hover:text-[#3d1e24] dark:hover:text-white active:scale-98"
                onClick={() => setIsOpen(false)}
              >
                {item.title}
              </Link>
            ))}

            <div className="pt-3 mt-3 border-t border-slate-200/80">
              {isUserLogin ? (
                (role === 'admin' || role === 'Admin') ? (
                  <button
                    className="w-full rounded-2xl bg-gradient-to-r from-[#3d1e24] via-[#56252f] to-[#753441] px-4 py-3.5 font-extrabold text-white shadow-lg shadow-[#3d1e24]/20 transition-all active:scale-95"
                    onClick={() => {
                      setIsOpen(false);
                      navigate("/admin");
                    }}
                  >
                    Go to Admin Panel
                  </button>
                ) : (
                  <button
                    className="w-full flex items-center justify-center gap-3 rounded-2xl border border-rose-300 bg-rose-50 px-4 py-3.5 text-center font-extrabold text-[#3d1e24] shadow-sm active:scale-98"
                    onClick={() => {
                      setIsOpen(false);
                      navigate("/profile");
                    }}
                  >
                    <FaUser className="text-[#753441]" />
                    <span>View My Profile</span>
                  </button>
                )
              ) : (
                <button
                  className="w-full rounded-2xl bg-gradient-to-r from-[#3d1e24] via-[#56252f] to-[#753441] px-4 py-3.5 font-extrabold text-white shadow-lg shadow-[#3d1e24]/20 transition-all active:scale-95"
                  onClick={() => {
                    setIsOpen(false);
                    navigate("/login");
                  }}
                >
                  Login to Account
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
