import { Swiper, SwiperSlide } from 'swiper/react';
import CarouselSlide from './CarouselItem';
import './styles.scss';
import { useBreakpointMode } from '../../utils/useBreakpointMode';
import { Autoplay } from 'swiper/modules';



const Carousel = () => {
  const slides = [
    {
      imageSrc: '/images/home/procuts_slider/IMG-20250321-WA0009.jpg',
      title: 'Drums Product 01',
      description:
        'These products showcase all items within a lampshade, as shown in the image. All items are beautifully arranged, creating an attractive display similar to the one in the image.',
      // material: 'Premium mahogany wood and hand-painted lacquer.',
      size:  " 40 cm (H) x 26 cm (W)",
      Weight: "800 g – Lightweight yet durable, perfect for display or gifting.",
      link: '/product', // Remove leading space
    },
    {
      imageSrc: '/images/home/procuts_slider/IMG-20250321-WA0010.jpg',
      title: 'Drums Product 02',
      description: 'This shows all products displayed separately, each labeled with the relevant item name as shown in the image. These are available as a single framed product.',
      // material: 'Hand-carved rosewood with lacquer finish.',
      size:  "27.5 cm (L) × 19.2 cm (W) × 4.5 cm (H)",
      Weight: "810 g – Lightweight yet durable, perfect for display or gifting.",
      link: '/product', // Remove leading space
    },
    
    {
      imageSrc: '/images/home/procuts_slider/IMG-20250321-WA0011.jpg',
      title: 'Drums Product 03',
      description:'This shows all products displayed separately, without labeled item names. The products are arranged vertically, one by one, and are available as a single framed product.',
      // material: 'Canvas with hand-painted details.',
      size:  "27.5 cm (L) × 19.2 cm (W) × 1.8 cm (H)",
      Weight: "500 g – Lightweight yet durable, perfect for display or gifting.",
      link: '/product', // Remove leading space
    },
    {
      imageSrc: '/images/home/procuts_slider/IMG-20250321-WA0012.jpg',
      title: 'Drums Product 04',
      description: "This shows the available product as a single item, along with all other related products displayed in the same view. All four drums are available for purchase.",
      // material: 'Premium quality wood with intricate carvings.',
      size:  "19.3 cm (L) × 15.5 cm (W) × 1.8 cm (H)",
      Weight: "210 g – Lightweight yet durable, perfect for display or gifting.",
      link: '/product', // Remove leading space
    },
  ];
  

  const { isXl, isMd, isSm, isXs } = useBreakpointMode();

  const getSlidesPerView = () => {
    if (isXl) return 1;
    if (isMd) return 1;
    if (isXs || isSm) return 1;

    return 1;
  };

  return (
    <Swiper
  spaceBetween={10}
  slidesPerView={isXs ? 1 : getSlidesPerView()}
  grabCursor={true}
  autoplay={{
    delay: 5000,  // Change delay to 5000ms (5 seconds)
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  }}
  centeredSlidesBounds={true}
  loop={true}
  style={{
    maxWidth: '100vw',
    width: '100%',
    overflow: 'hidden',
    marginTop: '-5vh',
    marginBottom: '-5vh',
  }}
  modules={[Autoplay]}
>
  {slides.map((slide, index) => (
    <SwiperSlide
      key={index}
      style={{
        listStyleType: 'none',
        alignSelf: 'center',
        height: '50%',
        overflow: 'hidden',
      }}
    >
      <CarouselSlide {...slide} />
    </SwiperSlide>
  ))}
</Swiper>

  );
};

export default Carousel;
