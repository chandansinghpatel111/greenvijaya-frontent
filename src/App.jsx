import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

// Layout
import Layout from "./components/Layout";
import ScrollToTop from "./components/ScrollToTop";

// Pages
import Home from "./Pages/Home";
import City from "./Pages/Citys";
import Buy from "./Pages/Buy";
import Project from "./Pages/Project";
import About from "./Pages/About";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import ForgotPassword from "./Pages/ForgotPassword";
import Service from "./Pages/Service";
import PostProperty from "./Pages/PostProperty";
import Profilepage from "./Pages/ProfilePage";
import OurTeams from "./Pages/OurTeams";

import ServiceDetail from "./Pages/ServiceDetail";

import Listingproperties from "./Pages/Listingproperties";

import ContactUs from "./Pages/ContactUs";
import Cityhome from "./Pages/Cityhome";
import AdditionalDetails from "./Pages/AdditionalDetails";
import Amenities from "./Pages/Amenities";
import PropertyDetails from "./Pages/PropertyDetails";
import NewProject from "./Pages/NewProject";
import NewProjectD from "./Pages/NewProjectD";
import NewprojectDetail from "./Pages/NewProjectDetail";
import ExplorecityPropertyD from "./Pages/ExplorecityPropertyD";
import ListingpropertDetail from "./Pages/ListingpropertDetail";
import PrivacyPolicy from "./Pages/PrivacyPolicy";
import NewsProject from "./Pages/NewsProject";
import NewsProjectdetail from "./Pages/NewsProjectdetail";
import ProjectDetails from "./Pages/ProjectDetails";
import LucknowDetailPage from "./Pages/LucknowDetailPage";

// Dynamic
import OurService1 from "./Dynamic/OurService1";
import Search from "./components/Search";

// Admin
import AdminLayout from "./Admin/AdminLayout";
import AdminPanel from "./Admin/AdminPanel";
import OurProject from "./Admin/OurProject";
import PropertyApprovals from "./Admin/PropertyApprovals";
import RegisteredSellers from "./Admin/RegisteredSellers";
import PostPropertyListing from "./Seller/Postlisting";
import Enquiries from "./Admin/Enquiries";
import AdminProfile from "./Admin/AdminProfile";

import Buys from "./Admin/Buys";

import ProjectExplore from "./Admin/ProjectExplore";

// Seller
import Postlisting from "./Seller/Postlisting";

// Admin Guard
import AdminGuard from "./components/AdminGuard";

function App() {
  const [isUserLogin, setIsUserLogin] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    setIsUserLogin(!!user);
  }, []);

  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Auth Routes (no layout) */}
        <Route
          path="/login"
          element={isUserLogin ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/sign"
          element={isUserLogin ? <Navigate to="/" /> : <SignUp />}
        />
        <Route
          path="/forgot-password"
          element={isUserLogin ? <Navigate to="/" /> : <ForgotPassword />}
        />
        <Route path="/postproperty" element={<PostProperty />} />

        {/* Layout wrapped routes */}
        <Route element={<Layout />}>
          {/* Public Pages */}
          <Route path="/" element={<Home />} />
          <Route path="/city" element={<City />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/buy" element={<Buy />} />
          <Route path="/project" element={<Project />} />
          <Route path="/about" element={<About />} />
          <Route path="/service" element={<Service />} />
          <Route path="/contact" element={<ContactUs />} />

          <Route path="/Search" element={<Search />} />


          {/* Dynamic / Detail Routes */}
          <Route path="/services/:serviceUrl" element={<ServiceDetail />} />

          <Route path="/ProjectService/:url" element={<OurService1 />} />
          <Route path="/listing-post" element={<Listingproperties />} />
          <Route path="/listing-detail" element={<ListingpropertDetail />} />
          <Route path="/Cityhome" element={<Cityhome />} />
          <Route path="/AdditionalDetails" element={<AdditionalDetails />} />
          <Route path="/Amenities" element={<Amenities />} />
          <Route path="/PropertyDetails" element={<PropertyDetails />} />
          <Route path="/NewProject" element={<NewProject />} />
          <Route path="/NewProjectD" element={<NewProjectD />} />
          <Route path="/Newprojectdetial" element={<NewprojectDetail />} />
          <Route path="/ExplorecityPropertyD" element={<ExplorecityPropertyD />} />
          <Route path="/lucknow/:projectId" element={<LucknowDetailPage />} />
          <Route path="/noida/:projectId" element={<LucknowDetailPage />} />
          <Route path="/gurugram/:projectId" element={<LucknowDetailPage />} />
          <Route path="/kanpur/:projectId" element={<LucknowDetailPage />} />
          <Route path="/varanasi/:projectId" element={<LucknowDetailPage />} />
          <Route path="/unknown/:projectId" element={<LucknowDetailPage />} />
          <Route path="/NewsProject" element={<NewsProject />} />
          <Route path="/NewsProjectdetail" element={<NewsProjectdetail />} />
          <Route path="/project/:city" element={<ProjectDetails />} />

          {/* Seller */}
          <Route path="/Postlisting" element={<Postlisting />} />
          <Route path="/profile" element={<Profilepage />} />
        </Route>

        {/* Protected Admin Routes (No Public Navbar / Persistent Admin Layout) */}
        <Route element={<AdminGuard />}>
          <Route element={<AdminLayout />}>
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/admin/profile" element={<AdminProfile />} />
            <Route path="/admin/ourproject" element={<OurProject />} />
            <Route path="/admin/sellers" element={<RegisteredSellers />} />
            <Route path="/admin/post-property" element={<PostPropertyListing />} />
            <Route path="/admin/Buys" element={<Buys />} />
            <Route path="/admin/ProjectExplore" element={<ProjectExplore />} />
            <Route path="/admin/approvals" element={<PropertyApprovals />} />
            <Route path="/admin/enquiries" element={<Enquiries />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}


export default App;
