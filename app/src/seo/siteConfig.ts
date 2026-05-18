import { preferWebp } from '../utils/imagePaths';

export const SITE_URL =
  import.meta.env.VITE_SITE_URL ?? 'https://tharangadrums.lk';

export const SITE = {
  name: 'Tharanga Drums',
  brand: 'Beats of Heritage',
  legalName: 'New Tharanga Musical Instruments',
  url: SITE_URL,
  defaultOgImage: `${SITE_URL}${preferWebp('/images/products/davula/davula_home.png')}`,
  locale: 'en_LK',
  email: 'info@tharangadrums.lk',
  phone: '+94-77-338-8998',
  address: {
    street: 'NO. 34, Kandy Road',
    locality: 'Nittambuwa',
    region: 'Western Province',
    country: 'LK',
  },
};
