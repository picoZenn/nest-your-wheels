
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Search, Car } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 parknest-gradient rounded-lg flex items-center justify-center">
                <Car className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">ParkNest</h1>
            </div>
            <div className="flex space-x-4">
              <Link to="/auth">
                <Button variant="outline" className="hover-scale">Login</Button>
              </Link>
              <Link to="/auth">
                <Button className="parknest-gradient text-white hover-scale">Sign Up</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="animate-fade-in">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Find Your Perfect
              <span className="block text-transparent bg-clip-text parknest-gradient">
                Parking Spot
              </span>
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Connect with available parking spaces near you. List your spot or find the perfect place to park.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/auth">
                <Button size="lg" className="parknest-gradient text-white text-lg px-8 py-3 hover-scale">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How ParkNest Works */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-slide-up">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">How ParkNest Works</h3>
            <p className="text-lg text-gray-600">Simple steps to connect parking space owners with renters</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-8 hover-scale border-2 hover:border-parknest-blue transition-all duration-300">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 parknest-gradient rounded-full flex items-center justify-center mx-auto">
                  <Search className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-2xl font-semibold text-gray-900">1. List</h4>
                <p className="text-gray-600">
                  Parking space owners list their available spots with location, pricing, and availability details.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center p-8 hover-scale border-2 hover:border-parknest-green transition-all duration-300">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 bg-gradient-to-r from-parknest-green to-parknest-blue rounded-full flex items-center justify-center mx-auto">
                  <MapPin className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-2xl font-semibold text-gray-900">2. Locate</h4>
                <p className="text-gray-600">
                  Users search for parking spots near their destination and view them on an interactive map.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center p-8 hover-scale border-2 hover:border-parknest-blue transition-all duration-300">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 bg-gradient-to-r from-parknest-blue to-parknest-green rounded-full flex items-center justify-center mx-auto">
                  <Car className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-2xl font-semibold text-gray-900">3. Park</h4>
                <p className="text-gray-600">
                  Connect directly with space owners, book your spot, and enjoy hassle-free parking.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 parknest-gradient">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h3 className="text-3xl font-bold mb-4">Ready to Get Started?</h3>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of users who have found their perfect parking solution
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/auth">
              <Button size="lg" variant="secondary" className="text-parknest-blue font-semibold hover-scale">
                Sign Up Now
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-6 h-6 parknest-gradient rounded flex items-center justify-center">
              <Car className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold">ParkNest</span>
          </div>
          <p className="text-gray-400">© 2024 ParkNest. Connecting parking spaces with those who need them.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
