
import { Delivery } from '@/types';

// Mock data for deliveries
const MOCK_DELIVERIES: Delivery[] = [
  {
    id: '1',
    riderId: '101',
    riderEmail: 'rider1@example.com',
    recipientName: 'John Smith',
    deliveryAddress: '123 Main St, New York, NY',
    date: '2023-10-15T14:30:00',
    status: 'delivered'
  },
  {
    id: '2',
    riderId: '102',
    riderEmail: 'rider2@example.com',
    recipientName: 'Sarah Johnson',
    deliveryAddress: '456 Park Ave, Boston, MA',
    date: '2023-10-16T09:15:00',
    status: 'delivered'
  },
  {
    id: '3',
    riderId: '101',
    riderEmail: 'rider1@example.com',
    recipientName: 'Michael Brown',
    deliveryAddress: '789 Oak St, Chicago, IL',
    date: '2023-10-16T11:45:00',
    status: 'pending'
  },
  {
    id: '4',
    riderId: '103',
    riderEmail: 'rider3@example.com',
    recipientName: 'Emily Wilson',
    deliveryAddress: '321 Pine St, Seattle, WA',
    date: '2023-10-17T13:20:00',
    status: 'delivered'
  },
  {
    id: '5',
    riderId: '102',
    riderEmail: 'rider2@example.com',
    recipientName: 'David Martinez',
    deliveryAddress: '654 Elm St, Los Angeles, CA',
    date: '2023-10-17T16:00:00',
    status: 'cancelled'
  },
  {
    id: '6',
    riderId: '104',
    riderEmail: 'rider4@example.com',
    recipientName: 'Jennifer Lopez',
    deliveryAddress: '987 Maple Ave, Miami, FL',
    date: '2023-10-18T10:30:00',
    status: 'pending'
  },
  {
    id: '7',
    riderId: '103',
    riderEmail: 'rider3@example.com',
    recipientName: 'Robert Taylor',
    deliveryAddress: '135 Cedar St, Denver, CO',
    date: '2023-10-18T14:45:00',
    status: 'delivered'
  },
];

export const getDeliveries = async (): Promise<Delivery[]> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 800));
  return [...MOCK_DELIVERIES];
};

export const getDeliveryById = async (id: string): Promise<Delivery | undefined> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return MOCK_DELIVERIES.find(delivery => delivery.id === id);
};
