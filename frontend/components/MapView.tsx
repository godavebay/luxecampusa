import { useEffect, useRef } from "react";

// This component assumes Mapbox or Leaflet setup externally.
// Replace with real map SDK later for interactive clustering.

interface MapViewProps {
  coordinates: { lat: number; lng: number; title: string }[];
}

export default function MapView({ coordinates }: MapViewProps) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Placeholder for real map SDK initialization
    console.log("Map would initialize here with coordinates:", coordinates);
  }, [coordinates]);

  return (
    <div className="w-full h-[500px] bg-gray-200 rounded shadow flex items-center justify-center text-gray-600" ref={mapRef}>
      <p className="text-lg">Map Placeholder (Integrate Mapbox or Leaflet here)</p>
    </div>
  );
}