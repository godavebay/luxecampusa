
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function ListingDetail() {
  const router = useRouter();
  const { slug } = router.query;
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!slug) return;
    const fetchData = async () => {
      const { data, error } = await supabase
        .from('listings')
        .select('*')
        .eq('slug', slug)
        .single();
      if (!error) setData(data);
    };
    fetchData();
  }, [slug]);

  if (!data) return <div style={{ color: 'white', padding: '2rem' }}>Loading listing...</div>;

  return (
    <>
      <Head>
        <title>{data.name} | LuxeCampUSA</title>
      </Head>
      <div className="detail-container">
        <img className="detail-hero" src={data.image_urls?.[0] || '/fallback.jpg'} alt={data.name} />
        <div className="detail-content">
          <h1>{data.name}</h1>
          <h3>{data.location} • <span className="tier-badge">{data.tier}</span></h3>
          <p className="description">{data.description}</p>
          <h4>Amenities</h4>
          <ul>
            {(data.amenities || '').split(',').map((a, i) => <li key={i}>{a.trim()}</li>)}
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
