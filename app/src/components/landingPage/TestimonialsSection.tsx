import { Box, Grid, Typography } from '@mui/material';
import Slider from 'react-slick';

// Import slick carousel styles
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const TestimonialsSection = () => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3, // Show 3 reviews at once
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    dots: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2, // Show 2 reviews on medium screens
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1, // Show 1 review on small screens
        },
      },
    ],
  };

  const testimonials = [
    {
      text: 'The souvenirs I purchased were truly artistic and unique something I’ve never seen before!',
      name: 'Sri Lanka Tourism Development Authority',
      country: 'Sri Lanka',
      image: '/images/home/sltda_logo.png',
    },
    {
      text: 'A perfect blend of tradition, creativity, and craftsmanship in every handcrafted souvenir!',
      name: 'Ministry of Industry and Entrepreneurship Development',
      country: 'Sri Lanka',
      image: '/images/home/idb_sl_trans_new.png',
    },
    {
      text: 'A unique blend of tradition, artistry, and craftsmanship in every souvenir, loved by travelers!',
      name: 'Classic Travel (Pvt) Ltd',
      country: 'Sri Lanka',
      image: '/images/home/Classic-Travel-Logo.png',

    }
  ];

  return (
    <Box sx={{ width: '100%', padding: { xs: '1px', sm: '2rem 0',marginBottom: '45px' }, backgroundColor: '#F5F5F5' }}>
      <Slider {...settings}>
        {testimonials.map((testimonial, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              padding: { xs: 0, sm: '1rem' }, // Removed padding for mobile, kept for larger screens
            }}
          >
            <Grid
              container
              spacing={2}
              alignItems="center"
              justifyContent="center"
              textAlign="center"
            >
              <Grid item xs={12}>
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  style={{
                    borderRadius: '50%',
                    width: 100,
                    height: 100,
                    objectFit: 'cover',
                    marginBottom: '1rem',
                    display: 'block',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                  }}
                />
              </Grid>
              <Grid item xs={12} sx={{ textAlign: 'center' }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: 'Nunito',
                    fontSize: '24px',
                    fontWeight: 400,
                    lineHeight: '32.74px',
                    textAlign: 'center',
                    textUnderlinePosition: 'from-font',
                    textDecorationSkipInk: 'none',
                    marginBottom: '0.5rem', // Adds space below the name
                  }}
                >
                  {testimonial.name}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    textAlign: 'center',
                    marginBottom: '0.5rem',
                    maxWidth: '350px', // Set a max width for the review text
                    overflow: 'hidden', // Ensures that the text doesn't overflow the container
                    whiteSpace: 'pre-line', // Makes the text wrap properly and preserve whitespace
                    wordBreak: 'break-word', // Ensures long words break to fit inside the container
                  }}
                >
                  {testimonial.text}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ textAlign: 'center' }}
                >
                  {testimonial.country}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default TestimonialsSection;
