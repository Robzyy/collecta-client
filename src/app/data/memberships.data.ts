import { Membership } from '../interfaces/membership.interface';

export const MEMBERSHIPS: Membership[] = [
    {
        id: '1',
        title: 'Netflix',
        description: 'Standard Plan',
        startDate: new Date(2024, 10, 15), // Nov 15, 2024
        cost: 15.49,
        currency: 'USD',
        userId: 'user1',
        createdAt: new Date(),
        updatedAt: new Date(),
        recurrencePattern: {
            frequency: 'freeTrial',
            interval: 1,
            endByDate: new Date(2025, 1, 1)
        }
    },
    {
        id: '2',
        title: 'Gym Membership',
        description: 'Planet Fitness Premium',
        startDate: new Date(2024, 10, 1), // Nov 1, 2024
        cost: 24.99,
        currency: 'USD',
        userId: 'user1',
        createdAt: new Date(),
        updatedAt: new Date(),
        recurrencePattern: {
            frequency: 'monthly',
            interval: 1
        }
    },
    {
        id: '3',
        title: 'Spotify Premium',
        description: 'Individual Plan',
        startDate: new Date(2024, 10, 8), // Nov 8, 2024
        cost: 10.99,
        currency: 'USD',
        userId: 'user1',
        createdAt: new Date(),
        updatedAt: new Date(),
        recurrencePattern: {
            frequency: 'monthly',
            interval: 1
        }
    },
    {
        id: '4',
        title: 'HBO Max',
        description: 'Ad-Free Plan',
        startDate: new Date(2024, 10, 22), // Nov 22, 2024
        cost: 15.99,
        currency: 'USD',
        userId: 'user1',
        createdAt: new Date(),
        updatedAt: new Date(),
        recurrencePattern: {
            frequency: 'monthly',
            interval: 1
        }
    },
    {
        id: '5',
        title: 'YouTube Premium',
        description: 'Family Plan',
        startDate: new Date(2024, 10, 12), // Nov 12, 2024
        cost: 22.99,
        currency: 'USD',
        userId: 'user1',
        createdAt: new Date(),
        updatedAt: new Date(),
        recurrencePattern: {
            frequency: 'monthly',
            interval: 1
        }
    },
    {
        id: '6',
        title: 'Amazon Prime',
        description: 'Annual Membership',
        startDate: new Date(2024, 10, 28), // Nov 28, 2024
        cost: 139,
        currency: 'USD',
        userId: 'user1',
        createdAt: new Date(),
        updatedAt: new Date(),
        recurrencePattern: {
            frequency: 'yearly',
            interval: 1
        }
    },
    {
        id: '7',
        title: 'Apple iCloud+',
        description: '200GB Storage Plan',
        startDate: new Date(2024, 10, 5), // Nov 5, 2024
        cost: 2.99,
        currency: 'USD',
        userId: 'user1',
        createdAt: new Date(),
        updatedAt: new Date(),
        recurrencePattern: {
            frequency: 'monthly',
            interval: 1
        }
    }
]; 