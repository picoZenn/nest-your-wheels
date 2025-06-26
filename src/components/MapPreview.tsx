
import React from 'react';
import { MapPin } from 'lucide-react';

interface MapPreviewProps {
  coordinates: { lat: number; lng: number };
}

const MapPreview: React.FC<MapPreviewProps> = ({ coordinates }) => {
  return (
    <div className="relative w-full h-full bg-gradient-to-br from-blue-100 to-green-100 flex items-center justify-center overflow-hidden">
      {/* Mock map background */}
      <div className="absolute inset-0 opacity-30">
        <div className="w-full h-full bg-gradient-to-br from-blue-200 to-green-200"></div>
        {/* Grid pattern to simulate map */}
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)`,
          backgroundSize: '15px 15px'
        }}></div>
      </div>
      
      {/* Location pin */}
      <div className="relative z-10 text-center">
        <MapPin className="w-8 h-8 text-red-500 mx-auto mb-2 drop-shadow-lg" fill="currentColor" />
        <div className="bg-black text-white text-xs px-2 py-1 rounded">
          {coordinates.lat.toFixed(4)}, {coordinates.lng.toFixed(4)}
        </div>
      </div>

      {/* Zoom controls mockup */}
      <div className="absolute top-2 right-2 flex flex-col space-y-1">
        <div className="w-6 h-6 bg-white shadow rounded flex items-center justify-center text-xs font-bold">+</div>
        <div className="w-6 h-6 bg-white shadow rounded flex items-center justify-center text-xs font-bold">-</div>
      </div>

      <div className="absolute bottom-2 left-2 text-xs text-gray-600 bg-white px-2 py-1 rounded shadow">
        Mock Map Preview
      </div>
    </div>
  );
};

export default MapPreview;
