
import { useRouter } from 'next/router';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function ListingDetail() {
  const router = useRouter();
  const { slug } = router.query;

  return (
    <div>
      <h1>Listing: {slug}</h1>
      <Swiper modules={[Navigation, Pagination, A11y]} navigation pagination={{ clickable: true }}>
        <SwiperSlide><img src="/example1.jpg" alt="Example 1" /></SwiperSlide>
        <SwiperSlide><img src="/example2.jpg" alt="Example 2" /></SwiperSlide>
      </Swiper>
    </div>
  );
}
