import { FinancialData } from './types';

export const mockFinancialData: FinancialData = {
  bankAccounts: [
    { 
      id: 'chase1',
      name: 'Chase Checking',
      balance: 250.75,
      type: 'checking',
      icon: '🏦'
    },
    { 
      id: 'venmo1',
      name: 'Venmo',
      balance: 74.75,
      type: 'wallet',
      icon: '💸'
    }
  ],
  expenses: [
    { category: 'Food', amount: 50 },
    { category: 'Rent', amount: 100 },
    { category: 'Transportation', amount: 30 },
    { category: 'Entertainment', amount: 25 },
  ],
  savings: {
    amount: 75,
    rate: 10,
  },
  defiWallet: {
    xamanWallet: {
      isConnected: false,
      xrp: 50,
      usdRate: 0.50
    },
    escrow: {
      amount: 30,
      condition: '3 challenges',
      fulfillment: 'secret123',
      status: 'Locked',
      challengesCompleted: 0,
      totalChallengesRequired: 3
    }
  },
  payments: [
    { name: 'Rent', amount: 150, due: '2025-02-28' },
    { name: 'Phone Bill', amount: 45, due: '2025-02-15' },
    { name: 'Internet', amount: 60, due: '2025-02-20' },
  ],
  dailyChallenges: [
    {
      id: 'dc1',
      title: 'Track Your Spending',
      description: 'Record every expense you make today, no matter how small.',
      xp: 20,
      completed: false
    },
    {
      id: 'dc2',
      title: 'No-Spend Challenge',
      description: 'Go the entire day without making any non-essential purchases.',
      xp: 30,
      completed: false
    },
    {
      id: 'dc3',
      title: 'Subscription Audit',
      description: 'Review all your subscriptions and cancel any you don\'t use regularly.',
      xp: 25,
      completed: true
    }
  ]
};