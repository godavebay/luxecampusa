export default function ReviewList({ reviews }) {
  return (
    <div className="p-4">
      <h3 className="text-xl font-semibold mb-3">User Reviews</h3>
      {reviews.length === 0 ? <p>No reviews yet.</p> : (
        <ul>
          {reviews.map((r) => (
            <li key={r.id} className="mb-4 border-b pb-2">
              <strong>Rating: {r.rating}/5</strong>
              <p>{r.review}</p>
              <small>{new Date(r.created_at).toLocaleDateString()}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}