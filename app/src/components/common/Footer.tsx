import {
  Container,
  Typography,
  TextField,
  Button,
  Link,
  IconButton,
  Box,
} from '@mui/material';
import Grid2 from '@mui/material/Grid2';
import {
  Facebook,
  Instagram,
  LinkedIn,
  Twitter,
  LocationOn,
  Email,
  Phone,
} from '@mui/icons-material';
import { useLocation } from 'react-router-dom';

const Footer = () => {
  const location = useLocation();
  // Define routes where the footer should be curved
  const curvedRoutes = ['/', '/about']; // Example routes
  const isCurved = curvedRoutes.includes(location.pathname);
  console.log('first', isCurved);
  return (
    <footer>
      <Box
        sx={{
          width: '100%',
          backgroundColor: '#3B2216',
          color: 'white',
        }}
      >
        <Box
          sx={{
            backgroundColor: 'white',
            color: 'white',
            py: 10,
            borderRadius: isCurved ? '0 0 100% 100%' : '0',
            marginBottom: '1rem',
          }}
        ></Box>

        <Container maxWidth="lg" sx={{ py: isCurved ? 6 : 0 }}>
          <Grid2
            container
            spacing={4}
            sx={{ padding: isCurved ? '0 44px' : '0' }}
          >
            <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
              <Typography variant="h5" gutterBottom>
                Beats of Heritage
              </Typography>
              <br />
              <Box display="flex" alignItems="center" mb={1}>
                <LocationOn sx={{ mr: 1 }} />
                <Typography variant="body2">
                  No. 121/C, Kadawatha, Sri Lankayy
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" mb={1}>
                <Email sx={{ mr: 1 }} />
                <Typography variant="body2">
                  <Link
                    href="mailto:info@music.com.lk"
                    sx={{
                      color: 'white',
                      textDecoration: 'none',
                      '&:hover': { color: '#D2691E' },
                    }}
                  >
                    info@music.com.lk
                  </Link>
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" mb={1}>
                <Phone sx={{ mr: 1 }} />
                <Typography variant="body2">
                  <Link
                    href="tel:+94728130647"
                    sx={{
                      color: 'white',
                      textDecoration: 'none',
                      '&:hover': { color: '#D2691E' },
                    }}
                  >
                    +94 70 590 816
                  </Link>
                </Typography>
              </Box>
              <Box display="flex" alignItems="center">
                <Phone sx={{ mr: 1 }} />
                <Typography variant="body2">
                  <Link
                    href="tel:+94770155918"
                    sx={{
                      color: 'white',
                      textDecoration: 'none',
                      '&:hover': { color: '#D2691E' },
                    }}
                  >
                    +94 77 578 866
                  </Link>
                </Typography>
              </Box>
            </Grid2>

            {/* Quick Links Column */}
            <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
              <Typography variant="h5" gutterBottom>
                Quick Links
              </Typography>
              <br />
              <Box
                component="ul"
                sx={{ padding: 0, listStyle: 'none', margin: 0 }}
              >
                {[
                  { text: 'Home', link: '/' },
                  { text: 'Products', link: '/product' },
                  { text: 'About', link: '/about' },
                ].map(({ text, link }) => (
                  <Box component="li" key={text} sx={{ borderRadius: 1 }}>
                    <Link
                      href={link}
                      sx={{
                        color: 'white',
                        textDecoration: 'none',
                        display: 'block',
                        padding: '8px 12px',
                        borderRadius: 1,
                        '&:hover': { color: '#D2691E' },
                      }}
                      variant="body2"
                    >
                      {text}
                    </Link>
                  </Box>
                ))}
              </Box>
            </Grid2>

            {/* Newsletter Column */}
            <Grid2 size={{ xs: 12, md: 4 }}>
              <Typography
                variant="h5"
                gutterBottom
                sx={{
                  textAlign: { xs: 'left', sm: 'center', md: 'left' },
                }}
              >
                Newsletter
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  backgroundColor: '#6E4A37',
                  borderRadius: 2,
                  padding: '25px',
                  mt: 4,
                  color: 'white',
                }}
              >
                <Typography
                  variant="body2"
                  sx={{ mb: 2, alignSelf: 'flex-start' }}
                >
                  Subscribe to get the latest updates.
                </Typography>
                <Box
                  sx={{ display: 'flex', alignItems: 'center', width: '100%' }}
                >
                  <TextField
                    variant="outlined"
                    placeholder="Enter your Email"
                    sx={{
                      backgroundColor: '#FFFFFF',
                      borderRadius: 1,
                      flexGrow: 1,
                      mr: 2,
                      '& .MuiInputBase-root': { height: '36px' },
                      '& .MuiOutlinedInput-input': {
                        padding: '8px',
                        fontSize: '14px',
                      },
                    }}
                  />
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: '#D2691E',
                      color: 'white',
                      height: '36px',
                      textTransform: 'none',
                      px: 2,
                      fontSize: '14px',
                    }}
                  >
                    Subscribe
                  </Button>
                </Box>
              </Box>
            </Grid2>
          </Grid2>

          {/* Separator */}
          <Box
            component="hr"
            sx={{
              borderColor: '#fff',
              width: '100%',
              margin: '40px auto',
              height: '2px',
              backgroundColor: '#fff',
              border: 'none',
            }}
          />

          {/* Footer Bottom Section */}
          <Grid2
            container
            spacing={2}
            alignItems="center"
            justifyContent={{ xs: 'center', md: 'space-between' }}
          >
            {/* Copyright Text */}
            <Grid2
              size={{ xs: 12, md: 'auto' }}
              textAlign={{ xs: 'center', md: 'left' }}
            >
              <Typography variant="body2">
                © 2024 Beats of Heritage. All rights reserved.
              </Typography>
            </Grid2>

            {/* Social Media Links */}
            <Grid2 size={{ xs: 12, md: 'auto' }}>
              <Box display="flex" gap={2} justifyContent="center">
                {[
                  { icon: <Facebook />, link: '#' },
                  { icon: <Twitter />, link: '#' },
                  { icon: <Instagram />, link: '#' },
                  { icon: <LinkedIn />, link: '#' },
                ].map(({ icon, link }, index) => (
                  <IconButton
                    key={index}
                    href={link}
                    sx={{ color: 'white', '&:hover': { color: '#D2691E' } }}
                  >
                    {icon}
                  </IconButton>
                ))}
              </Box>
            </Grid2>
          </Grid2>
        </Container>
      </Box>
    </footer>
  );
};

export default Footer;
