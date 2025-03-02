import { Grid, Card, Typography, Button, CardMedia, Box } from '@mui/material';
import Product_Details from '../../data/Product_Details.json';

const DrumsSection = () => {
  const data = Product_Details.products;


  return (
    <div style={{ backgroundColor: 'white', paddingTop: '30px', width: '100%', overflowX: 'hidden' }}>
      <Typography
        variant="h1"
        sx={{
          fontFamily: 'Nunito',
          fontWeight: 600,
          fontSize: '68px',
          lineHeight: '65.47px',
          textAlign: 'center',
          marginTop: '10vh'
        }}
      >
        The Heartbeat of Sri Lankan Culture
      </Typography>

      <Typography
        sx={{
          fontFamily: 'Poppins',
          fontWeight: 300,
          fontSize: '38px',
          lineHeight: '50px',
          textAlign: 'center',
          margin: '50px 10vh 10vh 10vh'
        }}
      >
        Sri Lanka's traditional drums, or "Bera," are integral to the island's rich cultural heritage. Each drum carries a distinct rhythm, purpose, and history, making it a vital part of religious ceremonies, festivals, and artistic performances.
      </Typography>

      <Box sx={{ maxWidth: '1600px', margin: '0 auto', marginBottom: '10vh' }}>
        <Grid container spacing={4} justifyContent="center">
          {data.map((item) => (
            <Grid item xs={12} sm={6} md={6} key={item.product_id}>
              <Card
                sx={{
                  display: 'flex',
                  backgroundColor: 'white',
                  borderRadius: '10px',
                  boxShadow: '0px 4px 10px rgba(245, 238, 238, 0.1)',
                  border: '3px solid rgba(88, 86, 86, 0.44)',
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.2)'
                  }
                }}
              >
                <Grid container spacing={0}>
                  {/* Image Section */}
                  <Grid item xs={4}>
                    <CardMedia
                      component="img"
                      alt={item.name}
                      height="80%"
                      image={item.home_imageSrc || 'https://via.placeholder.com/150'}
                      sx={{ objectFit: 'cover', borderRadius: '5px', width: '100%', padding: 3 }}
                    />
                  </Grid>

                  {/* Text Section */}
                  <Grid item xs={8} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 4 }}>
                    <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: 'black', marginLeft: '10px' }}>
                      {item.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" paragraph sx={{ fontSize: '18px', marginLeft: '10px' }}>
                      {item.desc}
                    </Typography>
                    <Button
                      size="small"
                      sx={{
                        color: '#B55C30',
                        textAlign: 'left',
                        display: 'block',
                        fontSize: '18px',
                        marginLeft: '5px',
                        '&:hover': {
                          fontWeight: 'bold',
                          color: 'rgb(218, 99, 40)',
                          backgroundColor: 'transparent'
                        }
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
