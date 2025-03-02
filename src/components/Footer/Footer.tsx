import React from 'react';
import { TikTokIcon, XIcon, InstagramIcon, DiscordIcon } from './SocialIcons';
import { useTheme } from '../../ThemeContext';

export const Footer: React.FC = () => {
  const { isDark } = useTheme();
  
  const socialLinks = [
    { 
      name: 'TikTok', 
      icon: <TikTokIcon className="w-6 h-6" />, 
      url: 'https://tiktok.com/@bwiize',
      ariaLabel: 'Follow B-Wiize on TikTok'
    },
    { 
      name: 'X', 
      icon: <XIcon className="w-6 h-6" />, 
      url: 'https://x.com/bwiize',
      ariaLabel: 'Follow B-Wiize on X'
    },
    { 
      name: 'Instagram', 
      icon: <InstagramIcon className="w-6 h-6" />, 
      url: 'https://instagram.com/bwiize',
      ariaLabel: 'Follow B-Wiize on Instagram'
    },
    { 
      name: 'Discord', 
      icon: <DiscordIcon className="w-6 h-6" />, 
      url: 'https://discord.gg/bwiize',
      ariaLabel: 'Join B-Wiize Discord community'
    },
  ];

  return (
    <footer className={`w-full py-12 px-4 mt-12 transition-colors duration-300 ${
      isDark 
        ? 'bg-gradient-to-r from-purple-900/90 to-gray-900/90' 
        : 'bg-gradient-to-r from-purple-100/90 to-white/90'
    } backdrop-blur-sm shadow-lg`}>
      <div className="max-w-6xl mx-auto">
        {/* Main Footer Content */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-10">
          {/* Logo and Tagline */}
          <div className="flex flex-col items-center md:items-start mb-8 md:mb-0">
            <h2 className="text-2xl font-bold">
              <span className={isDark ? 'text-white' : 'text-gray-900'}>B-</span>
              <span className="text-purple-500">Wiize</span>
            </h2>
            <p className={`mt-2 text-sm max-w-xs text-center md:text-left ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              Smart financial management for students, powered by the XRP Ledger ecosystem
            </p>
          </div>
          
          {/* Social Media Links */}
          <div className="flex flex-col items-center md:items-end">
            <h3 className={`text-sm font-medium mb-4 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
              Join our community
            </h3>
            <div className="flex space-x-4">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.ariaLabel}
                  className="group"
                >
                  <div className={`p-3 rounded-full transition-all duration-300 transform group-hover:scale-110 group-hover:shadow-md ${
                    isDark
                      ? 'bg-gray-800 group-hover:bg-purple-900/80 text-purple-400 group-hover:text-purple-300'
                      : 'bg-white group-hover:bg-purple-100 text-purple-600 group-hover:text-purple-700 shadow-sm'
                  }`}>
                    {link.icon}
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
        
        {/* Quick Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
          <div>
            <h4 className={`text-sm font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Resources
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className={`text-sm ${isDark ? 'text-gray-300 hover:text-purple-300' : 'text-gray-600 hover:text-purple-600'} transition-colors`}>
                  Financial Education
                </a>
              </li>
              <li>
                <a href="#" className={`text-sm ${isDark ? 'text-gray-300 hover:text-purple-300' : 'text-gray-600 hover:text-purple-600'} transition-colors`}>
                  Budgeting Tips
                </a>
              </li>
              <li>
                <a href="#" className={`text-sm ${isDark ? 'text-gray-300 hover:text-purple-300' : 'text-gray-600 hover:text-purple-600'} transition-colors`}>
                  XRPL Tutorials
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className={`text-sm font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Company
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className={`text-sm ${isDark ? 'text-gray-300 hover:text-purple-300' : 'text-gray-600 hover:text-purple-600'} transition-colors`}>
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className={`text-sm ${isDark ? 'text-gray-300 hover:text-purple-300' : 'text-gray-600 hover:text-purple-600'} transition-colors`}>
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className={`text-sm ${isDark ? 'text-gray-300 hover:text-purple-300' : 'text-gray-600 hover:text-purple-600'} transition-colors`}>
                  Press
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className={`text-sm font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Legal
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className={`text-sm ${isDark ? 'text-gray-300 hover:text-purple-300' : 'text-gray-600 hover:text-purple-600'} transition-colors`}>
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className={`text-sm ${isDark ? 'text-gray-300 hover:text-purple-300' : 'text-gray-600 hover:text-purple-600'} transition-colors`}>
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className={`text-sm ${isDark ? 'text-gray-300 hover:text-purple-300' : 'text-gray-600 hover:text-purple-600'} transition-colors`}>
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className={`text-sm font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Support
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className={`text-sm ${isDark ? 'text-gray-300 hover:text-purple-300' : 'text-gray-600 hover:text-purple-600'} transition-colors`}>
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className={`text-sm ${isDark ? 'text-gray-300 hover:text-purple-300' : 'text-gray-600 hover:text-purple-600'} transition-colors`}>
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className={`text-sm ${isDark ? 'text-gray-300 hover:text-purple-300' : 'text-gray-600 hover:text-purple-600'} transition-colors`}>
                  Report an Issue
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Copyright and Bottom Links */}
        <div className={`pt-6 border-t ${
          isDark ? 'border-gray-700/50' : 'border-purple-100'
        } flex flex-col md:flex-row items-center justify-between text-sm`}>
          <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
            © 2025 B-Wiize. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center mt-4 md:mt-0 gap-x-6 gap-y-2">
            <a href="#" className={`${isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>
              Accessibility
            </a>
            <a href="#" className={`${isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>
              Security
            </a>
            <a href="#" className={`${isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>
              Sitemap
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};