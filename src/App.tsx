import React, { useState, useEffect } from 'react';
import { FinancialOverview } from './components/FinancialOverview/FinancialOverview';
import { LoginPage } from './components/LoginPage/LoginPage';
import { Navbar } from './components/Navbar/Navbar';
import { Challenges } from './components/Challenges/Challenges';
import { Education } from './components/Education/Education';
import { News } from './components/News/News';
import { Rewards } from './components/Rewards/Rewards';
import { Settings } from './components/Settings/Settings';
import { Community } from './components/Community/Community';
import { useTheme } from './ThemeContext';
import { SettingsButton } from './components/SettingsButton/SettingsButton';
import { Footer } from './components/Footer/Footer';
import { ChallengeCompletionModal } from './components/Challenges/ChallengeCompletionModal';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [showSettings, setShowSettings] = useState(false);
  const [escrowProgress, setEscrowProgress] = useState(0);
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const { isDark } = useTheme();

  const handleLogin = (studentId: string, password: string) => {
    // In a real app, this would validate credentials with a backend
    console.log('Login attempt:', { studentId, password });
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const handleNavigation = (section: string) => {
    if (section === 'settings') {
      setShowSettings(true);
      setActiveSection('settings'); // Set activeSection to 'settings' when showing settings
    } else {
      setActiveSection(section);
      setShowSettings(false);
    }
  };

  const toggleSettings = () => {
    setShowSettings(!showSettings);
    if (!showSettings) {
      setActiveSection('settings'); // Set activeSection to 'settings' when showing settings
    } else {
      setActiveSection('home'); // Reset to home when closing settings
    }
  };

  const handleCompleteDailyChallenge = (challengeId: string) => {
    console.log(`Completed daily challenge: ${challengeId}`);
    
    // Update escrow progress
    setEscrowProgress(prev => {
      const newProgress = Math.min(prev + 1, 3);
      
      // If we just reached 3 (100%), show the completion modal
      if (newProgress === 3 && prev < 3) {
        setTimeout(() => {
          setShowCompletionModal(true);
        }, 500);
      }
      
      return newProgress;
    });
  };

  // Apply consistent gradient background
  const gradientClass = isDark
    ? 'bg-gradient-to-br from-purple-900 via-gray-900 to-black'
    : 'bg-gradient-to-br from-purple-500 via-white to-purple-50';

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${gradientClass}`}>
      <Navbar 
        isLoggedIn={isLoggedIn} 
        onLogout={handleLogout}
        activeSection={activeSection}
        onNavigation={handleNavigation}
      />
      
      {/* Settings Button (Mobile Only) */}
      <SettingsButton onClick={toggleSettings} />
      
      <div className="pt-16 md:pt-20 pb-16 md:pb-0">
        <div className="py-8">
          {showSettings ? (
            <Settings onClose={() => {
              setShowSettings(false);
              setActiveSection('home'); // Reset to home when closing settings
            }} />
          ) : (
            <>
              {activeSection === 'home' && <FinancialOverview escrowProgress={escrowProgress} />}
              {activeSection === 'challenges' && <Challenges onCompleteDailyChallenge={handleCompleteDailyChallenge} />}
              {activeSection === 'education' && <Education />}
              {activeSection === 'news' && <News />}
              {activeSection === 'rewards' && <Rewards />}
              {activeSection === 'community' && <Community />}
            </>
          )}
        </div>
      </div>
      
      {/* Challenge Completion Modal */}
      <ChallengeCompletionModal 
        isOpen={showCompletionModal}
        onClose={() => {
          setShowCompletionModal(false);
          // Navigate to the financial overview to show the unlocked escrow
          setActiveSection('home');
        }}
        escrowAmount={30}
      />
      
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;