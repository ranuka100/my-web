import { Grid, Typography, Card, CardContent, CardMedia, Box } from '@mui/material';

const products = [
  {
    name: 'Product A',
    size: 'Large',
    imageSrc: 'https://via.placeholder.com/200',
  },
  {
    name: 'Product B',
    size: 'Medium',
    imageSrc: 'https://via.placeholder.com/200',
  },
  {
    name: 'Product C',
    size: 'Small',
    imageSrc: 'https://via.placeholder.com/200',
  },
];

const OtherProducts = () => {
  return (
    <Box sx={{ marginTop: '10vh' }}>
      <Box sx={{ marginTop: '13vh', paddingLeft: '12vw', paddingRight: '12vw' }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={3}>
            <Typography variant="h3" component="h2" sx={{ fontWeight: 'bold', marginTop: '10vh' }}>
              Other Products
            </Typography>
          </Grid>
          <Grid item xs={12} sm={9}>
            <Grid container spacing={2}>
              {products.map((product, index) => (
                <Grid item xs={12} sm={4} key={index}>
                  <Card
                    sx={{
                      width: '287.445px',
                      height: '328.51px',
                      gap: '6.53px',
                      borderRadius: '9.8px',
                      borderWidth: '0.82px',
                      padding: '13.07px',
                      boxShadow: '0px 4px 6px rgba(255, 255, 255, 0.62)',
                      backgroundColor: 'transparent',
                      '&:hover': {
                        boxShadow: '10px 10px 10px 10px rgb(255, 255, 255)',
                      },
                    }}
                  >
                    <CardMedia
                      component="img"
                      alt={product.name}
                      height="200"
                      image={product.imageSrc}
                      sx={{ objectFit: 'contain', padding: '10px' }}
                    />
                    <CardContent>
                      <Typography
                        variant="h6"
                        component="div"
                        sx={{
                          fontFamily: 'Poppins',
                          fontWeight: 600,
                          fontSize: '11.43px',
                          lineHeight: '13.07px',
                          letterSpacing: '0%',
                          color: 'black',
                        }}
                      >
                        {product.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="black"
                        sx={{
                          fontFamily: 'Poppins',
                          fontWeight: 400,
                          fontSize: '11.43px',
                          lineHeight: '13.07px',
                          letterSpacing: '0%',
                        }}
                      >
                        Size: {product.size}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default OtherProducts;
