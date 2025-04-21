
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

  return (
    <>
      <Head>
        <title>{data.name || "LuxeCampUSA Listing"}</title>
      </Head>
      <div className="detail-container">
        <img
          className="detail-hero"
          src={(data.image_urls && data.image_urls[0]) || '/fallback.jpg'}
          alt={data.name || "Listing image"}
        />
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
