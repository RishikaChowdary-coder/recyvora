import React, { useState } from 'react';
import { ScrapPickup, ManifestItem } from '../types';

interface SchedulePickupProps {
  onPickupCreated: (pickup: ScrapPickup) => void;
  onNavigate: (path: string) => void;
  initialMaterial?: string;
  initialRate?: number;
}

export const SchedulePickup: React.FC<SchedulePickupProps> = ({
  onPickupCreated,
  onNavigate,
  initialMaterial,
  initialRate
}) => {
  const [currentStep, setCurrentStep] = useState<number>(3); // Matches the mockup screen which shows Step 3 Active!
  const [facilityAddress, setFacilityAddress] = useState<string>('HQ Bangalore Tech Park - Dock 4 (Saved)');
  const [streetAddress, setStreetAddress] = useState<string>('Plot 42, Outer Ring Road, Devarabisanahalli');
  const [city] = useState<string>('Bengaluru');
  const [postalCode, setPostalCode] = useState<string>('560103');
  const [dockDetails, setDockDetails] = useState<string>('Sub-Level B2, Freight Bay 04, Service Lift Access');
  const [collectionDate, setCollectionDate] = useState<string>('Thursday, Oct 24, 2024');
  const [selectedSlot, setSelectedSlot] = useState<string>('11:00 AM - 01:00 PM');
  const [contactName, setContactName] = useState<string>('Elena Vance (+91 98765 43210)');
  const [specialInstructions, setSpecialInstructions] = useState<string>(
    'Security clearance required at Gate 2. Elevator accessible for bulk trolleys.'
  );

  // Dynamic manifest items
  const [manifestItems, setManifestItems] = useState<ManifestItem[]>([
    {
      id: 'm-1',
      name: initialMaterial ? initialMaterial : 'Copper Wire (Clean Scrap)',
      subtext: 'Grade 1 Heavy Bare • Approx. 15.0 kg',
      category: 'non-ferrous',
      weightKg: 15.0,
      ratePerKg: initialRate || 480,
      totalValue: 15.0 * (initialRate || 480),
      grade: 'Millberry 99.9%'
    },
    {
      id: 'm-2',
      name: 'Aluminium Cast & Extrusion',
      subtext: 'Tense Grade Scrap • Approx. 20.0 kg',
      category: 'non-ferrous',
      weightKg: 20.0,
      ratePerKg: 145,
      totalValue: 2900,
      grade: 'HE9 6063'
    }
  ]);

  const [bookingSuccess, setBookingSuccess] = useState<ScrapPickup | null>(null);

  const totalWeight = manifestItems.reduce((acc, it) => acc + it.weightKg, 0);
  const totalGrossValue = manifestItems.reduce((acc, it) => acc + it.totalValue, 0);
  const estimatedFloor = Math.round(totalGrossValue * 0.94);
  const estimatedCeiling = Math.round(totalGrossValue * 1.03);

  const handleFacilityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setFacilityAddress(val);
    if (val.includes('HQ Bangalore')) {
      setStreetAddress('Plot 42, Outer Ring Road, Devarabisanahalli');
      setPostalCode('560103');
      setDockDetails('Sub-Level B2, Freight Bay 04, Service Lift Access');
    } else if (val.includes('Bellandur')) {
      setStreetAddress('Survey 88, Bellandur Lake Road');
      setPostalCode('560103');
      setDockDetails('Loading Bay 1, Ground Floor');
    } else if (val.includes('Whitefield')) {
      setStreetAddress('EPIP Zone, Phase 1, Whitefield');
      setPostalCode('560066');
      setDockDetails('Gate 3, Ramp B, Heavy Pallet Area');
    }
  };

  const handleProceed = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    } else {
      // Final submit
      const newPickup: ScrapPickup = {
        id: `pk-${Date.now()}`,
        requestNumber: `#RCV-${Math.floor(1000 + Math.random() * 9000)}`,
        title: manifestItems.map(it => it.name).join(' & '),
        categoryLabel: 'Industrial Non-Ferrous',
        items: manifestItems,
        totalWeightKg: totalWeight,
        estimatedPayoutFloor: estimatedFloor,
        estimatedPayoutCeiling: estimatedCeiling,
        date: collectionDate,
        timeSlot: selectedSlot,
        status: 'collector_assigned',
        facilityName: facilityAddress,
        facilityAddress: streetAddress,
        city: city,
        postalCode: postalCode,
        dockDetails: dockDetails,
        contactName: contactName.split('(')[0].trim(),
        contactPhone: contactName.includes('(') ? contactName.split('(')[1].replace(')', '') : '+91 98765 43210',
        specialInstructions: specialInstructions,
        collectorName: 'Ravi Kumar',
        collectorId: 'RC-8842',
        collectorVehicle: 'Tata Ace EV (KA-03-HA-8842)',
        etaMinutes: 24,
        manifestHash: Math.random().toString(16).substring(2, 10) + 'f41a',
        createdAt: 'Just now'
      };

      onPickupCreated(newPickup);
      setBookingSuccess(newPickup);
    }
  };

  return (
    <div className="flex flex-col w-full pb-16">
      {/* Top Context & Progress Header */}
      <div className="px-gutter-lg pt-space-lg pb-space-md">
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-sm mb-space-lg">
          <div>
            <div className="inline-flex items-center gap-space-xs px-space-sm py-0.5 rounded bg-surface-container-high text-primary font-label-sm text-label-sm uppercase tracking-wider mb-space-xs">
              <span className="material-symbols-outlined text-[14px]">local_shipping</span>
              <span>Doorstep Logistics Portal</span>
            </div>
            <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">Schedule a Scrap Pickup</h1>
            <p className="font-body-md text-body-md text-on-surface-variant mt-1">
              Select materials, provide weight estimates, and book a verified doorstep collector.
            </p>
          </div>
          <div className="flex items-center gap-space-xs bg-surface-container-lowest px-space-md py-space-xs rounded-xl shadow-sm">
            <span className="material-symbols-outlined text-primary text-[20px]">verified_user</span>
            <div className="text-left">
              <p className="font-label-sm text-label-sm text-outline uppercase tracking-wider">Protocol</p>
              <p className="font-label-md text-label-md text-on-surface font-semibold">ISO 14001 Compliant</p>
            </div>
          </div>
        </div>

        {/* 5-Step Stepper Tracker */}
        <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm mb-space-md">
          <div className="grid grid-cols-5 gap-space-xs relative">
            {/* Step 1 */}
            <button
              type="button"
              onClick={() => setCurrentStep(1)}
              className="flex flex-col items-center text-center group cursor-pointer focus:outline-none"
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-label-md text-label-md shadow-sm transition-transform group-hover:scale-105 ${
                  currentStep > 1
                    ? 'bg-primary-container text-on-primary'
                    : currentStep === 1
                    ? 'bg-primary text-on-primary ring-4 ring-primary-container/20'
                    : 'bg-surface-container-high text-on-surface-variant'
                }`}
              >
                {currentStep > 1 ? <span className="material-symbols-outlined text-[18px]">check</span> : '1'}
              </div>
              <span className="font-label-md text-label-md text-primary font-semibold mt-space-xs">Material Selection</span>
              <span className="font-body-sm text-body-sm text-outline hidden sm:block">
                {currentStep > 1 ? 'Step 1 • Completed' : 'In Progress'}
              </span>
            </button>

            {/* Step 2 */}
            <button
              type="button"
              onClick={() => setCurrentStep(2)}
              className="flex flex-col items-center text-center group cursor-pointer focus:outline-none"
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-label-md text-label-md shadow-sm transition-transform group-hover:scale-105 ${
                  currentStep > 2
                    ? 'bg-primary-container text-on-primary'
                    : currentStep === 2
                    ? 'bg-primary text-on-primary ring-4 ring-primary-container/20'
                    : 'bg-surface-container-high text-on-surface-variant'
                }`}
              >
                {currentStep > 2 ? <span className="material-symbols-outlined text-[18px]">check</span> : '2'}
              </div>
              <span className="font-label-md text-label-md text-primary font-semibold mt-space-xs">Material Details</span>
              <span className="font-body-sm text-body-sm text-outline hidden sm:block">
                {currentStep > 2 ? 'Step 2 • Completed' : currentStep === 2 ? 'In Progress' : 'Upcoming'}
              </span>
            </button>

            {/* Step 3 (Active in Mockup) */}
            <button
              type="button"
              onClick={() => setCurrentStep(3)}
              className="flex flex-col items-center text-center relative focus:outline-none"
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-label-md text-label-md shadow-md ${
                  currentStep === 3
                    ? 'bg-primary text-on-primary ring-4 ring-primary-container/20'
                    : currentStep > 3
                    ? 'bg-primary-container text-on-primary'
                    : 'bg-surface-container-high text-on-surface-variant'
                }`}
              >
                {currentStep > 3 ? <span className="material-symbols-outlined text-[18px]">check</span> : '3'}
              </div>
              <span
                className={`font-label-md text-label-md mt-space-xs ${
                  currentStep === 3 ? 'text-on-surface font-bold' : 'text-on-surface-variant'
                }`}
              >
                Pickup Schedule
              </span>
              <span className="font-label-sm text-label-sm text-primary font-semibold hidden sm:block uppercase tracking-wider">
                {currentStep === 3 ? 'In Progress' : currentStep > 3 ? 'Completed' : 'Upcoming'}
              </span>
            </button>

            {/* Step 4 */}
            <button
              type="button"
              onClick={() => setCurrentStep(4)}
              className={`flex flex-col items-center text-center focus:outline-none ${
                currentStep < 4 ? 'opacity-60' : ''
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-label-md text-label-md ${
                  currentStep === 4
                    ? 'bg-primary text-on-primary ring-4 ring-primary-container/20'
                    : currentStep > 4
                    ? 'bg-primary-container text-on-primary'
                    : 'bg-surface-container-high text-on-surface-variant'
                }`}
              >
                {currentStep > 4 ? <span className="material-symbols-outlined text-[18px]">check</span> : '4'}
              </div>
              <span className="font-label-md text-label-md text-on-surface-variant mt-space-xs">Estimated Value</span>
              <span className="font-body-sm text-body-sm text-outline hidden sm:block">
                {currentStep === 4 ? 'In Progress' : currentStep > 4 ? 'Completed' : 'Upcoming'}
              </span>
            </button>

            {/* Step 5 */}
            <button
              type="button"
              onClick={() => setCurrentStep(5)}
              className={`flex flex-col items-center text-center focus:outline-none ${
                currentStep < 5 ? 'opacity-60' : ''
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-label-md text-label-md ${
                  currentStep === 5
                    ? 'bg-primary text-on-primary ring-4 ring-primary-container/20'
                    : 'bg-surface-container-high text-on-surface-variant'
                }`}
              >
                <span>5</span>
              </div>
              <span className="font-label-md text-label-md text-on-surface-variant mt-space-xs">Review & Confirm</span>
              <span className="font-body-sm text-body-sm text-outline hidden sm:block">
                {currentStep === 5 ? 'Ready to Lock' : 'Upcoming'}
              </span>
            </button>
          </div>
        </div>

        {/* Step 1 & 2 Completed Summary Snapshot Pills */}
        <div className="flex flex-wrap items-center gap-space-sm bg-surface-container-low p-space-sm px-space-md rounded-xl">
          <div className="flex items-center gap-space-xs text-secondary font-label-sm text-label-sm uppercase tracking-wider font-semibold">
            <span className="material-symbols-outlined text-[16px] text-primary">task_alt</span>
            <span>Manifest Snapshot:</span>
          </div>
          <div className="inline-flex items-center gap-space-xs bg-surface-container-lowest px-space-sm py-1 rounded text-on-surface font-label-md text-label-md shadow-sm">
            <span className="w-2 h-2 rounded-full bg-primary"></span>
            <span>Aluminium & Copper (Non-Ferrous)</span>
          </div>
          <div className="inline-flex items-center gap-space-xs bg-surface-container-lowest px-space-sm py-1 rounded text-on-surface font-label-md text-label-md shadow-sm">
            <span className="material-symbols-outlined text-[14px] text-outline">scale</span>
            <span>Estimated {totalWeight} kg</span>
          </div>
          <div className="inline-flex items-center gap-space-xs bg-surface-container-lowest px-space-sm py-1 rounded text-on-surface font-label-md text-label-md shadow-sm">
            <span className="material-symbols-outlined text-[14px] text-primary">eco</span>
            <span>Clean Grade A Scrap</span>
          </div>
          <button
            type="button"
            onClick={() => setCurrentStep(1)}
            className="ml-auto text-primary font-label-sm text-label-sm hover:underline flex items-center gap-0.5"
          >
            <span>Edit Manifest</span>
            <span className="material-symbols-outlined text-[14px]">edit</span>
          </button>
        </div>
      </div>

      {/* Main 2-Column Responsive Form & Ledger Workspace */}
      <div className="px-gutter-lg">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-lg">
          {/* Left Column: Form Content (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col gap-space-md">
            {/* Step 1 View: Material Selection */}
            {currentStep === 1 && (
              <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm space-y-space-md">
                <div className="flex items-center gap-space-sm pb-space-sm border-b border-outline-variant/30">
                  <div className="w-8 h-8 rounded bg-secondary-container text-primary flex items-center justify-center">
                    <span className="material-symbols-outlined text-[20px]">category</span>
                  </div>
                  <div>
                    <h2 className="font-headline-sm text-headline-sm text-on-surface">Step 1: Material Selection</h2>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">Choose the recyclables included in this lot</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-space-sm pt-2">
                  {[
                    { label: 'Paper & Cardboard', icon: 'feed', cat: 'paper' },
                    { label: 'Plastics & Polymers', icon: 'recycling', cat: 'plastics' },
                    { label: 'Iron & Heavy Steel', icon: 'iron', cat: 'ferrous' },
                    { label: 'Industrial Aluminium', icon: 'view_in_ar', cat: 'non-ferrous', checked: true },
                    { label: 'Copper & Brass Scrap', icon: 'cable', cat: 'non-ferrous', checked: true },
                    { label: 'IT E-Waste & Servers', icon: 'memory', cat: 'ewaste' }
                  ].map((m, idx) => (
                    <div
                      key={idx}
                      className={`p-space-md rounded-xl border flex flex-col items-start gap-2 cursor-pointer transition-all ${
                        m.checked
                          ? 'border-primary bg-secondary-container/40 ring-1 ring-primary'
                          : 'border-outline-variant/50 bg-surface-container-low hover:bg-surface-container'
                      }`}
                    >
                      <span className="material-symbols-outlined text-primary text-[24px]">{m.icon}</span>
                      <span className="font-label-md text-label-md font-semibold text-on-surface">{m.label}</span>
                      <span className="text-[11px] text-outline font-mono">Benchmark Verified</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2 View: Material Details */}
            {currentStep === 2 && (
              <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm space-y-space-md">
                <div className="flex items-center gap-space-sm pb-space-sm border-b border-outline-variant/30">
                  <div className="w-8 h-8 rounded bg-secondary-container text-primary flex items-center justify-center">
                    <span className="material-symbols-outlined text-[20px]">tune</span>
                  </div>
                  <div>
                    <h2 className="font-headline-sm text-headline-sm text-on-surface">Step 2: Material Lot Details</h2>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">Specify approximate weight and upload lot photos</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {manifestItems.map((item, index) => (
                    <div key={item.id} className="p-space-md bg-surface-container-low rounded-xl space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-label-md text-label-md font-bold text-on-surface">{item.name}</span>
                        <span className="font-mono text-xs text-primary font-semibold">₹{item.ratePerKg}/kg benchmark</span>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-semibold text-outline uppercase mb-1">Estimated Weight (kg)</label>
                          <input
                            type="number"
                            value={item.weightKg}
                            onChange={(e) => {
                              const newWeight = parseFloat(e.target.value) || 0;
                              setManifestItems(manifestItems.map((it, i) =>
                                i === index ? { ...it, weightKg: newWeight, totalValue: newWeight * it.ratePerKg } : it
                              ));
                            }}
                            className="w-full bg-surface-container-lowest text-on-surface px-3 py-2 rounded border border-outline-variant/60 font-mono font-bold"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-outline uppercase mb-1">Purity Grade</label>
                          <input
                            type="text"
                            value={item.grade || 'Clean Grade A'}
                            readOnly
                            className="w-full bg-surface-container px-3 py-2 rounded text-body-sm cursor-not-allowed"
                          />
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="border-2 border-dashed border-outline-variant p-4 rounded-xl text-center bg-surface-container-low/40">
                    <span className="material-symbols-outlined text-[32px] text-outline mb-1">add_photo_alternate</span>
                    <p className="font-label-md text-label-md text-on-surface font-semibold">Lot Manifest Photographs (Optional)</p>
                    <p className="text-body-sm text-outline">Helps collector assign the right capacity vehicle</p>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3 (Main Screen): Logistics, Location & Timing */}
            {(currentStep === 3 || currentStep >= 3) && (
              <>
                {/* Section: Address Selection */}
                <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm">
                  <div className="flex items-center justify-between pb-space-sm mb-space-md border-b-0">
                    <div className="flex items-center gap-space-sm">
                      <div className="w-8 h-8 rounded bg-secondary-container text-on-secondary-container flex items-center justify-center">
                        <span className="material-symbols-outlined text-[18px]">pin_drop</span>
                      </div>
                      <div>
                        <h2 className="font-headline-sm text-headline-sm text-on-surface">Pickup Address &amp; Dock Info</h2>
                        <p className="font-body-sm text-body-sm text-on-surface-variant">Specify the industrial facility entrance for heavy haulage</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        const newName = prompt('Enter new facility name / location:', 'Electronic City Yard 5');
                        if (newName) setFacilityAddress(newName);
                      }}
                      className="text-primary font-label-md text-label-md font-semibold hover:text-primary-container flex items-center gap-1 transition-colors"
                    >
                      <span className="material-symbols-outlined text-[16px]">add_circle</span>
                      <span>Add New Address</span>
                    </button>
                  </div>

                  <div className="space-y-space-md">
                    <div>
                      <label className="block font-label-sm text-label-sm text-outline uppercase tracking-wider mb-1.5" htmlFor="address-selector">
                        Selected Facility Address
                      </label>
                      <div className="relative">
                        <select
                          className="w-full bg-surface-container-low text-on-surface font-body-md text-body-md py-2.5 px-space-md rounded appearance-none focus:outline-none focus:ring-1 focus:ring-primary"
                          id="address-selector"
                          value={facilityAddress}
                          onChange={handleFacilityChange}
                        >
                          <option>HQ Bangalore Tech Park - Dock 4 (Saved)</option>
                          <option>Bellandur Storage Facility - Gate 3</option>
                          <option>Whitefield Assembly Plant - Yard 2</option>
                        </select>
                        <span className="material-symbols-outlined absolute right-space-md top-1/2 -translate-y-1/2 pointer-events-none text-outline text-[20px]">
                          expand_more
                        </span>
                      </div>
                    </div>

                    {/* Address Fields Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm">
                      <div className="sm:col-span-2">
                        <label className="block font-label-sm text-label-sm text-outline uppercase tracking-wider mb-1" htmlFor="street-addr">
                          Street Address
                        </label>
                        <input
                          className="w-full bg-surface-container-low text-on-surface font-body-md text-body-md px-space-md py-2 rounded focus:outline-none focus:ring-1 focus:ring-primary"
                          id="street-addr"
                          type="text"
                          value={streetAddress}
                          onChange={(e) => setStreetAddress(e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block font-label-sm text-label-sm text-outline uppercase tracking-wider mb-1" htmlFor="city-val">
                          City
                        </label>
                        <input
                          className="w-full bg-surface-container-high/60 text-on-surface font-body-md text-body-md px-space-md py-2 rounded cursor-not-allowed"
                          id="city-val"
                          readOnly
                          type="text"
                          value={city}
                        />
                      </div>
                      <div>
                        <label className="block font-label-sm text-label-sm text-outline uppercase tracking-wider mb-1" htmlFor="zip-val">
                          Postal Code
                        </label>
                        <input
                          className="w-full bg-surface-container-low text-on-surface font-body-md text-body-md px-space-md py-2 rounded focus:outline-none focus:ring-1 focus:ring-primary"
                          id="zip-val"
                          type="text"
                          value={postalCode}
                          onChange={(e) => setPostalCode(e.target.value)}
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block font-label-sm text-label-sm text-outline uppercase tracking-wider mb-1" htmlFor="dock-val">
                          Floor / Gate / Loading Dock
                        </label>
                        <input
                          className="w-full bg-surface-container-low text-on-surface font-body-md text-body-md px-space-md py-2 rounded focus:outline-none focus:ring-1 focus:ring-primary"
                          id="dock-val"
                          type="text"
                          value={dockDetails}
                          onChange={(e) => setDockDetails(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section: Date & Time Logistics */}
                <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm">
                  <div className="flex items-center gap-space-sm mb-space-md">
                    <div className="w-8 h-8 rounded bg-secondary-container text-on-secondary-container flex items-center justify-center">
                      <span className="material-symbols-outlined text-[18px]">event_available</span>
                    </div>
                    <div>
                      <h2 className="font-headline-sm text-headline-sm text-on-surface">Pickup Date &amp; Slot Window</h2>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">Calibrated fleet dispatch occurs within your reserved window</p>
                    </div>
                  </div>

                  {/* Date Selector Row */}
                  <div className="mb-space-md">
                    <label className="block font-label-sm text-label-sm text-outline uppercase tracking-wider mb-1.5" htmlFor="date-input">
                      Collection Date
                    </label>
                    <div className="relative flex items-center">
                      <span className="material-symbols-outlined absolute left-space-md text-[20px] text-primary pointer-events-none">
                        calendar_month
                      </span>
                      <input
                        className="w-full bg-surface-container-low text-on-surface font-body-md text-body-md pl-11 pr-space-md py-2.5 rounded focus:outline-none focus:ring-1 focus:ring-primary"
                        id="date-input"
                        type="text"
                        value={collectionDate}
                        onChange={(e) => setCollectionDate(e.target.value)}
                      />
                      <div className="absolute right-space-sm flex items-center gap-1">
                        <span className="bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm px-2 py-0.5 rounded font-semibold">
                          Guaranteed Dispatch
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Time Slot Selection Chips */}
                  <div>
                    <label className="block font-label-sm text-label-sm text-outline uppercase tracking-wider mb-2">Available Time Windows</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm" id="time-slot-group">
                      {/* Slot 1 */}
                      <label
                        onClick={() => setSelectedSlot('09:00 AM - 11:00 AM')}
                        className={`flex items-center justify-between p-space-md rounded cursor-pointer transition-all ${
                          selectedSlot === '09:00 AM - 11:00 AM'
                            ? 'bg-surface-container-highest ring-1 ring-primary shadow-sm'
                            : 'bg-surface-container-low hover:bg-surface-container'
                        }`}
                      >
                        <div className="flex items-center gap-space-sm">
                          <input
                            type="radio"
                            name="pickup_slot"
                            checked={selectedSlot === '09:00 AM - 11:00 AM'}
                            onChange={() => setSelectedSlot('09:00 AM - 11:00 AM')}
                            className="text-primary focus:ring-primary h-4 w-4"
                          />
                          <div>
                            <span className="font-label-md text-label-md text-on-surface font-semibold block">09:00 AM - 11:00 AM</span>
                            <span className="font-body-sm text-body-sm text-outline">Morning Peak Hub Slot</span>
                          </div>
                        </div>
                        <span className="material-symbols-outlined text-outline text-[18px]">wb_sunny</span>
                      </label>

                      {/* Slot 2 (Recommended / Active) */}
                      <label
                        onClick={() => setSelectedSlot('11:00 AM - 01:00 PM')}
                        className={`flex items-center justify-between p-space-md rounded cursor-pointer shadow-sm transition-all ${
                          selectedSlot === '11:00 AM - 01:00 PM'
                            ? 'bg-surface-container-highest ring-1 ring-primary'
                            : 'bg-surface-container-low hover:bg-surface-container'
                        }`}
                      >
                        <div className="flex items-center gap-space-sm">
                          <input
                            type="radio"
                            name="pickup_slot"
                            checked={selectedSlot === '11:00 AM - 01:00 PM'}
                            onChange={() => setSelectedSlot('11:00 AM - 01:00 PM')}
                            className="text-primary focus:ring-primary h-4 w-4"
                          />
                          <div>
                            <span className="font-label-md text-label-md text-on-surface font-bold block">11:00 AM - 01:00 PM</span>
                            <span className="font-body-sm text-body-sm text-primary font-medium">Recommended for Tech Park</span>
                          </div>
                        </div>
                        <span className="font-label-sm text-label-sm bg-primary text-on-primary px-1.5 py-0.5 rounded font-semibold">
                          Fastest
                        </span>
                      </label>

                      {/* Slot 3 */}
                      <label
                        onClick={() => setSelectedSlot('02:00 PM - 04:00 PM')}
                        className={`flex items-center justify-between p-space-md rounded cursor-pointer transition-all ${
                          selectedSlot === '02:00 PM - 04:00 PM'
                            ? 'bg-surface-container-highest ring-1 ring-primary shadow-sm'
                            : 'bg-surface-container-low hover:bg-surface-container'
                        }`}
                      >
                        <div className="flex items-center gap-space-sm">
                          <input
                            type="radio"
                            name="pickup_slot"
                            checked={selectedSlot === '02:00 PM - 04:00 PM'}
                            onChange={() => setSelectedSlot('02:00 PM - 04:00 PM')}
                            className="text-primary focus:ring-primary h-4 w-4"
                          />
                          <div>
                            <span className="font-label-md text-label-md text-on-surface font-semibold block">02:00 PM - 04:00 PM</span>
                            <span className="font-body-sm text-body-sm text-outline">Post-Noon Freight Bay</span>
                          </div>
                        </div>
                        <span className="material-symbols-outlined text-outline text-[18px]">schedule</span>
                      </label>

                      {/* Slot 4 */}
                      <label
                        onClick={() => setSelectedSlot('04:00 PM - 06:00 PM')}
                        className={`flex items-center justify-between p-space-md rounded cursor-pointer transition-all ${
                          selectedSlot === '04:00 PM - 06:00 PM'
                            ? 'bg-surface-container-highest ring-1 ring-primary shadow-sm'
                            : 'bg-surface-container-low hover:bg-surface-container'
                        }`}
                      >
                        <div className="flex items-center gap-space-sm">
                          <input
                            type="radio"
                            name="pickup_slot"
                            checked={selectedSlot === '04:00 PM - 06:00 PM'}
                            onChange={() => setSelectedSlot('04:00 PM - 06:00 PM')}
                            className="text-primary focus:ring-primary h-4 w-4"
                          />
                          <div>
                            <span className="font-label-md text-label-md text-on-surface font-semibold block">04:00 PM - 06:00 PM</span>
                            <span className="font-body-sm text-body-sm text-outline">Evening Consolidation</span>
                          </div>
                        </div>
                        <span className="material-symbols-outlined text-outline text-[18px]">bedtime</span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Section: On-Site Contact & Specific Access Directives */}
                <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm">
                  <div className="flex items-center gap-space-sm mb-space-md">
                    <div className="w-8 h-8 rounded bg-secondary-container text-on-secondary-container flex items-center justify-center">
                      <span className="material-symbols-outlined text-[18px]">badge</span>
                    </div>
                    <div>
                      <h2 className="font-headline-sm text-headline-sm text-on-surface">On-Site Logistics Representative</h2>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">The collector will call this individual upon arrival at the gate</p>
                    </div>
                  </div>

                  <div className="space-y-space-md">
                    <div>
                      <label className="block font-label-sm text-label-sm text-outline uppercase tracking-wider mb-1" htmlFor="contact-input">
                        Point of Contact &amp; Mobile
                      </label>
                      <div className="relative">
                        <span className="material-symbols-outlined absolute left-space-md top-1/2 -translate-y-1/2 text-[18px] text-outline">
                          person
                        </span>
                        <input
                          className="w-full bg-surface-container-low text-on-surface font-body-md text-body-md pl-10 pr-space-md py-2 rounded focus:outline-none focus:ring-1 focus:ring-primary"
                          id="contact-input"
                          type="text"
                          value={contactName}
                          onChange={(e) => setContactName(e.target.value)}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="block font-label-sm text-label-sm text-outline uppercase tracking-wider" htmlFor="notes-area">
                          Special Gate Clearance &amp; Handling Instructions
                        </label>
                        <span className="font-body-sm text-body-sm text-outline">Max 300 characters</span>
                      </div>
                      <textarea
                        className="w-full bg-surface-container-low text-on-surface font-body-md text-body-md p-space-md rounded focus:outline-none focus:ring-1 focus:ring-primary resize-none"
                        id="notes-area"
                        rows={3}
                        value={specialInstructions}
                        onChange={(e) => setSpecialInstructions(e.target.value)}
                      />
                      <div className="flex items-center gap-space-xs mt-1.5 text-on-surface-variant">
                        <span className="material-symbols-outlined text-[16px] text-secondary">info</span>
                        <span className="font-body-sm text-body-sm">
                          Collector vehicle is pre-equipped with hydraulic pallet jack and precision floor scale.
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Right Column: Order Summary & Live Valuation Preview Card (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-space-md">
            <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-md sticky top-20">
              {/* Card Header */}
              <div className="flex items-center justify-between pb-space-md mb-space-md bg-surface-container-low -mx-space-lg -mt-space-lg p-space-lg rounded-t-xl">
                <div>
                  <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider block">Valuation Audit</span>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">Order Summary</h3>
                </div>
                <div className="w-10 h-10 rounded-full bg-surface-container-lowest flex items-center justify-center text-primary shadow-sm">
                  <span className="material-symbols-outlined text-[22px]">receipt_long</span>
                </div>
              </div>

              {/* Manifest Breakdown List */}
              <div className="space-y-space-md mb-space-lg">
                {manifestItems.map((item) => (
                  <div key={item.id} className="flex items-start justify-between">
                    <div>
                      <div className="font-label-md text-label-md text-on-surface font-bold">{item.name}</div>
                      <div className="font-body-sm text-body-sm text-on-surface-variant">{item.subtext}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-label-md text-label-md text-on-surface font-semibold font-mono">
                        ₹{item.totalValue.toLocaleString('en-IN')}
                      </div>
                      <div className="font-body-sm text-body-sm text-outline font-mono">@ ₹{item.ratePerKg}/kg benchmark</div>
                    </div>
                  </div>
                ))}

                <div className="bg-surface-container-low p-space-sm rounded-lg flex items-center justify-between">
                  <span className="font-label-md text-label-md text-secondary font-medium">Aggregate Material Mass</span>
                  <span className="font-label-md text-label-md text-on-surface font-bold font-mono">{totalWeight.toFixed(1)} kg</span>
                </div>
              </div>

              {/* Total Valuation Metric Banner */}
              <div className="bg-secondary-container/40 p-space-md rounded-xl mb-space-md">
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="font-label-sm text-label-sm text-secondary uppercase tracking-wider block font-semibold">
                      Estimated Payout Range
                    </span>
                    <span className="font-metric-num text-metric-num text-primary font-bold font-mono">
                      ₹{estimatedFloor.toLocaleString('en-IN')} - ₹{estimatedCeiling.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <span className="font-label-sm text-label-sm bg-surface-container-lowest px-2 py-1 rounded text-primary font-semibold shadow-sm">
                    Instant NEFT
                  </span>
                </div>
                <div className="w-full bg-surface-container-high h-1.5 rounded-full mt-3 overflow-hidden">
                  <div className="bg-primary h-full rounded-full w-4/5"></div>
                </div>
                <div className="flex justify-between items-center mt-1 text-on-surface-variant font-mono text-xs">
                  <span>Indicative Floor: ₹{estimatedFloor.toLocaleString('en-IN')}</span>
                  <span>Ceiling: ₹{estimatedCeiling.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Verification Guarantee Box */}
              <div className="bg-surface-container-low p-space-md rounded-lg flex gap-space-sm items-start mb-space-md">
                <span className="material-symbols-outlined text-[20px] text-primary flex-shrink-0 mt-0.5">verified</span>
                <div>
                  <p className="font-label-md text-label-md text-on-surface font-semibold">Recyvora Verified Collector Guarantee</p>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                    Assigned operator carries government-calibrated digital trade scales with dual-screen verification.
                  </p>
                </div>
              </div>

              {/* Disclaimer Callout */}
              <div className="bg-surface-container p-space-md rounded-lg flex gap-space-sm items-start">
                <span className="material-symbols-outlined text-[18px] text-outline flex-shrink-0 mt-0.5">info</span>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  Final value will be determined by verified on-site digital scale weight and material grade verification by our certified collector.
                </p>
              </div>

              {/* Pickup Route Preview Mini Card */}
              <div className="mt-space-md p-space-sm bg-surface-container-low rounded-lg flex items-center justify-between">
                <div className="flex items-center gap-space-sm">
                  <div className="w-7 h-7 rounded bg-surface-container-highest flex items-center justify-center">
                    <span className="material-symbols-outlined text-[16px] text-secondary">alt_route</span>
                  </div>
                  <div>
                    <p className="font-label-sm text-label-sm text-on-surface font-semibold">Assigned Route: East Zone 4</p>
                    <p className="font-body-sm text-body-sm text-outline">Collector: Ravi Kumar (ID: RC-8842)</p>
                  </div>
                </div>
                <span className="font-label-sm text-label-sm text-primary font-bold">ETA 24m</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Navigation Bar & Workflow Actions */}
        <div className="mt-space-xl pt-space-lg flex flex-col sm:flex-row items-center justify-between gap-space-md bg-surface-container-lowest p-space-lg rounded-xl shadow-sm">
          <div className="flex items-center gap-space-sm w-full sm:w-auto">
            <button
              onClick={() => {
                if (currentStep > 1) setCurrentStep(currentStep - 1);
                else onNavigate('dashboard');
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-space-xs px-space-lg py-2.5 rounded bg-surface-container-low text-on-surface font-label-md text-label-md hover:bg-surface-container transition-colors"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">arrow_back</span>
              <span>{currentStep === 1 ? 'Back to Dashboard' : 'Back to Details'}</span>
            </button>
            <button
              onClick={() => alert('Draft saved successfully to your facility manifest ledger.')}
              className="hidden sm:inline-flex items-center gap-space-xs px-space-md py-2.5 text-on-surface-variant hover:text-on-surface font-label-md text-label-md transition-colors"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">save</span>
              <span>Save as Draft</span>
            </button>
          </div>

          <div className="flex items-center gap-space-md w-full sm:w-auto justify-end">
            <div className="hidden md:flex flex-col text-right">
              <span className="font-label-sm text-label-sm text-outline uppercase font-semibold">Next Milestone</span>
              <span className="font-label-md text-label-md text-on-surface font-semibold">
                {currentStep === 3
                  ? 'Step 4: Valuation & Final Review'
                  : currentStep === 4
                  ? 'Step 5: Review & Confirm Lock'
                  : 'Instant Dispatch & Manifest Lock'}
              </span>
            </div>
            <button
              onClick={handleProceed}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-space-xs px-space-xl py-3 rounded bg-primary-container text-on-primary font-label-md text-label-md shadow-md hover:bg-primary transition-all font-semibold"
              type="button"
            >
              <span>{currentStep === 5 ? 'Confirm & Book Pickup' : 'Proceed to Valuation & Review'}</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>

      {/* Booking Confirmation Dialog */}
      {bookingSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-on-background/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-surface-container-lowest rounded-2xl shadow-2xl max-w-lg w-full p-space-xl border border-primary/20 text-center">
            <div className="w-16 h-16 rounded-full bg-secondary-container text-primary flex items-center justify-center mx-auto mb-4">
              <span className="material-symbols-outlined text-[36px]">check_circle</span>
            </div>
            <span className="px-3 py-1 rounded-full bg-secondary-container text-on-secondary-fixed text-xs font-bold uppercase tracking-wider">
              Doorstep Logistics Locked
            </span>
            <h2 className="text-2xl font-bold text-on-surface mt-2 mb-1">Pickup Scheduled Successfully!</h2>
            <p className="text-body-md text-on-surface-variant mb-6">
              Batch <strong className="text-primary font-mono">{bookingSuccess.requestNumber}</strong> is registered on the Recyvora chain of custody. Collector vehicle dispatch window has been locked.
            </p>

            <div className="bg-surface-container-low p-4 rounded-xl text-left space-y-2 mb-6 text-sm font-mono">
              <div className="flex justify-between">
                <span className="text-outline">Assigned Collector:</span>
                <span className="font-semibold text-on-surface">{bookingSuccess.collectorName} (ID: {bookingSuccess.collectorId})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-outline">Scheduled Slot:</span>
                <span className="font-semibold text-on-surface">{bookingSuccess.timeSlot}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-outline">Estimated Payout:</span>
                <span className="font-semibold text-primary">₹{bookingSuccess.estimatedPayoutFloor} - ₹{bookingSuccess.estimatedPayoutCeiling}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-outline">Facility Dock:</span>
                <span className="font-semibold text-on-surface truncate max-w-[200px]">{bookingSuccess.facilityAddress}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => onNavigate('dashboard')}
                className="flex-1 py-3 bg-surface-container text-on-surface font-semibold rounded-lg hover:bg-surface-container-high transition-colors text-sm"
              >
                Go to Dashboard
              </button>
              <button
                onClick={() => onNavigate('pickup-tracking')}
                className="flex-1 py-3 bg-primary text-on-primary font-semibold rounded-lg hover:bg-tertiary-container shadow-md transition-colors text-sm flex items-center justify-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[18px]">navigation</span>
                <span>Track Collection Live</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
