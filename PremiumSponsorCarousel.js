import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper'; // corrected here
import 'swiper/css';
import 'swiper/css/navigation';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function PremiumSponsorCarousel() {
  const [sponsors, setSponsors] = useState([]);

  useEffect(() => {
    const fetchPremiumSponsors = async () => {
      const { data, error } = await supabase
        .from('sponsors')
        .select('*')
        .eq('approved', true)
        .eq('tier', 'Premium');

      if (!error && data) {
        setSponsors(data);
      }
    };
    fetchPremiumSponsors();
  }, []);

  if (!sponsors.length) return null;

  return (
    <div style={{ padding: '2rem 1rem', background: '#111', color: '#fff' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '1rem', fontSize: '1.8rem' }}>
        💎 Premium Sponsors
      </h2>
      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        autoplay={{ delay: 3000 }}
        navigation
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 }
        }}
      >
        {sponsors.map((sponsor, idx) => (
          <SwiperSlide key={idx}>
            <a href={sponsor.website} target="_blank" rel="noopener noreferrer" style={{
              display: 'block',
              backgroundColor: '#222',
              borderRadius: '12px',
              padding: '1rem',
              textAlign: 'center',
              color: '#fff',
              textDecoration: 'none',
              boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
              transition: 'transform 0.3s'
            }}>
              <img
                src={sponsor.banner_url || '/images/placeholder-banner.jpg'}
                alt={sponsor.name}
                style={{ width: '100%', height: '140px', objectFit: 'cover', borderRadius: '8px' }}
              />
              <h3 style={{ marginTop: '1rem' }}>{sponsor.name}</h3>
            </a>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
