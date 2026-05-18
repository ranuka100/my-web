/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { Grid, Card, CardContent, Typography, Box } from '@mui/material';
import { motion } from 'framer-motion'; // Import motion for animations

// Import background image
import background from '../assets/backgroundImages/Group.svg';

// Import the JSON data (relative path from the component)
import achievementsData from '../pages/About/AchievementsData.json';
import { resolvePublicImage } from '../utils/imagePaths';

const Achievements = () => {
  const [achievements, setAchievements] = useState<any[]>([]); 
  const [isVisible, setIsVisible] = useState(false); // State to control animation trigger
  const [, setPrevScrollPos] = useState(window.pageYOffset); // Track previous scroll position
  const [hasScrolledToSection, setHasScrolledToSection] = useState(false); // State to track if section is in view

  // On component mount, load the data (assuming data is already imported)
  useEffect(() => {
    setAchievements(achievementsData); // You can also load dynamically if required
  }, []);

  // Scroll event listener to detect when the user scrolls to the section
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;

      // Calculate if the section is in the viewport based on window's inner height
      const sectionTop = document.getElementById('achievements-section')?.getBoundingClientRect().top || 0;
      const sectionBottom = document.getElementById('achievements-section')?.getBoundingClientRect().bottom || 0;
      const windowHeight = window.innerHeight;

      // Check if the section is within the viewport
      if (sectionTop <= windowHeight && sectionBottom >= 0 && !hasScrolledToSection) {
        setHasScrolledToSection(true); // Mark the section as in view
        setIsVisible(true); // Trigger animation
      }

      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [hasScrolledToSection]);

  // Check if the number of achievements is odd
  const isOdd = achievements.length % 2 !== 0;

  return (
    <Box
      id="achievements-section"
      sx={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '20px',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundPosition: 'left center',
          backgroundRepeat: 'no-repeat',
          backgroundImage: `url(${background})`,
          backgroundSize: '200% 100%',
          opacity: 0.1, // Only affects background image
        },
      }}
    >
      {/* Title */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: isVisible ? 0 : 100, opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.6 }}
      >
        <Typography
          variant="h4"
          sx={{
            textAlign: 'center',
            fontWeight: 'bold',
            marginBottom: 2,
            marginTop: 4,
          }}
        >
          Our Achievements
        </Typography>
      </motion.div>

      {/* Centered Paragraph */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: isVisible ? 0 : 100, opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.7 }}
      >
        <Typography
          variant="body1"
          sx={{
            textAlign: 'center',
            fontSize: '20px',
            marginX: '10%',
            marginBottom: 4,
          }}
        >
          At <strong>DRUMS</strong>, we take immense pride in the recognition our
          founder and team have received for preserving Sri Lanka’s rich cultural
          heritage.
        </Typography>
      </motion.div>

      <Grid
        container
        spacing={4}
        sx={{ marginBottom: 10, zIndex: 1, justifyContent: 'center' }}
      >
        {achievements.map((achievement, index) => (
          <Grid
            item
            xs={12}
            md={6}
            key={index}
            sx={{
              display: 'flex',
              justifyContent:
                isOdd && index === achievements.length - 1
                  ? 'center'
                  : 'flex-start', // Only center the last card
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            {/* Animation for each card */}
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: isVisible ? 0 : 100, opacity: isVisible ? 1 : 0 }}
              transition={{
                duration: 0.8, // Duration of each animation
                delay: index * 0.2, // Delay to stagger cards one by one
              }}
            >
              <Card
                sx={{
                  height: '100%',
                  width: '100%',
                  backgroundColor: '#ffffff', // Removed black background
                  boxShadow: 'none', // Removed shadow
                  color: 'inherit', // Inherit text color
                  border: '1px solid #e0e0e0', // Add a light border for the frame
                  borderRadius: '10px', // Keep the rounded corners
                }}
              >
                <CardContent
                  sx={{
                    flex: 1,
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: 2,
                  }}
                >
                  {achievement.images.map((image: string, idx: number) => (
                    <Grid item key={idx} sx={{ padding: '2px' }}>
                      <img
                        src={resolvePublicImage(image)}
                        alt={`Section ${idx + 1}`}
                        style={{
                          width: '100%',
                          height: '300px',
                          objectFit: 'cover',
                          borderRadius: '10px',
                        }}
                      />
                    </Grid>
                  ))}
                </CardContent>

                <CardContent sx={{ paddingLeft: 4, paddingRight: 4, marginTop: -3 }}>
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    textAlign="left"
                    marginBottom={2}
                  >
                    {achievement.title}
                  </Typography>
                  <Typography variant="body1" sx={{ textAlign: 'justify' }}>
                    {achievement.description}
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Achievements;
