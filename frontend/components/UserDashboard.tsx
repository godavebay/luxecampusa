import { useEffect, useState } from "react";
import { supabase } from "../utils/supabase";

interface UserDashboardProps {
  userId: string;
}

export default function UserDashboard({ userId }: UserDashboardProps) {
  const [listings, setListings] = useState<any[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      const { data: userListings } = await supabase
        .from("listings")
        .select("*")
        .eq("created_by", userId);

      const { data: userReviews } = await supabase
        .from("reviews")
        .select("*, listings(title)")
        .eq("user_id", userId);

      setListings(userListings || []);
      setReviews(userReviews || []);
      setLoading(false);
    };

    fetchDashboardData();
  }, [userId]);

  if (loading) return <p>Loading dashboard...</p>;

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-8">
      <h1 className="text-2xl font-bold">Your Dashboard</h1>

      <div>
        <h2 className="text-xl font-semibold mb-2">Your Listings</h2>
        {listings.length === 0 ? (
          <p className="text-gray-500">You haven't added any listings yet.</p>
        ) : (
          <ul className="space-y-2">
            {listings.map((listing) => (
              <li key={listing.id} className="p-4 border rounded bg-white shadow">
                <strong>{listing.title}</strong>
                <p className="text-sm text-gray-600">{listing.description}</p>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Your Reviews</h2>
        {reviews.length === 0 ? (
          <p className="text-gray-500">You haven't left any reviews yet.</p>
        ) : (
          <ul className="space-y-2">
            {reviews.map((r) => (
              <li key={r.id} className="p-4 border rounded bg-white shadow">
                <p className="text-yellow-600 font-medium">Rating: {r.rating}/5</p>
                <p>{r.review}</p>
                <p className="text-sm text-gray-500 mt-1">
                  On: {r.listings?.title || "Unknown"} —{" "}
                  {new Date(r.created_at).toLocaleDateString()}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}