import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function SponsorsPage() {
  const [sponsors, setSponsors] = useState([]);

  useEffect(() => {
    const fetchSponsors = async () => {
      const { data, error } = await supabase
        .from('sponsors')
        .select('*')
        .eq('approved', true);
      if (!error) setSponsors(data);
    };
    fetchSponsors();
  }, []);

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif', maxWidth: '1100px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '2rem', textAlign: 'center' }}>LuxeCampUSA Sponsors</h1>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
        {sponsors.map((sponsor, index) => (
          <div key={index} style={{
            border: '1px solid #ddd',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
          }}>
            <img src={sponsor.banner_url || '/images/placeholder-banner.jpg'} alt={sponsor.name} style={{ width: '100%', height: '140px', objectFit: 'cover' }} />
            <div style={{ padding: '1rem', background: '#fff' }}>
              <img src={sponsor.logo_url || '/images/placeholder-logo.png'} alt={sponsor.name + ' logo'} style={{ height: '40px', marginBottom: '1rem' }} />
              <h3 style={{ marginBottom: '0.5rem' }}>{sponsor.name}</h3>
              <span style={{
                display: 'inline-block',
                padding: '6px 12px',
                backgroundColor: tierColor(sponsor.tier),
                color: 'white',
                borderRadius: '20px',
                fontSize: '0.8rem',
                fontWeight: 600
              }}>
                {sponsor.tier} Sponsor
              </span>
              <div style={{ marginTop: '1rem' }}>
                <a href={sponsor.website} target="_blank" rel="noopener noreferrer" style={{
                  textDecoration: 'none',
                  color: '#0070f3',
                  fontWeight: 600
                }}>
                  Visit Website →
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function tierColor(tier) {
  switch (tier) {
    case "Premium":
      return "#a779e9";
    case "Featured":
      return "#f59e0b";
    default:
      return "#6b7280";
  }
}
