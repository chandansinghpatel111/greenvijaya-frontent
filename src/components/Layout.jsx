// components/Layout.jsx
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = () => {
  return (
    <div>
      <Navbar />
      <main className="min-h-[80vh] pt-14">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
