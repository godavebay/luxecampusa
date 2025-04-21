import { useState } from "react";

interface GalleryViewerProps {
  images: string[];
}

export default function GalleryViewer({ images }: GalleryViewerProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <div className="w-full">
      <div className="mb-4">
        <img
          src={images[selectedIndex]}
          alt="Gallery"
          className="w-full h-64 object-cover rounded shadow"
        />
      </div>
      <div className="flex gap-2 overflow-x-auto">
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Thumbnail ${index + 1}`}
            className={`h-16 w-24 object-cover rounded cursor-pointer border ${
              selectedIndex === index ? 'border-blue-500' : 'border-transparent'
            }`}
            onClick={() => setSelectedIndex(index)}
          />
        ))}
      </div>
    </div>
  );
}