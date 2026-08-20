/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { NavSection, DestinationCurrency, HomeCurrency } from './types';
import { HOME_CURRENCIES, DESTINATIONS_DATA } from './data/mockData';
import { Sidebar } from './components/Sidebar';
import { TopNav } from './components/TopNav';
import { CurrencyTrendsView } from './components/CurrencyTrendsView';
import { MarketViews } from './components/MarketViews';
import { TripBudgetCalculatorModal } from './components/TripBudgetCalculatorModal';
import { RateAlertModal } from './components/RateAlertModal';
import { AccountModal } from './components/AccountModal';

export default function App() {
  const [currentSection, setCurrentSection] = useState<NavSection>('currency-trends');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isMobileNavOpen, setIsMobileNavOpen] = useState<boolean>(false);
  const [homeCurrency, setHomeCurrency] = useState<HomeCurrency>(HOME_CURRENCIES[0]);

  // Modal states
  const [isCalculatorOpen, setIsCalculatorOpen] = useState<boolean>(false);
  const [calculatorDest, setCalculatorDest] = useState<DestinationCurrency | null>(null);
  
  const [isAlertModalOpen, setIsAlertModalOpen] = useState<boolean>(false);
  const [alertDest, setAlertDest] = useState<DestinationCurrency | null>(null);

  const [isAccountOpen, setIsAccountOpen] = useState<boolean>(false);

  const handleOpenCalculator = (dest?: DestinationCurrency) => {
    setCalculatorDest(dest || DESTINATIONS_DATA[0]);
    setIsCalculatorOpen(true);
  };

  const handleSetAlert = (dest: DestinationCurrency) => {
    setAlertDest(dest);
    setIsAlertModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#FDFCF9] text-[#2D332D] font-sans flex flex-col antialiased selection:bg-[#84967F] selection:text-white">
      {/* Sidebar Navigation */}
      <Sidebar
        currentSection={currentSection}
        onSelectSection={(sec) => {
          setCurrentSection(sec);
          setSearchQuery('');
        }}
        onOpenAccount={() => setIsAccountOpen(true)}
        isMobileOpen={isMobileNavOpen}
        onCloseMobile={() => setIsMobileNavOpen(false)}
      />

      {/* Main Content Area (offset by sidebar width on lg screens) */}
      <div className="lg:pl-64 flex-1 flex flex-col min-w-0 transition-all">
        {/* Top Navigation Bar */}
        <TopNav
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onOpenGetStarted={() => handleOpenCalculator()}
          onOpenAccount={() => setIsAccountOpen(true)}
          onOpenMobileMenu={() => setIsMobileNavOpen(true)}
          homeCurrency={homeCurrency}
        />

        {/* Page Content Body */}
        <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-[1600px] w-full mx-auto">
          {currentSection === 'currency-trends' ? (
            <CurrencyTrendsView
              searchQuery={searchQuery}
              onOpenCalculator={handleOpenCalculator}
              onSetAlert={handleSetAlert}
              homeCurrency={homeCurrency}
              onSelectHomeCurrency={setHomeCurrency}
            />
          ) : (
            <MarketViews
              section={currentSection}
              searchQuery={searchQuery}
            />
          )}
        </main>

        {/* Subtle Natural Footer */}
        <footer className="border-t border-[#E5E2DA] bg-[#FDFCF9] py-5 px-6 text-center text-xs text-[#7A756D]">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
            <span>© {new Date().getFullYear()} MARKETS Global Intelligence. All rates updated dynamically.</span>
            <div className="flex items-center gap-5 text-[#7A756D] font-medium">
              <span className="hover:text-[#2D332D] transition-colors cursor-pointer">Privacy Policy</span>
              <span className="hover:text-[#2D332D] transition-colors cursor-pointer">Terms of Service</span>
              <span className="hover:text-[#2D332D] transition-colors cursor-pointer">Market Data Methodology</span>
            </div>
          </div>
        </footer>
      </div>

      {/* Modals */}
      <TripBudgetCalculatorModal
        isOpen={isCalculatorOpen}
        onClose={() => setIsCalculatorOpen(false)}
        initialDestination={calculatorDest}
        homeCurrency={homeCurrency}
      />

      <RateAlertModal
        isOpen={isAlertModalOpen}
        onClose={() => setIsAlertModalOpen(false)}
        destination={alertDest}
      />

      <AccountModal
        isOpen={isAccountOpen}
        onClose={() => setIsAccountOpen(false)}
        homeCurrency={homeCurrency}
        onSelectHomeCurrency={setHomeCurrency}
      />
    </div>
  );
}
