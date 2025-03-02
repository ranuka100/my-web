import { useState } from 'react';
import { Box, Typography, Container } from '@mui/material';
import Achievements from '../../components/Achievements';
import ImageGallery from '../../components/common/ImageGallery';

// Import images properly
const pic3 = "../../../public/images/products/getaberaya/getaberaya.png";
import pic4 from '../../../public/images/products/Thammattama/Thammattama.jpg';
import pic1 from '../../../public/images/products/davula/davula.png';
const pic2 = "../../../public/images/products/pahatharata_beraya/pahatharata_bereaya_home.png";

import yt_thumbamil from '../../../public/images/aboutUs/vedio_thumbmail.png';
import background from '../../assets/backgroundImages/Group.svg'; // Import the image

const About = () => {
  const [isHovered, setIsHovered] = useState(false); // State to track hover effect

  return (
    <Box sx={{ backgroundColor: '#F5F5F5', py: 15 }}>
      <Container maxWidth="lg">
        {/* Main Container */}
        <Box
          sx={{
            position: 'relative',
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: 4,
            alignItems: 'center',
            marginBottom: { xs: '8vh', md: '13vh' },
            '&::before': {
              content: '""',
              position: 'absolute',
              top: { xs: '-38vh', md: '-5vh' }, // Apply different top values based on screen size
              width: '100%',
              height: '120%',
              backgroundImage: `url(${background})`,
              backgroundSize: '200% 100%', // Expands to twice the width
              backgroundPosition: 'right center', // Now showing only the right side
              backgroundRepeat: 'no-repeat',
              opacity: 0.1, // Applies opacity only to the background
            },
          }}
        >
          {/* Left Column - Text Section */}
          <Box sx={{ flex: 1, textAlign: 'center' }}>
            <Box sx={{ maxWidth: 800, mx: 'auto' }}>
              {/* Title */}
              <Typography
                variant="h3"
                fontWeight="bold"
                align="left"
                marginBottom="10px"
              >
                About Us
              </Typography>

              {/* Normal Text Paragraphs */}
              <Typography
                variant="body1"
                paragraph
                sx={{ textAlign: 'justify', fontSize: '20px' }}
              >
                At <strong>DRUMS</strong>, we celebrate the rich heritage of Sri
                Lanka through our handcrafted traditional drum souvenirs.
                Founded by an award-winning artisan and cultural advocate, our
                mission is to share the beauty, history, and craftsmanship of
                Sri Lankan culture with the world.
              </Typography>
              <Typography
                variant="body1"
                paragraph
                sx={{ textAlign: 'justify', fontSize: '20px' }}
              >
                Our founder’s dedication to preserving traditional artistry has
                been recognized with prestigious awards, a testament to the
                passion and skill that define every piece in our collection.
              </Typography>
              <Typography
                variant="body1"
                paragraph
                sx={{ textAlign: 'justify', fontSize: '20px' }}
              >
                When you choose a souvenir from <strong>DRUMS</strong>, you’re
                not just purchasing a product—you’re becoming part of a legacy
                that honors the rhythm, spirit, and artistry of Sri Lanka.
              </Typography>
            </Box>
          </Box>

          {/* Right Column - Image Sections */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              flex: 1,
              gap: 2,
              zIndex: 1,
            }}
          >
            {/* First Vertical Section */}
            <Box
              sx={{ display: 'flex', flexDirection: 'column', flex: 1, gap: 2 }}
            >
              {/* Top Section */}
              <Box
                sx={{ height: '250px', borderRadius: 2, overflow: 'hidden' }}
              >
                <img
                  src={pic1}
                  alt="Drums"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </Box>
              {/* Bottom Section */}
              <Box sx={{ flex: 1, borderRadius: 2, overflow: 'hidden' }}>
                <img
                  src={pic2}
                  alt="Craftsmanship"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </Box>
            </Box>

            {/* Second Vertical Section */}
            <Box
              sx={{ display: 'flex', flexDirection: 'column', flex: 1, gap: 2 }}
            >
              {/* Top Section */}
              <Box sx={{ flex: 1, borderRadius: 2, overflow: 'hidden' }}>
                <img
                  src={pic3}
                  alt="Culture"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </Box>
              {/* Bottom Section */}
              <Box
                sx={{ height: '250px', borderRadius: 2, overflow: 'hidden' }}
              >
                <img
                  src={pic4}
                  alt="Heritage"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </Box>
            </Box>
          </Box>
        </Box>
        {/* Achievements Section */}
        <Achievements />{' '}
        {/* This will display the Achievements component content */}
        {/* YouTube Video Section */}
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            height: { xs: '350px', md: '550px' },
            overflow: 'hidden',
            borderRadius: 2,
            marginBottom: 5,
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {isHovered ? (
            <iframe
            width="100%"
            height="100%"
            src="https://drive.google.com/file/d/1UI3_qjAaANfVvKaUTTqfcnEkqsBbI3aw/preview"
            title="Google Drive Video"
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
          ></iframe>
          ) : (
            <img
              src={yt_thumbamil}
              alt="YouTube Video Thumbnail"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          )}
        </Box>
        {/* ImageGallery Section */}
        <ImageGallery />{' '}
        {/*This will display the ImageGallery component content */}
      </Container>
    </Box>
  );
};

export default About;
