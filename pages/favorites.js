
import { useEffect, useState } from 'react';

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('favorites');
    if (stored) {
      setFavorites(JSON.parse(stored));
    }
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Your Favorite Listings</h1>
      {favorites.length === 0 ? (
        <p>You haven’t added any favorites yet.</p>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {favorites.map((listing, idx) => (
            <li key={idx} className="border rounded-xl p-4 shadow-lg">
              <h2 className="text-xl font-semibold">{listing.name}</h2>
              <p>{listing.description}</p>
              <a href={`/listing/${listing.slug}`} className="text-blue-600 underline">View Listing</a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
