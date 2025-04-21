import { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Sample usage
<Swiper
  modules={[Navigation, Pagination]}
  navigation
  pagination={{ clickable: true }}
>
  <SwiperSlide><img src="..." alt="Slide 1" /></SwiperSlide>
  <SwiperSlide><img src="..." alt="Slide 2" /></SwiperSlide>
</Swiper>
