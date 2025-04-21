export default function ReviewAdminPanel({ allReviews, onDelete }) {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">All Reviews</h2>
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr>
            <th>User</th>
            <th>Listing</th>
            <th>Rating</th>
            <th>Review</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {allReviews.map((review) => (
            <tr key={review.id}>
              <td>{review.user_id}</td>
              <td>{review.listing_id}</td>
              <td>{review.rating}</td>
              <td>{review.review}</td>
              <td>{new Date(review.created_at).toLocaleDateString()}</td>
              <td><button onClick={() => onDelete(review.id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}