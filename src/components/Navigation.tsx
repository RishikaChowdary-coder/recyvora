import React, { useState } from 'react';
import { UserProfile } from '../types';

interface NavigationProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  currentUser: UserProfile;
  onSwitchRole: (role: UserProfile['role']) => void;
  onOpenNotifications: () => void;
  unreadNotificationsCount?: number;
}

export const Navigation: React.FC<NavigationProps> = ({
  currentPath,
  onNavigate,
  currentUser,
  onSwitchRole,
  onOpenNotifications,
  unreadNotificationsCount = 2
}) => {
  const [showWorkspaceSwitcher, setShowWorkspaceSwitcher] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const isPublicPage = currentPath === 'landing' || currentPath === 'about' || currentPath === 'solutions';

  // If on public landing page: render the top navbar from Image_2_156418d7.html
  if (isPublicPage) {
    return (
      <header className="fixed top-0 w-full z-50 bg-surface/85 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-b border-outline-variant/30">
        <div className="h-16 max-w-7xl mx-auto px-margin-md lg:px-margin-lg flex items-center justify-between">
          {/* Brand */}
          <button
            onClick={() => onNavigate('landing')}
            className="flex items-center gap-space-sm focus:outline-none"
          >
            <img
              alt="Recyvora Brand Logo"
              className="h-8 w-auto object-contain"
              src="https://lh3.googleusercontent.com/aida/AEtjO1XWz6UyrZ1fK4sFr4JA9xxkNMipjSe4hb7UPFs-2SvvKBR_ZOwpGlgZC0-JsJGUT2KvdExCgGDBBnmL1yd6-NVl97mCIwz10-Mt-XCnchAlyiUh5Vy6eKKuXHiErFR5En20D8rJgkjB_zB6D44yXsHQTUM4LxjcLNIFj8iOjltfgLMp5Y9Xmr7d5NgkCIEjna4XC-7DRR0dlZlBRkJeTRwfR7HI2reC8E5Do9HEJIbj1D5A_wLg6DBY1q55"
            />
            <span className="font-headline-sm text-headline-sm text-primary font-bold tracking-tight">Recyvora</span>
          </button>

          {/* Nav links */}
          <nav className="hidden lg:flex items-center gap-gutter-lg">
            <button
              onClick={() => onNavigate('landing')}
              className={`transition-colors font-label-md text-label-md ${
                currentPath === 'landing' ? 'text-primary font-semibold' : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Solutions
            </button>
            <button
              onClick={() => onNavigate('landing')}
              className="font-body-md text-body-md text-on-surface-variant hover:text-on-surface transition-colors"
            >
              How It Works
            </button>
            <button
              onClick={() => onNavigate('marketplace')}
              className="font-body-md text-body-md text-on-surface-variant hover:text-on-surface transition-colors"
            >
              Marketplace
            </button>
            <button
              onClick={() => onNavigate('environmental-impact')}
              className="font-body-md text-body-md text-on-surface-variant hover:text-on-surface transition-colors"
            >
              Environmental Impact
            </button>
            <button
              onClick={() => onNavigate('business')}
              className="font-body-md text-body-md text-on-surface-variant hover:text-on-surface transition-colors"
            >
              Business
            </button>
            <button
              onClick={() => onNavigate('landing')}
              className="font-body-md text-body-md text-on-surface-variant hover:text-on-surface transition-colors"
            >
              About
            </button>
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-space-md">
            <button
              onClick={() => onNavigate('dashboard')}
              className="hidden sm:inline-flex px-space-md py-space-xs font-label-md text-label-md text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface rounded-lg transition-colors font-medium"
            >
              Dashboard
            </button>
            <button
              onClick={() => onNavigate('schedule-pickup')}
              className="inline-flex items-center px-space-md py-space-xs bg-primary-container text-on-primary font-label-md text-label-md rounded-lg shadow-sm hover:bg-primary transition-colors font-semibold"
            >
              Schedule a Pickup
            </button>
            <button
              onClick={() => onNavigate('dashboard')}
              title="Switch to App View"
              className="focus:outline-none"
            >
              <img
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover ring-2 ring-primary/20"
                src={currentUser.avatarUrl}
              />
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 text-on-surface-variant hover:text-on-surface"
            >
              <span className="material-symbols-outlined text-[24px]">
                {mobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-surface-container-lowest border-b border-outline-variant/30 p-4 space-y-2">
            <button
              onClick={() => { onNavigate('landing'); setMobileMenuOpen(false); }}
              className="block w-full text-left py-2 px-3 rounded text-sm text-on-surface hover:bg-surface-container"
            >
              Solutions
            </button>
            <button
              onClick={() => { onNavigate('dashboard'); setMobileMenuOpen(false); }}
              className="block w-full text-left py-2 px-3 rounded text-sm font-semibold text-primary hover:bg-surface-container"
            >
              Enterprise Dashboard
            </button>
            <button
              onClick={() => { onNavigate('schedule-pickup'); setMobileMenuOpen(false); }}
              className="block w-full text-left py-2 px-3 rounded text-sm text-on-surface hover:bg-surface-container"
            >
              Schedule a Scrap Pickup
            </button>
            <button
              onClick={() => { onNavigate('scrap-price-estimator'); setMobileMenuOpen(false); }}
              className="block w-full text-left py-2 px-3 rounded text-sm text-on-surface hover:bg-surface-container"
            >
              Scrap Price Estimator
            </button>
            <button
              onClick={() => { onNavigate('marketplace'); setMobileMenuOpen(false); }}
              className="block w-full text-left py-2 px-3 rounded text-sm text-on-surface hover:bg-surface-container"
            >
              Reusable Marketplace
            </button>
            <button
              onClick={() => { onNavigate('ecoguide-ai'); setMobileMenuOpen(false); }}
              className="block w-full text-left py-2 px-3 rounded text-sm text-on-surface hover:bg-surface-container"
            >
              EcoGuide AI Copilot
            </button>
          </div>
        )}
      </header>
    );
  }

  // Authenticated Enterprise Layout (Sidebar + Top Bar)
  const navItems = [
    { section: 'Overview' },
    { path: 'dashboard', label: 'Dashboard', icon: 'space_dashboard' },
    { section: 'Operations' },
    { path: 'schedule-pickup', label: 'Schedule Pickup', icon: 'calendar_today' },
    { path: 'my-pickups', label: 'My Pickups', icon: 'local_shipping' },
    { path: 'e-waste-requests', label: 'E-Waste Requests', icon: 'devices' },
    { path: 'pickup-tracking', label: 'Pickup Tracking', icon: 'route' },
    { section: 'Commercial' },
    { path: 'scrap-price-estimator', label: 'Price Estimator', icon: 'calculate' },
    { path: 'marketplace', label: 'Marketplace', icon: 'storefront' },
    { path: 'my-listings', label: 'My Listings', icon: 'inventory_2' },
    { path: 'orders', label: 'Orders', icon: 'receipt_long' },
    { path: 'earnings', label: 'Earnings', icon: 'payments' },
    { section: 'Intelligence & Reporting' },
    { path: 'ecoguide-ai', label: 'EcoGuide AI', icon: 'smart_toy' },
    { path: 'environmental-impact', label: 'Environmental Impact', icon: 'eco' },
    { path: 'reports', label: 'Reports', icon: 'analytics' },
    { section: 'Account & System' },
    { path: 'notifications', label: 'Notifications', icon: 'notifications', badge: unreadNotificationsCount },
    { path: 'business', label: 'Business Profile', icon: 'domain' },
    { path: 'settings', label: 'Settings', icon: 'settings' },
    { path: 'help-support', label: 'Help & Support', icon: 'help_center' }
  ];

  return (
    <>
      {/* Fixed Left Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-72 bg-surface-container-low z-50 flex flex-col justify-between shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-r border-outline-variant/30 hidden md:flex">
        <div className="flex flex-col flex-1 overflow-y-auto px-space-md py-space-md">
          {/* Brand header */}
          <div className="flex items-center justify-between pb-space-md mb-space-sm border-b border-outline-variant/20">
            <button
              onClick={() => onNavigate('landing')}
              className="flex items-center gap-space-sm text-left focus:outline-none"
            >
              <img
                alt="Recyvora Brand Logo"
                className="h-7 w-auto object-contain"
                src="https://lh3.googleusercontent.com/aida/AEtjO1XWz6UyrZ1fK4sFr4JA9xxkNMipjSe4hb7UPFs-2SvvKBR_ZOwpGlgZC0-JsJGUT2KvdExCgGDBBnmL1yd6-NVl97mCIwz10-Mt-XCnchAlyiUh5Vy6eKKuXHiErFR5En20D8rJgkjB_zB6D44yXsHQTUM4LxjcLNIFj8iOjltfgLMp5Y9Xmr7d5NgkCIEjna4XC-7DRR0dlZlBRkJeTRwfR7HI2reC8E5Do9HEJIbj1D5A_wLg6DBY1q55"
              />
              <span className="font-headline-sm text-headline-sm text-primary font-bold tracking-tight">Recyvora</span>
            </button>
            <span className="font-label-sm text-label-sm bg-secondary-container text-on-secondary-container px-space-xs py-0.5 rounded font-semibold font-mono">
              Enterprise
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-1 flex-1">
            {navItems.map((item, idx) => {
              if (item.section) {
                return (
                  <div
                    key={`sec-${idx}`}
                    className="font-label-sm text-label-sm text-outline uppercase tracking-wider px-space-sm pt-space-sm pb-1 font-semibold"
                  >
                    {item.section}
                  </div>
                );
              }

              const isActive = currentPath === item.path;

              return (
                <button
                  key={item.path}
                  onClick={() => onNavigate(item.path!)}
                  className={`flex items-center justify-between px-space-sm py-space-xs rounded-lg transition-all text-left font-medium ${
                    isActive
                      ? 'bg-primary-container text-on-primary font-label-md text-label-md shadow-sm'
                      : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface text-body-sm'
                  }`}
                >
                  <div className="flex items-center gap-space-sm">
                    <span className="material-symbols-outlined text-[18px]">{item.icon}</span>
                    <span>{item.label}</span>
                  </div>
                  {item.badge ? (
                    <span className="w-5 h-5 rounded-full bg-error text-on-error text-[10px] font-bold flex items-center justify-center">
                      {item.badge}
                    </span>
                  ) : null}
                </button>
              );
            })}
          </nav>
        </div>

        {/* User Card & Workspace Switcher Trigger */}
        <div className="px-space-md py-space-md bg-surface-container/60 border-t border-outline-variant/20 relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-space-sm min-w-0">
              <img
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover flex-shrink-0 ring-1 ring-primary/20"
                src={currentUser.avatarUrl}
              />
              <div className="min-w-0">
                <div className="font-label-md text-label-md text-on-surface font-semibold truncate">
                  {currentUser.name}
                </div>
                <div className="font-body-sm text-body-sm text-on-surface-variant truncate text-xs">
                  {currentUser.roleTitle}
                </div>
              </div>
            </div>
            <button
              onClick={() => setShowWorkspaceSwitcher(!showWorkspaceSwitcher)}
              className="p-1 text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high rounded transition-colors"
              title="Workspace Switcher"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">unfold_more</span>
            </button>
          </div>

          {/* Role / Workspace popup */}
          {showWorkspaceSwitcher && (
            <div className="absolute bottom-16 left-3 right-3 bg-surface-container-lowest p-2 rounded-xl shadow-xl border border-outline-variant/40 space-y-1 text-xs">
              <div className="px-2 py-1 text-outline font-semibold uppercase text-[10px]">Switch Role &amp; View</div>
              {[
                { r: 'business', title: 'Enterprise Sustainability Lead', icon: 'domain' },
                { r: 'household', title: 'Household Customer', icon: 'person' },
                { r: 'collector', title: 'Scrap Collector (Ravi Kumar)', icon: 'local_shipping' },
                { r: 'partner', title: 'Recycling Partner (De-manuf)', icon: 'recycle' },
                { r: 'admin', title: 'Platform Administrator', icon: 'admin_panel_settings' }
              ].map((roleChoice) => (
                <button
                  key={roleChoice.r}
                  onClick={() => {
                    onSwitchRole(roleChoice.r as any);
                    setShowWorkspaceSwitcher(false);
                  }}
                  className={`w-full text-left p-2 rounded-lg flex items-center gap-2 hover:bg-surface-container ${
                    currentUser.role === roleChoice.r ? 'bg-secondary-container text-primary font-bold' : 'text-on-surface'
                  }`}
                >
                  <span className="material-symbols-outlined text-[16px]">{roleChoice.icon}</span>
                  <span className="truncate">{roleChoice.title}</span>
                </button>
              ))}
              <div className="pt-1 border-t border-outline-variant/20">
                <button
                  onClick={() => { onNavigate('landing'); setShowWorkspaceSwitcher(false); }}
                  className="w-full text-left p-2 rounded-lg text-primary font-semibold hover:bg-surface-container flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-[16px]">public</span>
                  <span>View Public Landing Page</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* Top Header for Dashboard App */}
      <header className="fixed top-0 left-0 md:left-72 right-0 h-16 bg-surface/85 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-b border-outline-variant/30 z-40 flex items-center justify-between px-gutter-lg">
        {/* Mobile menu trigger */}
        <button
          onClick={() => onNavigate('landing')}
          className="md:hidden flex items-center gap-2"
        >
          <img
            alt="Logo"
            className="h-6 w-auto"
            src="https://lh3.googleusercontent.com/aida/AEtjO1XWz6UyrZ1fK4sFr4JA9xxkNMipjSe4hb7UPFs-2SvvKBR_ZOwpGlgZC0-JsJGUT2KvdExCgGDBBnmL1yd6-NVl97mCIwz10-Mt-XCnchAlyiUh5Vy6eKKuXHiErFR5En20D8rJgkjB_zB6D44yXsHQTUM4LxjcLNIFj8iOjltfgLMp5Y9Xmr7d5NgkCIEjna4XC-7DRR0dlZlBRkJeTRwfR7HI2reC8E5Do9HEJIbj1D5A_wLg6DBY1q55"
          />
          <span className="font-bold text-primary">Recyvora</span>
        </button>

        {/* Global Search Bar */}
        <div className="hidden sm:flex items-center gap-space-sm w-96">
          <div className="relative w-full">
            <span className="material-symbols-outlined absolute left-space-sm top-1/2 -translate-y-1/2 text-[18px] text-outline">
              search
            </span>
            <input
              className="w-full bg-surface-container-lowest text-on-surface placeholder:text-outline pl-9 pr-space-md py-1.5 rounded text-body-sm font-body-sm focus:outline-none focus:ring-1 focus:ring-primary border border-outline-variant/40"
              placeholder="Search materials, pickups, listings (Cmd+K)"
              type="text"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  onNavigate('scrap-price-estimator');
                }
              }}
            />
          </div>
        </div>

        {/* Status indicator, Notifications & Actions */}
        <div className="flex items-center gap-gutter">
          <div className="hidden sm:flex items-center gap-space-xs bg-surface-container-high px-space-sm py-1 rounded">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <span className="font-label-sm text-label-sm text-secondary font-medium">Operational</span>
          </div>

          <button
            onClick={onOpenNotifications}
            className="relative p-1.5 text-on-surface-variant hover:text-on-surface hover:bg-surface-container rounded-lg transition-colors"
            type="button"
            title="Notifications"
          >
            <span className="material-symbols-outlined text-[20px]">notifications</span>
            {unreadNotificationsCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-error rounded-full"></span>
            )}
          </button>

          <button
            onClick={() => onNavigate('schedule-pickup')}
            className="inline-flex items-center gap-space-xs px-space-md py-space-xs bg-primary-container text-on-primary font-label-md text-label-md rounded-lg shadow-sm hover:bg-primary transition-colors font-semibold"
          >
            <span className="material-symbols-outlined text-[16px]">add</span>
            <span>New Request</span>
          </button>

          <button
            onClick={() => onNavigate('business')}
            className="focus:outline-none"
            title={currentUser.name}
          >
            <img
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover ring-1 ring-primary/30"
              src={currentUser.avatarUrl}
            />
          </button>
        </div>
      </header>
    </>
  );
};
