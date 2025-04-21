import { useState } from 'react';

export default function ReviewForm({ listingId, userId, onSubmit }) {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating < 1 || rating > 5) return alert("Rating must be between 1 and 5");
    onSubmit({ listingId, userId, rating, review });
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded shadow">
      <h3 className="text-lg font-bold mb-2">Leave a Review</h3>
      <div>
        <label>Rating (1-5):</label>
        <input type="number" value={rating} onChange={(e) => setRating(Number(e.target.value))} min={1} max={5} />
      </div>
      <div>
        <label>Review:</label>
        <textarea value={review} onChange={(e) => setReview(e.target.value)} />
      </div>
      <button type="submit" className="mt-2 bg-blue-600 text-white px-4 py-2 rounded">Submit</button>
    </form>
  );
}