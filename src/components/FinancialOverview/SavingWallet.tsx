import React from 'react';
import { PiggyBank } from 'lucide-react';
import { CardProps, SavingsData } from './types';
import { useTheme } from '../../ThemeContext';

interface SavingWalletProps extends CardProps {
  savings?: SavingsData;
  onRateChange?: (rate: number) => void;
}

export const SavingWallet: React.FC<SavingWalletProps> = ({
  isLoading,
  error,
  onRetry,
  savings,
  onRateChange,
}) => {
  const { isDark } = useTheme();

  const SkeletonLoader = () => (
    <div className="animate-pulse space-y-4">
      <div className={`h-12 ${isDark ? 'bg-gray-800' : 'bg-gray-100'} rounded-lg`} />
      <div className={`h-8 ${isDark ? 'bg-gray-800' : 'bg-gray-100'} rounded-lg w-2/3`} />
    </div>
  );

  const ErrorState = ({ message }: { message: string }) => (
    <div className="text-center py-4">
      <p className="text-red-500 mb-3">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-purple-100 text-purple-700 hover:bg-purple-200 transition-colors"
        >
          Try Again
        </button>
      )}
    </div>
  );

  if (isLoading) return <SkeletonLoader />;
  if (error) return <ErrorState message={error} />;

  return (
    <div className={`rounded-2xl overflow-hidden transition-all duration-300 ${
      isDark ? 'bg-gray-900' : 'bg-white'
    } shadow-sm hover:shadow-md`}>
      <div className="p-6">
        <div className="flex items-center mb-6">
          <PiggyBank className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
          <h3 className={`text-base font-medium ml-2 ${isDark ? 'text-gray-200' : 'text-gray-900'}`}>
            Savings
          </h3>
        </div>

        <div className="grid gap-4">
          {/* Standard Savings */}
          <div className={`p-4 rounded-xl ${
            isDark ? 'bg-gray-800/50' : 'bg-gray-50'
          }`}>
            <h4 className={`text-sm mb-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Standard Savings
            </h4>
            <div className={`text-2xl font-medium mb-4 ${
              isDark ? 'text-gray-200' : 'text-gray-900'
            }`}>
              ${savings?.amount.toFixed(2)}
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                  Savings Rate
                </span>
                <span className={isDark ? 'text-gray-300' : 'text-gray-900'}>
                  {savings?.rate}%
                </span>
              </div>
              <input
                type="range"
                min="5"
                max="20"
                value={savings?.rate}
                onChange={(e) => onRateChange?.(Number(e.target.value))}
                className="w-full h-1.5 bg-gray-200 rounded-full appearance-none cursor-pointer accent-teal-500"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};