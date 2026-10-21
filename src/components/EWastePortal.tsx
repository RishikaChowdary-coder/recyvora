import React, { useState } from 'react';
import { EWasteItem } from '../types';
import { ewasteRequests as initialEWaste } from '../data/mockData';

interface EWastePortalProps {
  onNavigate: (path: string) => void;
  onOpenCertificate: () => void;
}

export const EWastePortal: React.FC<EWastePortalProps> = ({ onNavigate, onOpenCertificate }) => {
  const [requests, setRequests] = useState<EWasteItem[]>(initialEWaste);
  const [showRequestModal, setShowRequestModal] = useState<boolean>(false);

  // Form states
  const [deviceType, setDeviceType] = useState<string>('Enterprise Server Racks');
  const [brandModel, setBrandModel] = useState<string>('HP ProLiant DL380 Gen10 (4 Units)');
  const [quantity, setQuantity] = useState<number>(4);
  const [weightKg, setWeightKg] = useState<number>(65);
  const [dataSanitization, setDataSanitization] = useState<boolean>(true);
  const [facilityAddress, setFacilityAddress] = useState<string>('HQ Bangalore Tech Park - Dock 4');

  const handleCreateRequest = (e: React.FormEvent) => {
    e.preventDefault();
    const newReq: EWasteItem = {
      id: `ew-${Date.now()}`,
      requestNumber: `#EW-${Math.floor(1000 + Math.random() * 9000)}`,
      title: `${deviceType} - ${brandModel}`,
      deviceType: deviceType,
      brandModel: brandModel,
      quantity: quantity,
      weightKg: weightKg,
      dataDestructionRequested: dataSanitization,
      status: 'Requested',
      facilityAddress: facilityAddress,
      date: 'Today'
    };

    setRequests([newReq, ...requests]);
    setShowRequestModal(false);
    alert('E-Waste Compliance Audit & Haulage Request registered! Form-6 tracking initiated.');
  };

  return (
    <div className="flex flex-col w-full px-gutter-lg pt-space-lg pb-space-xl">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md mb-space-lg">
        <div>
          <div className="inline-flex items-center gap-space-xs px-space-sm py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-semibold tracking-wide mb-1">
            <span className="material-symbols-outlined text-[15px] text-primary">verified_user</span>
            <span>Statutory E-Waste Management &amp; Demanufacturing</span>
          </div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface font-semibold tracking-tight">
            E-Waste Compliance Portal
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl">
            Certified channelization of obsolete enterprise IT, data-bearing media sanitization, and hazardous battery recovery under state pollution control board rules.
          </p>
        </div>

        <button
          onClick={() => setShowRequestModal(true)}
          className="inline-flex items-center gap-space-xs px-space-lg py-2.5 bg-primary-container text-on-primary font-label-md text-label-md font-semibold rounded-lg shadow-sm hover:bg-primary transition-all self-start md:self-auto"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
          <span>Request E-Waste Audit &amp; Pickup</span>
        </button>
      </div>

      {/* Compliance Callout Banner */}
      <div className="bg-secondary-container/40 border border-primary/20 rounded-xl p-space-md mb-space-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary text-on-primary flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[22px]">security</span>
          </div>
          <div>
            <h4 className="font-bold text-sm text-on-surface">Data Sanitization Guarantee (DoD 5220.22-M)</h4>
            <p className="text-xs text-on-surface-variant">
              Every data-bearing storage device undergoes physical degaussing and certified cryptographic shredding with serial-tagged Form-6 destruction documentation.
            </p>
          </div>
        </div>
        <button
          onClick={onOpenCertificate}
          className="px-3 py-1.5 bg-surface-container-lowest text-primary text-xs font-semibold rounded-lg shadow-sm hover:bg-surface-container border border-outline-variant/30 shrink-0"
        >
          View Sample Form-6 Cert
        </button>
      </div>

      {/* Active Requests List */}
      <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/30 overflow-hidden">
        <div className="p-space-lg flex items-center justify-between border-b border-outline-variant/20">
          <div>
            <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">Statutory E-Waste Requests</h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Track processing status, safe destruction certificates, and material diversion mass
            </p>
          </div>
          <span className="font-mono text-xs text-primary font-semibold">Active Lots: {requests.length}</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider">
              <tr>
                <th className="py-space-sm px-space-lg font-semibold">Lot ID</th>
                <th className="py-space-sm px-space-md font-semibold">Asset / Stream</th>
                <th className="py-space-sm px-space-md font-semibold">Quantity &amp; Weight</th>
                <th className="py-space-sm px-space-md font-semibold">Data Sanitization</th>
                <th className="py-space-sm px-space-md font-semibold">Processing Status</th>
                <th className="py-space-sm px-space-lg text-right font-semibold">Statutory Certificate</th>
              </tr>
            </thead>
            <tbody className="divide-y-0 text-on-surface font-body-sm text-body-sm">
              {requests.map((r) => (
                <tr key={r.id} className="hover:bg-surface-container-low transition-colors">
                  <td className="py-space-md px-space-lg font-mono font-semibold text-primary">
                    {r.requestNumber}
                  </td>
                  <td className="py-space-md px-space-md">
                    <div className="font-semibold text-on-surface">{r.title}</div>
                    <div className="text-outline text-xs">{r.facilityAddress}</div>
                  </td>
                  <td className="py-space-md px-space-md font-mono">
                    <span className="font-bold">{r.quantity} Units</span> ({r.weightKg} kg)
                  </td>
                  <td className="py-space-md px-space-md">
                    {r.dataDestructionRequested ? (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary bg-secondary-container px-2 py-0.5 rounded">
                        <span className="material-symbols-outlined text-[14px]">shield</span>
                        DoD Shred Required
                      </span>
                    ) : (
                      <span className="text-xs text-outline font-mono">Hardware Recovery Only</span>
                    )}
                  </td>
                  <td className="py-space-md px-space-md">
                    <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-surface-container text-secondary">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping"></span>
                      {r.status}
                    </span>
                  </td>
                  <td className="py-space-md px-space-lg text-right">
                    <button
                      onClick={onOpenCertificate}
                      className="text-primary hover:underline text-xs font-semibold inline-flex items-center gap-1"
                    >
                      <span className="material-symbols-outlined text-[14px]">download</span>
                      <span>Download Form-6</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Request Modal */}
      {showRequestModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-on-background/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-surface-container-lowest rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-outline-variant/40">
            <div className="p-4 bg-surface-container-low border-b border-outline-variant/30 flex items-center justify-between">
              <h3 className="font-bold text-lg text-on-surface">Request Hazardous E-Waste Audit &amp; Pickup</h3>
              <button
                onClick={() => setShowRequestModal(false)}
                className="w-8 h-8 rounded-lg hover:bg-surface-container flex items-center justify-center text-outline"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={handleCreateRequest} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-outline uppercase mb-1">Equipment Category</label>
                <select
                  value={deviceType}
                  onChange={(e) => setDeviceType(e.target.value)}
                  className="w-full bg-surface-container-low px-3 py-2 rounded border border-outline-variant/60 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  <option>Enterprise Server Racks &amp; Blades</option>
                  <option>Laptops, Desktops &amp; Workstations</option>
                  <option>Hazardous Lithium &amp; VRLA Batteries</option>
                  <option>Telecom &amp; Switching Hardware</option>
                  <option>Printers &amp; Peripheral Assemblies</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-outline uppercase mb-1">Brand, Model &amp; Serial Tag Info</label>
                <input
                  type="text"
                  required
                  value={brandModel}
                  onChange={(e) => setBrandModel(e.target.value)}
                  className="w-full bg-surface-container-low px-3 py-2 rounded border border-outline-variant/60 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-outline uppercase mb-1">Quantity (Units)</label>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                    className="w-full bg-surface-container-low px-3 py-2 rounded border border-outline-variant/60 text-sm font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-outline uppercase mb-1">Est. Total Weight (kg)</label>
                  <input
                    type="number"
                    min="1"
                    value={weightKg}
                    onChange={(e) => setWeightKg(parseFloat(e.target.value) || 1)}
                    className="w-full bg-surface-container-low px-3 py-2 rounded border border-outline-variant/60 text-sm font-mono font-bold"
                  />
                </div>
              </div>

              <div className="p-3 bg-secondary-container/30 rounded-xl border border-primary/20">
                <label className="flex items-start gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={dataSanitization}
                    onChange={(e) => setDataSanitization(e.target.checked)}
                    className="mt-0.5 text-primary focus:ring-primary rounded"
                  />
                  <div>
                    <span className="font-bold text-xs text-on-surface block">Request DoD 5220.22-M Data Destruction Certificate</span>
                    <span className="text-[11px] text-outline">
                      Mandatory for hard drives and solid state storage. Form-6 signed certification included.
                    </span>
                  </div>
                </label>
              </div>

              <div>
                <label className="block text-xs font-semibold text-outline uppercase mb-1">Collection Facility Dock</label>
                <input
                  type="text"
                  value={facilityAddress}
                  onChange={(e) => setFacilityAddress(e.target.value)}
                  className="w-full bg-surface-container-low px-3 py-2 rounded border border-outline-variant/60 text-sm"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowRequestModal(false)}
                  className="px-4 py-2 bg-surface-container rounded-lg text-sm font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-on-primary rounded-lg text-sm font-semibold shadow hover:bg-tertiary-container"
                >
                  Confirm E-Waste Pickup
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
