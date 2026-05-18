import { Link as RouterLink, useLocation } from 'react-router-dom';
import { Breadcrumbs as MuiBreadcrumbs, Link, Typography, Box } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { getBreadcrumbs } from './breadcrumbConfig';

const BreadcrumbNav = () => {
  const { pathname } = useLocation();
  const crumbs = getBreadcrumbs(pathname);

  if (crumbs.length <= 1) return null;

  return (
    <Box
      component="nav"
      aria-label="Breadcrumb"
      sx={{ px: { xs: 2, md: 4 }, pt: 12, pb: 1 }}
    >
      <MuiBreadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        {crumbs.map((crumb, index) => {
          const isLast = index === crumbs.length - 1;

          if (isLast) {
            return (
              <Typography key={crumb.path} color="text.primary" fontSize="14px">
                {crumb.name}
              </Typography>
            );
          }

          return (
            <Link
              key={crumb.path}
              component={RouterLink}
              to={crumb.path}
              underline="hover"
              color="inherit"
              fontSize="14px"
            >
              {crumb.name}
            </Link>
          );
        })}
      </MuiBreadcrumbs>
    </Box>
  );
};

export default BreadcrumbNav;
