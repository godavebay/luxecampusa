import { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface MapViewProps {
  coordinates: { lat: number; lng: number; title: string }[];
}

export default function MapView({ coordinates }: MapViewProps) {
  useEffect(() => {
    const map = L.map("map-container").setView([38.5, -84.1], 6);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map);

    coordinates.forEach(({ lat, lng, title }) => {
      const marker = L.marker([lat, lng])
        .addTo(map)
        .bindPopup(`<strong>${title}</strong>`);
    });

    return () => map.remove(); // Cleanup
  }, [coordinates]);

  return (
    <div id="map-container" className="w-full h-[500px] rounded shadow" />
  );
}