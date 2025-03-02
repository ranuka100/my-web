import { SetStateAction, useState, useEffect } from 'react';
import {
  Grid,
  Typography,
  IconButton,
  Box,
  CardMedia,
  Card,
  CardContent,
} from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import productsData from '../../data/Product_Details.json'; // Import the JSON file

const ProductInfor = () => {
  // Use the imported JSON data
  const products = productsData.products;

  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  const [mainImage, setMainImage] = useState(products[0].main_imageSrc);

  const currentProduct = products[currentProductIndex];
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

  // Function to change main image on click
  const handleImageClick = (image: SetStateAction<string>) => setMainImage(image);

  // Handle previous and next product
  const handlePrevProduct = () => {
    setCurrentProductIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : products.length - 1));
  };

  const handleNextProduct = () => {
    setCurrentProductIndex((prevIndex) => (prevIndex < products.length - 1 ? prevIndex + 1 : 0));
  };

  // Handle clicking on a product in "Other Products"
  const handleProductClick = (index: number) => {
    setCurrentProductIndex(index);
  };

  // Function to get the next 3 products for the "Other Products" section, excluding the current one
  const getOtherProducts = (currentIndex: number) => {
    const productCount = products.length;
    const nextProducts = [];
    for (let i = 1; i <= 3; i++) {
      nextProducts.push(products[(currentIndex + i) % productCount]);
    }
    return nextProducts;
  };

  // Get the next 3 products for the "Other Products" section
  const displayedOtherProducts = getOtherProducts(currentProductIndex);

  return (
    <Grid container spacing={2} sx={{ marginTop: '6vh', paddingLeft: '12vw', paddingRight: '12vw' }}>
      {/* Left side: Small images and main image */}
      <Grid item xs={7}>
        <Grid container spacing={1}>
          <Grid item xs={2}>
            <Grid container direction="column" spacing={1}>
              {smallImages.map((image, index) => (
                <Grid item key={index}>
                  <Card
                    sx={{
                      width: 118,
                      height: 118,
                      marginTop: '8px',
                      cursor: 'pointer',
                      '&:hover': {
                        opacity: 0.7,
                        transform: 'scale(1.1)',
                        transition: 'transform 0.3s ease, opacity 0.3s ease',
                      },
                    }}
                    onClick={() => handleImageClick(image)}
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

          <Grid item xs={5}>
            <Box display="flex" justifyContent="center" sx={{ width: '100%' }}>
              <CardMedia
                component="img"
                alt="Main Image"
                image={mainImage}
                sx={{
                  maxWidth: '800px',
                  marginTop: '20px',
                  width: '125%',
                  height: 'auto',
                  marginLeft: '80%',
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Grid>

      {/* Right side: Product details */}
      <Grid item xs={5}>
        <Typography variant="h4" color="textSecondary" gutterBottom sx={{ mt: 1 }}>
          Souvenirs
        </Typography>
        <Typography
          variant="h5"
          gutterBottom
          sx={{
            fontFamily: 'Poppins',
            fontSize: '60px',
            fontWeight: 500,
            wordSpacing: '12px',
            lineHeight: '48px',
            textAlign: 'left',
            textUnderlinePosition: 'from-font',
            textDecorationSkipInk: 'none',
          }}
        >
          {currentProduct.name}
        </Typography>

        <Typography variant="body1" paragraph sx={{ fontFamily: 'Poppins', fontSize: '24px', fontWeight: 400, lineHeight: '32px', textAlign: 'justify' }}>
          {currentProduct.desc}
        </Typography>

        <Typography variant="h6" sx={{ fontFamily: 'Poppins', fontSize: '24px', fontWeight: 600, lineHeight: '50px', textAlign: 'left', marginTop: '12px' }}>
          Material
        </Typography>
        <Typography variant="body2" sx={{ fontFamily: 'Poppins', fontSize: '24px', fontWeight: 400, lineHeight: '32px', textAlign: 'justify' }}>
          {currentProduct.Material}
        </Typography>

        <Typography variant="h6" sx={{ fontFamily: 'Poppins', fontSize: '24px', fontWeight: 600, lineHeight: '48px', textAlign: 'left', marginTop: '12px' }}>
          Dimensions
        </Typography>
        <Typography variant="body2" sx={{ fontFamily: 'Poppins', fontSize: '24px', fontWeight: 400, lineHeight: '32px', textAlign: 'justify' }}>
          {currentProduct.Dimensions}
        </Typography>

        <Typography variant="h6" sx={{ fontFamily: 'Poppins', fontSize: '24px', fontWeight: 600, lineHeight: '48px', textAlign: 'left', marginTop: '12px' }}>
          Weight
        </Typography>
        <Typography variant="body2" sx={{ fontFamily: 'Poppins', fontSize: '24px', fontWeight: 400, lineHeight: '32px', textAlign: 'justify' }}>
          {currentProduct.Weight}
        </Typography>

        <Typography variant="h6" sx={{ fontFamily: 'Poppins', fontSize: '24px', fontWeight: 600, lineHeight: '48px', textAlign: 'left', marginTop: '12px' }}>
          Craftsmanship
        </Typography>
        <Typography variant="body2" sx={{ fontFamily: 'Poppins', fontSize: '24px', fontWeight: 400, lineHeight: '32px', textAlign: 'justify' }}>
          {currentProduct.Craftsmanship}
        </Typography>
      </Grid>

      {/* Navigation */}
      <Grid item xs={12}>
        <Box display="flex" justifyContent="center" alignItems="center" mt={2}>
          <Typography variant="body1" sx={{ fontWeight: 600, fontSize: '16px', marginRight: '50px' }} onClick={handlePrevProduct}>
            PREV
          </Typography>
          <Typography variant="body1" sx={{ fontWeight: 600, fontSize: '16px' }} onClick={handleNextProduct}>
            NEXT
          </Typography>
        </Box>
        <Box display="flex" justifyContent="center" mt={0} mb={3}>
          <IconButton sx={{ fontSize: '40px', marginRight: '50px' }} onClick={handlePrevProduct}>
            <ArrowBack />
          </IconButton>
          <IconButton sx={{ fontSize: '40px' }} onClick={handleNextProduct}>
            <ArrowForward />
          </IconButton>
        </Box>
      </Grid>

      {/* New Row: Other Products */}
      <Grid item xs={12}>
        <Grid container spacing={2}>
          {/* Left side */}
          <Grid item xs={12} sm={3}>
            <Typography variant="h3" component="h2" sx={{ fontWeight: 'bold', marginTop: '15vh' }}>
              Other Products
            </Typography>
          </Grid>

          {/* Right side - List of products */}
          <Grid item xs={12} sm={9}>
            <Grid container spacing={2}>
              {displayedOtherProducts.map((product, index) => (
                <Grid item xs={12} sm={4} key={index}>
                  <Card
                    sx={{
                      width: '287.445px',
                      height: '270.51px',
                      gap: '6.53px',
                      marginBottom: '50px',
                      textAlign: 'center',
                      borderRadius: '9.8px',
                      borderWidth: '0.82px',
                      padding: '13.07px',
                      boxShadow: '0px 4px 6px rgba(56, 53, 53, 0.62)',
                      backgroundColor: 'transparent',
                      '&:hover': {
                        boxShadow: '3px 3px 3px 3px rgb(122, 47, 47)',
                      },
                    }}
                    onClick={() => handleProductClick(products.indexOf(product))}
                  >
                    <CardMedia
                      component="img"
                      alt={product.name}
                      height="200"
                      image={product.home_imageSrc} // Using the main image for display
                      sx={{ objectFit: 'contain', padding: '10px' }}
                    />
                    <CardContent>
                      <Typography
                        variant="h6"
                        component="div"
                        sx={{
                          fontFamily: 'Poppins',
                          fontWeight: 600,
                          fontSize: '18px',
                          lineHeight: '13px',
                          letterSpacing: '0%',
                          color: 'black',
                          marginTop: '-35px'
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
                          fontSize: '15px',
                          lineHeight: '36px',
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
      </Grid>
    </Grid>
  );
};

export default ProductInfor;
