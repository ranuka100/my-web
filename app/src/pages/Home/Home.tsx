import { Box, Container } from '@mui/material';
import ImpactSection from '../../components/landingPage/ImpactSection';
import HeroSection from '../../components/landingPage/HeroSection';
import TestimonialsSection from '../../components/landingPage/TestimonialsSection';
import DrumsSection from '../../components/landingPage/DrumsSection';
import HomeProductSection from '../../components/Sections/HomeProductSection';

const Home = () => {
  return (
    <Box>
      <div id="hero-section">
        <HeroSection /> {/* Navbar text should be white */}
      </div>
      <HomeProductSection/>
      <div id="impact-section">
        <ImpactSection /> {/* Navbar text should be black */}
      </div>
      <DrumsSection />
      <Container id="testimonials-section" maxWidth="lg">
        <TestimonialsSection /> {/* Navbar text should be black */}
      </Container>
    </Box>
  );
};

export default Home;
