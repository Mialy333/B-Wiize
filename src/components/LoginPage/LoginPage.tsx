import React, { useState } from 'react';
import { UserSquare2, Eye, EyeOff, Sun, Moon, Lock, CreditCard } from 'lucide-react';
import { useTheme } from '../../ThemeContext';
import { CatIcon } from '../CatIcon';

interface LoginPageProps {
  onLogin: (studentId: string, password: string) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(studentId, password);
  };

  const gradientClass = isDark
    ? 'bg-gradient-to-br from-purple-900 via-gray-900 to-black'
    : 'bg-gradient-to-br from-purple-500 via-white to-purple-50';

  return (
    <div className={`min-h-screen ${gradientClass} transition-colors duration-300 overflow-hidden relative`}>
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-purple-500/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full bg-purple-500/10 blur-3xl" />
      </div>

      {/* Theme Toggle Button */}
      <button
        onClick={toggleTheme}
        className={`fixed top-4 right-4 p-2 rounded-full transition-colors ${
          isDark
            ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700'
            : 'bg-white/80 text-gray-800 hover:bg-gray-100'
        } backdrop-blur-sm z-50 shadow-lg`}
      >
        {isDark ? <Sun size={20} /> : <Moon size={20} />}
      </button>

      <div className="container mx-auto px-4 h-screen flex items-center justify-center">
        <div className="grid md:grid-cols-2 w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden">
          {/* Left Panel - Illustration/Branding */}
          <div className={`relative hidden md:block ${
            isDark ? 'bg-purple-900' : 'bg-purple-600'
          } p-12 overflow-hidden`}>
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/90 to-purple-900/90" />
            <div className="absolute inset-0">
              <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-purple-400/30 rounded-full blur-xl" />
              <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-purple-300/20 rounded-full blur-xl" />
            </div>
            
            <div className="relative flex flex-col h-full justify-between">
              <div className="flex items-center">
                <CatIcon className="w-12 h-12 text-white" />
                <span className="text-2xl font-bold text-white ml-4">B-Wiize</span>
              </div>
              
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-white">Smart Financial Management for Students</h2>
                <p className="text-purple-100">Track expenses, set budgets, and build financial literacy with our gamified approach.</p>
                
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <span className="text-purple-100">Personalized financial education</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <span className="text-purple-100">Earn rewards for good habits</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <span className="text-purple-100">Connect with financial experts</span>
                  </div>
                </div>
              </div>
              
              <div className="text-sm text-purple-200">
                © 2025 B-Wiize. All rights reserved.
              </div>
            </div>
          </div>
          
          {/* Right Panel - Login Form */}
          <div className={`p-8 md:p-12 ${
            isDark ? 'bg-gray-800/90' : 'bg-white/90'
          } backdrop-blur-sm transition-colors duration-300`}>
            {/* Mobile Logo */}
            <div className="flex flex-col items-center mb-4 md:hidden">
              <CatIcon className={`w-16 h-16 ${isDark ? 'text-purple-400' : 'text-purple-600'}`} />
              <h1 className={`text-2xl font-bold mt-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                B-Wiize
              </h1>
              <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Student Finance App
              </p>
            </div>

            <div className="md:hidden mb-4 h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent opacity-30" />

            <h2 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-800'} hidden md:block`}>
              Welcome Back!
            </h2>
            
            <p className={`mb-8 ${isDark ? 'text-gray-400' : 'text-gray-600'} hidden md:block`}>
              Sign in to access your financial dashboard and continue your journey to financial literacy.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Student ID
                  </label>
                  <div className="relative">
                    <CreditCard className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                      isDark ? 'text-gray-400' : 'text-gray-500'
                    }`} size={18} />
                    <input
                      type="text"
                      value={studentId}
                      onChange={(e) => setStudentId(e.target.value)}
                      placeholder="Enter your student ID"
                      className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                        isDark
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                      } focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors duration-300`}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className={`block text-sm font-medium ${
                      isDark ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Password
                    </label>
                    <button
                      type="button"
                      className={`text-xs ${
                        isDark
                          ? 'text-purple-400 hover:text-purple-300'
                          : 'text-purple-600 hover:text-purple-800'
                      } transition-colors`}
                    >
                      Forgot password?
                    </button>
                  </div>
                  <div className="relative">
                    <Lock className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                      isDark ? 'text-gray-400' : 'text-gray-500'
                    }`} size={18} />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className={`w-full pl-10 pr-10 py-3 rounded-lg border ${
                        isDark
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                      } focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors duration-300`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${
                        isDark ? 'text-gray-400' : 'text-gray-500'
                      } hover:text-purple-500 transition-colors`}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className={`w-full py-3 px-4 rounded-lg font-medium ${
                  isDark
                    ? 'bg-purple-600 hover:bg-purple-700 text-white'
                    : 'bg-purple-500 hover:bg-purple-600 text-white'
                } transform transition-all duration-300 hover:shadow-[0_0_15px_rgba(168,85,247,0.5)] focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 ${
                  isDark ? 'focus:ring-offset-gray-800' : 'focus:ring-offset-white'
                }`}
              >
                Sign In
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Don't have an account? <a href="#" className={`font-medium ${
                  isDark ? 'text-purple-400 hover:text-purple-300' : 'text-purple-600 hover:text-purple-800'
                }`}>Contact your university</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};