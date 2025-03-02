import { useState } from 'react';
import { Grid, Typography } from '@mui/material';

// Import JSON data directly (no need for fetch)
import imageData from '../../pages/About/ImageGalleryData.json';

const ImageGallery = () => {
  const [images] = useState(imageData);

  return (
    <Grid
      container
      sx={{ padding: 1, textAlign: 'center', justifyContent: 'center' }}
    >
      {/* Page Title */}
      <Grid item xs={12}>
        <Typography variant="h4" fontWeight="bold" mb={3}>
          Image Gallery
        </Typography>
      </Grid>

      {/* Subtitle */}
      <Grid item xs={12}>
        <Typography
          variant="h6"
          mb={4}
          sx={{
            textAlign: 'center',
            fontSize: '20px',
            marginBottom: 4,
          }}
        >
          Recognized for outstanding skill and innovation in traditional
          drum-making techniques.
        </Typography>
      </Grid>

      {/* Image Grid */}
      <Grid container spacing={2} justifyContent="center">
        {images.map((image, index) => (
          <Grid item key={index} xs={12} sm={6} md={3}>
            <Grid
              component="img"
              src={image.src}
              alt={image.alt}
              sx={{
                width: '100%',
                height: '250px',
                objectFit: 'cover',
                borderRadius: '10px',
                boxShadow: 2,
                transition: 'transform 0.3s',
                '&:hover': { transform: 'scale(1.05)' },
              }}
            />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default ImageGallery;
