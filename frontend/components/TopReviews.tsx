interface Review {
  id: string;
  review: string;
  rating: number;
  listings?: {
    title: string;
  };
  created_at: string;
}

interface TopReviewsProps {
  reviews: Review[];
}

export default function TopReviews({ reviews }: TopReviewsProps) {
  if (!reviews.length) return <p>No featured reviews yet.</p>;

  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">🌟 Featured Reviews</h2>
      <ul className="space-y-4">
        {reviews.slice(0, 3).map((r) => (
          <li key={r.id} className="bg-white p-4 border rounded shadow-sm">
            <p className="text-yellow-600 font-semibold">Rating: {r.rating}/5</p>
            <p className="italic text-gray-800">"{r.review}"</p>
            <p className="text-sm text-gray-500 mt-2">
              From: {r.listings?.title || "Unknown"} —{" "}
              {new Date(r.created_at).toLocaleDateString()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}