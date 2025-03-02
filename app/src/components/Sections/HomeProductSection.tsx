import { Box, Grid2, Typography } from '@mui/material';
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
              variant="h1"
              sx={{
                fontFamily: 'Poppins',
                fontWeight: 500,
                fontSize: { xs: '32px', md: '44px' },
                lineHeight: { xs: '40px', md: '66px' },
                color: '#2D2424',
                flex: 'none',
                order: 0,
                alignSelf: 'stretch',
                flexGrow: 0,
              }}
            >
              Crafted with Tradition Designed to Impress
            </Typography>
            <Typography
              variant="body1"
              sx={{
                mt: '10px',
                fontFamily: 'Poppins',
                fontWeight: 400,
                fontSize: { xs: '16px', md: '20px' },
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
