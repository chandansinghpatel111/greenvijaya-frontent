import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { FaUser } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import CustomButton from "./Button";
import logo from "../assets/greenlogo.jpeg";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const isUserLogin = !!user;
  const role = user?.role?.toLowerCase() || "user";

  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navItems = [
    { title: "Home", path: "/" },
    { title: "About", path: "/about" },
    { title: "City", path: "/city" },
    { title: "Contact", path: "/contact" },
    { title: "Property", path: "/listing-post" },
    { title: "Project", path: "/NewsProject" },
    { title: "Service", path: "/service" }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur-xl shadow-md transition-all duration-300">

      <div className="mx-auto max-w-7xl px-4 py-1 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between">
          <div className="flex items-center gap-3.5">
            <Link to="/" className="group flex items-center gap-3.5">
              <div className="relative overflow-hidden rounded-full p-0.5 border-2 border-brand-gold/30 ">
                <img src={logo} alt="Green Vijaya Logo" className="h-9 w-9 sm:h-10 sm:w-10 rounded-full object-cover" />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-lg sm:text-xl font-black bg-gradient-to-r from-[#291217] via-[#461e27] to-brand-gold bg-clip-text text-transparent tracking-tight">
                  Green Vijaya
                </span>
                <span className="text-[9px] sm:text-[10px] font-extrabold uppercase tracking-widest text-brand-gold/90">
                  Infra Works Pvt. Ltd.
                </span>
              </div>
            </Link>
          </div>

          <div className="hidden items-center gap-2 lg:gap-4 md:flex">
            <div className="flex items-center gap-1 bg-white/70 backdrop-blur-md border border-brand-gold/30 p-1.5 rounded-full shadow-sm">
              {navItems.map((item) => (
                <Link
                  key={item.title}
                  to={item.path || "#"}
                  className="px-4 py-2 rounded-full text-[13px] font-bold text-slate-700 transition-all duration-300 hover:bg-brand-burgundy hover:text-white hover:shadow-md hover:-translate-y-0.5 active:scale-95"
                >
                  {item.title}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
              {isUserLogin ? (
                <div className="flex items-center gap-2">
                  <button
                    className="inline-flex items-center gap-2 rounded-full border-2 border-rose-200 bg-rose-50/90 px-4 py-1.5 font-extrabold text-sm text-brand-burgundy transition-all duration-300 hover:border-brand-gold hover:bg-white hover:shadow-md active:scale-95"
                    onClick={() => navigate("profile")}
                  >
                    {user?.photoURL ? (
                      <img src={user.photoURL} alt="User" className="w-6 h-6 rounded-full object-cover" />
                    ) : (
                      <div className="w-6 h-6 bg-brand-gold text-white rounded-full flex items-center justify-center text-xs">
                        {user?.name?.[0] || 'U'}
                      </div>
                    )}
                    <span className="hidden sm:inline">{user?.name?.split(' ')[0] || 'Profile'}</span>
                  </button>
                  <button
                    onClick={() => {
                      logout();
                      navigate('/login');
                    }}
                    className="inline-flex items-center justify-center rounded-full bg-slate-100 hover:bg-red-50 text-slate-700 hover:text-red-600 border border-slate-200 hover:border-red-200 px-4 py-1.5 text-sm font-bold transition-all duration-300 shadow-sm active:scale-95"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => navigate("/login")}
                  className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-brand-burgundy via-[#56252f] to-brand-gold px-7 py-2 text-sm font-extrabold text-white shadow-md shadow-[#3d1e24]/25 transition-all duration-300 hover:scale-[1.03] hover:shadow-lg active:scale-95"
                >
                  Login
                </button>
              )}

              {role === "admin" && (
                <button
                  onClick={() => navigate("admin")}
                  className="cursor-pointer rounded-full border-2 border-amber-500/80 bg-amber-50 px-5 py-2 text-sm font-black text-amber-950 hover:bg-amber-100 hover:shadow-md transition-all active:scale-95 shadow-sm"
                >
                  Admin Panel
                </button>
              )}
            </div>
          </div>

          <div className="md:hidden flex items-center gap-2">
            {role === "admin" && (
              <button
                onClick={() => navigate("admin")}
                className="rounded-full bg-amber-50 border border-amber-400 px-3 py-1.5 text-xs font-bold text-amber-900 shadow-sm"
              >
                Admin
              </button>
            )}
            <button
              onClick={toggleMenu}
              aria-label="Toggle Navigation Menu"
              className="inline-flex items-center justify-center rounded-full border border-slate-200/90 bg-slate-50 p-2.5 text-brand-burgundy/90 shadow-sm hover:bg-white hover:text-brand-burgundy transition-colors"
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="border-t border-slate-200 bg-white/95 px-5 py-5 shadow-xl backdrop-blur-xl md:hidden transition-all">
          <div className="space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.title}
                to={item.path || "#"}
                className="block rounded-xl px-4 py-3 text-base font-extrabold text-brand-burgundy/90 transition-all hover:bg-rose-50 hover:text-brand-burgundy active:scale-98"
                onClick={() => setIsOpen(false)}
              >
                {item.title}
              </Link>
            ))}

            <div className="pt-3 mt-3 border-t border-slate-200/80">
              {isUserLogin ? (
                <div className="flex flex-col gap-2">
                  <button
                    className="w-full flex items-center justify-center gap-3 rounded-2xl border border-rose-300 bg-rose-50 px-4 py-3.5 text-center font-extrabold text-brand-burgundy shadow-sm active:scale-98"
                    onClick={() => {
                      setIsOpen(false);
                      navigate("profile");
                    }}
                  >
                    {user?.photoURL ? (
                      <img src={user.photoURL} alt="User" className="w-6 h-6 rounded-full object-cover" />
                    ) : (
                      <div className="w-6 h-6 bg-brand-gold text-white rounded-full flex items-center justify-center text-xs">
                        {user?.name?.[0] || 'U'}
                      </div>
                    )}
                    <span>View My Profile</span>
                  </button>
                  <button
                    className="w-full rounded-2xl bg-slate-100 border border-slate-200 px-4 py-3.5 font-extrabold text-slate-700 hover:text-red-600 transition-all active:scale-95"
                    onClick={() => {
                      setIsOpen(false);
                      logout();
                      navigate("login");
                    }}
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  className="w-full rounded-2xl bg-gradient-to-r from-brand-burgundy via-[#56252f] to-brand-gold px-4 py-3.5 font-extrabold text-white shadow-lg shadow-[#3d1e24]/20 transition-all active:scale-95"
                  onClick={() => {
                    setIsOpen(false);
                    navigate("login");
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
