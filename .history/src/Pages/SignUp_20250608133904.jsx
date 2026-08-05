import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import bgVideo from "../assets/login1.mp4";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateFields = () => {
    if (!name.trim()) return "Name cannot be empty.";
    if (!/^\d{10}$/.test(mobileNumber)) return "Invalid mobile number. Enter 10 digits.";
    if (!/\S+@\S+\.\S+/.test(email)) return "Invalid email format.";
    if (password.length < 6) return "Password must be at least 6 characters.";
    if (password !== confirmPassword) return "Passwords do not match.";
    return null;
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setMessage("");
    const validationError = validateFields();
    if (validationError) {
      setMessage(validationError);
      return;
    }

    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await updateProfile(user, { displayName: name });

      await setDoc(doc(db, "usersunique", user.uid), {
        name,
        email,
        mobileNumber,
        createdAt: new Date().toISOString(),
      });

      setMessage("User successfully signed up!");

      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setMobileNumber("");

      setTimeout(() => navigate("/login"), 1000);
    } catch (error) {
      const errorMsg =
        error.code === "auth/email-already-in-use"
          ? "Email already in use. Try another one."
          : error.code === "auth/invalid-email"
          ? "Invalid email format."
          : error.code === "auth/weak-password"
          ? "Password is too weak. Use a stronger password."
          : "An error occurred. Please try again.";
      setMessage(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Left Side - Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Create an Account
          </h2>

          <form onSubmit={handleSignUp}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full mt-2 p-3 border rounded focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Mobile Number</label>
              <input
                type="text"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                required
                className="w-full mt-2 p-3 border rounded focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full mt-2 p-3 border rounded focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full mt-2 p-3 border rounded focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full mt-2 p-3 border rounded focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full p-3 mt-2 text-white rounded transition duration-300 ${
                loading ? "bg-gray-400 cursor-not-allowed" : "bg-orange-500 hover:bg-orange-600"
              }`}
            >
              {loading ? "Registering..." : "Register"}
            </button>

            <div className="text-center mt-4 text-sm">
              Already have an account?{" "}
              <button onClick={() => navigate("/login")} className="text-blue-600 hover:underline">
                Login
              </button>
            </div>

            {message && (
              <p className={`mt-4 text-center text-sm ${message.includes("error") ? "text-red-500" : "text-green-600"}`}>
                {message}
              </p>
            )}
          </form>
        </div>
      </div>

      {/* Right Side - Background Video */}
      <div className="hidden md:block md:w-1/2 relative">
        <video
          className="absolute top-0 left-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
        >
          <source src={bgVideo} type="video/mp4" />
        </video>
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-40" />
      </div>
    </div>
  );
};

export default SignUp;
