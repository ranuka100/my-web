import { CardMedia, type CardMediaProps } from '@mui/material';
import { resolvePublicImage } from '../../utils/imagePaths';

type OptimizedCardMediaProps = CardMediaProps<'img'> & {
  image: string;
};

const OptimizedCardMedia = ({ image, alt, sx, loading, ...props }: OptimizedCardMediaProps) => (
  <CardMedia
    {...props}
    component="img"
    image={resolvePublicImage(image)}
    alt={alt}
    loading={loading ?? 'lazy'}
    sx={sx}
  />
);

export default OptimizedCardMedia;
