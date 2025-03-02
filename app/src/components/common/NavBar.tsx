import { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { styled } from '@mui/system';
import { useLocation } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { motion, AnimatePresence } from 'framer-motion';

const StyledAppBar = styled(AppBar)({
  backgroundColor: 'transparent',
  boxShadow: 'none',
  transition: 'background-color 0.3s ease, transform 0.3s ease',
});

type ThemeType = {
  [key: string]: { textColor: string };
};

const themes: ThemeType = {
  '/': { textColor: 'white' }, // Home default color
  '/product': { textColor: 'black' }, // Light background for other pages
  '/about': { textColor: 'black' }, // Light background for other pages
};

const pages = [
  { name: 'Home', link: '/' },
  { name: 'Products', link: '/product' },
  { name: 'About Us', link: '/about' },
];

function NavBar() {
  const location = useLocation();
  const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);
  const [visible, setVisible] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [textColor, setTextColor] = useState(
    themes[location.pathname]?.textColor || 'black'
  );
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  const [isMouseOver, setIsMouseOver] = useState(false); // Track mouse hover over navbar

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;

      // If the user is at the top of the page (scroll position 0), ensure navbar stays visible
      if (currentScrollPos === 0) {
        setVisible(true); // Keep navbar visible
        if (timer) {
          clearTimeout(timer); // Clear any existing hide timer
        }
        return;
      }

      // If user is scrolling up, show the navbar, otherwise hide it
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);

      // Clear any previous timer when scroll happens
      if (timer) {
        clearTimeout(timer);
      }

      // Set a new timer to hide the navbar after 2 seconds (only if mouse is not hovering over navbar)
      if (!isMouseOver) { // Only hide if mouse is not over the navbar
        setTimer(
          setTimeout(() => {
            setVisible(false); // Hide the navbar after 2 seconds
          }, 2000) // Close navbar after 2 seconds
        );
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos, timer, isMouseOver]); // Added `isMouseOver` dependency

  useEffect(() => {
    if (location.pathname !== '/') {
      setTextColor(themes[location.pathname]?.textColor || 'black');
      return;
    }

    // IntersectionObserver for dynamic navbar color on Home page
    const sections = [
      { id: 'hero-section', color: 'white' },
      { id: 'impact-section', color: 'black' },
      { id: 'testimonials-section', color: 'black' },
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSection = entries.find((entry) => entry.isIntersecting);
        if (visibleSection) {
          const sectionColor = sections.find(
            (s) => s.id === visibleSection.target.id
          )?.color;
          if (sectionColor) setTextColor(sectionColor);
        }
      },
      { threshold: 0.5 }
    );

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [location.pathname]);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <StyledAppBar
      position="fixed"
      sx={{
        transform: visible ? 'translateY(0)' : 'translateY(-100%)',
        backgroundColor: menuOpen ? 'rgba(248, 232, 232, 0.9)' : 'transparent',
        padding: '5px 0',
      }}
      onMouseEnter={() => {
        setIsMouseOver(true); // Mouse enters navbar, make sure it stays visible
        if (timer) {
          clearTimeout(timer); // Clear any hide timers while hovering
        }
      }}
      onMouseLeave={() => setIsMouseOver(false)} // Mouse leaves navbar, allow hiding
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 'bold',
            fontSize: { xs: '50px', md: '50px' },
            letterSpacing: '0.2rem',
            color: textColor, // Dynamic text color
            textAlign: 'left',
            margin: { xs: '20px 0 20px 12px', md: '20px 0 20px 8px' }, // Adjust margin-left for mobile
          }}
        >
          DRUMS
        </Typography>

        <Box
          sx={{
            display: { xs: 'none', md: 'flex' },
            flexGrow: 1,
            gap: 4,
            justifyContent: 'center',
            marginTop: '10px',
            marginLeft: '-170px',
          }}
        >
          {pages.map((page) => (
            <Button
              key={page.name}
              href={page.link}
              sx={{
                color: textColor, // Dynamic text color
                fontSize: { xs: '18px', md: '24px' },
                fontWeight: location.pathname === page.link ? 600 : 'normal', // Set font weight
                backgroundColor:
                  location.pathname === page.link ? '#c4a484' : 'transparent', // Highlight active page
                '&:hover': {
                  backgroundColor: 'rgba(200, 200, 200, 0.5)',
                },
              }}
            >
              {page.name}
            </Button>
          ))}
        </Box>
        <IconButton
          edge="end"
          sx={{
            display: { xs: 'flex', md: 'none' },
            color: textColor, // Dynamic text color
            fontSize: '36px',
            padding: '12px',
          }}
          onClick={handleMenuToggle}
        >
          {menuOpen ? (
            <CloseIcon sx={{ fontSize: '40px' }} />
          ) : (
            <MenuIcon sx={{ fontSize: '40px' }} />
          )}
        </IconButton>
      </Toolbar>

      {/* Animated Dropdown Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            style={{
              position: 'fixed',
              top: '90px',
              left: 0,
              width: '100vw',
              backgroundColor: 'rgb(128, 128, 128)',
              zIndex: 1200,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '150px',
            }}
          >
            <List
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%',
              }}
            >
              {pages.map((page) => (
                <ListItem
                  key={page.name}
                  component="a"
                  href={page.link}
                  onClick={handleMenuToggle}
                  sx={{
                    textAlign: 'center',
                    color: textColor,
                    fontSize: { xs: '20px', md: '24px' },
                    width: '100%',
                    justifyContent: 'center',
                    '&:hover': {
                      backgroundColor: 'rgba(200, 200, 200, 0.6)',
                    },
                  }}
                >
                  <ListItemText
                    primary={page.name}
                    sx={{ textAlign: 'center' }}
                  />
                </ListItem>
              ))}
            </List>
          </motion.div>
        )}
      </AnimatePresence>
    </StyledAppBar>
  );
}

export default NavBar;
