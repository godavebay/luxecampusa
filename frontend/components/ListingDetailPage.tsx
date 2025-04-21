import { useState, useEffect } from "react";
import { supabase } from "../utils/supabase";
import ReviewList from "./ReviewList";
import ReviewForm from "./ReviewForm";
import ReviewFilters from "./ReviewFilters";

export default function ListingDetailPage({ listing, user }) {
  const [reviews, setReviews] = useState([]);
  const [filters, setFilters] = useState({ rating: null, sort: "recent" });

  const fetchReviews = async () => {
    let query = supabase
      .from("reviews")
      .select("*, listings(title)")
      .eq("listing_id", listing.id);

    if (filters.rating !== null) {
      query = query.eq("rating", filters.rating);
    }

    if (filters.sort === "recent") {
      query = query.order("created_at", { ascending: false });
    } else if (filters.sort === "highest") {
      query = query.order("rating", { ascending: false });
    } else if (filters.sort === "lowest") {
      query = query.order("rating", { ascending: true });
    }

    const { data } = await query;
    setReviews(data || []);
  };

  useEffect(() => {
    fetchReviews();
  }, [listing.id, filters]);

  const handleNewReview = async (reviewData) => {
    await supabase.from("reviews").upsert(reviewData);
    fetchReviews();
  };

  return (
    <div className="p-6">
      <ReviewForm listingId={listing.id} userId={user.id} onSubmit={handleNewReview} />
      <ReviewFilters onFilterChange={setFilters} />
      <ReviewList reviews={reviews} />
    </div>
  );
}