import { Trip, EmergencyAlert } from '../types';

let tripsData: Trip[] = [
  {
    id: '1',
    creatorId: '2',
    creatorName: 'Sarah Johnson',
    title: 'Beach Adventure in Bali',
    description: 'Join me for an amazing week exploring Bali beaches, temples, and local culture. Perfect for solo travelers looking to make new friends!',
    destination: 'Bali, Indonesia',
    startDate: '2024-12-15',
    endDate: '2024-12-22',
    maxTravelers: 4,
    currentTravelers: 2,
    pricePerPerson: 850,
    status: 'open',
    createdAt: '2024-11-10T10:30:00Z',
  },
  {
    id: '2',
    creatorId: '3',
    creatorName: 'Mike Chen',
    title: 'Mountain Hiking in Nepal',
    description: 'Trek through the Himalayas with experienced hikers. Moderate difficulty level. All equipment provided.',
    destination: 'Kathmandu, Nepal',
    startDate: '2024-12-20',
    endDate: '2024-12-28',
    maxTravelers: 6,
    currentTravelers: 4,
    pricePerPerson: 1200,
    status: 'open',
    createdAt: '2024-11-12T14:20:00Z',
  },
  {
    id: '3',
    creatorId: '4',
    creatorName: 'Emma Rodriguez',
    title: 'European City Tour',
    description: 'Visit Paris, Amsterdam, and Berlin in 10 days. Budget-friendly hostels, lots of museums and nightlife!',
    destination: 'Paris, France',
    startDate: '2024-12-18',
    endDate: '2024-12-28',
    maxTravelers: 5,
    currentTravelers: 3,
    pricePerPerson: 950,
    status: 'open',
    createdAt: '2024-11-08T09:15:00Z',
  },
  {
    id: '4',
    creatorId: '5',
    creatorName: 'Alex Turner',
    title: 'Safari Experience in Kenya',
    description: 'Incredible wildlife safari with professional guides. See lions, elephants, and more in their natural habitat.',
    destination: 'Nairobi, Kenya',
    startDate: '2025-01-05',
    endDate: '2025-01-12',
    maxTravelers: 4,
    currentTravelers: 1,
    pricePerPerson: 1500,
    status: 'open',
    createdAt: '2024-11-15T16:45:00Z',
  },
  {
    id: '5',
    creatorId: '6',
    creatorName: 'Lisa Park',
    title: 'Tokyo Food & Culture Tour',
    description: 'Explore Tokyo authentic food scene, visit temples, and experience traditional tea ceremony.',
    destination: 'Tokyo, Japan',
    startDate: '2024-12-25',
    endDate: '2025-01-02',
    maxTravelers: 3,
    currentTravelers: 3,
    pricePerPerson: 1100,
    status: 'full',
    createdAt: '2024-11-05T11:20:00Z',
  },
];

export function getTrips(): Trip[] {
  return tripsData;
}

export function addTrip(trip: Trip): void {
  tripsData.push(trip);
}

export function setTrips(newTrips: Trip[]): void {
  tripsData = newTrips;
}

export const mockTrips = tripsData;

export const mockEmergencyAlerts: EmergencyAlert[] = [
  {
    id: '1',
    userId: '7',
    userName: 'John Doe',
    tripId: '1',
    location: 'Ubud, Bali',
    message: 'Minor accident, need medical assistance',
    latitude: -8.5069,
    longitude: 115.2625,
    status: 'resolved',
    createdAt: '2024-11-18T08:30:00Z',
  },
];
