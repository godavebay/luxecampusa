import { useRouter } from 'next/router';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const dummyImages = [
  '/images/example1.jpg',
  '/images/example2.jpg',
  '/images/example3.jpg',
];

export default function ListingDetail() {
  const router = useRouter();
  const { slug } = router.query;

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>{slug?.replace(/-/g, ' ').toUpperCase()}</h1>

      <Swiper
        modules={[Navigation, Pagination, A11y]}
        navigation
        pagination={{ clickable: true }}
        style={{ marginBottom: '2rem' }}
      >
        {dummyImages.map((img, i) => (
          <SwiperSlide key={i}>
            <img src={img} alt={`Slide ${i}`} style={{ width: '100%', borderRadius: '12px' }} />
          </SwiperSlide>
        ))}
      </Swiper>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '1rem' }}>
        <span style={badge}>Fire Pit</span>
        <span style={badge}>Hot Tub</span>
        <span style={badge}>Wi-Fi</span>
        <span style={badge}>Pet Friendly</span>
      </div>

      <p style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
        This luxury campground features breathtaking views and top-tier amenities. Whether you’re looking
        for a secluded cabin, an upscale RV site, or a glamorous safari tent, this destination has it all.
      </p>

      <a href="https://booking.example.com" target="_blank" style={button}>Book Now</a>
    </div>
  );
}

const badge = {
  padding: '8px 12px',
  backgroundColor: '#f3c77d',
  color: '#2a2a2a',
  borderRadius: '20px',
  fontWeight: '600',
  fontSize: '0.85rem',
};

const button = {
  display: 'inline-block',
  marginTop: '1.5rem',
  padding: '12px 20px',
  backgroundColor: '#222',
  color: 'white',
  textDecoration: 'none',
  borderRadius: '8px',
  fontWeight: '600',
};
