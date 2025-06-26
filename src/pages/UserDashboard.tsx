
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';
import { Search, Car, LogOut, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const UserDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [searchData, setSearchData] = useState({
    destination: '',
    subLocation: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchData.destination.trim()) {
      toast({
        title: "Please enter a destination",
        description: "We need to know where you're looking for parking.",
        variant: "destructive",
      });
      return;
    }

    // Store search data for results page
    localStorage.setItem('parkNestSearch', JSON.stringify(searchData));
    
    setIsSearchModalOpen(false);
    toast({
      title: "Searching for parking spots...",
      description: "Redirecting to results page",
    });

    setTimeout(() => {
      navigate('/search-results');
    }, 1000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const recentSearches = [
    { destination: "Downtown Mall", subLocation: "Main Entrance" },
    { destination: "City Hospital", subLocation: "Emergency Wing" },
    { destination: "Tech Park", subLocation: "Building A" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 parknest-gradient rounded-lg flex items-center justify-center">
                <Car className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">ParkNest</h1>
            </Link>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">Welcome, {user?.name}</span>
              <Button onClick={logout} variant="outline" size="sm">
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">User Dashboard</h2>
          <p className="text-gray-600">Find and book the perfect parking spot for your needs</p>
        </div>

        {/* Main Action */}
        <div className="mb-8">
          <Dialog open={isSearchModalOpen} onOpenChange={setIsSearchModalOpen}>
            <DialogTrigger asChild>
              <Button size="lg" className="parknest-gradient text-white hover-scale">
                <Search className="w-5 h-5 mr-2" />
                Book My Spot
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold">Find Parking</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="destination">Destination Location *</Label>
                  <Input
                    id="destination"
                    name="destination"
                    placeholder="e.g., Downtown Mall, City Hospital"
                    value={searchData.destination}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subLocation">Sub Location (Optional)</Label>
                  <Input
                    id="subLocation"
                    name="subLocation"
                    placeholder="e.g., Main Entrance, Building A"
                    value={searchData.subLocation}
                    onChange={handleInputChange}
                  />
                </div>

                <Button type="submit" className="w-full parknest-gradient text-white">
                  Search Parking Spots
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="hover-scale">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 parknest-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Quick Search</h3>
              <p className="text-gray-600 text-sm">Find parking spots near your destination instantly</p>
            </CardContent>
          </Card>

          <Card className="hover-scale">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-parknest-green to-parknest-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Map View</h3>
              <p className="text-gray-600 text-sm">See all available spots on an interactive map</p>
            </CardContent>
          </Card>

          <Card className="hover-scale">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-parknest-blue to-parknest-green rounded-full flex items-center justify-center mx-auto mb-4">
                <Car className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Direct Contact</h3>
              <p className="text-gray-600 text-sm">Connect directly with parking space owners</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Searches */}
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-gray-900">Recent Searches</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recentSearches.map((search, index) => (
              <Card key={index} className="hover-scale cursor-pointer border-l-4 border-l-parknest-green">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-parknest-green" />
                    <div>
                      <h4 className="font-semibold">{search.destination}</h4>
                      <p className="text-sm text-gray-600">{search.subLocation}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Help Section */}
        <Card className="mt-8 bg-gradient-to-r from-blue-50 to-green-50 border-0">
          <CardContent className="p-8 text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Need Help Finding Parking?</h3>
            <p className="text-gray-600 mb-6">
              Our system connects you with verified parking space owners in your area. 
              Search by destination and connect directly with owners for the best rates.
            </p>
            <Button variant="outline" className="border-parknest-blue text-parknest-blue hover:bg-parknest-blue hover:text-white">
              Learn More
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserDashboard;
