import { Image, Center, Spinner } from '@chakra-ui/react';

import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, {
  Autoplay,
  Pagination,
  Navigation,
  EffectFade
} from 'swiper/core';

import 'swiper/swiper.min.css';
import 'swiper/components/effect-fade/effect-fade.min.css';
import 'swiper/components/pagination/pagination.min.css';
import 'swiper/components/navigation/navigation.min.css';

// install Swiper modules
SwiperCore.use([Autoplay, Pagination, Navigation, EffectFade]);

export default function Carousel({ imageUrls }) {
  const slides = imageUrls.map((url) => (
    <SwiperSlide key={url}>
      <Center bg="gray.100" borderRadius="20">
        <Image
          src={url}
          h={['275px', null, '500px']}
          borderRadius="20"
          fallback={
            <Center h="500px">
              <Spinner />
            </Center>
          }
        />
      </Center>
    </SwiperSlide>
  ));

  return (
    <Swiper
      effect="fade"
      style={{ maxWidth: '1000px' }}
      centeredSlides={true}
      navigation={true}
      loop={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false
      }}
      pagination={{
        clickable: true
      }}
    >
      {slides}
    </Swiper>
  );
}
