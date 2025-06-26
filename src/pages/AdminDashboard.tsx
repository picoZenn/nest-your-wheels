
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';
import { MapPin, Plus, Car, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import MapPicker from '@/components/MapPicker';

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const [isListingModalOpen, setIsListingModalOpen] = useState(false);
  const [listings, setListings] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    mainLocation: '',
    subLocation: '',
    availableSpaces: '',
    pricePerHour: '',
    contactDetail: '',
    coordinates: { lat: 0, lng: 0 }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newListing = {
      id: Date.now(),
      ...formData,
      createdAt: new Date().toISOString()
    };

    setListings(prev => [...prev, newListing]);
    setIsListingModalOpen(false);
    
    // Reset form
    setFormData({
      mainLocation: '',
      subLocation: '',
      availableSpaces: '',
      pricePerHour: '',
      contactDetail: '',
      coordinates: { lat: 0, lng: 0 }
    });

    toast({
      title: "Success!",
      description: "Your parking space has been listed successfully.",
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleLocationSelect = (coordinates: { lat: number; lng: number }) => {
    setFormData(prev => ({
      ...prev,
      coordinates
    }));
  };

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
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h2>
          <p className="text-gray-600">Manage your parking spaces and connect with customers</p>
        </div>

        {/* Main Action */}
        <div className="mb-8">
          <Dialog open={isListingModalOpen} onOpenChange={setIsListingModalOpen}>
            <DialogTrigger asChild>
              <Button size="lg" className="parknest-gradient text-white hover-scale">
                <Plus className="w-5 h-5 mr-2" />
                List My Parking Space
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold">List Your Parking Space</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="mainLocation">Main Location *</Label>
                    <Input
                      id="mainLocation"
                      name="mainLocation"
                      placeholder="e.g., Downtown, City Center"
                      value={formData.mainLocation}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subLocation">Sub Location *</Label>
                    <Input
                      id="subLocation"
                      name="subLocation"
                      placeholder="e.g., Near Mall, Office Building"
                      value={formData.subLocation}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="availableSpaces">Available Spaces *</Label>
                  <Input
                    id="availableSpaces"
                    name="availableSpaces"
                    placeholder="e.g., 2 cars, 3 scooters"
                    value={formData.availableSpaces}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pricePerHour">Price per Hour ($) *</Label>
                  <Input
                    id="pricePerHour"
                    name="pricePerHour"
                    type="number"
                    placeholder="e.g., 5"
                    value={formData.pricePerHour}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contactDetail">Contact Details *</Label>
                  <Textarea
                    id="contactDetail"
                    name="contactDetail"
                    placeholder="Phone number, email, or other contact information"
                    value={formData.contactDetail}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>Location on Map *</Label>
                  <div className="border rounded-lg overflow-hidden">
                    <MapPicker onLocationSelect={handleLocationSelect} />
                  </div>
                  <p className="text-sm text-gray-500">Click on the map to pin your parking location</p>
                </div>

                <Button type="submit" className="w-full parknest-gradient text-white">
                  List Parking Space
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Listings */}
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-gray-900">Your Listings ({listings.length})</h3>
          
          {listings.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h4 className="text-lg font-semibold text-gray-600 mb-2">No listings yet</h4>
                <p className="text-gray-500">Click "List My Parking Space" to add your first listing</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {listings.map((listing) => (
                <Card key={listing.id} className="hover-scale border-l-4 border-l-parknest-blue">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <MapPin className="w-5 h-5 text-parknest-blue" />
                      <span>{listing.mainLocation}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p><strong>Sub Location:</strong> {listing.subLocation}</p>
                    <p><strong>Available:</strong> {listing.availableSpaces}</p>
                    <p><strong>Price:</strong> ${listing.pricePerHour}/hour</p>
                    <p><strong>Contact:</strong> {listing.contactDetail}</p>
                    <div className="pt-2">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Active
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
