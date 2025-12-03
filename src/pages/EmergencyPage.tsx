import { useState } from 'react';
import { AlertTriangle, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { EmergencyAlert } from '../types';
import { mockEmergencyAlerts } from '../data/mockData';
import PageHeader from '../components/PageHeader';

interface EmergencyPageProps {
  onBack: () => void;
  onHome?: () => void;
  tripId?: string;
}

export default function EmergencyPage({ onBack, onHome, tripId }: EmergencyPageProps) {
  const { user } = useAuth();
  const [location, setLocation] = useState('');
  const [message, setMessage] = useState('');
  const [alertSent, setAlertSent] = useState(false);
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [alerts] = useState<EmergencyAlert[]>(mockEmergencyAlerts);

  const emergencyContacts = [
    { name: 'Police', number: '911', icon: '🚓' },
    { name: 'Ambulance', number: '911', icon: '🚑' },
    { name: 'Fire Department', number: '911', icon: '🚒' },
    { name: 'Embassy', number: '+1-234-567-8900', icon: '🏛️' },
  ];

  const getCurrentLocation = () => {
    setIsGettingLocation(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation(`${position.coords.latitude}, ${position.coords.longitude}`);
          setIsGettingLocation(false);
        },
        () => {
          setLocation('Location unavailable');
          setIsGettingLocation(false);
        }
      );
    } else {
      setLocation('Geolocation not supported');
      setIsGettingLocation(false);
    }
  };

  const handleSendAlert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!location || !message) return;

    setAlertSent(true);
    setTimeout(() => {
      setAlertSent(false);
      setLocation('');
      setMessage('');
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white">
      <PageHeader
        title="Emergency SOS"
        subtitle="Get immediate help when you need it"
        onBack={onBack}
        onHome={onHome}
        showBackButton={true}
        showHomeButton={true}
      />

      <main className="max-w-5xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">

          <div className="bg-red-50 border-l-4 border-red-600 p-4 mb-6">
            <p className="text-red-800 font-medium">
              In life-threatening emergencies, call local emergency services immediately!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {emergencyContacts.map((contact) => (
              <a
                key={contact.name}
                href={`tel:${contact.number}`}
                className="flex items-center gap-4 p-4 border-2 border-gray-200 rounded-lg hover:border-red-500 hover:shadow-md transition cursor-pointer"
              >
                <div className="text-4xl">{contact.icon}</div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">{contact.name}</p>
                  <p className="text-sm text-gray-600">{contact.number}</p>
                </div>
                <Phone className="w-5 h-5 text-red-600" />
              </a>
            ))}
          </div>

          <div className="border-t pt-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Send Alert to Trip Members</h2>
            {alertSent ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-green-900 mb-2">Alert Sent Successfully!</h3>
                <p className="text-green-700">Your trip members have been notified of your situation.</p>
              </div>
            ) : (
              <form onSubmit={handleSendAlert} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Location
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="Enter your location or use GPS"
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      required
                    />
                    <button
                      type="button"
                      onClick={getCurrentLocation}
                      disabled={isGettingLocation}
                      className="px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition flex items-center gap-2"
                    >
                      <MapPin className="w-5 h-5" />
                      {isGettingLocation ? 'Getting...' : 'GPS'}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Emergency Details
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe the emergency situation..."
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-red-600 text-white py-4 rounded-lg font-semibold hover:bg-red-700 transition flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                >
                  <Send className="w-5 h-5" />
                  Send Emergency Alert
                </button>
              </form>
            )}
          </div>
        </div>

        {alerts.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Alerts</h2>
            <div className="space-y-3">
              {alerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`border-l-4 p-4 rounded-lg ${
                    alert.status === 'active'
                      ? 'bg-red-50 border-red-500'
                      : 'bg-green-50 border-green-500'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-semibold text-gray-900">{alert.userName}</p>
                      <p className="text-sm text-gray-600 mt-1">{alert.message}</p>
                      <div className="flex items-center gap-2 text-sm text-gray-500 mt-2">
                        <MapPin className="w-4 h-4" />
                        {alert.location}
                      </div>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        alert.status === 'active'
                          ? 'bg-red-100 text-red-700'
                          : 'bg-green-100 text-green-700'
                      }`}
                    >
                      {alert.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
