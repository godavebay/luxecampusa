
import { useState, useEffect } from 'react';

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('favorites');
    if (saved) {
      setFavorites(JSON.parse(saved));
    }
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Your Favorite Listings</h1>
      {favorites.length === 0 ? (
        <p>No favorites saved yet.</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {favorites.map((listing, idx) => (
            <li key={idx} className="border rounded-xl p-4 shadow-lg">
              <h2 className="text-xl font-semibold">{listing.name}</h2>
              <p>{listing.description}</p>
              <a href={\`/listing/\${listing.slug}\`} className="text-blue-600 underline">View Listing</a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
