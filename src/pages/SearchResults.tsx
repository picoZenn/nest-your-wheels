
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Phone, Mail, Car, ArrowLeft } from 'lucide-react';
import MapPreview from '@/components/MapPreview';

const SearchResults = () => {
  const [searchData, setSearchData] = useState<any>(null);
  const [parkingSpots] = useState([]);

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
      stars.push(<span key={i} className="text-gray-400">★</span>);
    }
    if (hasHalfStar) {
      stars.push(<span key="half" className="text-gray-400">☆</span>);
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
            No parking spots available at the moment. Results will be populated when connected to backend.
            {searchData?.subLocation && ` Searched in ${searchData.subLocation}`}
          </p>
        </div>

        {/* No Results Message */}
        <Card className="text-center py-12">
          <CardContent>
            <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">No parking spots found</h3>
            <p className="text-gray-500">
              Results will be available once the app is connected to a backend database.
              Try searching again later or contact support.
            </p>
            <Link to="/user/dashboard">
              <Button className="mt-4 parknest-gradient text-white">
                Search Again
              </Button>
            </Link>
          </CardContent>
        </Card>

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
