import React from 'react';
import { Calendar } from 'lucide-react';
import { CardProps } from './types';
import { useTheme } from '../../ThemeContext';

interface UpcomingPaymentsProps extends CardProps {
  payments?: { name: string; amount: number; due: string }[];
}

export const UpcomingPayments: React.FC<UpcomingPaymentsProps> = ({
  isLoading,
  error,
  onRetry,
  payments,
}) => {
  const { isDark } = useTheme();
  
  const SkeletonLoader = () => (
    <div className="animate-pulse space-y-4">
      <div className={`h-12 ${isDark ? 'bg-gray-800' : 'bg-gray-100'} rounded-lg`} />
      <div className={`h-8 ${isDark ? 'bg-gray-800' : 'bg-gray-100'} rounded-lg w-2/3`} />
      <div className={`h-8 ${isDark ? 'bg-gray-800' : 'bg-gray-100'} rounded-lg w-1/2`} />
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

  return (
    <div className={`h-full rounded-2xl overflow-hidden transition-all duration-300 ${
      isDark ? 'bg-gray-900' : 'bg-white'
    } shadow-sm hover:shadow-md`}>
      <div className="p-6">
        <div className="flex items-center mb-6">
          <Calendar className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
          <h3 className={`text-base font-medium ml-2 ${isDark ? 'text-gray-200' : 'text-gray-900'}`}>
            Upcoming
          </h3>
        </div>
        
        {isLoading ? (
          <SkeletonLoader />
        ) : error ? (
          <ErrorState message={error} />
        ) : (
          <div className="space-y-4">
            {payments?.map((payment) => (
              <div
                key={payment.name}
                className={`p-3 rounded-lg ${
                  isDark ? 'bg-gray-800/50' : 'bg-gray-50'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className={`font-medium ${isDark ? 'text-gray-200' : 'text-gray-900'}`}>
                      {payment.name}
                    </div>
                    <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      Due {new Date(payment.due).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric'
                      })}
                    </div>
                  </div>
                  <span className={`font-medium ${
                    isDark ? 'text-red-400' : 'text-red-600'
                  }`}>
                    ${payment.amount}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};