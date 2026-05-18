import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Typography, IconButton, Box, Card, CardContent, useMediaQuery } from '@mui/material';
import OptimizedCardMedia from '../common/OptimizedCardMedia';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import { products, getProductIndexBySlug, getProductPath } from '../../data/productUtils';
import ProductInfoMobile from './ProductInfor_mobile';

type ProductInforProps = {
  initialSlug?: string;
};

const ProductInfor = ({ initialSlug }: ProductInforProps) => {
  const navigate = useNavigate();
  const initialIndex = initialSlug ? getProductIndexBySlug(initialSlug) : 0;

  const [currentProductIndex, setCurrentProductIndex] = useState(
    initialIndex >= 0 ? initialIndex : 0
  );
  const [mainImage, setMainImage] = useState(products[0].main_imageSrc);
  const currentProduct = products[currentProductIndex];
  
  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down('sm')); // Ensure 'theme' is typed properly

  const smallImages = [
    currentProduct.main_imageSrc,
    currentProduct.img1_src,
    currentProduct.img2_src,
    currentProduct.img3_src,
    currentProduct.img4_src,
  ];

  useEffect(() => {
    setMainImage(currentProduct.main_imageSrc);
  }, [currentProductIndex, currentProduct.main_imageSrc]);

  useEffect(() => {
    if (initialSlug) {
      const idx = getProductIndexBySlug(initialSlug);
      if (idx >= 0) setCurrentProductIndex(idx);
    }
  }, [initialSlug]);

  const handleImageClick = (image: string) => setMainImage(image); // No need for SetStateAction<string>

  const goToProductIndex = (index: number) => {
    setCurrentProductIndex(index);
    navigate(getProductPath(products[index].slug));
  };

  const handlePrevProduct = () => {
    const next = currentProductIndex > 0 ? currentProductIndex - 1 : products.length - 1;
    goToProductIndex(next);
  };

  const handleNextProduct = () => {
    const next = currentProductIndex < products.length - 1 ? currentProductIndex + 1 : 0;
    goToProductIndex(next);
  };

  const handleProductClick = (index: number) => {
    goToProductIndex(index);
  };

  const getOtherProducts = (currentIndex: number) => {
    const productCount = products.length;
    const nextProducts = [];
    for (let i = 1; i <= 3; i++) {
      nextProducts.push(products[(currentIndex + i) % productCount]);
    }
    return nextProducts;
  };

  const displayedOtherProducts = getOtherProducts(currentProductIndex);

  if (isMobile) {
    return <ProductInfoMobile initialSlug={initialSlug} />;
  }

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
                    <OptimizedCardMedia
                      alt={`${currentProduct.name} — detail view ${index + 1}`}
                      image={image}
                      loading="lazy"
                      sx={{ objectFit: 'cover', height: '100%', width: '100%' }}
                    />
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>

          <Grid item xs={5}>
            <Box display="flex" justifyContent="center" sx={{ width: '100%' }}>
              <OptimizedCardMedia
                alt={`${currentProduct.name} — handcrafted Sri Lankan drum souvenir`}
                image={mainImage}
                loading="eager"
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
          component="h1"
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
          <Grid item xs={12} sm={3}>
            <Typography variant="h3" component="h2" sx={{ fontWeight: 'bold', marginTop: '15vh' }}>
              Other Products
            </Typography>
          </Grid>

          <Grid item xs={12} sm={9} sx={{ minWidth: 0 }}>
            <Grid container spacing={2} sx={{ width: '100%' }}>
              {displayedOtherProducts.map((product, index) => (
                <Grid item xs={12} sm={4} key={index} sx={{ minWidth: 0, display: 'flex' }}>
                  <Card
                    sx={{
                      width: '100%',
                      maxWidth: '100%',
                      height: 'auto',
                      minHeight: 240,
                      gap: '6.53px',
                      marginBottom: '50px',
                      textAlign: 'center',
                      borderRadius: '10px',
                      borderWidth: '0.82px',
                      padding: '13px',
                      boxShadow: '0px 4px 6px rgba(56, 53, 53, 0.62)',
                      backgroundColor: '#fff',
                      flex: 1,
                      '&:hover': {
                        boxShadow: '3px 3px 3px 3px rgb(122, 47, 47)',
                      },
                    }}
                    onClick={() => handleProductClick(products.indexOf(product))}
                  >
                    <OptimizedCardMedia
                      alt={product.name}
                      height="200"
                      image={product.home_imageSrc}
                      sx={{
                        objectFit: 'contain',
                        padding: '10px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
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
                          marginTop: 0
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