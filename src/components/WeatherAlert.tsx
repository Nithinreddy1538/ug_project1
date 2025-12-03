import { X, AlertTriangle, Cloud, Droplets, Wind, CheckCircle } from 'lucide-react';
import { WeatherInfo } from '../data/weatherData';

interface WeatherAlertProps {
  weather: WeatherInfo;
  onClose: () => void;
}

export default function WeatherAlert({ weather, onClose }: WeatherAlertProps) {
  const alertColors = {
    heat: 'bg-red-50 border-red-200',
    cold: 'bg-blue-50 border-blue-200',
    rain: 'bg-cyan-50 border-cyan-200',
    wind: 'bg-orange-50 border-orange-200',
    safe: 'bg-green-50 border-green-200',
  };

  const alertTextColors = {
    heat: 'text-red-800 bg-red-100',
    cold: 'text-blue-800 bg-blue-100',
    rain: 'text-cyan-800 bg-cyan-100',
    wind: 'text-orange-800 bg-orange-100',
    safe: 'text-green-800 bg-green-100',
  };

  const headerBg = {
    heat: 'bg-red-700',
    cold: 'bg-blue-700',
    rain: 'bg-cyan-700',
    wind: 'bg-orange-700',
    safe: 'bg-green-700',
  };

  const getAlertIcon = () => {
    switch (weather.alert?.type) {
      case 'heat':
        return <AlertTriangle className="w-6 h-6" />;
      case 'rain':
        return <Droplets className="w-6 h-6" />;
      case 'wind':
        return <Wind className="w-6 h-6" />;
      case 'safe':
        return <CheckCircle className="w-6 h-6" />;
      default:
        return <Cloud className="w-6 h-6" />;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-40">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-md overflow-hidden">
        <div className={`${headerBg[weather.alert?.type || 'safe']} text-white p-4 flex items-center justify-between`}>
          <div className="flex items-center gap-2">
            {getAlertIcon()}
            <h3 className="text-lg font-bold">Weather & Route Alerts</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-white hover:bg-opacity-20 rounded-lg transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Weather Information</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Temperature</p>
                <p className="text-2xl font-bold text-gray-900">{weather.temperature}°C</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Condition</p>
                <p className="text-base font-semibold text-gray-900">{weather.condition}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Wind Speed</p>
                <p className="text-2xl font-bold text-gray-900">{weather.windSpeed} km/h</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Humidity</p>
                <p className="text-2xl font-bold text-gray-900">{weather.humidity}%</p>
              </div>
            </div>
          </div>

          {weather.alert && (
            <div className={`p-4 rounded-lg border-2 ${alertColors[weather.alert.type]}`}>
              <p className={`font-semibold mb-2 flex items-center gap-2 ${alertTextColors[weather.alert.type]}`}>
                <span className="font-bold">{weather.alert.type === 'heat' ? '🌡️' : weather.alert.type === 'rain' ? '🌧️' : weather.alert.type === 'wind' ? '💨' : '✓'}</span>
                {weather.alert.type === 'heat' ? 'Heat Alert' : weather.alert.type === 'rain' ? 'Rain Alert' : weather.alert.type === 'wind' ? 'Wind Alert' : 'Safe Conditions'}
              </p>
              <p className={`text-sm ${weather.alert.type === 'heat' ? 'text-red-700' : weather.alert.type === 'rain' ? 'text-cyan-700' : weather.alert.type === 'wind' ? 'text-orange-700' : 'text-green-700'}`}>
                {weather.alert.message}
              </p>
            </div>
          )}

          <button
            onClick={onClose}
            className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Got It!
          </button>
        </div>
      </div>
    </div>
  );
}
