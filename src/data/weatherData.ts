export interface WeatherInfo {
  destination: string;
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  alert?: {
    type: 'heat' | 'cold' | 'rain' | 'wind' | 'safe';
    message: string;
  };
}

export const weatherByDestination: Record<string, WeatherInfo> = {
  'Bali, Indonesia': {
    destination: 'Bali, Indonesia',
    temperature: 36,
    condition: 'Clouds',
    humidity: 20,
    windSpeed: 10,
    alert: {
      type: 'heat',
      message: 'High temperature alert. Stay hydrated and take regular breaks.',
    },
  },
  'Kathmandu, Nepal': {
    destination: 'Kathmandu, Nepal',
    temperature: 18,
    condition: 'Clear Sky',
    humidity: 45,
    windSpeed: 8,
    alert: {
      type: 'safe',
      message: 'Perfect weather for hiking! Conditions are ideal.',
    },
  },
  'Paris, France': {
    destination: 'Paris, France',
    temperature: 12,
    condition: 'Partly Cloudy',
    humidity: 65,
    windSpeed: 12,
    alert: {
      type: 'safe',
      message: 'Comfortable conditions. Light jacket recommended.',
    },
  },
  'Nairobi, Kenya': {
    destination: 'Nairobi, Kenya',
    temperature: 28,
    condition: 'Sunny',
    humidity: 35,
    windSpeed: 15,
    alert: {
      type: 'heat',
      message: 'Moderate temperature. Use sunscreen and stay hydrated.',
    },
  },
  'Tokyo, Japan': {
    destination: 'Tokyo, Japan',
    temperature: 14,
    condition: 'Rainy',
    humidity: 70,
    windSpeed: 18,
    alert: {
      type: 'rain',
      message: 'Rainy conditions expected. Carry an umbrella and waterproof gear.',
    },
  },
};

export function getWeatherForDestination(destination: string): WeatherInfo {
  return (
    weatherByDestination[destination] || {
      destination,
      temperature: 22,
      condition: 'Unknown',
      humidity: 50,
      windSpeed: 10,
      alert: {
        type: 'safe',
        message: 'Weather information unavailable. Check local sources.',
      },
    }
  );
}
