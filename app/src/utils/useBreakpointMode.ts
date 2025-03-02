// utils/breakpoints.ts
import { useTheme } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';

export const useBreakpointMode = () => {
  const theme = useTheme();

  const breakpoints = {
    isXs: useMediaQuery(theme.breakpoints.down('sm')),
    isSm: useMediaQuery(theme.breakpoints.between('sm', 'md')),
    isMd: useMediaQuery(theme.breakpoints.between('md', 'lg')),
    isLg: useMediaQuery(theme.breakpoints.between('lg', 'xl')),
    isXl: useMediaQuery(theme.breakpoints.up('xl')),
  };

  const getCurrentMode = () => {
    if (breakpoints.isXl) return 'xl';
    if (breakpoints.isLg) return 'lg';
    if (breakpoints.isMd) return 'md';
    if (breakpoints.isSm) return 'sm';
    return 'xs'; // default
  };

  return {
    mode: getCurrentMode(),
    ...breakpoints,
  };
};
