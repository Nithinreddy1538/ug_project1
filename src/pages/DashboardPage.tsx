import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { LogOut, MapPin, Users, Calendar, DollarSign, MessageCircle, Cloud, AlertCircle, ChevronRight } from 'lucide-react';
import { getTrips } from '../data/mockData';
import { Trip } from '../types';
import ChatBox from '../components/ChatBox';
import WeatherAlert from '../components/WeatherAlert';
import { getWeatherForDestination } from '../data/weatherData';

interface DashboardPageProps {
  onSelectTrip: (trip: Trip) => void;
  onCreateTrip: () => void;
  onLogout: () => void;
}

export default function DashboardPage({ onSelectTrip, onCreateTrip, onLogout }: DashboardPageProps) {
  const { user, logout } = useAuth();
  const [trips, setTrips] = useState<Trip[]>([]);
  const [showChat, setShowChat] = useState(false);
  const [selectedChatTrip, setSelectedChatTrip] = useState<Trip | null>(null);
  const [showWeather, setShowWeather] = useState(false);
  const [selectedWeatherTrip, setSelectedWeatherTrip] = useState<Trip | null>(null);

  useEffect(() => {
    setTrips(getTrips());
  }, []);

  const handleLogout = () => {
    logout();
    onLogout();
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const openChat = (trip: Trip) => {
    setSelectedChatTrip(trip);
    setShowChat(true);
  };

  const openWeather = (trip: Trip) => {
    setSelectedWeatherTrip(trip);
    setShowWeather(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold text-green-600">TravelBuddy</span>
            </div>

            <nav className="hidden md:flex items-center gap-8">
              <button className="text-gray-700 hover:text-gray-900 font-medium transition">
                Trips
              </button>
              <button
                onClick={onCreateTrip}
                className="text-gray-700 hover:text-gray-900 font-medium transition"
              >
                Create Trip
              </button>
              <button className="text-gray-700 hover:text-gray-900 font-medium transition">
                Notifications
              </button>
              <button className="text-gray-700 hover:text-gray-900 font-medium transition">
                Profile
              </button>
              <button className="text-gray-700 hover:text-gray-900 font-medium transition">
                Achievements
              </button>
            </nav>

            <button
              onClick={handleLogout}
              className="px-6 py-2 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </header>

      <main>
        <section className="bg-white py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-6xl font-bold text-gray-900 mb-4">
              Travel Together
            </h1>
            <h2 className="text-5xl font-bold text-orange-500 mb-6">
              Find Your Riding Buddy
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-12">
              Connect with fellow motorcycle enthusiasts, plan trips together, and create
              unforgettable memories on the road.
            </p>

            <div className="flex justify-center gap-6">
              <button
                onClick={onCreateTrip}
                className="px-8 py-3 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition shadow-md hover:shadow-lg"
              >
                Create Trip
              </button>
              <button
                onClick={() => document.getElementById('trips-section')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-3 text-orange-500 border-2 border-orange-500 rounded-lg font-semibold hover:bg-orange-50 transition"
              >
                Browse Trips
              </button>
            </div>
          </div>
        </section>

        <section id="trips-section" className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-3xl font-bold text-gray-900 mb-2">Available Trips</h3>
            <p className="text-gray-600 mb-12">Join exciting adventures with fellow travelers</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {trips.map((trip) => (
                <div
                  key={trip.id}
                  className="bg-white rounded-xl shadow-lg hover:shadow-xl transition overflow-hidden group cursor-pointer"
                  onClick={() => onSelectTrip(trip)}
                >
                  <div className="h-48 bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center relative group-hover:from-orange-500 group-hover:to-orange-700 transition">
                    <MapPin className="w-16 h-16 text-white opacity-80" />
                    {trip.status === 'full' && (
                      <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                        Full
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <h4 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition">
                      {trip.title}
                    </h4>

                    <div className="space-y-3 mb-4">
                      <div className="flex items-center text-gray-600">
                        <MapPin className="w-4 h-4 mr-2 text-orange-500" />
                        <span className="text-sm">{trip.destination}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Calendar className="w-4 h-4 mr-2 text-orange-500" />
                        <span className="text-sm">{formatDate(trip.startDate)} - {formatDate(trip.endDate)}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-gray-600">
                          <Users className="w-4 h-4 mr-2 text-orange-500" />
                          <span className="text-sm">{trip.currentTravelers}/{trip.maxTravelers} travelers</span>
                        </div>
                        <div className="flex items-center text-orange-600 font-semibold">
                          <DollarSign className="w-4 h-4" />
                          {trip.pricePerPerson}
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {trip.description}
                    </p>

                    <div className="flex gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openWeather(trip);
                        }}
                        className="flex-1 px-3 py-2 bg-cyan-100 text-cyan-700 rounded-lg hover:bg-cyan-200 transition font-medium text-sm flex items-center justify-center gap-1"
                      >
                        <Cloud className="w-4 h-4" />
                        Weather
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openChat(trip);
                        }}
                        className="flex-1 px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition font-medium text-sm flex items-center justify-center gap-1"
                      >
                        <MessageCircle className="w-4 h-4" />
                        Chat
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectTrip(trip);
                        }}
                        className="flex-1 px-3 py-2 bg-orange-100 text-orange-700 rounded-lg hover:bg-orange-200 transition font-medium text-sm flex items-center justify-center gap-1"
                      >
                        <ChevronRight className="w-4 h-4" />
                        Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {trips.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg mb-4">No trips available yet.</p>
                <button
                  onClick={onCreateTrip}
                  className="px-6 py-3 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition"
                >
                  Create the First Trip
                </button>
              </div>
            )}
          </div>
        </section>
      </main>

      {showChat && selectedChatTrip && (
        <ChatBox
          tripId={selectedChatTrip.id}
          tripTitle={selectedChatTrip.title}
          onClose={() => {
            setShowChat(false);
            setSelectedChatTrip(null);
          }}
        />
      )}

      {showWeather && selectedWeatherTrip && (
        <WeatherAlert
          weather={getWeatherForDestination(selectedWeatherTrip.destination)}
          onClose={() => {
            setShowWeather(false);
            setSelectedWeatherTrip(null);
          }}
        />
      )}
    </div>
  );
}
