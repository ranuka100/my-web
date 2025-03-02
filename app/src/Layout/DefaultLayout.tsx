import NavBar from '../components/common/NavBar';
import { Outlet } from 'react-router-dom';
import Footer from '../components/common/Footer';
import './DefaultLayout.css'; // Import your CSS file

const DefaultLayout = () => {
  return (
    <div className="layout-container">
      <NavBar />
      <main className="content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default DefaultLayout;
