import NavBar from '../components/common/NavBar';
import { Outlet } from 'react-router-dom';
import Footer from '../components/common/Footer';
import SeoLayout from '../seo/SeoLayout';
import './DefaultLayout.css';

const DefaultLayout = () => {
  return (
    <div className="layout-container">
      <SeoLayout />
      <NavBar />
      <main className="content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default DefaultLayout;
