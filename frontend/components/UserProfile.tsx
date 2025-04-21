import { useEffect, useState } from "react";
import { supabase } from "../../utils/supabase";

interface UserProfileProps {
  userId: string;
}

export default function UserProfile({ userId }: UserProfileProps) {
  const [profile, setProfile] = useState<any>(null);
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfileAndReviews = async () => {
      // Fetch user profile info (if stored separately)
      const { data: userData, error: userError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      // Fetch user's reviews
      const { data: reviewData, error: reviewError } = await supabase
        .from("reviews")
        .select("*, listings(title)")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (!userError) setProfile(userData);
      if (!reviewError) setReviews(reviewData || []);
      setLoading(false);
    };

    fetchProfileAndReviews();
  }, [userId]);

  if (loading) return <p>Loading profile...</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-2">
        {profile?.full_name || "User"}'s Profile
      </h1>
      {profile?.bio && <p className="mb-4 text-gray-600">{profile.bio}</p>}

      <h2 className="text-xl font-semibold mt-6 mb-2">Your Reviews</h2>
      {reviews.length === 0 ? (
        <p className="text-gray-500">You haven't left any reviews yet.</p>
      ) : (
        <ul className="space-y-4">
          {reviews.map((review) => (
            <li key={review.id} className="border p-4 rounded">
              <p className="text-sm text-gray-500 mb-1">
                Listing: <strong>{review.listings?.title || "Unknown"}</strong>
              </p>
              <p className="text-yellow-600 font-medium">Rating: {review.rating}/5</p>
              <p>{review.review}</p>
              <p className="text-xs text-gray-400 mt-1">
                {new Date(review.created_at).toLocaleDateString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}