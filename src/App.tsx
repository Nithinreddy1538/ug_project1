import { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/DashboardPage';
import HomePage from './pages/HomePage';
import TripDetailsPage from './pages/TripDetailsPage';
import EmergencyPage from './pages/EmergencyPage';
import CreateTripPage from './pages/CreateTripPage';
import { Trip } from './types';

type View = 'landing' | 'dashboard' | 'home' | 'tripDetails' | 'emergency' | 'createTrip';

function AppContent() {
  const { user, loading } = useAuth();
  const [showSignup, setShowSignup] = useState(false);
  const [currentView, setCurrentView] = useState<View>(user ? 'dashboard' : 'landing');
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    if (currentView === 'landing') {
      return (
        <LandingPage
          onViewTrips={() => setCurrentView('home')}
          onCreateTrip={() => setCurrentView('createTrip')}
        />
      );
    }
    return showSignup ? (
      <SignupPage onSwitchToLogin={() => setShowSignup(false)} />
    ) : (
      <LoginPage onSwitchToSignup={() => setShowSignup(true)} />
    );
  }

  const handleSelectTrip = (trip: Trip) => {
    setSelectedTrip(trip);
    setCurrentView('tripDetails');
  };

  const handleBack = () => {
    setCurrentView('dashboard');
    setSelectedTrip(null);
  };

  const handleLanding = () => {
    setCurrentView('landing');
  };

  if (currentView === 'landing') {
    return (
      <LandingPage
        onViewTrips={() => {
          if (user) {
            setCurrentView('dashboard');
          } else {
            setShowSignup(false);
          }
        }}
        onCreateTrip={() => {
          if (user) {
            setCurrentView('createTrip');
          } else {
            setShowSignup(false);
          }
        }}
      />
    );
  }

  if (currentView === 'dashboard') {
    return (
      <DashboardPage
        onSelectTrip={handleSelectTrip}
        onCreateTrip={() => {
          if (user) {
            setCurrentView('createTrip');
          } else {
            setShowSignup(false);
          }
        }}
        onLogout={handleLanding}
      />
    );
  }

  if (currentView === 'emergency') {
    return (
      <EmergencyPage
        onBack={handleBack}
        onHome={handleBack}
        tripId={selectedTrip?.id}
      />
    );
  }

  if (currentView === 'createTrip') {
    return (
      <CreateTripPage
        onBack={handleBack}
        onHome={handleBack}
        onCreateSuccess={handleBack}
      />
    );
  }

  if (currentView === 'tripDetails' && selectedTrip) {
    return (
      <TripDetailsPage
        trip={selectedTrip}
        onBack={handleBack}
        onHome={handleBack}
        onEmergency={() => setCurrentView('emergency')}
      />
    );
  }

  return (
    <HomePage
      onSelectTrip={handleSelectTrip}
      onCreateTrip={() => setCurrentView('createTrip')}
      onLanding={() => setCurrentView('landing')}
    />
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
