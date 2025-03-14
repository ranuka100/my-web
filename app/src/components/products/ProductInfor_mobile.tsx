import { useState, useEffect } from 'react';
import { Grid, Typography, IconButton, Box, CardMedia, Card, CardContent, useMediaQuery, useTheme } from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import productsData from '../../data/Product_Details.json'; // Import the JSON file

const ProductInfoMobile = () => {
  const products = productsData.products;

  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  const [mainImage, setMainImage] = useState(products[0].main_imageSrc);
  const currentProduct = products[currentProductIndex];
  
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm')); // Detect if screen is mobile size

  const smallImages = [
    currentProduct.main_imageSrc,
    currentProduct.img1_src,
    currentProduct.img2_src,
    currentProduct.img3_src,
    currentProduct.img4_src,
  ];

  // Update main image whenever the current product index changes
  useEffect(() => {
    setMainImage(currentProduct.main_imageSrc);
  }, [currentProductIndex]);

  const handleImageClick = (image) => setMainImage(image);
  const handlePrevProduct = () => setCurrentProductIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : products.length - 1));
  const handleNextProduct = () => setCurrentProductIndex((prevIndex) => (prevIndex < products.length - 1 ? prevIndex + 1 : 0));

  // Handle click on other products
  const handleOtherProductClick = (index) => {
    setCurrentProductIndex(index); // Update the current product to the clicked one
  };

  const getOtherProducts = (currentIndex) => {
    const productCount = products.length;
    const nextProducts = [];
    for (let i = 1; i <= 3; i++) {
      nextProducts.push(products[(currentIndex + i) % productCount]);
    }
    return nextProducts;
  };

  const displayedOtherProducts = getOtherProducts(currentProductIndex);

  // Bold style for labels
  const boldStyle = {
    fontFamily: 'Poppins',
    fontWeight: 600, // Bold weight for the label
    fontSize: '22px',
    lineHeight: '36px',
    marginTop: '10px',
  };

  // Style for the product details
  const detailsStyle = {
    fontFamily: 'Poppins',
    fontWeight: 400, // Regular weight for the details
    fontSize: '22px',
    lineHeight: '36px',
    textAlign: 'justify',
  };

  return (
    <Grid container spacing={2} sx={{ padding: '25px' }}>
      {/* Product Name */}
      <Grid item xs={12}>
        <Typography variant="h5" sx={{ textAlign: 'center', fontWeight: 'bold', marginTop: '15px' }}>
          {currentProduct.name}
        </Typography>
      </Grid>

      {/* Grid Layout with Small Images on Left and Product Image on Right */}
      <Grid container spacing={2} sx={{ paddingLeft: '20px', marginTop: "10px" }}>
        {/* Left Side: Small Images */}
        <Grid item xs={3}>
          <Grid container direction="column" spacing={1}>
            {smallImages.map((image, index) => (
              <Grid item key={index}>
                <Card
                  sx={{
                    width: 80,
                    height: 70,
                    marginTop: '2px',
                    cursor: 'pointer',
                    '&:hover': {
                      opacity: 0.7,
                      transform: 'scale(1.1)',
                      transition: 'transform 0.9s ease, opacity 0.3s ease',
                    },
                  }}
                  onClick={() => handleImageClick(image)} // Update image on click
                >
                  <CardMedia
                    component="img"
                    alt={`Image ${index + 1}`}
                    image={image}
                    sx={{ objectFit: 'cover', height: '100%', width: '100%' }}
                  />
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* Right Side: Product Image */}
        <Grid item xs={9} sx={{ display: 'flex', justifyContent: 'center' }}>
          <CardMedia
            component="img"
            alt={currentProduct.name}
            image={mainImage} // Use the mainImage state here to display the clicked image
            sx={{ width: '100%', maxHeight: '600px', objectFit: 'contain', borderRadius: '10px' }}
          />
        </Grid>
      </Grid>

      {/* Navigation */}
      <Grid item xs={12}>
        <Box display="flex" justifyContent="center" mt={1}>
          <IconButton sx={{ fontSize: '40px', marginRight: '50px' }} onClick={handlePrevProduct}>
            <ArrowBack />
          </IconButton>
          <IconButton sx={{ fontSize: '40px' }} onClick={handleNextProduct}>
            <ArrowForward />
          </IconButton>
        </Box>
      </Grid>

      {/* Product Details */}
      <Grid item xs={12}>
        <Typography variant="body2" sx={detailsStyle}>
          {currentProduct.desc}
        </Typography>
        <Typography variant="body1" sx={boldStyle}>
          Material:
        </Typography>
        <Typography variant="body1" sx={detailsStyle}>
          {currentProduct.Material}
        </Typography>

        <Typography variant="body1" sx={boldStyle}>
          Dimensions:
        </Typography>
        <Typography variant="body1" sx={detailsStyle}>
          {currentProduct.Dimensions}
        </Typography>

        <Typography variant="body1" sx={boldStyle}>
          Weight:
        </Typography>
        <Typography variant="body1" sx={detailsStyle}>
          {currentProduct.Weight}
        </Typography>

        <Typography variant="body1" sx={boldStyle}>
          Craftsmanship:
        </Typography>
        <Typography variant="body1" sx={detailsStyle}>
          {currentProduct.Craftsmanship}
        </Typography>
      </Grid>

      {/* Other Products Section */}
      <Grid item xs={12}>
        <Typography variant="h6" sx={{ textAlign: 'center', marginTop: '15px', fontWeight: 'bold', marginBottom:'15px', fontSize: '28px' }}>
          Other Products
        </Typography>

        <Grid container spacing={1} justifyContent="center">
          {displayedOtherProducts.map((product, index) => (
            <Grid item xs={4} key={index}>
  <Card
    sx={{
      width: '100%',
      height: '170px',
      boxShadow: '0px 4px 6px rgba(56, 53, 53, 0.62)',
      backgroundColor: 'transparent',
      '&:hover': {
        boxShadow: '3px 3px 3px 3px rgb(122, 47, 47)',
      },
    }}
    onClick={() => handleOtherProductClick((currentProductIndex + index + 1) % products.length)}
  >
    <CardMedia
      component="img"
      alt={product.name}
      image={product.home_imageSrc}
      sx={{
        height: '120px',
        objectFit: 'contain',
      }}
    />
    <CardContent>
      <Typography
        variant="body2"
        sx={{
          fontWeight: 500,
          width: '100%',
          textAlign: 'center',
          color: 'black',
          marginTop: '-5vh',
          marginRight: '70px',
          marginLeft: '0px', // Added left margin
        }}
      >
        {product.name}
      </Typography>
    </CardContent>
  </Card>
</Grid>

          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ProductInfoMobile;
