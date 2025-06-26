
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Phone, Mail, Car, ArrowLeft } from 'lucide-react';
import MapPreview from '@/components/MapPreview';

interface ParkingSpot {
  id: number;
  mainLocation: string;
  subLocation: string;
  availableSpaces: string;
  pricePerHour: number;
  contactDetail: string;
  coordinates: { lat: number; lng: number };
  distance: string;
  rating: number;
}

const SearchResults = () => {
  const [searchData, setSearchData] = useState<any>(null);
  const [parkingSpots] = useState<ParkingSpot[]>([
    {
      id: 1,
      mainLocation: "Downtown Mall",
      subLocation: "Main Entrance",
      availableSpaces: "3 cars, 2 scooters",
      pricePerHour: 5,
      contactDetail: "Phone: (555) 123-4567\nEmail: john@example.com",
      coordinates: { lat: 40.7128, lng: -74.0060 },
      distance: "0.2 km",
      rating: 4.8
    },
    {
      id: 2,
      mainLocation: "Downtown Mall",
      subLocation: "Side Parking",
      availableSpaces: "5 cars",
      pricePerHour: 4,
      contactDetail: "Phone: (555) 987-6543\nEmail: mary@example.com",
      coordinates: { lat: 40.7138, lng: -74.0070 },
      distance: "0.3 km",
      rating: 4.6
    },
    {
      id: 3,
      mainLocation: "Near Downtown Mall",
      subLocation: "Office Building",
      availableSpaces: "2 cars, 4 scooters",
      pricePerHour: 6,
      contactDetail: "Phone: (555) 456-7890\nEmail: bob@example.com",
      coordinates: { lat: 40.7118, lng: -74.0050 },
      distance: "0.4 km",
      rating: 4.9
    }
  ]);

  useEffect(() => {
    const savedSearch = localStorage.getItem('parkNestSearch');
    if (savedSearch) {
      setSearchData(JSON.parse(savedSearch));
    }
  }, []);

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className="text-yellow-400">★</span>);
    }
    if (hasHalfStar) {
      stars.push(<span key="half" className="text-yellow-400">☆</span>);
    }
    return stars;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <Link to="/user/dashboard" className="flex items-center space-x-2">
              <ArrowLeft className="w-5 h-5" />
              <div className="w-8 h-8 parknest-gradient rounded-lg flex items-center justify-center">
                <Car className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">ParkNest</h1>
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Info */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Parking Spots {searchData?.destination && `near ${searchData.destination}`}
          </h2>
          <p className="text-gray-600">
            Found {parkingSpots.length} available parking spots
            {searchData?.subLocation && ` in ${searchData.subLocation}`}
          </p>
        </div>

        {/* Results */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {parkingSpots.map((spot) => (
            <Card key={spot.id} className="hover-scale shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-5 h-5 text-parknest-blue" />
                    <span>{spot.mainLocation}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    {renderStars(spot.rating)}
                    <span className="text-sm text-gray-600 ml-1">({spot.rating})</span>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Location Details */}
                <div className="space-y-2">
                  <p><strong>Sub Location:</strong> {spot.subLocation}</p>
                  <p><strong>Available:</strong> {spot.availableSpaces}</p>
                  <p><strong>Distance:</strong> {spot.distance}</p>
                </div>

                {/* Price */}
                <div className="bg-gradient-to-r from-parknest-blue to-parknest-green rounded-lg p-4 text-white">
                  <div className="text-center">
                    <div className="text-3xl font-bold">${spot.pricePerHour}</div>
                    <div className="text-sm opacity-90">per hour</div>
                  </div>
                </div>

                {/* Map Preview */}
                <div className="border rounded-lg overflow-hidden h-48">
                  <MapPreview coordinates={spot.coordinates} />
                </div>

                {/* Contact Info */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold mb-2 flex items-center">
                    <Phone className="w-4 h-4 mr-2" />
                    Contact Details
                  </h4>
                  <div className="text-sm text-gray-600 whitespace-pre-line">
                    {spot.contactDetail}
                  </div>
                </div>

                {/* Action Button */}
                <Button className="w-full parknest-gradient text-white hover-scale">
                  Contact Owner
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results Message (if needed) */}
        {parkingSpots.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">No parking spots found</h3>
              <p className="text-gray-500">Try adjusting your search criteria or location</p>
              <Link to="/user/dashboard">
                <Button className="mt-4 parknest-gradient text-white">
                  Search Again
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}

        {/* Back to Dashboard */}
        <div className="mt-8 text-center">
          <Link to="/user/dashboard">
            <Button variant="outline" className="border-parknest-blue text-parknest-blue hover:bg-parknest-blue hover:text-white">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
