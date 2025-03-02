/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { Grid, Card, CardContent, Typography, Box } from '@mui/material';

// Import background image
import background from '../assets/backgroundImages/Group.svg';

// Import the JSON data (relative path from the component)
import achievementsData from '../pages/About/AchievementsData.json';

const Achievements = () => {
  const [achievements, setAchievements] = useState<any[]>([]);

  // On component mount, load the data (assuming data is already imported)
  useEffect(() => {
    setAchievements(achievementsData); // You can also load dynamically if required
  }, []);

  // Check if the number of achievements is odd
  const isOdd = achievements.length % 2 !== 0;

  return (
    <Box
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

      {/* Centered Paragraph */}
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
                      src={image}
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

              <CardContent
                sx={{ paddingLeft: 4, paddingRight: 4, marginTop: -3 }}
              >
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
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Achievements;
