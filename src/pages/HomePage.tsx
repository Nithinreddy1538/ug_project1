import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { LogOut, Search, MapPin, Users, Calendar, DollarSign, Plus, Home } from 'lucide-react';
import { getTrips } from '../data/mockData';
import { Trip } from '../types';

interface HomePageProps {
  onSelectTrip: (trip: Trip) => void;
  onCreateTrip: () => void;
  onLanding?: () => void;
}

export default function HomePage({ onSelectTrip, onCreateTrip, onLanding }: HomePageProps) {
  const { user, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [trips, setTrips] = useState<Trip[]>([]);

  useEffect(() => {
    setTrips(getTrips());
  }, []);

  const filteredTrips = trips.filter(trip =>
    trip.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    trip.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
    trip.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <header className="bg-white shadow-sm border-b sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">TravelBuddy</h1>
            </div>

            <div className="flex items-center gap-6">
              <nav className="hidden md:flex items-center gap-6">
                <button
                  onClick={onLanding}
                  className="text-gray-700 hover:text-gray-900 font-medium transition flex items-center gap-1"
                >
                  <Home className="w-4 h-4" />
                  Home
                </button>
                <button className="text-gray-700 hover:text-gray-900 font-medium transition">
                  Notifications
                </button>
                <button className="text-gray-700 hover:text-gray-900 font-medium transition">
                  Profile
                </button>
              </nav>

              <div className="flex items-center gap-3">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-medium text-gray-900">{user?.fullName}</p>
                  <p className="text-xs text-gray-500">{user?.email}</p>
                </div>
                <button
                  onClick={logout}
                  className="px-4 py-2 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition flex items-center gap-2"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search destinations, trips, activities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button
              onClick={onCreateTrip}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition flex items-center gap-2 shadow-md hover:shadow-lg"
            >
              <Plus className="w-5 h-5" />
              Create Trip
            </button>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Available Trips</h2>
          <p className="text-gray-600">Find your next adventure and travel companions</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTrips.map((trip) => (
            <div
              key={trip.id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer transform hover:-translate-y-1"
              onClick={() => onSelectTrip(trip)}
            >
              <div className="h-48 bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center relative">
                <MapPin className="w-16 h-16 text-white opacity-80" />
                {trip.status === 'full' && (
                  <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Full
                  </div>
                )}
                {trip.status === 'open' && trip.currentTravelers === trip.maxTravelers - 1 && (
                  <div className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Last Spot
                  </div>
                )}
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{trip.title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{trip.description}</p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-700">
                    <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                    {trip.destination}
                  </div>
                  <div className="flex items-center text-sm text-gray-700">
                    <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                    {formatDate(trip.startDate)} - {formatDate(trip.endDate)}
                  </div>
                  <div className="flex items-center text-sm text-gray-700">
                    <Users className="w-4 h-4 mr-2 text-gray-400" />
                    {trip.currentTravelers} / {trip.maxTravelers} travelers
                  </div>
                  <div className="flex items-center text-sm font-semibold text-gray-900">
                    <DollarSign className="w-4 h-4 mr-2 text-green-600" />
                    ${trip.pricePerPerson} per person
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold text-sm">
                      {trip.creatorName.charAt(0)}
                    </div>
                    <span className="ml-2 text-sm text-gray-600">{trip.creatorName}</span>
                  </div>
                  <button
                    className="text-blue-600 hover:text-blue-700 font-semibold text-sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectTrip(trip);
                    }}
                  >
                    View Details →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredTrips.length === 0 && (
          <div className="text-center py-16">
            <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No trips found</h3>
            <p className="text-gray-600">Try adjusting your search or create a new trip</p>
          </div>
        )}
      </main>
    </div>
  );
}
