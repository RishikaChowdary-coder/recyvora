import React, { useState } from 'react';

interface BusinessHubProps {
  onOpenCertificate: () => void;
  onNavigate: (path: string) => void;
}

export const BusinessHub: React.FC<BusinessHubProps> = ({ onOpenCertificate, onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'facilities' | 'recurring' | 'reports'>('facilities');

  const facilities = [
    {
      id: 'FAC-01',
      name: 'HQ Bangalore Tech Park - Dock 4',
      address: 'Plot 42, Outer Ring Road, Devarabisanahalli, Bengaluru',
      manager: 'Elena Vance',
      status: 'Active (Daily Route)',
      divertedTonnes: '48.2 MT',
      esgRating: 'Gold Tier 98.4%'
    },
    {
      id: 'FAC-02',
      name: 'Bellandur Storage Facility - Gate 3',
      address: 'Survey 88, Bellandur Lake Road, Bengaluru',
      manager: 'Aakash Varma',
      status: 'Active (Weekly Haul)',
      divertedTonnes: '24.1 MT',
      esgRating: 'Silver Tier 94.0%'
    },
    {
      id: 'FAC-03',
      name: 'Whitefield Assembly Plant - Yard 2',
      address: 'EPIP Zone, Phase 1, Whitefield, Bengaluru',
      manager: 'Suresh Menon',
      status: 'Active (On-Demand)',
      divertedTonnes: '78.5 MT',
      esgRating: 'Platinum Tier 99.1%'
    },
    {
      id: 'FAC-04',
      name: 'Pune Industrial Depot',
      address: 'MIDC Industrial Estate, Phase 2, Chakan, Pune',
      manager: 'Vikram Joshi',
      status: 'Active (Bi-Weekly)',
      divertedTonnes: '36.8 MT',
      esgRating: 'Gold Tier 96.2%'
    }
  ];

  return (
    <div className="flex flex-col w-full px-gutter-lg pt-space-lg pb-space-xl">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md mb-space-lg">
        <div>
          <div className="inline-flex items-center gap-space-xs px-space-sm py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-semibold tracking-wide mb-1">
            <span className="material-symbols-outlined text-[15px] text-primary">domain</span>
            <span>Enterprise Multi-Facility Portal</span>
          </div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface font-semibold tracking-tight">
            Corporate Operations Hub
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl">
            Centralized circular governance across your multi-location campus footprint, recurring logistics contracts, and statutory BRSR filings.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenCertificate}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-surface-container hover:bg-surface-container-high text-primary font-semibold text-sm rounded-lg border border-outline-variant/40"
          >
            <span className="material-symbols-outlined text-[18px]">download</span>
            <span>ESG Audit Certificate</span>
          </button>
          <button
            onClick={() => onNavigate('schedule-pickup')}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary text-on-primary font-semibold text-sm rounded-lg hover:bg-tertiary-container shadow-sm"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            <span>Schedule Bulk Haul</span>
          </button>
        </div>
      </div>

      {/* Segmented Tab Controls */}
      <div className="flex items-center gap-2 p-1 bg-surface-container-low rounded-xl w-fit mb-6 border border-outline-variant/30">
        <button
          onClick={() => setActiveTab('facilities')}
          className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
            activeTab === 'facilities' ? 'bg-surface-container-lowest text-primary shadow-sm' : 'text-on-surface-variant'
          }`}
        >
          Registered Facilities (4)
        </button>
        <button
          onClick={() => setActiveTab('recurring')}
          className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
            activeTab === 'recurring' ? 'bg-surface-container-lowest text-primary shadow-sm' : 'text-on-surface-variant'
          }`}
        >
          Recurring Schedules
        </button>
        <button
          onClick={() => setActiveTab('reports')}
          className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
            activeTab === 'reports' ? 'bg-surface-container-lowest text-primary shadow-sm' : 'text-on-surface-variant'
          }`}
        >
          BRSR &amp; Scope 3 Reports
        </button>
      </div>

      {/* Tab 1: Facilities List */}
      {activeTab === 'facilities' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter-lg">
          {facilities.map((fac) => (
            <div
              key={fac.id}
              className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm border border-outline-variant/30 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs text-primary font-semibold">{fac.id}</span>
                  <span className="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-fixed text-xs font-bold font-mono">
                    {fac.status}
                  </span>
                </div>
                <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">{fac.name}</h3>
                <p className="text-body-sm text-on-surface-variant mt-1">{fac.address}</p>

                <div className="grid grid-cols-2 gap-3 mt-4 pt-3 border-t border-outline-variant/20 font-mono text-xs">
                  <div>
                    <span className="text-outline block font-sans">Facility Lead</span>
                    <strong className="text-on-surface">{fac.manager}</strong>
                  </div>
                  <div>
                    <span className="text-outline block font-sans">Mass Diverted YTD</span>
                    <strong className="text-primary">{fac.divertedTonnes}</strong>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 flex items-center justify-between">
                <span className="text-xs text-secondary font-semibold font-mono">{fac.esgRating}</span>
                <button
                  onClick={() => onNavigate('schedule-pickup')}
                  className="text-xs text-primary font-bold hover:underline"
                >
                  Book Haul for this Dock →
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 2: Recurring Schedules */}
      {activeTab === 'recurring' && (
        <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm border border-outline-variant/30 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-outline-variant/20">
            <div>
              <h3 className="font-bold text-base text-on-surface">Automated Fleet Route Contracts</h3>
              <p className="text-xs text-outline">Standing collection schedules with pre-assigned heavy logistics</p>
            </div>
            <button
              onClick={() => alert('New recurring contract builder opened. Contact assigned account coordinator.')}
              className="px-3 py-1.5 bg-primary text-on-primary text-xs font-semibold rounded-lg"
            >
              + Create Recurring Rule
            </button>
          </div>

          <div className="space-y-3">
            {[
              { route: 'Bangalore East Hub Route (Zone 4)', days: 'Every Tuesday & Thursday • 10:30 AM', vehicle: 'Tata Ace EV', weightAvg: '~400 kg/week' },
              { route: 'Whitefield Industrial Heavy Pallet Route', days: 'Every 2nd Saturday • 09:00 AM', vehicle: 'Eicher 14ft Pro EV', weightAvg: '~1,200 kg/month' },
              { route: 'Pune Chakan Industrial Corridor', days: 'Every Alternate Monday • 11:00 AM', vehicle: 'BharatBenz Medium Hauler', weightAvg: '~850 kg/bi-week' }
            ].map((rule, idx) => (
              <div key={idx} className="p-4 bg-surface-container-low rounded-xl flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-sm text-on-surface">{rule.route}</h4>
                  <p className="text-xs text-on-surface-variant font-mono mt-0.5">{rule.days}</p>
                </div>
                <div className="text-right font-mono text-xs">
                  <div className="font-bold text-primary">{rule.weightAvg}</div>
                  <div className="text-outline">{rule.vehicle}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: BRSR & ESG Reports */}
      {activeTab === 'reports' && (
        <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm border border-outline-variant/30 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-outline-variant/20">
            <div>
              <h3 className="font-bold text-base text-on-surface">Audited Statutory Disclosures</h3>
              <p className="text-xs text-outline">GRI 306 (Waste 2020) and BRSR Essential Indicator datasets</p>
            </div>
            <button
              onClick={onOpenCertificate}
              className="px-3 py-1.5 bg-primary text-on-primary text-xs font-semibold rounded-lg flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-[16px]">file_download</span>
              <span>Export All Audited Datasets (ZIP)</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-surface-container-low rounded-xl border border-outline-variant/30">
              <h4 className="font-bold text-sm text-on-surface mb-1">BRSR Principle 6 (Environment) Filing</h4>
              <p className="text-xs text-outline mb-3">Total non-hazardous waste recovered, circularity ratio, Scope 3 avoidance factor.</p>
              <button
                onClick={onOpenCertificate}
                className="text-primary text-xs font-semibold hover:underline flex items-center gap-1"
              >
                <span>Download FY 2024–25 Audit Sheet (PDF)</span>
                <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </button>
            </div>

            <div className="p-4 bg-surface-container-low rounded-xl border border-outline-variant/30">
              <h4 className="font-bold text-sm text-on-surface mb-1">State Pollution Control Form-2 &amp; Form-6</h4>
              <p className="text-xs text-outline mb-3">Statutory chain of custody receipts covering e-waste and metal recycling.</p>
              <button
                onClick={onOpenCertificate}
                className="text-primary text-xs font-semibold hover:underline flex items-center gap-1"
              >
                <span>Download Serial Manifest Binder (PDF)</span>
                <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
