import { Box, Grid, Typography, IconButton, Tooltip } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import { useEffect, useState } from 'react';

import bg_pic_main from '../../../public/images/home/Untitled design.svg'; // Ensure correct path

// Helper function for triggering animations with delay
const useAnimationDelay = (delay: number) => {
  const [animate, setAnimate] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);
  return animate;
};

const HeroSection = () => {
  // Delays for each animation sequence
  const animateText = useAnimationDelay(500);  // Delay for "Experience The"
  const animateRhythm = useAnimationDelay(1000);  // Delay for "Rhythm of"
  const animateTradition = useAnimationDelay(1800);  // Delay for "Tradition"
  const animateDescription = useAnimationDelay(2600);  // Delay for description
  const animateSocialIcons = useAnimationDelay(3500);  // Delay for social icons

  return (
    <Box
      sx={{
        position: 'relative',
        height: '900px', // Fixed height
        backgroundImage: `url(${bg_pic_main})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#000000',
        paddingLeft: '200px',
        overflow: 'hidden',
        px: 2,
        marginTop: "-12vh"
      }}
    >
      {/* Dark Overlay */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: '#2D1212CC',
          zIndex: 1,
          filter: 'brightness(40%)',
        }}
      />
      <Grid
        container
        spacing={2}
        sx={{ position: 'relative', zIndex: 2, width: '100%' }}
      >
        {/* Left Side (Text) */}
        <Grid
          item
          xs={12}
          md={7}
          sx={{
            textAlign: 'left',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start', // Move fully to the left
            pl: 8, // Adjust left padding
          }}
        >
          <Typography
            sx={{
              fontFamily: 'Raleway',
              fontSize: '52px',
              textAlign: 'left',
              textUnderlinePosition: 'from-font',
              textDecorationSkipInk: 'none',
              color: '#FFFFFF',
              marginTop: '12vh',
              transform: animateText ? 'translateY(0)' : 'translateY(50px)', 
              opacity: animateText ? 1 : 0,
              transition: 'transform 1s ease-out, opacity 1s ease-out',
            }}
          >
            Experience The
          </Typography>

          <Typography
            sx={{
              fontFamily: 'Raleway',
              fontSize: '60px',
              fontWeight: 600,
              lineHeight: '90px',
              textAlign: 'left',
              textUnderlinePosition: 'from-font',
              textDecorationSkipInk: 'none',
              color: '#FFFFFF',
              transform: animateRhythm ? 'translateY(0)' : 'translateY(50px)',
              opacity: animateRhythm ? 1 : 0,
              transition: 'transform 1s ease-out, opacity 1s ease-out',
            }}
          >
            Rhythm of
          </Typography>

          <Typography
            sx={{
              fontFamily: 'Raleway',
              fontSize: '75px',
              fontWeight: 600,
              lineHeight: '90px',
              textAlign: 'left',
              textUnderlinePosition: 'from-font',
              textDecorationSkipInk: 'none',
              color: '#FFFFFF',
              transform: animateTradition ? 'translateY(0)' : 'translateY(50px)',
              opacity: animateTradition ? 1 : 0,
              transition: 'transform 1s ease-out, opacity 1s ease-out',
            }}
          >
            Tradition
          </Typography>

          <Typography
            sx={{
              fontFamily: 'Poppins',
              fontSize: '26px',
              fontWeight: 100,
              lineHeight: '42px',
              textAlign: 'justify',
              textUnderlinePosition: 'from-font',
              textDecorationSkipInk: 'none',
              color: '#FFFFFF',
              marginTop: '8vh',
              transform: animateDescription ? 'translateY(0)' : 'translateY(50px)',
              opacity: animateDescription ? 1 : 0,
              transition: 'transform 1s ease-out, opacity 1s ease-out',
            }}
          >
            Immerse yourself in the vibrant beats and timeless traditions of Sri Lanka’s drumming heritage where rhythm tells a story and echoes through generations.
          </Typography>

          {/* Social Media Icons */}
          <Box
            sx={{
              display: 'flex',
              gap: 3,
              mt: 10,
              ml: -1,
              transform: animateSocialIcons ? 'translateX(0)' : 'translateX(50px)',
              opacity: animateSocialIcons ? 1 : 0,
              transition: 'transform 1s ease-out, opacity 1s ease-out',
            }}
          >
            <Tooltip title="Instagram" arrow>
              <IconButton
                href="https://www.instagram.com"
                target="_blank"
                color="inherit"
                sx={{
                  '&:hover .MuiSvgIcon-root': {
                    color: '#D2691E',
                  },
                }}
              >
                <InstagramIcon sx={{ fontSize: 40, color: '#ffffff' }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Facebook" arrow>
              <IconButton
                href="https://www.facebook.com"
                target="_blank"
                color="inherit"
                sx={{
                  '&:hover .MuiSvgIcon-root': {
                    color: '#D2691E',
                  },
                }}
              >
                <FacebookIcon sx={{ fontSize: 40, color: '#ffffff' }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Twitter" arrow>
              <IconButton
                href="https://www.twitter.com"
                target="_blank"
                color="inherit"
                sx={{
                  '&:hover .MuiSvgIcon-root': {
                    color: '#D2691E',
                  },
                }}
              >
                <TwitterIcon sx={{ fontSize: 40, color: '#ffffff' }} />
              </IconButton>
            </Tooltip>
          </Box>
        </Grid>

        {/* Right Side (Images) */}
        <Grid
          item
          xs={12}
          md={5}
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}
        />
      </Grid>
    </Box>
  );
};

export default HeroSection;
