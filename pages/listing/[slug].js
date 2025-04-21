
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import { createClient } from '@supabase/supabase-js';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function ListingDetail() {
  const router = useRouter();
  const { slug } = router.query;
  const [data, setData] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (!slug) return;
    const fetchData = async () => {
      const { data, error } = await supabase
        .from('listings')
        .select('*')
        .eq('slug', slug)
        .single();
      if (error) {
        console.error("Supabase Error:", error.message);
        setErrorMsg("Listing not found or failed to load.");
      } else {
        console.log("Supabase Data:", data);
        setData(data);
      }
    };
    fetchData();
  }, [slug]);

  if (errorMsg) return <div style={{ color: 'white', padding: '2rem' }}>{errorMsg}</div>;
  if (!data) return <div style={{ color: 'white', padding: '2rem' }}>Loading listing...</div>;

  const images = Array.isArray(data.image_urls) ? data.image_urls : [];

  return (
    <>
      <Head>
        <title>{data.name || "LuxeCampUSA Listing"}</title>
      </Head>
      <div className="detail-container">
        <div className="carousel-container">
          <Swiper spaceBetween={10} slidesPerView={1}>
            {images.length > 0 ? (
              images.map((url, index) => (
                <SwiperSlide key={index}>
                  <img className="detail-hero" src={url} alt={`Image ${index + 1}`} />
                </SwiperSlide>
              ))
            ) : (
              <SwiperSlide>
                <img className="detail-hero" src="/fallback.jpg" alt="Fallback" />
              </SwiperSlide>
            )}
          </Swiper>
        </div>
        <div className="detail-content">
          <h1>{data.name || "Unnamed Listing"}</h1>
          <h3>{data.location || "Unknown Location"} • <span className="tier-badge">{data.tier || "Standard"}</span></h3>
          <p className="description">{data.description || "No description available."}</p>
          <h4>Amenities</h4>
          <ul>
            {(Array.isArray(data.amenities) ? data.amenities : (data.amenities || "").split(',')).map((a, i) => (
              <li key={i}>{a.trim()}</li>
            ))}
          </ul>
          {data.booking_link && (
            <a href={data.booking_link} target="_blank" rel="noopener noreferrer" className="book-btn">
              Book Now
            </a>
          )}
        </div>
      </div>
    </>
  );
}
