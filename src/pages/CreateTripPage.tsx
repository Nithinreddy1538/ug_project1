import { useState } from 'react';
import { Plus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { addTrip } from '../data/mockData';
import { Trip } from '../types';
import PageHeader from '../components/PageHeader';
import NotificationCenter, { NotificationProps } from '../components/Notification';

interface CreateTripPageProps {
  onBack: () => void;
  onHome?: () => void;
  onCreateSuccess: () => void;
}

export default function CreateTripPage({ onBack, onHome, onCreateSuccess }: CreateTripPageProps) {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<NotificationProps[]>([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    destination: '',
    startDate: '',
    endDate: '',
    maxTravelers: 4,
    pricePerPerson: 0,
  });

  const addNotification = (notification: Omit<NotificationProps, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    setNotifications(prev => [...prev, { ...notification, id }]);
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      addNotification({
        type: 'error',
        title: 'Authentication Required',
        message: 'Please sign up or log in to create a trip.',
        duration: 4000,
      });
      return;
    }

    const newTrip: Trip = {
      id: Date.now().toString(),
      creatorId: user.id,
      creatorName: user.fullName,
      title: formData.title,
      description: formData.description,
      destination: formData.destination,
      startDate: formData.startDate,
      endDate: formData.endDate,
      maxTravelers: formData.maxTravelers,
      currentTravelers: 1,
      pricePerPerson: formData.pricePerPerson,
      status: 'open',
      createdAt: new Date().toISOString(),
    };

    addTrip(newTrip);
    addNotification({
      type: 'success',
      title: 'Trip Created Successfully!',
      message: `"${formData.title}" has been posted. Fellow travelers can now join your adventure!`,
      duration: 4000,
    });

    setTimeout(() => {
      onCreateSuccess();
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'maxTravelers' || name === 'pricePerPerson' ? Number(value) : value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <PageHeader
        title="Create New Trip"
        subtitle="Share your adventure with fellow travelers"
        onBack={onBack}
        onHome={onHome}
        showBackButton={true}
        showHomeButton={true}
      />

      <main className="max-w-3xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg p-8">

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Trip Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g., Beach Adventure in Bali"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label htmlFor="destination" className="block text-sm font-medium text-gray-700 mb-2">
                Destination
              </label>
              <input
                type="text"
                id="destination"
                name="destination"
                value={formData.destination}
                onChange={handleChange}
                placeholder="e.g., Bali, Indonesia"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe your trip, activities, and what travelers can expect..."
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-2">
                  Start Date
                </label>
                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-2">
                  End Date
                </label>
                <input
                  type="date"
                  id="endDate"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="maxTravelers" className="block text-sm font-medium text-gray-700 mb-2">
                  Max Travelers
                </label>
                <select
                  id="maxTravelers"
                  name="maxTravelers"
                  value={formData.maxTravelers}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  {[2, 3, 4, 5, 6, 7, 8].map(num => (
                    <option key={num} value={num}>{num} travelers</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="pricePerPerson" className="block text-sm font-medium text-gray-700 mb-2">
                  Price per Person ($)
                </label>
                <input
                  type="number"
                  id="pricePerPerson"
                  name="pricePerPerson"
                  value={formData.pricePerPerson}
                  onChange={handleChange}
                  min="0"
                  step="50"
                  placeholder="0"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onBack}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition shadow-md hover:shadow-lg"
              >
                Create Trip
              </button>
            </div>
          </form>
        </div>
      </main>

      <NotificationCenter
        notifications={notifications}
        onClose={removeNotification}
      />
    </div>
  );
}
