import React from 'react';

interface ReferenceImageModalProps {
  screenId: string;
  onClose: () => void;
}

const SCREEN_REF_MAP: Record<string, { title: string; imagePath: string; htmlSource: string; notes: string }> = {
  landing: {
    title: 'Screen 1: Landing Page Specification',
    imagePath: '/assets/aistudio/Image_1_315ffb3d.png',
    htmlSource: 'Image_2_156418d7.html',
    notes: 'Public portal hero with live bulk manifest visual card, trust capabilities, problem vs solution matrix, services verticals, 4-step process, and marketplace preview.'
  },
  'schedule-pickup': {
    title: 'Screen 2: Schedule Scrap Pickup Specification',
    imagePath: '/assets/aistudio/Image_3_9ab386d8.png',
    htmlSource: 'Image_4_3bcff0b6.html',
    notes: 'Enterprise doorstep booking console with 5-step stepper, Step 3 logistics scheduling (saved locations, date pills, time slot capacity), and manifest summary ledger.'
  },
  'scrap-price-estimator': {
    title: 'Screen 3: Scrap Price Estimator Specification',
    imagePath: '/assets/aistudio/Image_5_84715e2b.png',
    htmlSource: 'Image_6_b8866f61.html',
    notes: 'Valuation calculator across 6 material streams, dynamic volume tier incentives, purity deductions, instant valuation breakdown, and live regional commodity rate index.'
  },
  dashboard: {
    title: 'Screen 4: Operational Overview Dashboard Specification',
    imagePath: '/assets/aistudio/Image_7_d4554119.png',
    htmlSource: 'Image_8_8270ebd3.html',
    notes: 'Enterprise command dashboard with priority collection banner, 4 bento KPI cards, collection volume vs value bimodal chart, material composition breakdown, and recent manifests ledger.'
  }
};

export const ReferenceImageModal: React.FC<ReferenceImageModalProps> = ({ screenId, onClose }) => {
  const spec = SCREEN_REF_MAP[screenId] || SCREEN_REF_MAP.landing;

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fade-in">
      <div className="bg-surface-container-lowest max-w-5xl w-full rounded-2xl shadow-2xl border border-outline-variant/40 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 bg-surface-container-high border-b border-outline-variant/30 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                {spec.title}
              </h3>
            </div>
            <p className="text-xs text-on-surface-variant mt-0.5">
              Built from <code className="bg-surface-container px-1 py-0.5 rounded font-mono text-primary font-bold">{spec.htmlSource}</code> • {spec.notes}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-on-surface-variant hover:text-on-surface hover:bg-surface-container rounded-lg transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Image Preview Area */}
        <div className="flex-1 overflow-auto p-4 bg-surface-dim/40 flex justify-center">
          <div className="max-w-4xl w-full bg-white rounded-xl shadow-lg overflow-hidden border border-outline-variant/30">
            <div className="px-4 py-2 bg-surface-container-high text-xs text-on-surface-variant flex items-center justify-between border-b border-outline-variant/20">
              <span className="font-semibold text-primary">Original Reference Image: {spec.imagePath}</span>
              <a
                href={spec.imagePath}
                target="_blank"
                rel="noreferrer"
                className="text-primary hover:underline flex items-center gap-1 font-semibold"
              >
                <span>Open Full Size</span>
                <span className="material-symbols-outlined text-[14px]">open_in_new</span>
              </a>
            </div>
            <img
              src={spec.imagePath}
              alt={spec.title}
              className="w-full h-auto block select-none"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-surface-container-low border-t border-outline-variant/30 flex items-center justify-between text-xs">
          <span className="text-on-surface-variant">
            The active screen in the app is built directly with this HTML structure and styling.
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-primary text-on-primary font-semibold rounded-lg hover:bg-tertiary-container transition-colors"
          >
            Back to Interactive App
          </button>
        </div>
      </div>
    </div>
  );
};
