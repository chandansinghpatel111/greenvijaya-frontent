import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.toLowerCase().startsWith('/admin');

  if (isAdminRoute) {
    return <Outlet />;
  }

  return (
    <div>
      <Navbar />
      <main className="min-h-[80vh] pt-[116px] sm:pt-[120px] lg:pt-[115px]">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
