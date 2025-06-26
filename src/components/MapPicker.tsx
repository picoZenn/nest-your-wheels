
import React, { useEffect, useRef, useState } from 'react';
import { MapPin } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

interface MapPickerProps {
  onLocationSelect: (coordinates: { lat: number; lng: number }) => void;
}

const MapPicker: React.FC<MapPickerProps> = ({ onLocationSelect }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [apiKey, setApiKey] = useState('');
  const [isApiKeySet, setIsApiKeySet] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number } | null>(null);

  const initializeMap = () => {
    if (!apiKey.trim()) {
      toast({
        title: "API Key Required",
        description: "Please enter your Mapbox public token to use the map.",
        variant: "destructive",
      });
      return;
    }

    // Mock map initialization - replace with actual Mapbox implementation
    console.log('Initializing map with API key:', apiKey);
    setIsApiKeySet(true);
    
    // Simulate map click at default location
    const defaultLocation = { lat: 40.7128, lng: -74.0060 };
    setSelectedLocation(defaultLocation);
    onLocationSelect(defaultLocation);
    
    toast({
      title: "Map Ready",
      description: "Click anywhere on the map to select your parking location.",
    });
  };

  const handleMapClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!isApiKeySet) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    // Convert pixel coordinates to lat/lng (mock calculation)
    const lat = 40.7128 + (y - 150) * 0.0001;
    const lng = -74.0060 + (x - 200) * 0.0001;
    
    const newLocation = { lat, lng };
    setSelectedLocation(newLocation);
    onLocationSelect(newLocation);
    
    toast({
      title: "Location Selected",
      description: `Coordinates: ${lat.toFixed(4)}, ${lng.toFixed(4)}`,
    });
  };

  if (!isApiKeySet) {
    return (
      <div className="p-6 bg-gray-50 text-center space-y-4">
        <MapPin className="w-12 h-12 text-gray-400 mx-auto" />
        <div>
          <h3 className="text-lg font-semibold mb-2">Mapbox API Key Required</h3>
          <p className="text-gray-600 mb-4">
            To use the map feature, please enter your Mapbox public token.
            You can get one from{' '}
            <a
              href="https://mapbox.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-parknest-blue hover:underline"
            >
              mapbox.com
            </a>
          </p>
          <div className="max-w-md mx-auto space-y-2">
            <Input
              type="text"
              placeholder="Enter your Mapbox public token"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
            />
            <Button
              onClick={initializeMap}
              className="w-full parknest-gradient text-white"
            >
              Initialize Map
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div
        ref={mapRef}
        className="w-full h-64 bg-gradient-to-br from-blue-100 to-green-100 rounded-lg cursor-crosshair flex items-center justify-center relative overflow-hidden"
        onClick={handleMapClick}
      >
        {/* Mock map background */}
        <div className="absolute inset-0 opacity-20">
          <div className="w-full h-full bg-gradient-to-br from-blue-200 to-green-200"></div>
          {/* Grid pattern to simulate map */}
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>
        
        {/* Center indicator */}
        <div className="text-gray-600 text-center z-10">
          <MapPin className="w-8 h-8 mx-auto mb-2" />
          <p>Click to pin location</p>
        </div>

        {/* Selected location pin */}
        {selectedLocation && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
            <div className="relative">
              <MapPin className="w-8 h-8 text-red-500 drop-shadow-lg" fill="currentColor" />
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                {selectedLocation.lat.toFixed(4)}, {selectedLocation.lng.toFixed(4)}
              </div>
            </div>
          </div>
        )}
      </div>
      
      <p className="text-sm text-gray-500 mt-2 text-center">
        This is a mock map for demonstration. In production, this would be integrated with Mapbox API.
      </p>
    </div>
  );
};

export default MapPicker;
