/// <reference types="vite/client" />

declare module 'swiper/css';
declare module 'swiper/css/autoplay';

interface ImportMetaEnv {
  readonly VITE_SITE_URL: string;
  readonly VITE_GSC_VERIFICATION?: string;
  readonly VITE_BING_VERIFICATION?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
