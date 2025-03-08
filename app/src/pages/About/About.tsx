import { useState } from 'react';
import { Box, Typography, Container } from '@mui/material';
import Achievements from '../../components/Achievements';
import ImageGallery from '../../components/common/ImageGallery';

// Import images properly
import pic3 from "/images/products/getaberaya/getaberaya_aboutus.png";
import pic4 from '/images/products/Thammattama/Thammattama_aboutus.jpg';
import pic1 from '/images/products/davula/davula_aboutus.png';
import pic2 from "/images/products/pahatharata_beraya/pahatharata_bereaya_aboutus.png";

import yt_thumbamil from '/images/aboutUs/vedio_thumbmail.png';
import background from '../../assets/backgroundImages/Group.svg'; // Import the image

const About = () => {
  const [isHovered, setIsHovered] = useState(false); // State to track hover effect

  return (
    <Box sx={{ backgroundColor: '#F5F5F5', py: 15 }}>
      <Container maxWidth="lg">
        {/* Main Container */}
        <Box
          sx={{
            marginTop: { xs: '-8vh', md: '0px'},
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
                At <strong>New Tharanga Musical Instruments</strong>, we are dedicated to preserving Sri Lanka’s 2,500-year-old tradition of crafting musical instruments. By blending time-honored techniques with modern innovations, we create high-quality, reliable products that musicians trust worldwide.
                </Typography>
                <Typography
                variant="body1"
                paragraph
                sx={{ textAlign: 'justify', fontSize: '20px' }}
                >
                Our commitment to excellence has earned us prestigious national honors, including the <strong>"Rajatha Sammana"</strong> and the <strong>Presidential Award</strong> for the Most Outstanding Drum Designer in Sri Lanka for seven consecutive years.
                </Typography>
                <Typography
                variant="body1"
                paragraph
                sx={{ textAlign: 'justify', fontSize: '20px' }}
                >
                In addition to musical instruments, we pioneer <strong>sustainable handcrafted drum souvenirs</strong> using leftover materials. Through international collaborations with the <strong>National Crafts Council</strong> and the <strong>Tourism Promotion Bureau</strong>, we proudly showcase Sri Lankan artistry to the world.
                </Typography>
                <Typography
                variant="body1"
                paragraph
                sx={{ textAlign: 'justify', fontSize: '20px' }}
                >
                Choosing <strong>New Tharanga Musical Instruments</strong> means becoming part of a legacy that values quality, reliability, and the rich heritage of Sri Lankan craftsmanship.
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
              marginTop: '20px'
            }}
          >
            {/* First Vertical Section */}
            <Box
              sx={{ display: 'flex', flexDirection: 'column', flex: 1, gap: 2 }}
            >
              {/* Top Section */}
              <Box
                sx={{ height: { xs: '250px', md: '400px' }, borderRadius: 2, overflow: 'hidden' }}
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
                sx={{ height: { xs: '250px', md: '400px' }, borderRadius: 2, overflow: 'hidden' }}
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
