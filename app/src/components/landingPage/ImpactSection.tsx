import { Grid, Typography, Box } from '@mui/material';
import { motion } from 'framer-motion';
import { FormatQuote } from '@mui/icons-material'; // Material-UI quote icon
import pic2 from '../../../public/images/home/dancer_bg.jpeg'; // Ensure correct path

const ImpactSection = () => {
  return (
    <Box
      sx={{
        background: '#3B2216',
        height: '700px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 0,
        overflow: 'hidden',
      }}
    >
      <Grid container spacing={0} sx={{ maxWidth: '100%', height: '100%' }}>
        {/* Left Section - Animated Image with Fade-In Effect */}
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            width: '100%',
            height: '700px',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <motion.div
            initial={{ opacity: 0 }} // Starts with 0 opacity
            animate={{ opacity: 1 }} // Fades in smoothly
            transition={{ duration: 3.8, ease: 'easeOut' }} // Smooth transition effect
          >
            <Box
              component="img"
              src={pic2}
              alt="Sri Lankan Cultural Heritage"
              sx={{
                width: '100%',
                height: '160%',
                objectFit: 'cover',
                position: 'absolute',
                top: 0,
                clipPath: 'ellipse(100% 85% at 0% 32%)',
              }}
            />
          </motion.div>
        </Grid>

        {/* Right Section - Animated Text */}
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            color: 'white',
            padding: 8,
            height: '100%',
          }}
        >
          {/* Animated Title with Quotes */}
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 1.3, ease: 'easeOut' }}
            viewport={{ once: true }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography
                variant="h4"
                sx={{
                  fontFamily: 'Nunito',
                  fontSize: '75px',
                  fontWeight: '700',
                  lineHeight: '90px',
                  textAlign: 'left',
                  color: '#FFFFFF',
                  marginRight: 2, // Increased margin for spacing
                }}
              >
                <FormatQuote
                  sx={{
                    fontSize: 48,
                    color: 'white',
                    transform: 'rotate(180deg)',
                    paddingTop: '15px',
                  }}
                />
                Your Purchase<br></br> Makes a Difference
                <FormatQuote
                  sx={{ fontSize: 48, color: 'white', paddingBottom: '15px' }}
                />
              </Typography>
            </Box>
          </motion.div>

          {/* Animated Paragraph */}
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 1.5, ease: 'easeOut', delay: 0.1 }}
            viewport={{ once: true }}
          >
            <Typography
              variant="body1"
              sx={{
                margin: '4rem 0 0 0',
                fontFamily: 'Nunito',
                fontSize: '32px',
                fontWeight: '400',
                lineHeight: '40px',
                textAlign: 'justify',
                textUnderlinePosition: 'from-font',
                textDecorationSkipInk: 'none',
              }}
            >
              Every drum you buy helps sustain Sri Lanka’s rich <br />
              cultural heritage and supports local artisans. By <br />
              owning a piece of this tradition, you’re contributing <br />
              to a meaningful cause and preserving the legacy of <br />
              Sri Lankan craftsmanship.
            </Typography>
          </motion.div>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ImpactSection;
