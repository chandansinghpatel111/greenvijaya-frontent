import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { FaUser } from "react-icons/fa";
import { auth, db } from "../firebase";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import CustomButton from "./Button";
import logo from "../assets/WhatsApp Image 2025-06-07 at 21.29.03_0b4b94df.jpg"; // Add your logo image here

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isUserLogin, setIsUserLogin] = useState(false);
  const [userid, setUserid] = useState(null);
  const [role, setRole] = useState("User");

  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUserid(user.uid);
        setIsUserLogin(true);
      } else {
        setIsUserLogin(false);
      }
    });
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      if (userid) {
        try {
          const userDocRef = doc(db, "usersunique", userid);
          const userdata = await getDoc(userDocRef);

          if (userdata.exists()) {
            setRole(userdata.data().role);
          } else {
            console.log("No such user!");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUserData();
  }, [userid]);

  const navItems = [
    { title: "Home", path: "/" },
    { title: "City", path: "/city" },
    { title: "About", path: "/about" },
    { title: "Service", path: "/service" },
  ];

  return (
    <nav className="bg-pink-300 text-pink-700 p-4 shadow-md sticky top-0 z-50 w-full">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-12">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-2">
            <img
              src={logo}
              alt="Logo"
              className="h-10 w-10 object-cover rounded-full"
            />
           <Link to="/" className="text-2xl font-bold rounded">
  <span className="text-blue-500">UNIQUE</span>{" "}
  <span className="text-[#8B4513]">USD</span>
</Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.title}
                to={item.path || "#"}
                className="text-black px-3 py-2 rounded-md text-sm font-medium flex items-center hover:text-blue-700"
              >
                {item.title}
              </Link>
            ))}

            <CustomButton
              onClick={() => navigate("/PostProperty")}
              text={"PostProperty FREE"}
            />
            {isUserLogin ? (
              <div className="cursor-pointer" onClick={() => navigate("profile")}>
                <FaUser className="mr-9 mt-2 text-blue-700" />
              </div>
            ) : (
              <CustomButton onClick={() => navigate("/login")} text={"Login"} />
            )}
          </div>

          {role === "Admin" && (
            <div className="cursor-pointer hidden md:block" onClick={() => navigate("admin")}>
              Admin
            </div>
          )}

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-black hover:text-white hover:bg-gray-100 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white">
            {navItems.map((item) => (
              <Link
                key={item.title}
                to={item.path || "#"}
                className="px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:bg-orange-500 flex items-center"
                onClick={() => {
                  setIsOpen(false);
                }}
              >
                {item.title}
              </Link>
            ))}

            <button
              onClick={() => {
                setIsOpen(false);
                navigate("/PostProperty");
              }}
              className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:bg-orange-500"
            >
              Post property listing
            </button>

            {isUserLogin ? (
              <div className="cursor-pointer" onClick={() => navigate("profile")}>
                <FaUser className="mr-9 mt-2 text-blue-700" />
              </div>
            ) : (
              <button
                className="cursor-pointer border border-blue pl-5 pr-5 rounded-full hover:bg-blue-700 hover:text-white"
                onClick={() => navigate("login")}
              >
                Login
              </button>
            )}
          </div>

          {role === "Admin" && (
            <div className="cursor-pointer px-3 py-2 text-gray-700" onClick={() => navigate("admin")}>
              Admin
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
