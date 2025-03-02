import { AppBar, createTheme } from '@mui/material';
import { Button, TextField, styled } from '@mui/material';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#116',
    },
    secondary: {
      main: '#282828',
    },
    success: {
      main: '#00C853',
    },
    error: {
      main: '#FF0001',
    },
    warning: {
      main: '#FFB800',
    },
    background: {
      default: '#282828',
      paper: '#2f2f2f',
    },
    text: {
      primary: '#ffffff',
      disabled: '#6b6b6b',
    },
  },
  typography: {
    fontFamily: 'Ubuntu, sans-serif',
    fontSize: 14,
    fontWeightRegular: 400,
    fontWeightBold: 500,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8, // Rounded buttons
          textTransform: 'none', // Disable uppercase text
          fontWeight: 500,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            backgroundColor: '#2f2f2f',
            color: 'white',
            '& fieldset': {
              borderColor: '#3a3a3a',
            },
            '&:hover fieldset': {
              borderColor: 'white',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#dd2126', // Primary color on focus
              borderWidth: '2px',
            },
          },
        },
      },
    },
  },
});

export const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  padding: '8px 16px',
  borderRadius: '8px',
  fontWeight: 'bold',
  textTransform: 'none',
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
  '&:disabled': {
    backgroundColor: theme.palette.action.disabled,
    color: theme.palette.text.disabled,
  },
}));
export const StyledInput = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    backgroundColor: '#2f2f2f',
    color: 'white',
    '& fieldset': {
      borderColor: '#3a3a3a',
    },
    '&:hover fieldset': {
      borderColor: 'white',
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.primary.main, // Use the primary color
      borderWidth: '2px',
    },
  },
  '& .MuiInputLabel-root': {
    color: 'white',
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: theme.palette.primary.main, // Label color on focus
  },
}));

export const StyledAppBar = styled(AppBar)(() => ({
  backgroundColor: 'transparent', // Transparent background
  color: 'white', // Default text color
  boxShadow: 'none', // Remove shadow
  backdropFilter: 'blur(5px)', // Optional: Glassmorphic blur effect
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.2)', // Slightly darken on hover
  },
  '& .MuiToolbar-root': {
    padding: '0 16px', // Custom padding for the toolbar
  },
}));
