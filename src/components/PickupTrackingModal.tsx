import React from 'react';
import { ScrapPickup } from '../types';

interface PickupTrackingModalProps {
  pickup: ScrapPickup | null;
  onClose: () => void;
}

export const PickupTrackingModal: React.FC<PickupTrackingModalProps> = ({ pickup, onClose }) => {
  if (!pickup) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-on-background/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-surface-container-lowest rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden border border-outline-variant/50 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-space-lg bg-surface-container-low border-b border-outline-variant/30 flex items-center justify-between">
          <div className="flex items-center gap-space-sm">
            <div className="w-10 h-10 rounded-xl bg-primary text-on-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-[22px]">navigation</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">Live Chain-of-Custody Tracking</h3>
                <span className="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-fixed text-xs font-semibold">
                  {pickup.requestNumber}
                </span>
              </div>
              <p className="text-body-sm text-on-surface-variant">Real-time GPS vehicle telematics & dual-sensor verification</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg hover:bg-surface-container flex items-center justify-center text-on-surface-variant transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-space-lg overflow-y-auto space-y-space-md">
          {/* Status Tracker */}
          <div className="p-space-md bg-surface-container-low rounded-xl">
            <p className="font-label-sm text-label-sm text-outline uppercase tracking-wider mb-space-sm">
              Custody Transfer Milestones
            </p>
            <div className="flex items-center justify-between relative px-2">
              <div className="flex flex-col items-center z-10 text-center">
                <div className="w-7 h-7 rounded-full bg-primary text-on-primary flex items-center justify-center text-xs font-bold">
                  <span className="material-symbols-outlined text-[16px]">check</span>
                </div>
                <span className="text-[11px] font-semibold text-on-surface mt-1">Dispatched</span>
                <span className="text-[10px] text-outline font-mono">09:30 AM</span>
              </div>
              <div className="flex-1 h-0.5 bg-primary -mx-1"></div>

              <div className="flex flex-col items-center z-10 text-center">
                <div className="w-7 h-7 rounded-full bg-primary text-on-primary flex items-center justify-center text-xs font-bold">
                  <span className="material-symbols-outlined text-[16px]">check</span>
                </div>
                <span className="text-[11px] font-semibold text-on-surface mt-1">On Route</span>
                <span className="text-[10px] text-primary font-mono">10:05 AM</span>
              </div>
              <div className="flex-1 h-0.5 bg-primary -mx-1"></div>

              <div className="flex flex-col items-center z-10 text-center">
                <div className="w-7 h-7 rounded-full bg-secondary-container text-on-secondary-fixed flex items-center justify-center text-xs font-bold ring-4 ring-secondary-container/40 animate-pulse">
                  <span className="material-symbols-outlined text-[16px]">scale</span>
                </div>
                <span className="text-[11px] font-semibold text-primary mt-1">Gate Arrival</span>
                <span className="text-[10px] text-primary font-semibold">ETA {pickup.etaMinutes || 24}m</span>
              </div>
              <div className="flex-1 h-0.5 bg-surface-container-highest -mx-1"></div>

              <div className="flex flex-col items-center z-10 text-center opacity-50">
                <div className="w-7 h-7 rounded-full bg-surface-container-highest text-on-surface-variant flex items-center justify-center text-xs">
                  4
                </div>
                <span className="text-[11px] text-on-surface-variant mt-1">Digital Scale</span>
                <span className="text-[10px] text-outline">Pending</span>
              </div>
              <div className="flex-1 h-0.5 bg-surface-container-highest -mx-1"></div>

              <div className="flex flex-col items-center z-10 text-center opacity-50">
                <div className="w-7 h-7 rounded-full bg-surface-container-highest text-on-surface-variant flex items-center justify-center text-xs">
                  5
                </div>
                <span className="text-[11px] text-on-surface-variant mt-1">Instant NEFT</span>
                <span className="text-[10px] text-outline">Settlement</span>
              </div>
            </div>
          </div>

          {/* Simulated Map Visual */}
          <div className="relative h-44 rounded-xl overflow-hidden bg-surface-container-high border border-outline-variant/40 flex items-center justify-center">
            {/* Map styling grid */}
            <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#176b50_1px,transparent_1px)] [background-size:16px_16px]"></div>
            
            {/* Simulated route SVG */}
            <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
              <path
                d="M 60 120 Q 180 40 320 80 T 520 50"
                fill="none"
                stroke="#176b50"
                strokeWidth="4"
                strokeDasharray="6 4"
                className="animate-pulse"
              />
            </svg>

            {/* Destination Pin */}
            <div className="absolute left-[60px] top-[100px] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
              <span className="px-2 py-0.5 rounded bg-surface-container-lowest text-[10px] font-bold text-on-surface shadow-sm mb-1">
                Facility Bay
              </span>
              <div className="w-6 h-6 rounded-full bg-error text-on-error flex items-center justify-center shadow-md">
                <span className="material-symbols-outlined text-[14px]">home_work</span>
              </div>
            </div>

            {/* Vehicle Pin */}
            <div className="absolute left-[360px] top-[75px] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center animate-bounce">
              <span className="px-2 py-0.5 rounded bg-primary text-on-primary text-[10px] font-bold shadow-md mb-1 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-tertiary-fixed animate-ping"></span>
                Ravi Kumar (ETA {pickup.etaMinutes || 24}m)
              </span>
              <div className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-lg ring-4 ring-primary-container/30">
                <span className="material-symbols-outlined text-[18px]">local_shipping</span>
              </div>
            </div>
          </div>

          {/* Assigned Driver Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm">
            <div className="p-space-sm bg-surface-container-low rounded-lg flex items-center gap-space-sm">
              <div className="w-10 h-10 rounded-full bg-secondary-container text-on-secondary-fixed flex items-center justify-center font-bold">
                RK
              </div>
              <div>
                <p className="font-label-md text-label-md font-bold text-on-surface">
                  {pickup.collectorName || 'Ramesh Kumar'}
                </p>
                <p className="text-body-sm text-outline">Collector ID: {pickup.collectorId || 'RC-8842'}</p>
                <p className="text-[11px] text-primary font-medium">★ 4.96 (420+ verified pickups)</p>
              </div>
            </div>

            <div className="p-space-sm bg-surface-container-low rounded-lg flex items-center gap-space-sm">
              <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-[20px]">electric_bolt</span>
              </div>
              <div>
                <p className="font-label-md text-label-md font-bold text-on-surface">
                  {pickup.collectorVehicle || 'Tata Ace EV (KA-03-HA-8842)'}
                </p>
                <p className="text-body-sm text-outline">Calibrated Precision Scale: Floor & Platform</p>
                <p className="text-[11px] text-secondary font-medium">Zero Tailpipe Emission Fleet</p>
              </div>
            </div>
          </div>

          {/* Manifest Breakdown */}
          <div className="border border-outline-variant/40 rounded-xl p-space-md bg-surface-container-lowest">
            <div className="flex items-center justify-between mb-2">
              <span className="font-label-md text-label-md font-bold text-on-surface">Manifest Lot Summary</span>
              <span className="font-mono text-xs text-primary font-semibold">
                Est. ~{pickup.totalWeightKg} kg • ₹{pickup.estimatedPayoutFloor?.toLocaleString('en-IN')} - ₹{pickup.estimatedPayoutCeiling?.toLocaleString('en-IN')}
              </span>
            </div>
            <div className="space-y-1.5 divide-y divide-outline-variant/20">
              {pickup.items.map((it) => (
                <div key={it.id} className="pt-1.5 flex items-center justify-between text-body-sm">
                  <div>
                    <span className="font-medium text-on-surface">{it.name}</span>
                    <span className="text-outline text-xs block">{it.subtext}</span>
                  </div>
                  <div className="text-right font-mono">
                    <span className="font-semibold text-on-surface">{it.weightKg} kg</span>
                    <span className="text-primary text-xs block">₹{it.totalValue.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tamper Evident Proof */}
          <div className="p-space-sm bg-surface-container-low rounded-lg flex items-center justify-between text-body-sm font-mono text-outline">
            <span className="flex items-center gap-1.5 text-primary font-semibold">
              <span className="material-symbols-outlined text-[16px]">verified</span>
              Tamper-evident cryptographically signed manifest
            </span>
            <span className="text-xs">SHA256: {pickup.manifestHash || '9b2df41a...88e'}</span>
          </div>
        </div>

        {/* Footer */}
        <div className="p-space-md bg-surface-container-low border-t border-outline-variant/30 flex items-center justify-between">
          <span className="text-body-sm text-on-surface-variant flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px] text-primary">call</span>
            Need help? Collector hotline: +91 80 4912 3300
          </span>
          <button
            onClick={onClose}
            className="px-space-md py-1.5 bg-primary text-on-primary font-label-md text-label-md rounded-lg shadow-sm hover:bg-tertiary-container transition-colors"
          >
            Close Tracker
          </button>
        </div>
      </div>
    </div>
  );
};
