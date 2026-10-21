import React from 'react';

interface CertificateModalProps {
  onClose: () => void;
  title?: string;
  facilityId?: string;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  onClose,
  title = 'ESG Statutory Compliance Certificate',
  facilityId = 'DEL-8803'
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-on-background/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-surface-container-lowest rounded-2xl shadow-2xl max-w-xl w-full overflow-hidden border border-outline-variant/60 max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="p-space-lg bg-surface-container-low border-b border-outline-variant/30 flex items-center justify-between">
          <div className="flex items-center gap-space-sm">
            <div className="w-10 h-10 rounded-xl bg-primary text-on-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-[24px]">verified</span>
            </div>
            <div>
              <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">{title}</h3>
              <p className="text-body-sm text-on-surface-variant font-mono">Form-6 / ISO 14001:2015 Audited Certificate</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg hover:bg-surface-container flex items-center justify-center text-on-surface-variant transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Certificate Paper Canvas */}
        <div className="p-space-xl overflow-y-auto space-y-space-md bg-white">
          <div className="border-4 border-double border-primary/40 p-6 rounded-xl relative bg-surface-container-low/20">
            {/* Watermark badge */}
            <div className="absolute right-4 top-4 opacity-15 pointer-events-none">
              <span className="material-symbols-outlined text-[90px] text-primary">eco</span>
            </div>

            <div className="flex items-center justify-between border-b border-outline-variant/40 pb-4 mb-4">
              <div>
                <span className="font-bold text-lg text-primary tracking-tight">RECYVORA CIRCULAR SYSTEMS</span>
                <p className="text-[11px] text-outline font-mono">Statutory Circularity & Hazardous Materials Division</p>
              </div>
              <span className="px-2.5 py-1 bg-secondary-container text-on-secondary-fixed text-xs font-bold rounded">
                CERTIFIED
              </span>
            </div>

            <div className="space-y-3 text-body-sm">
              <p className="text-on-surface leading-relaxed">
                This is to certify that facility <strong className="text-primary font-mono">{facilityId}</strong> has
                channelized and diverted secondary materials in accordance with State Pollution Control Board guidelines
                and ISO 14001:2015 environmental management standards.
              </p>

              <div className="grid grid-cols-2 gap-3 py-2 bg-surface-container-lowest p-3 rounded-lg border border-outline-variant/30 font-mono text-xs">
                <div>
                  <span className="text-outline block font-sans">Total Diverted Mass:</span>
                  <strong className="text-on-surface text-sm">1,420.0 kg</strong>
                </div>
                <div>
                  <span className="text-outline block font-sans">Scope 3 CO2 Avoided:</span>
                  <strong className="text-primary text-sm">840.0 kg CO2e</strong>
                </div>
                <div>
                  <span className="text-outline block font-sans">Primary Smelter Route:</span>
                  <strong className="text-on-surface">Melt Cycle Grade-A</strong>
                </div>
                <div>
                  <span className="text-outline block font-sans">Landfill Zero Factor:</span>
                  <strong className="text-secondary text-sm">94.2%</strong>
                </div>
              </div>

              <div className="pt-4 flex items-end justify-between text-xs text-outline font-mono">
                <div>
                  <p>Issue Date: {new Date().toLocaleDateString('en-IN', { dateStyle: 'long' })}</p>
                  <p>Certificate Serial: RCV-ESG-8803-2024-Q3</p>
                  <p>Digital Cryptographic Hash: 8b1f4a90...d621c</p>
                </div>
                <div className="text-right">
                  <div className="font-script text-base text-primary font-bold">Dr. K. S. Sundaram</div>
                  <div className="border-t border-outline/30 pt-0.5">Authorized Environmental Auditor</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-space-md bg-surface-container-low border-t border-outline-variant/30 flex items-center justify-between">
          <span className="text-body-sm text-on-surface-variant font-mono text-xs">
            Format: Compliant with BRSR / GRI / CDP
          </span>
          <div className="flex items-center gap-space-sm">
            <button
              onClick={onClose}
              className="px-space-md py-2 bg-surface-container text-on-surface rounded-lg font-label-md text-label-md hover:bg-surface-container-high transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                window.print();
              }}
              className="px-space-lg py-2 bg-primary text-on-primary rounded-lg font-label-md text-label-md font-semibold hover:bg-tertiary-container shadow-sm flex items-center gap-1.5 transition-colors"
            >
              <span className="material-symbols-outlined text-[16px]">print</span>
              <span>Print / Save PDF</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
