import React, { useState } from 'react';
import { MaterialCategory } from '../types';
import { commodityBenchmarks } from '../data/mockData';
import { useToast } from './Toast';

interface PriceEstimatorProps {
  onLockAndSchedule: (material: string, rate: number) => void;
  onNavigate: (path: string) => void;
}

interface MaterialSpec {
  id: string;
  name: string;
  base: number;
  co2: number;
}

const categoryMaterials: Record<MaterialCategory, MaterialSpec[]> = {
  'non-ferrous': [
    { id: 'copper-grade-1', name: 'Pure Copper Wire (Grade 1 Millberry - 99.9% Cu)', base: 720.00, co2: 2.49 },
    { id: 'brass-honey', name: 'Brass Honey Scrap / Rod Extrusions', base: 485.00, co2: 1.85 },
    { id: 'aluminum-extrusions', name: 'Aluminium Extrusions (6063 Clean Profile)', base: 218.40, co2: 4.12 },
    { id: 'lead-battery', name: 'Battery Lead Plates (Automotive Flooded)', base: 142.00, co2: 1.10 }
  ],
  'ferrous': [
    { id: 'hms-1', name: 'Heavy Melting Steel (HMS 1 / Structurals)', base: 38.50, co2: 1.45 },
    { id: 'ss-304', name: 'Stainless Steel 304 (Non-Magnetic Solids)', base: 128.00, co2: 2.20 },
    { id: 'cast-iron', name: 'Cast Iron Foundry Grade Rotors', base: 34.00, co2: 1.15 }
  ],
  'ewaste': [
    { id: 'server-mb', name: 'Server Motherboards (Dual Xeon Gold/Ag)', base: 940.00, co2: 6.80 },
    { id: 'telecom-cards', name: 'Telecom Switching / Line Cards', base: 1120.00, co2: 8.40 },
    { id: 'ram-gold', name: 'High-Density RAM Memory Sticks (Gold Finger)', base: 1450.00, co2: 9.10 }
  ],
  'plastics': [
    { id: 'hdpe-pellet', name: 'HDPE Regrind Natural Clean Flakes', base: 72.00, co2: 1.30 },
    { id: 'pet-clear', name: 'PET Bottle Flakes (Hot Washed Clear)', base: 64.50, co2: 1.45 },
    { id: 'pp-inj', name: 'PP Injection Battery Cases / Crates', base: 56.00, co2: 1.10 }
  ],
  'paper': [
    { id: 'cardboard-occ', name: 'Corrugated Cardboard (OCC Grade 11)', base: 14.80, co2: 0.95 },
    { id: 'sop-paper', name: 'Sorted Office White Paper (SOP)', base: 21.50, co2: 1.20 }
  ],
  'batteries': [
    { id: 'li-ion-nmc', name: 'Lithium-Ion EV Packs (NMC Chemistry)', base: 310.00, co2: 5.60 },
    { id: 'lead-acid-dry', name: 'Industrial VRLA Lead Acid Batteries', base: 98.00, co2: 1.80 }
  ]
};

export const PriceEstimator: React.FC<PriceEstimatorProps> = ({ onLockAndSchedule, onNavigate }) => {
  const { showToast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState<MaterialCategory>('non-ferrous');
  const [selectedMaterialId, setSelectedMaterialId] = useState<string>('copper-grade-1');
  const [lotQuantity, setLotQuantity] = useState<number>(50);
  const [lotUnit, setLotUnit] = useState<string>('kg');
  const [purityGrade, setPurityGrade] = useState<'clean' | 'minor' | 'heavy'>('clean');
  const [customMaterial, setCustomMaterial] = useState<MaterialSpec | null>(null);

  // Filter for table
  const [tableSearch, setTableSearch] = useState<string>('');
  const [tableSector, setTableSector] = useState<string>('all');
  const [isCalculatedAnim, setIsCalculatedAnim] = useState<boolean>(false);

  // Active material details
  const activeList = categoryMaterials[selectedCategory] || [];
  const currentMaterial =
    customMaterial ||
    activeList.find((m) => m.id === selectedMaterialId) ||
    activeList[0] || { id: 'copper-grade-1', name: 'Pure Copper Wire (Grade 1)', base: 720.0, co2: 2.49 };

  // Calculate quantity in kg
  let qtyInKg = lotQuantity;
  if (lotUnit === 'tonnes') qtyInKg = lotQuantity * 1000;
  if (lotUnit === 'units') qtyInKg = lotQuantity * 1.5;

  // Grade adjustment
  let qualityFactor = 0;
  let qualityLabel = 'Grade A 98%';
  let recoverablePct = 98.2;

  if (purityGrade === 'clean') {
    qualityFactor = 0.0;
    qualityLabel = 'Grade A 98% pure';
    recoverablePct = 98.2;
  } else if (purityGrade === 'minor') {
    qualityFactor = -(currentMaterial.base * 0.08);
    qualityLabel = 'Grade B (-8% trace)';
    recoverablePct = 91.5;
  } else {
    qualityFactor = -(currentMaterial.base * 0.22);
    qualityLabel = 'Grade C (-22% contam)';
    recoverablePct = 76.0;
  }

  // Volume bonus
  let volumeBonus = 0;
  if (qtyInKg >= 40) {
    volumeBonus = 15.0;
  } else if (qtyInKg >= 20) {
    volumeBonus = 7.5;
  }

  const netRatePerKg = Math.max(0, currentMaterial.base + qualityFactor + volumeBonus);
  const grossValue = netRatePerKg * qtyInKg;
  const handlingRate = qtyInKg > 100 ? 0.045 : 0.0612;
  const handlingFee = grossValue > 0 ? grossValue * handlingRate : 0;
  const netPayout = Math.max(0, grossValue - handlingFee);

  const minRange = Math.round(netPayout * 0.95);
  const maxRange = Math.round(netPayout * 1.02);
  const co2AvoidedKg = (qtyInKg * currentMaterial.co2).toFixed(1);

  const handleSelectFromTable = (name: string, rate: number, catKey: MaterialCategory) => {
    setSelectedCategory(catKey);
    const custom: MaterialSpec = {
      id: `custom-${Date.now()}`,
      name: name,
      base: rate,
      co2: 2.5
    };
    setCustomMaterial(custom);
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  const handleRecalculate = () => {
    setIsCalculatedAnim(true);
    setTimeout(() => setIsCalculatedAnim(false), 200);
  };

  const handleLockRate = () => {
    onLockAndSchedule(currentMaterial.name, netRatePerKg);
  };

  const handleExportPDF = () => {
    const netFormatted = `₹${Math.round(netPayout).toLocaleString('en-IN')}`;
    showToast(
      `Valuation Slip generated for ${currentMaterial.name} (${netFormatted}). Certificate queued for download.`,
      'success',
      'Valuation Slip Ready'
    );
  };

  // Filtered benchmark table items
  const filteredBenchmarks = commodityBenchmarks.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(tableSearch.toLowerCase()) ||
      item.standardGrade.toLowerCase().includes(tableSearch.toLowerCase());
    const matchesSector = tableSector === 'all' || item.stream.toLowerCase() === tableSector.toLowerCase();
    return matchesSearch && matchesSector;
  });

  return (
    <div className="flex flex-col w-full px-gutter-lg pt-space-lg pb-space-xl">
      {/* Top Ambient Banner & Header Canvas */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md mb-space-lg">
        <div className="space-y-space-xs">
          <div className="inline-flex items-center gap-space-xs px-space-sm py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-semibold tracking-wide">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping"></span>
            <span>Indicative Market Rates • Refreshed Daily at 08:00 IST</span>
          </div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface font-semibold tracking-tight">
            Scrap Price Estimator
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl">
            Transparent indicative valuations benchmarked against national recycling commodity indexes and live regional processing smelters.
          </p>
        </div>

        {/* Quick Ticker Snapshot */}
        <div className="flex items-center gap-space-md self-start md:self-auto">
          <div className="bg-surface-container-lowest px-space-md py-space-xs rounded-xl shadow-sm flex items-center gap-space-md">
            <div className="space-y-0.5">
              <span className="font-label-sm text-label-sm text-outline uppercase block">Copper Index</span>
              <span className="font-label-md text-label-md text-on-surface font-semibold font-mono">₹735.00/kg</span>
            </div>
            <span className="font-label-sm text-label-sm text-primary flex items-center font-semibold bg-secondary-container/50 px-1.5 py-0.5 rounded font-mono">
              <span className="material-symbols-outlined text-[14px]">trending_up</span> +2.4%
            </span>
          </div>
          <div className="bg-surface-container-lowest px-space-md py-space-xs rounded-xl shadow-sm flex items-center gap-space-md hidden sm:flex">
            <div className="space-y-0.5">
              <span className="font-label-sm text-label-sm text-outline uppercase block">Aluminium 6063</span>
              <span className="font-label-md text-label-md text-on-surface font-semibold font-mono">₹218.40/kg</span>
            </div>
            <span className="font-label-sm text-label-sm text-secondary flex items-center font-semibold bg-surface-container px-1.5 py-0.5 rounded font-mono">
              <span className="material-symbols-outlined text-[14px]">trending_up</span> +0.9%
            </span>
          </div>
        </div>
      </div>

      {/* Main Two-Column Valuation Deck */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-lg">
        {/* Left Panel: Calculator Engine (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-space-lg">
          <div className="bg-surface-container-lowest rounded-xl shadow-sm p-space-lg">
            <div className="flex items-center justify-between pb-space-md mb-space-lg bg-surface-container-low -mx-space-lg -mt-space-lg px-space-lg pt-space-md rounded-t-xl">
              <div className="flex items-center gap-space-sm">
                <span className="material-symbols-outlined text-primary text-[22px]">calculate</span>
                <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">Valuation Calculator</span>
              </div>
              <span className="font-label-sm text-label-sm text-outline font-mono">MODEL v4.8 • ISO-14021</span>
            </div>

            <form className="space-y-space-lg" onSubmit={(e) => { e.preventDefault(); handleRecalculate(); }}>
              {/* Step 1: Select Material Category */}
              <div className="space-y-space-xs">
                <div className="flex items-center justify-between">
                  <label className="font-label-md text-label-md font-semibold text-on-surface flex items-center gap-space-xs">
                    <span className="w-5 h-5 rounded-full bg-surface-container-high text-primary flex items-center justify-center font-label-sm text-label-sm font-bold">
                      1
                    </span>
                    <span>Material Stream</span>
                  </label>
                  <span className="font-label-sm text-label-sm text-outline">6 Indexed Categories</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-space-xs pt-space-xs">
                  {[
                    { key: 'non-ferrous', label: 'Non-Ferrous', icon: 'view_in_ar' },
                    { key: 'ferrous', label: 'Ferrous', icon: 'iron' },
                    { key: 'ewaste', label: 'E-Waste & IC', icon: 'memory' },
                    { key: 'plastics', label: 'Plastics', icon: 'recycling' },
                    { key: 'paper', label: 'Paper & Pulp', icon: 'feed' },
                    { key: 'batteries', label: 'Batteries', icon: 'battery_charging_full' }
                  ].map((cat) => (
                    <button
                      key={cat.key}
                      type="button"
                      onClick={() => {
                        setSelectedCategory(cat.key as MaterialCategory);
                        setCustomMaterial(null);
                        const first = categoryMaterials[cat.key as MaterialCategory][0];
                        if (first) setSelectedMaterialId(first.id);
                      }}
                      className={`px-space-sm py-2.5 rounded-lg font-label-md text-label-md font-semibold flex items-center gap-space-xs shadow-sm transition-all text-left ${
                        selectedCategory === cat.key && !customMaterial
                          ? 'bg-secondary-container text-on-secondary-container'
                          : 'bg-surface-container-low text-on-surface-variant hover:text-on-surface'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[18px]">{cat.icon}</span>
                      <span className="truncate">{cat.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Specific Material Item */}
              <div className="space-y-space-xs">
                <label className="font-label-md text-label-md font-semibold text-on-surface flex items-center gap-space-xs" htmlFor="materialSelect">
                  <span className="w-5 h-5 rounded-full bg-surface-container-high text-primary flex items-center justify-center font-label-sm text-label-sm font-bold">
                    2
                  </span>
                  <span>Specific Commodity / Spec Grade</span>
                </label>
                <div className="relative">
                  <select
                    id="materialSelect"
                    value={customMaterial ? customMaterial.id : selectedMaterialId}
                    onChange={(e) => {
                      setCustomMaterial(null);
                      setSelectedMaterialId(e.target.value);
                    }}
                    className="w-full h-11 bg-surface-container-lowest text-on-surface font-body-md text-body-md pl-space-md pr-10 rounded-lg shadow-sm border border-outline-variant/40 appearance-none focus:outline-none focus:border-primary transition-colors"
                  >
                    {customMaterial && (
                      <option value={customMaterial.id}>{customMaterial.name}</option>
                    )}
                    {activeList.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.name}
                      </option>
                    ))}
                  </select>
                  <span className="material-symbols-outlined absolute right-space-md top-1/2 -translate-y-1/2 text-outline pointer-events-none text-[20px]">
                    expand_more
                  </span>
                </div>
              </div>

              {/* Step 3: Estimated Volume or Lot Weight */}
              <div className="space-y-space-xs">
                <label className="font-label-md text-label-md font-semibold text-on-surface flex items-center gap-space-xs">
                  <span className="w-5 h-5 rounded-full bg-surface-container-high text-primary flex items-center justify-center font-label-sm text-label-sm font-bold">
                    3
                  </span>
                  <span>Estimated Volume or Lot Weight</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-space-sm">
                  <div className="sm:col-span-7 relative">
                    <input
                      id="lotQty"
                      type="number"
                      step="any"
                      min="1"
                      value={lotQuantity}
                      onChange={(e) => setLotQuantity(parseFloat(e.target.value) || 0)}
                      className="w-full h-11 bg-surface-container-lowest text-on-surface font-headline-sm text-headline-sm font-semibold px-space-md rounded-lg shadow-sm border border-outline-variant/40 focus:outline-none focus:border-primary font-mono transition-colors"
                    />
                    <span className="absolute right-space-md top-1/2 -translate-y-1/2 font-label-sm text-label-sm text-outline font-mono">
                      MEASURED WEIGHT
                    </span>
                  </div>
                  <div className="sm:col-span-5 relative">
                    <select
                      id="lotUnit"
                      value={lotUnit}
                      onChange={(e) => setLotUnit(e.target.value)}
                      className="w-full h-11 bg-surface-container-low text-on-surface font-body-md text-body-md pl-space-md pr-9 rounded-lg appearance-none focus:outline-none focus:bg-surface-container-high transition-colors"
                    >
                      <option value="kg">Kilograms (kg)</option>
                      <option value="tonnes">Metric Tonnes (MT)</option>
                      <option value="units">Discrete Units</option>
                    </select>
                    <span className="material-symbols-outlined absolute right-space-md top-1/2 -translate-y-1/2 text-outline pointer-events-none text-[20px]">
                      unfold_more
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-space-xs pt-1 text-on-surface-variant font-label-sm text-label-sm">
                  <span className="material-symbols-outlined text-[15px] text-primary">verified</span>
                  <span>Volume Tier Incentive unlocks above 40 kg (+₹15.00 / kg automated yield bonus)</span>
                </div>
              </div>

              {/* Step 4: Material Condition / Purity Grade */}
              <div className="space-y-space-xs">
                <label className="font-label-md text-label-md font-semibold text-on-surface flex items-center gap-space-xs">
                  <span className="w-5 h-5 rounded-full bg-surface-container-high text-primary flex items-center justify-center font-label-sm text-label-sm font-bold">
                    4
                  </span>
                  <span>Segregation &amp; Purity Grade</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-xs">
                  <label
                    onClick={() => setPurityGrade('clean')}
                    className={`relative flex flex-col p-space-sm rounded-lg cursor-pointer transition-all border ${
                      purityGrade === 'clean'
                        ? 'bg-secondary-container/50 border-primary ring-1 ring-primary'
                        : 'bg-surface-container-low border-transparent hover:bg-surface-container-high'
                    }`}
                  >
                    <input
                      type="radio"
                      name="purityGrade"
                      checked={purityGrade === 'clean'}
                      onChange={() => setPurityGrade('clean')}
                      className="sr-only"
                    />
                    <div className="flex items-center justify-between pb-1">
                      <span className="font-label-md text-label-md font-semibold text-on-surface">Clean / Segregated</span>
                      <span className={`w-3.5 h-3.5 rounded-full bg-primary ${purityGrade === 'clean' ? 'opacity-100' : 'opacity-0'}`}></span>
                    </div>
                    <span className="font-body-sm text-body-sm text-on-surface-variant leading-tight">
                      &gt;98% Pure, stripped, no iron attachment
                    </span>
                    <span className="mt-space-xs font-label-sm text-label-sm text-primary font-semibold">100% Index Value</span>
                  </label>

                  <label
                    onClick={() => setPurityGrade('minor')}
                    className={`relative flex flex-col p-space-sm rounded-lg cursor-pointer transition-all border ${
                      purityGrade === 'minor'
                        ? 'bg-secondary-container/50 border-primary ring-1 ring-primary'
                        : 'bg-surface-container-low border-transparent hover:bg-surface-container-high'
                    }`}
                  >
                    <input
                      type="radio"
                      name="purityGrade"
                      checked={purityGrade === 'minor'}
                      onChange={() => setPurityGrade('minor')}
                      className="sr-only"
                    />
                    <div className="flex items-center justify-between pb-1">
                      <span className="font-label-md text-label-md font-semibold text-on-surface">Mixed / Minor</span>
                      <span className={`w-3.5 h-3.5 rounded-full bg-primary ${purityGrade === 'minor' ? 'opacity-100' : 'opacity-0'}`}></span>
                    </div>
                    <span className="font-body-sm text-body-sm text-on-surface-variant leading-tight">
                      Light insulation, grease, solder traces
                    </span>
                    <span className="mt-space-xs font-label-sm text-label-sm text-on-surface-variant font-semibold">-8% Deductible</span>
                  </label>

                  <label
                    onClick={() => setPurityGrade('heavy')}
                    className={`relative flex flex-col p-space-sm rounded-lg cursor-pointer transition-all border ${
                      purityGrade === 'heavy'
                        ? 'bg-secondary-container/50 border-primary ring-1 ring-primary'
                        : 'bg-surface-container-low border-transparent hover:bg-surface-container-high'
                    }`}
                  >
                    <input
                      type="radio"
                      name="purityGrade"
                      checked={purityGrade === 'heavy'}
                      onChange={() => setPurityGrade('heavy')}
                      className="sr-only"
                    />
                    <div className="flex items-center justify-between pb-1">
                      <span className="font-label-md text-label-md font-semibold text-on-surface">Heavy Contam.</span>
                      <span className={`w-3.5 h-3.5 rounded-full bg-primary ${purityGrade === 'heavy' ? 'opacity-100' : 'opacity-0'}`}></span>
                    </div>
                    <span className="font-body-sm text-body-sm text-on-surface-variant leading-tight">
                      Coated, dirt, refractory inclusions
                    </span>
                    <span className="mt-space-xs font-label-sm text-label-sm text-error font-semibold">-22% Deductible</span>
                  </label>
                </div>
              </div>

              {/* Primary Action Button */}
              <div className="pt-space-sm">
                <button
                  type="button"
                  onClick={handleRecalculate}
                  className="w-full h-12 bg-primary-container hover:bg-primary text-on-primary font-label-md text-label-md font-semibold rounded-lg shadow-sm flex items-center justify-center gap-space-sm transition-all transform active:scale-[0.99]"
                >
                  <span className="material-symbols-outlined text-[20px]">refresh</span>
                  <span>Calculate Indicative Value</span>
                </button>
              </div>
            </form>
          </div>

          {/* Material Quality Verification Note */}
          <div className="bg-surface-container-lowest rounded-xl shadow-sm p-space-md flex items-center gap-space-md">
            <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center flex-shrink-0 text-primary">
              <span className="material-symbols-outlined text-[22px]">chevron_forward</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-label-md text-label-md font-semibold text-on-surface">
                Recyvora XRF Handheld Spectral Verification
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant truncate">
                Our collection vans carry mobile Thermo Scientific Niton spectrometers for on-site purity confirmations.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('schedule-pickup')}
              className="text-primary font-label-sm text-label-sm font-semibold hover:underline flex-shrink-0"
            >
              Learn More
            </button>
          </div>
        </div>

        {/* Right Panel: Valuation Breakdown & Certificate Preview (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-space-lg">
          <div className="bg-surface-container-lowest rounded-xl shadow-sm p-space-lg relative overflow-hidden">
            {/* Decorative subtle brand glow */}
            <div className="absolute -right-16 -top-16 w-48 h-48 bg-secondary-container/40 rounded-full blur-2xl pointer-events-none"></div>

            <div className="flex items-center justify-between pb-space-sm">
              <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider font-semibold">
                Indicative Valuation Summary
              </span>
              <span className="inline-flex items-center gap-1 font-label-sm text-label-sm text-primary font-semibold bg-secondary-container px-2 py-0.5 rounded">
                <span className="w-1.5 h-1.5 rounded-full bg-primary"></span> Live Quotation
              </span>
            </div>

            {/* Large Value Display */}
            <div className={`my-space-md space-y-1 transition-opacity ${isCalculatedAnim ? 'opacity-50' : 'opacity-100'}`}>
              <div className="flex items-baseline gap-space-xs">
                <span className="font-headline-xl text-headline-xl text-on-surface font-bold tracking-tight font-mono">
                  ₹{Math.round(netPayout).toLocaleString('en-IN')}
                </span>
                <span className="font-body-sm text-body-sm text-on-surface-variant">INR (Net Payout)</span>
              </div>
              <div className="flex items-center gap-space-xs text-on-surface-variant font-label-md text-label-md">
                <span className="material-symbols-outlined text-[16px] text-primary">swap_horiz</span>
                <span>
                  Estimated Range: <strong className="text-on-surface font-semibold font-mono">₹{minRange.toLocaleString('en-IN')} – ₹{maxRange.toLocaleString('en-IN')}</strong>
                </span>
              </div>
            </div>

            {/* Micro Mass-Balance Meter Graphic */}
            <div className="my-space-md p-space-sm bg-surface-container-low rounded-lg space-y-space-xs">
              <div className="flex items-center justify-between font-label-sm text-label-sm">
                <span className="text-on-surface font-medium">Estimated Recoverable Fraction</span>
                <span className="text-primary font-mono font-semibold">{recoverablePct}% Yield</span>
              </div>
              <div className="h-2 w-full bg-surface-container-high rounded-full overflow-hidden flex">
                <div
                  className="bg-primary h-full transition-all duration-500"
                  style={{ width: `${recoverablePct}%` }}
                ></div>
                <div
                  className="bg-outline/30 h-full transition-all duration-500"
                  style={{ width: `${(100 - recoverablePct).toFixed(1)}%` }}
                ></div>
              </div>
              <div className="flex items-center justify-between font-label-sm text-label-sm text-outline pt-0.5">
                <span>Primary Smelt Grade</span>
                <span>Inert Residue Slag</span>
              </div>
            </div>

            {/* Detailed Calculation Ledger */}
            <div className="space-y-space-xs py-space-sm font-body-sm text-body-sm">
              <div className="flex items-center justify-between py-1 text-on-surface-variant">
                <span>Base Commodity Rate</span>
                <span className="font-mono text-on-surface font-medium">₹{currentMaterial.base.toFixed(2)} / kg</span>
              </div>
              <div className="flex items-center justify-between py-1 text-on-surface-variant">
                <span className="flex items-center gap-1">
                  Quality Factor <span className="text-outline font-label-sm text-label-sm">({qualityLabel})</span>
                </span>
                <span className="font-mono text-primary font-medium">
                  {qualityFactor >= 0 ? '+' : ''}₹{qualityFactor.toFixed(2)}
                </span>
              </div>
              <div className="flex items-center justify-between py-1 text-on-surface-variant">
                <span className="flex items-center gap-1">
                  Volume Tier Incentive <span className="text-outline font-label-sm text-label-sm">({qtyInKg >= 40 ? '>40 kg' : qtyInKg >= 20 ? '>20 kg' : '<20 kg'})</span>
                </span>
                <span className="font-mono text-primary font-medium">+₹{volumeBonus.toFixed(2)} / kg</span>
              </div>
              <div className="flex items-center justify-between py-1 font-label-md text-label-md text-on-surface font-semibold bg-surface-container-low px-space-xs rounded">
                <span>Net Indicative Rate</span>
                <span className="font-mono text-primary">₹{netRatePerKg.toFixed(2)} / kg</span>
              </div>
              <div className="flex items-center justify-between py-1 text-on-surface-variant pt-space-xs">
                <span>Gross Estimated Value ({qtyInKg.toLocaleString()} kg)</span>
                <span className="font-mono text-on-surface font-medium">
                  ₹{grossValue.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
              <div className="flex items-center justify-between py-1 text-on-surface-variant">
                <span>Handling, Logistics &amp; Assay Fee</span>
                <span className="font-mono text-error font-medium">
                  -₹{handlingFee.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
              <div className="flex items-center justify-between py-2 mt-space-xs bg-surface-container px-space-sm rounded font-label-md text-label-md font-bold text-on-surface">
                <span>Net Payout to Client</span>
                <span className="font-mono text-primary font-headline-sm text-headline-sm">
                  ₹{netPayout.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-space-sm pt-space-md">
              <button
                type="button"
                onClick={handleLockRate}
                className="flex-1 h-11 bg-primary-container hover:bg-primary text-on-primary font-label-md text-label-md font-semibold rounded-lg shadow-sm flex items-center justify-center gap-space-xs transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">lock_clock</span>
                <span>Lock Rate &amp; Schedule</span>
              </button>
              <button
                type="button"
                onClick={handleExportPDF}
                className="h-11 px-space-md bg-surface-container-low hover:bg-surface-container-high text-on-surface font-label-md text-label-md font-semibold rounded-lg flex items-center justify-center gap-space-xs transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">download</span>
                <span>Save PDF</span>
              </button>
            </div>

            {/* Transparent Disclaimer Card */}
            <div className="mt-space-md p-space-sm rounded bg-surface-container-low flex items-start gap-space-xs">
              <span className="material-symbols-outlined text-[18px] text-outline flex-shrink-0 mt-0.5">info</span>
              <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                Estimates are indicative, not guaranteed offers. Final valuation depends on verified quantity, material quality, contamination, and applicable local rates on arrival.
              </p>
            </div>
          </div>

          {/* ESG & Carbon Avoidance Quick Badge */}
          <div className="bg-surface-container-lowest rounded-xl shadow-sm p-space-md flex items-center justify-between">
            <div className="flex items-center gap-space-sm">
              <div className="w-9 h-9 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">co2</span>
              </div>
              <div>
                <div className="font-label-md text-label-md font-semibold text-on-surface">Estimated Scope 3 Avoidance</div>
                <div className="font-body-sm text-body-sm text-on-surface-variant font-mono">
                  ≈ {co2AvoidedKg} kg CO₂e saved
                </div>
              </div>
            </div>
            <span className="font-label-sm text-label-sm text-primary font-bold bg-surface-container-high px-space-xs py-1 rounded">
              BRSR READY
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Section: Live Commodity Indicative Benchmark Index Table */}
      <div className="mt-space-xl bg-surface-container-lowest rounded-xl shadow-sm p-space-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-md pb-space-md">
          <div>
            <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
              Live Commodity Indicative Benchmark Index
            </h2>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Cross-referenced with Multi Commodity Exchange (MCX) and domestic port terminal scrap scrapings.
            </p>
          </div>

          {/* Search & Category Filters for Index */}
          <div className="flex flex-wrap items-center gap-space-sm">
            <div className="relative w-64">
              <span className="material-symbols-outlined absolute left-space-sm top-1/2 -translate-y-1/2 text-[18px] text-outline">
                search
              </span>
              <input
                id="indexSearchInput"
                type="text"
                placeholder="Filter materials..."
                value={tableSearch}
                onChange={(e) => setTableSearch(e.target.value)}
                className="w-full bg-surface-container-low text-on-surface placeholder:text-outline pl-9 pr-space-md py-1.5 rounded-lg text-body-sm font-body-sm focus:outline-none focus:bg-surface-container-high"
              />
            </div>
            <select
              id="indexCategoryFilter"
              value={tableSector}
              onChange={(e) => setTableSector(e.target.value)}
              className="h-9 bg-surface-container-low text-on-surface font-label-md text-label-md px-space-sm rounded-lg appearance-none pr-8 focus:outline-none cursor-pointer"
            >
              <option value="all">All Sectors</option>
              <option value="Metals">Metals</option>
              <option value="E-Waste">E-Waste</option>
              <option value="Plastics">Plastics</option>
              <option value="Paper">Paper &amp; Pulp</option>
            </select>
          </div>
        </div>

        {/* Commodity Table (12 Common Materials) */}
        <div className="overflow-x-auto -mx-space-lg px-space-lg">
          <table className="w-full text-left" id="benchmarkTable">
            <thead>
              <tr className="bg-surface-container-low text-outline font-label-sm text-label-sm uppercase">
                <th className="py-space-sm px-space-md rounded-l-lg font-semibold">Material / Spec</th>
                <th className="py-space-sm px-space-md font-semibold">Stream</th>
                <th className="py-space-sm px-space-md font-semibold">Standard Grade</th>
                <th className="py-space-sm px-space-md text-right font-semibold">Indicative Base (₹/kg)</th>
                <th className="py-space-sm px-space-md text-right font-semibold">7-Day Trend</th>
                <th className="py-space-sm px-space-md font-semibold">Refreshed</th>
                <th className="py-space-sm px-space-md text-right rounded-r-lg font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="font-body-sm text-body-sm divide-y-0 text-on-surface">
              {filteredBenchmarks.map((row) => (
                <tr
                  key={row.id}
                  className="hover:bg-surface-container-low/70 transition-colors cursor-pointer group"
                >
                  <td className="py-space-sm px-space-md font-semibold flex items-center gap-space-xs text-on-surface">
                    <span className="w-2 h-2 rounded-full bg-primary"></span>
                    <span>{row.name}</span>
                  </td>
                  <td className="py-space-sm px-space-md text-on-surface-variant font-medium">{row.stream}</td>
                  <td className="py-space-sm px-space-md">
                    <span className="bg-surface-container px-2 py-0.5 rounded font-label-sm text-label-sm font-mono">
                      {row.standardGrade}
                    </span>
                  </td>
                  <td className="py-space-sm px-space-md text-right font-mono font-semibold text-on-surface">
                    ₹{row.indicativeBaseRate.toFixed(2)}
                  </td>
                  <td
                    className={`py-space-sm px-space-md text-right font-mono font-medium ${
                      row.trend7dPercent >= 0 ? 'text-primary' : 'text-error'
                    }`}
                  >
                    {row.trend7dPercent >= 0 ? `+${row.trend7dPercent}%` : `${row.trend7dPercent}%`}
                  </td>
                  <td className="py-space-sm px-space-md text-on-surface-variant font-label-sm text-label-sm">
                    {row.refreshedTime}
                  </td>
                  <td className="py-space-sm px-space-md text-right">
                    <button
                      type="button"
                      onClick={() => handleSelectFromTable(row.name, row.indicativeBaseRate, row.categoryKey)}
                      className="text-primary hover:text-primary-container font-label-sm text-label-sm font-semibold underline underline-offset-2"
                    >
                      Estimate
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination / Index Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-space-md text-on-surface-variant font-label-sm text-label-sm">
          <span>Showing {filteredBenchmarks.length} of {commodityBenchmarks.length} verified benchmark contracts</span>
          <div className="flex items-center gap-space-xs pt-2 sm:pt-0">
            <span className="inline-flex items-center gap-1 font-mono text-outline">
              <span className="w-2 h-2 rounded-full bg-primary"></span> MCX API Connected
            </span>
            <span className="mx-2 text-outline-variant">•</span>
            <button
              type="button"
              onClick={() => showToast('Full CSV Price Sheet generated and ready for ERP integration.', 'success', 'Export Complete')}
              className="text-primary hover:underline font-semibold"
            >
              Download Full Price Sheet (CSV)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
