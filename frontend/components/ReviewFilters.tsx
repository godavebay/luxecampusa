import { useState } from "react";

interface ReviewFiltersProps {
  onFilterChange: (filters: { rating: number | null; sort: string }) => void;
}

export default function ReviewFilters({ onFilterChange }: ReviewFiltersProps) {
  const [rating, setRating] = useState<number | null>(null);
  const [sort, setSort] = useState<string>("recent");

  const handleRatingChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value === "all" ? null : parseInt(e.target.value);
    setRating(value);
    onFilterChange({ rating: value, sort });
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSort(value);
    onFilterChange({ rating, sort: value });
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-4">
      <div>
        <label className="block font-medium mb-1">Filter by Rating:</label>
        <select
          className="border rounded px-2 py-1"
          value={rating ?? "all"}
          onChange={handleRatingChange}
        >
          <option value="all">All Ratings</option>
          <option value="5">5 Stars</option>
          <option value="4">4 Stars</option>
          <option value="3">3 Stars</option>
          <option value="2">2 Stars</option>
          <option value="1">1 Star</option>
        </select>
      </div>

      <div>
        <label className="block font-medium mb-1">Sort by:</label>
        <select
          className="border rounded px-2 py-1"
          value={sort}
          onChange={handleSortChange}
        >
          <option value="recent">Most Recent</option>
          <option value="highest">Highest Rated</option>
          <option value="lowest">Lowest Rated</option>
        </select>
      </div>
    </div>
  );
}