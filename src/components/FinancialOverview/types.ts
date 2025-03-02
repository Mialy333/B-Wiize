export interface Expense {
  category: string;
  amount: number;
}

export interface Payment {
  name: string;
  amount: number;
  due: string;
}

export interface SavingsData {
  amount: number;
  rate: number;
}

export interface XamanWalletData {
  isConnected: boolean;
  address?: string;
  xrp: number;
  usdRate: number;
  isConnecting?: boolean;
  error?: string;
}

export interface EscrowData {
  amount: number;
  condition: string;
  fulfillment: string;
  status: 'Locked' | 'Ready' | 'Released';
  challengesCompleted: number;
  totalChallengesRequired: number;
}

export interface DefiWalletData {
  xamanWallet: XamanWalletData;
  escrow?: EscrowData;
}

export interface DailyChallenge {
  id: string;
  title: string;
  description: string;
  xp: number;
  completed: boolean;
}

export interface BankAccount {
  id: string;
  name: string;
  balance: number;
  type: 'checking' | 'savings' | 'wallet';
  icon?: string;
}

export interface FinancialData {
  bankAccounts: BankAccount[];
  expenses: Expense[];
  savings: SavingsData;
  defiWallet: DefiWalletData;
  payments: Payment[];
  dailyChallenges: DailyChallenge[];
}

export interface CardProps {
  isLoading: boolean;
  error?: string;
  onRetry?: () => void;
}