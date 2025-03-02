import { Box, Grid, Typography, IconButton, Tooltip } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';

import bg_pic_main from '../../../public/images/home/Untitled design.svg'; // Ensure correct path
import bg_pic_1 from '../../../public/images/home/hero_bg_pic_1.png'; // Ensure correct path
import bg_pic_2 from '../../../public/images/home/hero_bg_pic_2.jpeg'; // Ensure correct path
import bg_pic_3 from '../../../public/images/home/hero_bg_pic_3.jpeg'; // Ensure correct path

const HeroSection = () => {
  return (
    <Box
      sx={{
        position: 'relative',
        height: '960px', // Fixed height
        backgroundImage: `url(${bg_pic_main})`,
        backgroundSize: 'cover', // Cover full section
        backgroundPosition: 'center', // Center image
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#000000',
        paddingLeft: '200px',
        overflow: 'hidden', // Prevents unwanted scrolling
        px: 4,
        marginTop: "-10vh"
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
          backgroundColor: '#2D1212CC', // Adjust brightness
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
              fontSize: '124px',
              lineHeight: '130px',
              textAlign: 'left',
              textUnderlinePosition: 'from-font',
              textDecorationSkipInk: 'none',
              color: '#FFFFFF',
              marginTop: '35px',
            }}
          >
            Experience The <br /> Rhythm of{' '}
            <strong
              style={{
                fontFamily: 'Raleway',
                fontSize: '120px',
                fontWeight: 600,
                lineHeight: '130px',
                textAlign: 'left',
                textUnderlinePosition: 'from-font',
                textDecorationSkipInk: 'none',
              }}
            >
              Tradition
            </strong>
          </Typography>
          <Typography
            sx={{
              fontFamily: 'Poppins',
              fontSize: '28px',
              fontWeight: 200,
              lineHeight: '35px',
              textAlign: 'justify',
              textUnderlinePosition: 'from-font',
              textDecorationSkipInk: 'none',
              color: '#FFFFFF',
              mt: 4,
            }}
          >
            Explore the rich history and unique sounds of Sri Lanka's drumming
            <br></br>
            heritage. Explore the rich history and unique sounds of Sri Lanka's
            drumming<br></br>
            heritage.
          </Typography>

          {/* Social Media Icons */}
          <Box sx={{ display: 'flex', gap: 3, mt: 4, ml: -1 }}>
            <Tooltip title="Instagram" arrow>
              <IconButton
                href="https://www.instagram.com"
                target="_blank"
                color="inherit"
                sx={{
                  '&:hover .MuiSvgIcon-root': {
                    color: '#D2691E', // Change to the desired color on hover
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
                    color: '#D2691E', // Change to the desired color on hover
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
                    color: '#D2691E', // Change to the desired color on hover
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
        >
          <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
            <Box
              component="img"
              src={bg_pic_1}
              alt="Drumming 1"
              sx={{
                left: '135vh',
                top: '16px',
                width: '250px',
                height: '360px',
                borderRadius: '204.21px',
                border: '6px solid white',
                opacity: 1,
                position: 'absolute', // Ensures it's positioned correctly
                zIndex: 1,
              }}
            />
            <Box
              component="img"
              src={bg_pic_2}
              alt="Drumming 1"
              sx={{
                left: '155vh',
                top: '30px',
                width: '340px',
                height: '520px',
                borderRadius: '204.21px',
                border: '6px solid white',
                opacity: 1,
                position: 'absolute', // Ensures it's positioned correctly
              }}
            />
            <Box
              component="img"
              src={bg_pic_3}
              alt="Drumming 1"
              sx={{
                left: '185vh',
                top: '210px',
                width: '220px',
                height: '340px',
                borderRadius: '204.21px',
                border: '6px solid white',
                opacity: 1,
                position: 'absolute', // Ensures it's positioned correctly
                zIndex: 1,
              }}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HeroSection;
