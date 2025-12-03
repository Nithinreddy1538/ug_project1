import { MapPin, MessageCircle, Shield, Users, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface LandingPageProps {
  onViewTrips: () => void;
  onCreateTrip: () => void;
}

export default function LandingPage({ onViewTrips, onCreateTrip }: LandingPageProps) {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">TravelBuddy</h1>
            </div>

            <nav className="hidden md:flex items-center gap-8">
              <button
                onClick={onViewTrips}
                className="text-gray-700 hover:text-gray-900 font-medium transition"
              >
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
        <section className="max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl font-bold text-gray-900 mb-4">
            Travel Together
          </h2>
          <h3 className="text-5xl font-bold text-orange-500 mb-6">
            Find Your Riding Buddy
          </h3>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-12">
            Connect with fellow travelers, plan trips together, and create
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
              onClick={onViewTrips}
              className="px-8 py-3 text-orange-500 border-2 border-orange-500 rounded-lg font-semibold hover:bg-orange-50 transition"
            >
              Browse Trips
            </button>
          </div>
        </section>

        <section className="bg-white py-16 border-t">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-orange-500" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Find Travel Buddies</h3>
                <p className="text-gray-600">Connect with like-minded travelers from around the world</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="w-8 h-8 text-orange-500" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Chat & Communicate</h3>
                <p className="text-gray-600">Chat with your travel group and get AI assistance anytime</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-orange-500" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Safe & Secure</h3>
                <p className="text-gray-600">Emergency SOS features and verified travel profiles</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">How It Works</h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { number: '1', title: 'Create Trip', desc: 'Post your travel plans' },
                { number: '2', title: 'Find Buddies', desc: 'Browse and connect' },
                { number: '3', title: 'Chat & Plan', desc: 'Communicate with AI' },
                { number: '4', title: 'Travel', desc: 'Have amazing memories' },
              ].map((step) => (
                <div key={step.number} className="text-center">
                  <div className="w-16 h-16 bg-orange-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                    {step.number}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-100 border-t py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-600">
          <p>&copy; 2024 TravelBuddy. Connect. Plan. Travel. Together.</p>
        </div>
      </footer>
    </div>
  );
}
