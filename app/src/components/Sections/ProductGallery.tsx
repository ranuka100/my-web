import { useState } from 'react';
import { Box, Typography, Button, Grid2 } from '@mui/material';

const ProductGallery = () => {
  const [selectedProductIndex, setSelectedProductIndex] = useState(0);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const productsArray = [
    {
      images: ['public\vite.svg', 'product1-2.jpg', 'product1-3.jpg'],
      title: 'DAVULA KEEPSAKE',
      description: 'The Geta Bera Miniature is a scaled-down replica...',
      details: {
        material: 'Premium mahogany wood',
        dimensions: '10 cm x 5 cm',
        weight: 'Lightweight',
        craftsmanship: 'Traditional artisan methods',
      },
    },
  ];

  const currentProduct = productsArray[selectedProductIndex];

  const handleProductChange = (direction: number) => {
    const newIndex =
      (selectedProductIndex + direction + productsArray.length) %
      productsArray.length;
    setSelectedProductIndex(newIndex);
    setSelectedImageIndex(0);
  };

  return (
    <Box sx={{ p: 4 }}>
      <Grid2 container spacing={4}>
        {/* Thumbnails Column */}
        <Grid2 size={{ xs: 12, md: 4 }}>
          <Grid2 container spacing={{ xs: 2, md: 2 }} sx={{ height: '100%' }}>
            {currentProduct.images.map((img, index) => (
              <Grid2
                key={index}
                size={{ xs: 6, md: 12 }}
                sx={{ height: { xs: 100, md: 120 } }}
              >
                <Box
                  onClick={() => setSelectedImageIndex(index)}
                  sx={{
                    cursor: 'pointer',
                    height: '100%',
                    backgroundImage: `url(${img})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    border:
                      selectedImageIndex === index
                        ? '3px solid #2D2424'
                        : '1px solid #ddd',
                    borderRadius: '4px',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      transform: 'scale(1.02)',
                    },
                  }}
                />
              </Grid2>
            ))}
          </Grid2>
        </Grid2>
        {/* Main Image Column */}
        <Grid2
          size={{ xs: 12, md: 8 }}
          sx={{
            position: 'relative',
            height: { xs: 300, md: 500 },
            backgroundImage: `url(${currentProduct.images[selectedImageIndex]})`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            borderRadius: '8px',
            border: '1px solid #ddd',
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              bottom: '20px',
              right: '20px',
              display: 'flex',
              gap: '10px',
            }}
          >
            <Button
              variant="contained"
              onClick={() => handleProductChange(-1)}
              size="medium"
            >
              PREV
            </Button>
            <Button
              variant="contained"
              onClick={() => handleProductChange(1)}
              size="medium"
            >
              NEXT
            </Button>
          </Box>
        </Grid2>

        {/* Product Details */}
        <Grid2 size={{ xs: 12 }}>
          <Box
            sx={{
              p: 4,
              bgcolor: 'background.paper',
              borderRadius: '8px',
              border: '1px solid',
              borderColor: 'divider',
            }}
          >
            <Typography variant="h4" component="h1" gutterBottom>
              {currentProduct.title}
            </Typography>

            <Typography variant="body1" paragraph>
              {currentProduct.description}
            </Typography>

            <Grid2 container spacing={3}>
              {Object.entries(currentProduct.details).map(([key, value]) => (
                <Grid2 key={key} size={{ xs: 12, md: 6, xl: 3 }}>
                  <Box>
                    <Typography
                      variant="subtitle1"
                      component="div"
                      sx={{
                        fontWeight: 'bold',
                        mb: 1,
                        color: 'text.primary',
                      }}
                    >
                      {key.toUpperCase()}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {value}
                    </Typography>
                  </Box>
                </Grid2>
              ))}
            </Grid2>
          </Box>
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default ProductGallery;
