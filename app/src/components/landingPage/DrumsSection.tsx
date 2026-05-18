import { Grid, Card, Typography, Button, Box } from '@mui/material';
import Product_Details from '../../data/Product_Details.json';
import OptimizedCardMedia from '../common/OptimizedCardMedia';

const DrumsSection = () => {
  const data = Product_Details.products;

  return (
    <div
      style={{
        backgroundColor: '#F5F5F5',
        paddingTop: '30px',
        width: '100%',
        overflowX: 'hidden',
      }}
    >
      <Typography
        component="h2"
        variant="h1"
        sx={{
          fontFamily: 'Nunito',
          fontWeight: 600,
          fontSize: { xs: '38px', sm: '48px', md: '68px' },
          lineHeight: { xs: '38px', sm: '50px', md: '65.47px' },
          textAlign: 'center',
          marginTop: { xs: '5vh', md: '10vh' }
        }}
      >
        The Heartbeat of Sri Lankan Culture
      </Typography>

      <Typography
        sx={{
          fontFamily: 'Poppins',
          fontWeight: 300,
          fontSize: { xs: '22px', sm: '24px', md: '38px' },
          lineHeight: { xs: '28px', sm: '35px', md: '50px' },
          textAlign: 'justify',
          margin: { xs: '20px', sm: '30px', md: '50px 10vh 10vh 10vh' }
        }}
      >
        Sri Lanka's traditional drums, or "Bera," are integral to the island's rich cultural heritage. Each drum carries a distinct rhythm, purpose, and history, making it a vital part of religious ceremonies, festivals, and artistic performances.
      </Typography>

      <Box sx={{ maxWidth: '1600px', margin: '0 auto', marginBottom: '10vh', '@media (max-width: 600px)': { marginTop: '50px' } }}>
  <Grid container spacing={4} justifyContent="center">
    {data.map((item) => (
      <Grid item xs={12} sm={6} md={6} key={item.product_id}>
        <Card
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            backgroundColor: '#F5F5F5',
            borderRadius: '10px',
            boxShadow: '0px 4px 10px rgba(245, 238, 238, 0.1)',
            border: '3px solid rgba(88, 86, 86, 0.44)',
            transition: 'transform 0.3s ease-in-out',
            margin: { xs: '15px', sm: '0' }, // Margin for mobile view
            '&:hover': {
              transform: 'scale(1.05)',
              boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.2)'
            }
          }}
        >
          <Grid container spacing={0}>
            {/* Image Section */}
            <Grid item xs={12} sm={4} sx={{ display: 'flex', justifyContent: 'center', padding: { xs: 2, sm: 3 } }}>
              <OptimizedCardMedia
                alt={item.name}
                height="80%"
                image={item.home_imageSrc || 'https://via.placeholder.com/150'}
                sx={{
                  objectFit: 'cover',
                  borderRadius: '5px',
                  width: { xs: '80%', sm: '100%' },
                }}
              />
            </Grid>

            {/* Text Section */}
            <Grid
              item
              xs={12}
              sm={8}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',  // Center content on mobile
                textAlign: 'center',  // Center text on mobile
                padding: { xs: 2, sm: 4 }
              }}
            >
              <Typography
                variant="h5"
                gutterBottom
                sx={{ fontWeight: 'bold', color: 'black' }}
              >
                {item.name}
              </Typography>
<Typography
  variant="body2"
  color="textSecondary"
  paragraph
  sx={{
    fontSize: { xs: '16px', sm: '18px' },
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 3,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    textAlign: 'justify'  // Align text to justify
  }}
>
  {item.desc}
</Typography>

<Button
    size="small"
    sx={{
      color: '#B55C30',
      fontSize: { xs: '16px', sm: '18px' },
      '&:hover': {
        fontWeight: 'bold',
        color: 'rgb(218, 99, 40)',
        backgroundColor: 'transparent',
      },
      alignSelf: { xs: 'center', sm: 'flex-end' }, // Center on mobile, right-align on larger screens
    }}
  >
    Learn More
  </Button>

            </Grid>
          </Grid>
        </Card>
      </Grid>
    ))}
  </Grid>
</Box>

    </div>
  );
};

export default DrumsSection;