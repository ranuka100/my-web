import type { CSSProperties, ImgHTMLAttributes } from 'react';
import { resolvePublicImage } from '../../utils/imagePaths';

type SeoImageProps = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
  style?: CSSProperties;
} & Omit<
  ImgHTMLAttributes<HTMLImageElement>,
  'src' | 'alt' | 'width' | 'height' | 'loading'
>;

const SeoImage = ({
  src,
  alt,
  width,
  height,
  priority = false,
  className,
  style,
  ...rest
}: SeoImageProps) => {
  const displaySrc = resolvePublicImage(src);

  const imgProps: ImgHTMLAttributes<HTMLImageElement> = {
    src: displaySrc,
    alt,
    width,
    height,
    loading: priority ? 'eager' : 'lazy',
    decoding: 'async',
    className,
    style,
    ...(priority ? { fetchpriority: 'high' as const } : {}),
    ...rest,
  };

  return <img {...imgProps} />;
};

export default SeoImage;
