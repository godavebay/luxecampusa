import ReviewForm from './ReviewForm';
import ReviewList from './ReviewList';
import { useEffect, useState } from 'react';
import { supabase } from '../utils/supabase';

export default function ListingDetailPage({ listing, user }) {
  const [reviews, setReviews] = useState([]);

  const fetchReviews = async () => {
    const { data } = await supabase
      .from("reviews")
      .select("*")
      .eq("listing_id", listing.id)
      .order("created_at", { ascending: false });
    setReviews(data || []);
  };

  const handleNewReview = async (reviewData) => {
    await supabase.from("reviews").upsert(reviewData);
    fetchReviews();
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <div>
      <h1>{listing.title}</h1>
      <ReviewForm listingId={listing.id} userId={user.id} onSubmit={handleNewReview} />
      <ReviewList reviews={reviews} />
    </div>
  );
}