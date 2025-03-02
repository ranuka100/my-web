import { Swiper, SwiperSlide } from 'swiper/react';
import CarouselSlide from './CarouselItem';
import './styles.scss';
import { useBreakpointMode } from '../../utils/useBreakpointMode';
import { ProductImg } from '../../assets';
import { Autoplay } from 'swiper/modules';

const Carousel = () => {
  const slides = [
    {
      imageSrc: ProductImg,
      title: 'Geta Bera sadsasd',
      description:
        'A beautifully crafted miniature of the iconic Geta Bera, designed with intricate details that reflect its ceremonial importance.',
      material: 'Premium mahogany wood with hand-painted lacquer designs.',
      size: '10 cm tall, 5 cm wide',
      link: '/learn-more',
    },
    {
      imageSrc: ProductImg,
      title: 'Another Souvenir',
      description:
        'This souvenir showcases intricate designs that highlight cultural significance.',
      material: 'Hand-carved rosewood with lacquer finish.',
      size: '15 cm tall, 7 cm wide',
      link: '/learn-more',
    },
    {
      imageSrc: ProductImg,
      title: 'Traditional Art',
      description:
        'A stunning piece of traditional art, capturing the essence of history and craftsmanship.',
      material: 'Canvas with hand-painted details.',
      size: '20 cm x 30 cm',
      link: '/learn-more',
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
      // centeredSlides={true}

      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }}
      centeredSlidesBounds={true}
      loop={true}
      style={{
        maxWidth: '100vw',
        width: '100%',
        overflow: 'hidden',
      }}
      modules={[Autoplay]}
    >
      {slides.map((slide, index) => (
        <SwiperSlide
          key={index}
          style={{
            listStyleType: 'none',
            alignSelf: 'center',
            height: '100%',
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
