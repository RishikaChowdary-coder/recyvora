import React from 'react';

interface ScreenSwitcherBarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onOpenReferenceImage: (screenId: string) => void;
}

export const ScreenSwitcherBar: React.FC<ScreenSwitcherBarProps> = ({
  currentPath,
  onNavigate,
  onOpenReferenceImage
}) => {
  const screens = [
    {
      id: 'landing',
      label: 'Screen 1: Landing Page',
      badge: 'Public Portal',
      icon: 'public',
      refImg: '/assets/aistudio/Image_1_315ffb3d.png'
    },
    {
      id: 'schedule-pickup',
      label: 'Screen 2: Schedule Pickup',
      badge: 'Step 3 Form',
      icon: 'calendar_today',
      refImg: '/assets/aistudio/Image_3_9ab386d8.png'
    },
    {
      id: 'scrap-price-estimator',
      label: 'Screen 3: Price Estimator',
      badge: 'Valuation & Index',
      icon: 'calculate',
      refImg: '/assets/aistudio/Image_5_84715e2b.png'
    },
    {
      id: 'dashboard',
      label: 'Screen 4: Overview Dashboard',
      badge: 'Operational KPIs',
      icon: 'space_dashboard',
      refImg: '/assets/aistudio/Image_7_d4554119.png'
    }
  ];

  const currentScreen = screens.find((s) => s.id === currentPath);

  return (
    <div className="sticky top-0 z-50 bg-surface-container-lowest/95 backdrop-blur-md border-b border-outline-variant/40 shadow-xs px-4 py-2">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        {/* Left: Direct Screen Navigator Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-0.5 scrollbar-none">
          <span className="text-[11px] font-bold text-outline uppercase tracking-wider hidden sm:inline mr-1">
            Screens:
          </span>
          {screens.map((screen, idx) => {
            const isActive = currentPath === screen.id;
            return (
              <button
                key={screen.id}
                onClick={() => onNavigate(screen.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-primary-container text-on-primary shadow-sm'
                    : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
                }`}
              >
                <span className="w-4 h-4 rounded-full bg-black/15 text-[10px] flex items-center justify-center font-mono">
                  {idx + 1}
                </span>
                <span className="material-symbols-outlined text-[15px]">{screen.icon}</span>
                <span>{screen.label.replace(/Screen \d+: /, '')}</span>
                <span className={`text-[10px] px-1 py-0.2 rounded font-normal hidden md:inline ${
                  isActive ? 'bg-primary/20 text-on-primary' : 'bg-surface-container-high text-outline'
                }`}>
                  {screen.badge}
                </span>
              </button>
            );
          })}
        </div>

        {/* Right: Quick shortcuts & Reference Image Modal trigger */}
        <div className="flex items-center gap-2">
          {currentScreen && (
            <button
              onClick={() => onOpenReferenceImage(currentScreen.id)}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-surface-container hover:bg-secondary-container text-on-surface transition-colors border border-outline-variant/30"
              title="Compare with original design screenshot"
            >
              <span className="material-symbols-outlined text-[15px] text-primary">visibility</span>
              <span className="hidden sm:inline">Reference Spec</span>
            </button>
          )}

          <div className="h-4 w-px bg-outline-variant/40 hidden sm:block"></div>

          <button
            onClick={() => onNavigate('marketplace')}
            className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
              currentPath === 'marketplace' ? 'text-primary font-bold' : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Marketplace
          </button>
          <button
            onClick={() => onNavigate('e-waste-requests')}
            className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
              currentPath === 'e-waste-requests' ? 'text-primary font-bold' : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            E-Waste
          </button>
        </div>
      </div>
    </div>
  );
};
