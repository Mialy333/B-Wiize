import React from 'react';
import { PieChart } from 'lucide-react';
import { CardProps } from './types';
import { useTheme } from '../../ThemeContext';

interface ExpensesByCategoriesProps extends CardProps {
  expenses?: { category: string; amount: number }[];
}

export const ExpensesByCategories: React.FC<ExpensesByCategoriesProps> = ({
  isLoading,
  error,
  onRetry,
  expenses,
}) => {
  const { isDark } = useTheme();
  const maxAmount = expenses ? Math.max(...expenses.map(e => e.amount)) : 0;
  
  const categoryColors = [
    'bg-[#FF6B6B]',
    'bg-[#4ECDC4]',
    'bg-[#45B7D1]',
    'bg-[#96CEB4]',
    'bg-[#FFEEAD]',
    'bg-[#D4A5A5]',
  ];

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
          <PieChart className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
          <h3 className={`text-base font-medium ml-2 ${isDark ? 'text-gray-200' : 'text-gray-900'}`}>
            Expenses
          </h3>
        </div>
        
        {isLoading ? (
          <SkeletonLoader />
        ) : error ? (
          <ErrorState message={error} />
        ) : (
          <div className="space-y-4">
            {expenses?.map((expense, index) => (
              <div key={expense.category} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {expense.category}
                  </span>
                  <span className={`font-medium ${isDark ? 'text-gray-200' : 'text-gray-900'}`}>
                    ${expense.amount}
                  </span>
                </div>
                <div className={`h-1.5 bg-gray-100 rounded-full overflow-hidden ${
                  isDark ? 'bg-gray-800' : ''
                }`}>
                  <div
                    className={`h-full ${categoryColors[index % categoryColors.length]} rounded-full transition-all duration-500`}
                    style={{ width: `${(expense.amount / maxAmount) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};