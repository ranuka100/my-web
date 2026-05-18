import { Box, Grid2, Typography, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import Carousel from '../Slider/Carousel';
import { productBackground } from '../../assets/index';

const HomeProductSection = () => {
  return (
    <Box
      sx={{
        backgroundImage: `url(${productBackground})`,
        backgroundSize: 'cover',
        width: '100%',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '500px',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{ justifyContent: 'center', padding: '2rem', overflow: 'hidden' }}
      >
        <Grid2 container spacing={2}>
          <Grid2 size={{ xs: 12, md: 5 }} sx={{ p: '1' }}>
            <Typography
              component="h2"
              variant="h1"
              sx={{
                fontFamily: 'Poppins',
                fontWeight: 500,
                fontSize: { xs: '42px', md: '54px' },
                lineHeight: { xs: '40px', md: '66px' },
                color: '#2D2424',
                flex: 'none',
                order: 0,
                alignSelf: 'stretch',
                flexGrow: 0,
                marginTop: { xs: '10%', md: '20%' },
                
              }}
            >
              Crafted with Tradition Designed to Impress
            </Typography>
            <Typography
              variant="body1"
              sx={{
                marginTop: { xs: '10%', md: '2%' },
                fontFamily: 'Poppins',
                fontWeight: 300,
                fontSize: { xs: '20px', md: '24px' },
                lineHeight: { xs: '24px', md: '30px' },
                textAlign: 'justify',
                color: '#000000',
                flex: 'none',
                order: 1,
                flexGrow: 0,
                height: { xs: 'auto', md: '120px' },
                overflow: 'hidden',
              }}
            >
              Explore our exclusive range of handcrafted traditional Sri Lankan
              drum souvenirs. Perfect for gifting, décor, or as a keepsake of
              Sri Lankan culture.
            </Typography>
            <Button
              component={RouterLink}
              to="/product"
              variant="contained"
              sx={{
                mt: 3,
                backgroundColor: '#D2691E',
                textTransform: 'none',
                fontFamily: 'Poppins',
                '&:hover': { backgroundColor: '#b85a1a' },
              }}
            >
              View all products
            </Button>
          </Grid2>
          <Grid2 size={{ xs: 12, md: 7 }} sx={{ p: '1' }}>
            <Carousel />
          </Grid2>
        </Grid2>
      </Box>
    </Box>
  );
};

export default HomeProductSection;
