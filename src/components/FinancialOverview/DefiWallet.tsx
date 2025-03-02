import React from 'react';
import { Coins, Link, Link2Off as LinkOff } from 'lucide-react';
import { CardProps, DefiWalletData } from './types';
import { useTheme } from '../../ThemeContext';
import { CatIcon } from '../CatIcon';

interface DefiWalletProps extends CardProps {
  defiWallet?: DefiWalletData;
  onConnectWallet?: () => void;
}

export const DefiWallet: React.FC<DefiWalletProps> = ({
  isLoading,
  error,
  onRetry,
  defiWallet,
  onConnectWallet,
}) => {
  const { isDark } = useTheme();

  const SkeletonLoader = () => (
    <div className="animate-pulse space-y-4">
      <div className={`h-12 ${isDark ? 'bg-gray-800' : 'bg-gray-100'} rounded-lg`} />
      <div className={`h-8 ${isDark ? 'bg-gray-800' : 'bg-gray-100'} rounded-lg w-2/3`} />
    </div>
  );

  if (isLoading) return <SkeletonLoader />;
  if (error) return <ErrorState message={error} onRetry={onRetry} />;

  const xrpInUsd = (defiWallet?.xrp || 0) * (defiWallet?.usdRate || 0);

  return (
    <div className={`h-full rounded-2xl overflow-hidden transition-all duration-300 ${
      isDark ? 'bg-gray-900' : 'bg-white'
    } shadow-sm hover:shadow-md`}>
      <div className="p-6">
        <div className="flex items-center mb-6">
          <CatIcon className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
          <h3 className={`text-base font-medium ml-2 ${isDark ? 'text-gray-200' : 'text-gray-900'}`}>
            DeFi Wallet
          </h3>
        </div>

        <div className={`p-4 rounded-xl ${
          isDark ? 'bg-gray-800/50' : 'bg-gray-50'
        }`}>
          <div className="flex items-center justify-between mb-4">
            <h4 className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              XRP Balance
            </h4>
            <button
              onClick={onConnectWallet}
              className={`flex items-center px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                defiWallet?.isConnected
                  ? isDark
                    ? 'bg-blue-500/20 text-blue-400'
                    : 'bg-blue-100 text-blue-700'
                  : isDark
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {defiWallet?.isConnected ? (
                <>
                  <LinkOff className="w-3 h-3 mr-1.5" />
                  Disconnect
                </>
              ) : (
                <>
                  <Link className="w-3 h-3 mr-1.5" />
                  Connect
                </>
              )}
            </button>
          </div>

          {defiWallet?.isConnected ? (
            <div className="space-y-2">
              <div className={`text-2xl font-medium ${
                isDark ? 'text-blue-400' : 'text-blue-600'
              }`}>
                {defiWallet.xrp.toFixed(2)} XRP
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                  USD Value
                </span>
                <span className={isDark ? 'text-gray-300' : 'text-gray-900'}>
                  ${xrpInUsd.toFixed(2)}
                </span>
              </div>
              <div className="flex items-center text-sm">
                <Coins className={`w-4 h-4 mr-1.5 ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                }`} />
                <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                  Rate: ${defiWallet.usdRate}/XRP
                </span>
              </div>
            </div>
          ) : (
            <div className={`text-center py-6 text-sm ${
              isDark ? 'text-gray-400' : 'text-gray-500'
            }`}>
              Connect your XRP wallet to view balance
            </div>
          )}
        </div>
      </div>
    </div>
  );
};