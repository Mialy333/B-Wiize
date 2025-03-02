import React, { useState, useEffect, useCallback, useRef } from 'react';
import { DollarSign, PieChart, Calendar, ArrowLeft, ArrowRight, RefreshCcw, Link as LinkIcon, Plus } from 'lucide-react';
import { FinancialData, CardProps, BankAccount } from './types';
import { mockFinancialData } from './mockData';
import { useTheme } from '../../ThemeContext';
import { SavingWallet } from './SavingWallet';
import { ExpensesByCategories } from './ExpensesByCategories';
import { XamanWallet } from './XamanWallet';
import { UpcomingPayments } from './UpcomingPayments';
import { EscrowReleaseSuccessModal } from './EscrowReleaseSuccessModal';

// Skeleton Loading Component
const SkeletonLoader: React.FC = () => {
  const { isDark } = useTheme();
  return (
    <div className="animate-pulse space-y-4">
      <div className={`h-12 ${isDark ? 'bg-gray-800' : 'bg-gray-100'} rounded-lg`} />
      <div className={`h-8 ${isDark ? 'bg-gray-800' : 'bg-gray-100'} rounded-lg w-2/3`} />
      <div className={`h-8 ${isDark ? 'bg-gray-800' : 'bg-gray-100'} rounded-lg w-1/2`} />
    </div>
  );
};

// Error State Component
const ErrorState: React.FC<{ message: string; onRetry?: () => void }> = ({ message, onRetry }) => (
  <div className="text-center py-4">
    <p className="text-red-500 mb-3">{message}</p>
    {onRetry && (
      <button
        onClick={onRetry}
        className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-purple-100 text-purple-700 hover:bg-purple-200 transition-colors"
      >
        <RefreshCcw className="w-4 h-4 mr-2" />
        Try Again
      </button>
    )}
  </div>
);

// Available Balance Header
const AvailableBalance: React.FC<CardProps & { 
  bankAccounts?: BankAccount[],
  onLinkBank?: () => void 
}> = ({ 
  isLoading, 
  error, 
  onRetry, 
  bankAccounts,
  onLinkBank 
}) => {
  const { isDark } = useTheme();
  
  const totalBalance = bankAccounts?.reduce((sum, account) => sum + account.balance, 0) || 0;
  
  return (
    <div className="px-4 py-4">
      <div className="text-center">
        <p className={`text-sm font-medium mb-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          Available Balance
        </p>
        {isLoading ? (
          <div className="animate-pulse">
            <div className={`h-8 ${isDark ? 'bg-gray-800/50' : 'bg-gray-200/50'} rounded-lg w-48 mx-auto`} />
          </div>
        ) : error ? (
          <ErrorState message={error} onRetry={onRetry} />
        ) : (
          <div className="relative inline-block">
            <div className={`text-3xl font-bold tracking-tight text-shadow ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              ${totalBalance.toFixed(2)}
            </div>
            <div className="absolute -inset-4 bg-green-400/20 blur-xl rounded-full -z-10" />
          </div>
        )}
        
        {/* Bank Accounts List */}
        {bankAccounts && bankAccounts.length > 0 && (
          <div className="mt-3 flex flex-wrap justify-center gap-2">
            {bankAccounts.map(account => (
              <div 
                key={account.id}
                className={`px-3 py-1 rounded-full text-xs ${
                  isDark ? 'bg-purple-500/20 text-purple-300' : 'bg-purple-100 text-purple-700'
                }`}
              >
                <span className="mr-1">{account.icon}</span>
                <span>{account.name}: ${account.balance.toFixed(2)}</span>
              </div>
            ))}
          </div>
        )}
        
        {/* Link Bank Account Button */}
        <button
          onClick={onLinkBank}
          className={`mt-3 px-4 py-1.5 rounded-full text-xs font-medium transition-colors ${
            isDark
              ? 'bg-teal-600 hover:bg-teal-700 text-white'
              : 'bg-teal-500 hover:bg-teal-600 text-white'
          }`}
        >
          <LinkIcon className="w-3 h-3 inline mr-1" />
          {bankAccounts && bankAccounts.length > 0 ? 'Link Another Account' : 'Link Bank Account'}
        </button>
      </div>
    </div>
  );
};

// Bank Account Connection Modal
const BankConnectionModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onConnect: (bankName: string) => void;
}> = ({ isOpen, onClose, onConnect }) => {
  const { isDark } = useTheme();
  
  if (!isOpen) return null;
  
  const bankOptions = [
    { id: 'chase', name: 'Chase', icon: '🏦' },
    { id: 'bofa', name: 'Bank of America', icon: '🏦' },
    { id: 'wells', name: 'Wells Fargo', icon: '🏦' },
    { id: 'venmo', name: 'Venmo', icon: '💸' },
    { id: 'paypal', name: 'PayPal', icon: '💳' }
  ];
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className={`max-w-md w-full rounded-xl ${
        isDark ? 'bg-gray-800' : 'bg-white'
      } p-6 shadow-xl`}>
        <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Link Your Bank Account
        </h3>
        
        <p className={`mb-4 text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
          Connect your external accounts to see all your finances in one place.
        </p>
        
        <div className="space-y-3 mb-6">
          {bankOptions.map(bank => (
            <button
              key={bank.id}
              onClick={() => onConnect(bank.name)}
              className={`w-full p-3 rounded-lg flex items-center justify-between transition-colors ${
                isDark
                  ? 'bg-gray-700 hover:bg-gray-600 text-white'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
              }`}
            >
              <div className="flex items-center">
                <span className="text-xl mr-3">{bank.icon}</span>
                <span>{bank.name}</span>
              </div>
              <Plus className="w-5 h-5" />
            </button>
          ))}
        </div>
        
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              isDark
                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Cancel
          </button>
        </div>
        
        {/* Plaid Integration Comment */}
        <div className={`mt-4 text-xs italic ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
          {/* This comment would be removed in production */}
          {/* 
            Real integration would use Plaid:
            
            // Initialize Plaid client
            const plaidClient = new PlaidClient({
              clientId: process.env.PLAID_CLIENT_ID,
              secret: process.env.PLAID_SECRET,
              env: plaid.environments.sandbox
            });
            
            // Create link token
            const createLinkToken = async () => {
              const response = await plaidClient.linkTokenCreate({
                user: { client_user_id: 'user-id' },
                client_name: 'B-Wiize',
                products: ['auth', 'transactions'],
                country_codes: ['US'],
                language: 'en'
              });
              return response.data.link_token;
            };
            
            // After user connects bank:
            const exchangePublicToken = async (publicToken) => {
              const response = await plaidClient.itemPublicTokenExchange({
                public_token: publicToken
              });
              return response.data.access_token;
            };
            
            // Get account balances
            const getBalances = async (accessToken) => {
              const response = await plaidClient.accountsBalanceGet({
                access_token: accessToken
              });
              return response.data.accounts;
            };
          */}
        </div>
      </div>
    </div>
  );
};

interface FinancialOverviewProps {
  escrowProgress?: number;
}

export const FinancialOverview: React.FC<FinancialOverviewProps> = ({ escrowProgress = 0 }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | undefined>();
  const [data, setData] = useState<FinancialData | undefined>();
  const [showBankModal, setShowBankModal] = useState(false);
  const [showReleaseSuccessModal, setShowReleaseSuccessModal] = useState(false);
  const [releasedAmount, setReleasedAmount] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const { isDark } = useTheme();

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(undefined);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setData(mockFinancialData);
    } catch (err) {
      setError('Failed to load financial data');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Update escrow progress when it changes from props
  useEffect(() => {
    if (data && escrowProgress > 0) {
      setData({
        ...data,
        defiWallet: {
          ...data.defiWallet,
          escrow: {
            ...data.defiWallet.escrow!,
            challengesCompleted: escrowProgress,
            status: escrowProgress >= 3 ? 'Ready' : 'Locked'
          }
        }
      });
    }
  }, [escrowProgress]);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const handleScroll = () => {
      const scrollPosition = carousel.scrollLeft;
      const cardWidth = carousel.offsetWidth;
      const newIndex = Math.round(scrollPosition / cardWidth);
      setActiveIndex(newIndex);
    };

    carousel.addEventListener('scroll', handleScroll);
    return () => carousel.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToCard = (index: number) => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const cardWidth = carousel.offsetWidth;
    carousel.scrollTo({
      left: cardWidth * index,
      behavior: 'smooth'
    });
  };

  const handleRateChange = (rate: number) => {
    if (data) {
      setData({
        ...data,
        savings: { ...data.savings, rate }
      });
    }
  };

  const handleConnectXaman = () => {
    if (data) {
      // First set connecting state
      setData({
        ...data,
        defiWallet: {
          ...data.defiWallet,
          xamanWallet: {
            ...data.defiWallet.xamanWallet,
            isConnecting: true,
            error: undefined
          }
        }
      });

      // Simulate connection process
      setTimeout(() => {
        setData({
          ...data,
          defiWallet: {
            ...data.defiWallet,
            xamanWallet: {
              ...data.defiWallet.xamanWallet,
              isConnected: true,
              isConnecting: false,
              address: 'rStudentAddress123XRP',
              xrp: 50,
              usdRate: 0.50
            }
          }
        });
      }, 2000);
    }
  };

  const handleDepositXRP = (amount: number) => {
    console.log(`Signing transaction: Deposit ${amount} XRP to savings`);
    
    // In a real app, this would use the Xaman SDK to create a payment transaction
    // const xumm = new Xumm('api-key', 'api-secret');
    // const txPayload = await xumm.payload.create({
    //   TransactionType: 'Payment',
    //   Account: xamanWallet.address,
    //   Destination: savingsAddress,
    //   Amount: String(amount * 1000000), // XRP in drops
    // });
    
    // For demo, just update the balance
    if (data) {
      setData({
        ...data,
        defiWallet: {
          ...data.defiWallet,
          xamanWallet: {
            ...data.defiWallet.xamanWallet,
            xrp: data.defiWallet.xamanWallet.xrp + amount
          }
        }
      });
    }
  };
  
  const handleCreateEscrow = (amount: number) => {
    if (data) {
      setData({
        ...data,
        defiWallet: {
          ...data.defiWallet,
          escrow: {
            amount,
            condition: '3 challenges',
            fulfillment: 'secret123',
            status: 'Locked',
            challengesCompleted: escrowProgress,
            totalChallengesRequired: 3
          }
        }
      });
    }
  };
  
  const handleReleaseEscrow = () => {
    if (data && data.defiWallet.escrow && data.defiWallet.escrow.status === 'Ready') {
      // Store the amount for the success modal
      setReleasedAmount(data.defiWallet.escrow.amount);
      
      // Add the escrow amount back to the wallet
      setData({
        ...data,
        defiWallet: {
          ...data.defiWallet,
          xamanWallet: {
            ...data.defiWallet.xamanWallet,
            xrp: data.defiWallet.xamanWallet.xrp + data.defiWallet.escrow.amount
          },
          escrow: {
            ...data.defiWallet.escrow,
            status: 'Released'
          }
        }
      });
      
      // Show success modal
      setShowReleaseSuccessModal(true);
    }
  };
  
  const completeChallenge = () => {
    if (data && data.defiWallet.escrow) {
      const updatedChallengesCompleted = data.defiWallet.escrow.challengesCompleted + 1;
      const isReady = updatedChallengesCompleted >= data.defiWallet.escrow.totalChallengesRequired;
      
      setData({
        ...data,
        defiWallet: {
          ...data.defiWallet,
          escrow: {
            ...data.defiWallet.escrow,
            challengesCompleted: updatedChallengesCompleted,
            status: isReady ? 'Ready' : 'Locked'
          }
        }
      });
    }
  };
  
  const handleLinkBank = () => {
    setShowBankModal(true);
  };
  
  const handleConnectBank = (bankName: string) => {
    // Simulate connecting to a bank and getting balance
    if (data) {
      const randomBalance = Math.floor(Math.random() * 500) + 50 + Math.random();
      const newAccount: BankAccount = {
        id: `bank-${Date.now()}`,
        name: bankName,
        balance: parseFloat(randomBalance.toFixed(2)),
        type: bankName.includes('Venmo') || bankName.includes('PayPal') ? 'wallet' : 'checking',
        icon: bankName.includes('Venmo') || bankName.includes('PayPal') ? '💸' : '🏦'
      };
      
      setData({
        ...data,
        bankAccounts: [...data.bankAccounts, newAccount]
      });
    }
    
    setShowBankModal(false);
  };

  // Handle touch events for mobile swiping
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      // Swipe left - next card
      if (activeIndex < 3) {
        scrollToCard(activeIndex + 1);
      }
    }
    if (touchEnd - touchStart > 75) {
      // Swipe right - previous card
      if (activeIndex > 0) {
        scrollToCard(activeIndex - 1);
      }
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="mb-6">
        <AvailableBalance
          isLoading={isLoading}
          error={error}
          onRetry={fetchData}
          bankAccounts={data?.bankAccounts}
          onLinkBank={handleLinkBank}
        />
      </div>
      
      {/* Desktop View - 2x2 Grid */}
      <div className="hidden md:grid md:grid-cols-2 gap-6 p-4">
        <ExpensesByCategories
          isLoading={isLoading}
          error={error}
          onRetry={fetchData}
          expenses={data?.expenses}
        />
        <SavingWallet
          isLoading={isLoading}
          error={error}
          onRetry={fetchData}
          savings={data?.savings}
          onRateChange={handleRateChange}
        />
        <XamanWallet
          isLoading={isLoading}
          error={error}
          onRetry={fetchData}
          xamanWallet={data?.defiWallet.xamanWallet}
          escrow={data?.defiWallet.escrow}
          onConnectXaman={handleConnectXaman}
          onDepositXRP={handleDepositXRP}
          onCreateEscrow={handleCreateEscrow}
          onReleaseEscrow={handleReleaseEscrow}
        />
        <UpcomingPayments
          isLoading={isLoading}
          error={error}
          onRetry={fetchData}
          payments={data?.payments}
        />
      </div>

      {/* Mobile View */}
      <div className="md:hidden flex flex-col justify-between">
        {/* Carousel */}
        <div
          ref={carouselRef}
          className="carousel-container flex overflow-x-auto snap-x snap-mandatory px-4"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="carousel-item w-full flex-shrink-0 px-2" style={{ scrollSnapAlign: 'center' }}>
            <ExpensesByCategories
              isLoading={isLoading}
              error={error}
              onRetry={fetchData}
              expenses={data?.expenses}
            />
          </div>
          <div className="carousel-item w-full flex-shrink-0 px-2" style={{ scrollSnapAlign: 'center' }}>
            <SavingWallet
              isLoading={isLoading}
              error={error}
              onRetry={fetchData}
              savings={data?.savings}
              onRateChange={handleRateChange}
            />
          </div>
          <div className="carousel-item w-full flex-shrink-0 px-2" style={{ scrollSnapAlign: 'center' }}>
            <XamanWallet
              isLoading={isLoading}
              error={error}
              onRetry={fetchData}
              xamanWallet={data?.defiWallet.xamanWallet}
              escrow={data?.defiWallet.escrow}
              onConnectXaman={handleConnectXaman}
              onDepositXRP={handleDepositXRP}
              onCreateEscrow={handleCreateEscrow}
              onReleaseEscrow={handleReleaseEscrow}
            />
          </div>
          <div className="carousel-item w-full flex-shrink-0 px-2" style={{ scrollSnapAlign: 'center' }}>
            <UpcomingPayments
              isLoading={isLoading}
              error={error}
              onRetry={fetchData}
              payments={data?.payments}
            />
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between p-4 bg-gradient-to-t from-black/10 to-transparent">
          <button
            onClick={() => scrollToCard(activeIndex - 1)}
            disabled={activeIndex === 0}
            className={`p-2 rounded-full transition-colors ${
              activeIndex === 0
                ? isDark ? 'text-gray-600' : 'text-gray-300'
                : isDark
                ? 'text-purple-400 hover:text-purple-300'
                : 'text-purple-600 hover:text-purple-800'
            }`}
          >
            <ArrowLeft className="w-6 h-6" />
          </button>

          {/* Dot Indicators */}
          <div className="flex items-center space-x-2">
            {[0, 1, 2, 3].map((index) => (
              <button
                key={index}
                onClick={() => scrollToCard(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  activeIndex === index
                    ? isDark
                      ? 'bg-teal-500 w-4'
                      : 'bg-teal-600 w-4'
                    : isDark
                    ? 'bg-gray-600'
                    : 'bg-gray-300'
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => scrollToCard(activeIndex + 1)}
            disabled={activeIndex === 3}
            className={`p-2 rounded-full transition-colors ${
              activeIndex === 3
                ? isDark ? 'text-gray-600' : 'text-gray-300'
                : isDark
                ? 'text-purple-400 hover:text-purple-300'
                : 'text-purple-600 hover:text-purple-800'
            }`}
          >
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      </div>
      
      {/* Bank Connection Modal */}
      <BankConnectionModal 
        isOpen={showBankModal}
        onClose={() => setShowBankModal(false)}
        onConnect={handleConnectBank}
      />
      
      {/* Escrow Release Success Modal */}
      <EscrowReleaseSuccessModal
        isOpen={showReleaseSuccessModal}
        onClose={() => setShowReleaseSuccessModal(false)}
        amount={releasedAmount}
      />

      {/* Debug Button for Challenge Completion (would be removed in production) */}
      {data?.defiWallet.escrow && data.defiWallet.escrow.status === 'Locked' && (
        <div className="fixed bottom-20 right-4 z-40">
          <button
            onClick={completeChallenge}
            className={`p-3 rounded-full shadow-lg transition-colors ${
              isDark
                ? 'bg-purple-600 hover:bg-purple-700 text-white'
                : 'bg-purple-500 hover:bg-purple-600 text-white'
            }`}
          >
            <span className="text-xs">Complete Challenge</span>
          </button>
        </div>
      )}
    </div>
  );
};