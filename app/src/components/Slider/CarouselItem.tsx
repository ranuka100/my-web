import { Box, Grid2 as Grid, Typography, Link, useTheme } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useBreakpointMode } from '../../utils/useBreakpointMode';

interface CarouselSlideProps {
  imageSrc: string;
  title: string;
  description: string;
  material: string;
  size: string;
  link: string;
}

const CarouselSlide: React.FC<CarouselSlideProps> = ({
  imageSrc,
  title,
  description,
  material,
  size,
  link,
}) => {
  const theme = useTheme();

  const { isSm, isMd } = useBreakpointMode();
  return (
    <Box
      sx={{
        width: '100%',
        alignSelf: 'center',
        justifyContent: 'left',
        justifyItems: 'center',
        height: { xs: 'auto' },
        display: 'flex',
        bgcolor: '#ffff',
        borderRadius: 2,
        boxShadow: 2,
        overflow: 'hidden', // Prevent content overflow
        transition: theme.transitions.create(['transform', 'box-shadow'], {
          duration: theme.transitions.duration.short,
        }),
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 4,
        },
      }}
    >
      <Grid container spacing={2} sx={{ height: '100%' }}>
        <Grid
          size={{ xs: 12, md: 5 }}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
            padding: isSm ? '1rem' : '0',
          }}
        >
          <Box
            component="img"
            sx={{
              width: isSm ? (isMd ? '100%' : '100%') : 'auto',
              minHeight: { xs: '100%', md: '420px' },
              height: { md: '100%' },
              objectFit: 'cover',
              borderRadius: 1,
              boxShadow: 1,
            }}
            alt={title}
            src={imageSrc}
          />
        </Grid>

        <Grid
          size={{ xs: 12, md: 7 }}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-evenly',
            overflow: 'hidden',
            padding: isSm ? '1rem' : '1rem',
          }}
        >
          <Box>
            <Typography
              variant="overline"
              sx={{
                width: '202.62px',
                height: '14px',
                fontFamily: 'Poppins',
                fontStyle: 'normal',
                fontWeight: 300,
                lineHeight: '14px',
                color: '#8E8A8A',
                flex: 'none',
                order: 0,
                alignSelf: 'stretch',
                flexGrow: 0,
                display: 'block',
                fontSize: { xs: '0.7rem', sm: '0.75rem' },
              }}
            >
              Souvenirs
            </Typography>

            <Typography
              variant="h6"
              component="h2"
              sx={{
                /* Geta Bera Miniature */
                width: '202.62px',
                height: '25px',

                fontFamily: 'Poppins',
                fontStyle: 'normal',
                fontWeight: 600,
                fontSize: '19.9301px',
                lineHeight: '24px',
                /* identical to box height, or 122% */
                textTransform: 'capitalize',

                color: '#0D1B39',

                /* Inside auto layout */
                flex: 'none',
                order: 1,
                alignSelf: 'stretch',
                flexGrow: 0,
              }}
            >
              {title}
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                /* A beautifully crafted miniature of the iconic Geta Bera, designed with intricate details that reflect its ceremonial importance. */

                width: '360.96px',
                height: '74px',

                fontFamily: 'Poppins',
                fontStyle: 'normal',
                fontWeight: 400,
                fontSize: '15.5012px',
                lineHeight: '24px',
                /* or 157% */
                textAlign: 'justify',

                color: '#000000',

                /* Inside auto layout */
                flex: 'none',
                order: 1,
                alignSelf: 'stretch',
                flexGrow: 0,
              }}
            >
              {description}
            </Typography>
          </Box>

          <Box>
            <Box sx={{ mb: 1 }}>
              <Typography
                component="span"
                variant="body2"
                sx={{
                  /* Material */

                  width: '360.96px',
                  height: '23px',

                  fontFamily: 'Poppins',
                  fontStyle: 'normal',
                  fontWeight: 600,
                  fontSize: '15.5012px',
                  lineHeight: '23px',

                  color: '#000000',

                  /* Inside auto layout */
                  flex: 'none',
                  order: 0,
                  alignSelf: 'stretch',
                  flexGrow: 0,
                }}
              >
                Material
              </Typography>
              <br />
              <Typography
                component="span"
                variant="body2"
                sx={{
                  /* Premium mahogany wood with hand-painted lacquer designs. */
                  width: '360.96px',
                  height: '46px',
                  fontFamily: 'Poppins',
                  fontStyle: 'normal',
                  fontWeight: 400,
                  fontSize: '15.5012px',
                  lineHeight: '23px',
                  color: '#000000',
                  /* Inside auto layout */
                  flex: 'none',
                  order: 1,
                  alignSelf: 'stretch',
                  flexGrow: 0,
                }}
              >
                {material}
              </Typography>
            </Box>

            <Box sx={{ mb: 2 }}>
              <Typography
                component="span"
                variant="body2"
                sx={{
                  /* Size */

                  width: '31px',
                  height: '23px',

                  fontFamily: 'Poppins',
                  fontStyle: 'normal',
                  fontWeight: 600,
                  fontSize: '15.5012px',
                  lineHeight: '23px',

                  color: '#000000',

                  /* Inside auto layout */
                  flex: 'none',
                  order: 0,
                  flexGrow: 0,
                }}
              >
                Size:
              </Typography>
              <Typography
                component="span"
                variant="body2"
                sx={{
                  width: '160px',
                  height: '23px',

                  fontFamily: 'Poppins',
                  fontStyle: 'normal',
                  fontWeight: 400,
                  fontSize: '15.5012px',
                  lineHeight: '23px',

                  color: '#000000',

                  flex: 'none',
                  order: 1,
                  flexGrow: 0,
                }}
              >
                {size}
              </Typography>
            </Box>

            <Link
              component={RouterLink}
              to={link}
              variant="body2"
              sx={{
                width: '360.96px',
                height: '20px',
                fontFamily: 'Poppins',
                fontStyle: 'normal',
                fontWeight: 600,
                fontSize: '15.5012px',
                lineHeight: '20px',
                color: '#B55C30',
                flex: 'none',
                order: 3,
                alignSelf: 'stretch',
                flexGrow: 0,
              }}
            >
              Learn more →
            </Link>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CarouselSlide;
