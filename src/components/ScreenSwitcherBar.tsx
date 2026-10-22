import React, { useState } from 'react';

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
  const [collapsed, setCollapsed] = useState<boolean>(false);

  const screens = [
    {
      id: 'landing',
      label: 'Screen 1: Landing',
      shortLabel: 'Screen 1: Landing',
      icon: 'public',
      tag: 'Public'
    },
    {
      id: 'schedule-pickup',
      label: 'Screen 2: Schedule',
      shortLabel: 'Screen 2: Schedule',
      icon: 'calendar_today',
      tag: 'Pickup'
    },
    {
      id: 'scrap-price-estimator',
      label: 'Screen 3: Estimator',
      shortLabel: 'Screen 3: Estimator',
      icon: 'calculate',
      tag: 'Pricing'
    },
    {
      id: 'dashboard',
      label: 'Screen 4: Dashboard',
      shortLabel: 'Screen 4: Dashboard',
      icon: 'space_dashboard',
      tag: 'Operations'
    }
  ];

  const currentScreen = screens.find((s) => s.id === currentPath);

  if (collapsed) {
    return (
      <div className="fixed bottom-4 right-4 z-[9990]">
        <button
          onClick={() => setCollapsed(false)}
          className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-primary text-on-primary shadow-xl hover:bg-tertiary-container transition-all font-semibold text-xs border border-white/20"
          title="Open Screen Switcher"
        >
          <span className="material-symbols-outlined text-[18px]">layers</span>
          <span>Screens (4)</span>
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[9990] max-w-[95vw]">
      <div className="bg-surface-container-lowest/95 backdrop-blur-xl border border-outline-variant/60 shadow-2xl rounded-2xl px-3 py-2 flex items-center gap-1.5 sm:gap-2">
        {/* Badge */}
        <div className="hidden lg:flex items-center gap-1.5 pl-1 pr-2 border-r border-outline-variant/40 text-xs">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
          <span className="font-bold text-on-surface">Screen Switcher</span>
        </div>

        {/* Screen Buttons */}
        <div className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto py-0.5">
          {screens.map((screen, idx) => {
            const isActive = currentPath === screen.id;
            return (
              <button
                key={screen.id}
                onClick={() => onNavigate(screen.id)}
                className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-primary-container text-on-primary shadow-sm ring-1 ring-primary'
                    : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
                }`}
                title={screen.label}
              >
                <span className="w-4 h-4 rounded-full bg-black/15 text-[10px] flex items-center justify-center font-mono">
                  {idx + 1}
                </span>
                <span className="material-symbols-outlined text-[15px]">{screen.icon}</span>
                <span className="hidden sm:inline">{screen.label.replace('Screen ', 'Screen ')}</span>
                <span className="sm:hidden">#{idx + 1}</span>
              </button>
            );
          })}
        </div>

        {/* Reference Image Inspector Modal Trigger */}
        <div className="flex items-center gap-1.5 pl-1.5 border-l border-outline-variant/40">
          {currentScreen && (
            <button
              onClick={() => onOpenReferenceImage(currentScreen.id)}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-semibold bg-secondary-container text-on-secondary-container hover:bg-secondary-container/80 transition-colors"
              title="Compare live screen with original HTML design reference"
            >
              <span className="material-symbols-outlined text-[15px] text-primary">visibility</span>
              <span className="hidden md:inline">Inspect Spec</span>
            </button>
          )}

          {/* Minimize / Collapse */}
          <button
            onClick={() => setCollapsed(true)}
            className="p-1 rounded-lg text-outline hover:text-on-surface hover:bg-surface-container text-xs transition-colors"
            title="Minimize bar"
          >
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>
      </div>
    </div>
  );
};
