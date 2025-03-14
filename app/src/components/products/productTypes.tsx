import { useState } from 'react';
import { Grid, Box, Typography, IconButton } from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import productsData from '../../data/Product_Details.json'; // Ensure this path is correct

const TraditionalDrumsPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const products = productsData.products; // Fix: Access the "products" array inside the JSON file
  const currentItem = products[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < products.length - 1 ? prevIndex + 1 : 0
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : products.length - 1
    );
  };

  return (
    <>
      {/* Header Background */}
      <Box
        sx={{
          width: '100%',
          height: '75px',
          backgroundImage: 'url("/images/products/bg_main.svg")', // Fix: Use correct public path
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      <Box
        sx={{
          marginTop: '13vh',
          paddingLeft: '12vw',
          paddingRight: '12vw',
          textAlign: 'center',
          '@media (max-width: 600px)': {
            paddingLeft: '5vw',
            paddingRight: '5vw',
            marginTop: '5vh'

          },
        }}
      >
        {/* Title */}
        <Typography
          variant="h1"
          sx={{
            fontFamily: 'Nunito',
            fontWeight: 700,
            fontSize: '48px',
            lineHeight: '65.47px',
            textAlign: 'center',
            '@media (max-width: 600px)': {
              fontSize: '36px',
              lineHeight: '45px',
              wordWrap: 'break-word',
            },
          }}
        >
          The Heartbeat of Sri Lanka Traditional Drums
        </Typography>

        {/* Paragraph */}
        <Typography
          variant="body1"
          sx={{
            fontFamily: 'Poppins',
            fontWeight: 400,
            fontSize: '24px',
            lineHeight: '36px',
            textAlign: 'justify',
            marginTop: '20px',
            '@media (max-width: 600px)': {
              paddingLeft: '15px',
              paddingRight: '15px',
              fontSize: '22px',
            },
          }}
        >
          For centuries, traditional drums have been the rhythmic backbone of Sri Lanka's vibrant culture. Known locally as “Bera,” these drums are more than musical instruments—they are sacred vessels that carry the island’s history, spirituality, and artistic expression.
        </Typography>

        {/* Dynamic Drum Content */}
        <Typography
          variant="h2"
          sx={{
            fontFamily: 'Poppins',
            fontWeight: 600,
            fontSize: '36px',
            lineHeight: '54px',
            textAlign: 'center',
            marginTop: '60px',
            '@media (max-width: 600px)': {
              fontSize: '30px',
              lineHeight: '38px',
            },
          }}
        >
          {currentItem.name}
        </Typography>

        <Typography
          variant="body1"
          sx={{
            fontFamily: 'Poppins',
            fontWeight: 400,
            fontSize: '24px',
            lineHeight: '36px',
            textAlign: 'justify',
            marginTop: '20px',
            '@media (max-width: 600px)': {
              paddingLeft: '15px',
              paddingRight: '15px',
              fontSize: '22px',
            },
          }}
        >
          {currentItem.reason}
        </Typography>

        {/* Image */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '40px',
            '@media (max-width: 600px)': {
              marginTop: '30px',
            },
          }}
        >
          <img
            src={currentItem.home_imageSrc}
            alt={currentItem.name}
            style={{
              maxWidth: '100%', // Fix: Maintain aspect ratio
              height: 'auto',
              borderRadius: '10px',
              objectFit: 'cover',
              maxHeight: '450px',
              width: 'auto',
              margin: '0 auto', // Center the image
            }}
          />
        </Box>
      </Box>

      {/* Navigation Buttons */}
      <Grid item xs={12}>
        <Box display="flex" justifyContent="center" alignItems="center" mt={2}>
          <Typography variant="body1" sx={{ fontWeight: 600, fontSize: '16px', marginRight: '50px' }}>
            PREV
          </Typography>
          <Typography variant="body1" sx={{ fontWeight: 600, fontSize: '16px' }}>
            NEXT
          </Typography>
        </Box>
        <Box display="flex" justifyContent="center" mt={-1}>
          <IconButton sx={{ fontSize: '40px', marginRight: '50px' }} onClick={handlePrev}>
            <ArrowBack />
          </IconButton>
          <IconButton sx={{ fontSize: '40px' }} onClick={handleNext}>
            <ArrowForward />
          </IconButton>
        </Box>
      </Grid>

      {/* Footer Section */}
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          marginTop: '40px',
          height: '100px',
          backgroundImage: 'url("/images/products/bg_main.svg")', // Fix: Use correct public path
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
    </>
  );
};

export default TraditionalDrumsPage;
