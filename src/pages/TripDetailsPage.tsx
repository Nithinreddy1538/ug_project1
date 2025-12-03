import { useState } from 'react';
import { MapPin, Calendar, Users, DollarSign, MessageCircle, CreditCard, Bus, AlertCircle, Cloud } from 'lucide-react';
import { Trip, TransportOption } from '../types';
import { useAuth } from '../context/AuthContext';
import ChatBox from '../components/ChatBox';
import PageHeader from '../components/PageHeader';
import WeatherAlert from '../components/WeatherAlert';
import { getWeatherForDestination } from '../data/weatherData';

interface TripDetailsPageProps {
  trip: Trip;
  onBack: () => void;
  onHome: () => void;
  onEmergency: () => void;
}

export default function TripDetailsPage({ trip, onBack, onHome, onEmergency }: TripDetailsPageProps) {
  const { user } = useAuth();
  const [showChat, setShowChat] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [showTransport, setShowTransport] = useState(false);
  const [showWeather, setShowWeather] = useState(false);
  const [hasJoined, setHasJoined] = useState(false);
  const weather = getWeatherForDestination(trip.destination);

  const transportOptions: TransportOption[] = [
    {
      id: '1',
      tripId: trip.id,
      type: 'flight',
      provider: 'Air Asia',
      departureTime: '2024-12-15T08:00:00Z',
      arrivalTime: '2024-12-15T14:30:00Z',
      price: 350,
      seatsAvailable: 12,
    },
    {
      id: '2',
      tripId: trip.id,
      type: 'bus',
      provider: 'Comfort Deluxe',
      departureTime: '2024-12-15T06:00:00Z',
      arrivalTime: '2024-12-15T20:00:00Z',
      price: 85,
      seatsAvailable: 8,
    },
  ];

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handleJoinTrip = () => {
    setShowPayment(true);
  };

  const handlePayment = (paymentMethod: string) => {
    setHasJoined(true);
    setShowPayment(false);
    alert(`Payment successful! Welcome to the trip!`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader
        title={trip.title}
        subtitle={trip.destination}
        onBack={onBack}
        onHome={onHome}
        showBackButton={true}
        showHomeButton={true}
      />

      <main className="max-w-5xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
          <div className="h-64 bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center relative">
            <MapPin className="w-24 h-24 text-white opacity-80" />
            {trip.status === 'full' && (
              <div className="absolute top-6 right-6 bg-red-500 text-white px-4 py-2 rounded-full font-semibold">
                Trip Full
              </div>
            )}
          </div>

          <div className="p-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{trip.title}</h1>
                <div className="flex items-center text-gray-600">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold mr-3">
                    {trip.creatorName.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Organized by {trip.creatorName}</p>
                    <p className="text-sm text-gray-500">Experienced traveler</p>
                  </div>
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowWeather(true)}
                  className="px-4 py-2 bg-cyan-600 text-white rounded-lg font-semibold hover:bg-cyan-700 transition flex items-center gap-2"
                >
                  <Cloud className="w-5 h-5" />
                  Weather
                </button>
                <button
                  onClick={onEmergency}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition flex items-center gap-2"
                >
                  <AlertCircle className="w-5 h-5" />
                  SOS
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-4">
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 text-gray-400 mt-1 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Destination</p>
                    <p className="text-lg text-gray-900">{trip.destination}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Calendar className="w-5 h-5 text-gray-400 mt-1 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Trip Duration</p>
                    <p className="text-lg text-gray-900">
                      {formatDate(trip.startDate)} - {formatDate(trip.endDate)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start">
                  <Users className="w-5 h-5 text-gray-400 mt-1 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Travelers</p>
                    <p className="text-lg text-gray-900">
                      {trip.currentTravelers} / {trip.maxTravelers} joined
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <DollarSign className="w-5 h-5 text-green-600 mt-1 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Price per Person</p>
                    <p className="text-2xl font-bold text-gray-900">${trip.pricePerPerson}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">About This Trip</h3>
              <p className="text-gray-700 leading-relaxed">{trip.description}</p>
            </div>

            <div className="flex gap-3">
              {!hasJoined && trip.status !== 'full' && (
                <button
                  onClick={handleJoinTrip}
                  className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2"
                >
                  <CreditCard className="w-5 h-5" />
                  Join Trip & Pay
                </button>
              )}
              {hasJoined && (
                <>
                  <button
                    onClick={() => setShowChat(true)}
                    className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-5 h-5" />
                    Open Chat
                  </button>
                  <button
                    onClick={() => setShowTransport(true)}
                    className="flex-1 bg-cyan-600 text-white py-3 rounded-lg font-semibold hover:bg-cyan-700 transition flex items-center justify-center gap-2"
                  >
                    <Bus className="w-5 h-5" />
                    View Transport
                  </button>
                </>
              )}
            </div>

            {trip.status === 'full' && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700 font-medium">This trip is currently full. Check back later for cancellations.</p>
              </div>
            )}
          </div>
        </div>
      </main>

      {showChat && (
        <ChatBox
          tripId={trip.id}
          tripTitle={trip.title}
          onClose={() => setShowChat(false)}
        />
      )}

      {showPayment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Complete Payment</h3>
            <div className="mb-6">
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Trip Cost</span>
                  <span className="font-semibold text-gray-900">${trip.pricePerPerson}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Service Fee</span>
                  <span className="font-semibold text-gray-900">$25</span>
                </div>
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-gray-900">Total</span>
                    <span className="text-2xl font-bold text-blue-600">${trip.pricePerPerson + 25}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Card Number"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="MM/YY"
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    type="text"
                    placeholder="CVV"
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowPayment(false)}
                className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={() => handlePayment('credit_card')}
                className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Pay Now
              </button>
            </div>
          </div>
        </div>
      )}

      {showTransport && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Transport Options</h3>
              <button
                onClick={() => setShowTransport(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              {transportOptions.map((option) => (
                <div
                  key={option.id}
                  className="border border-gray-200 rounded-lg p-4 hover:border-blue-500 transition cursor-pointer"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Bus className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 capitalize">{option.type}</p>
                        <p className="text-sm text-gray-600">{option.provider}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(option.departureTime).toLocaleString()} → {new Date(option.arrivalTime).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-gray-900">${option.price}</p>
                      <p className="text-xs text-gray-500">{option.seatsAvailable} seats left</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {showWeather && (
        <WeatherAlert
          weather={weather}
          onClose={() => setShowWeather(false)}
        />
      )}
    </div>
  );
}
