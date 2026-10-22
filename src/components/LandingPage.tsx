import React, { useState } from 'react';
import { MarketplaceProduct } from '../types';
import { marketplaceProducts } from '../data/mockData';
import { useToast } from './Toast';

interface LandingPageProps {
  onNavigate: (path: string) => void;
  onSelectProduct?: (product: MarketplaceProduct) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigate, onSelectProduct }) => {
  const { showToast } = useToast();
  const [selectedProduct, setSelectedProduct] = useState<MarketplaceProduct | null>(null);

  const handleProductClick = (prod: MarketplaceProduct) => {
    setSelectedProduct(prod);
    if (onSelectProduct) onSelectProduct(prod);
  };

  return (
    <div className="w-full bg-surface">
      {/* Top Ambient Glow */}
      <div className="relative w-full overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[480px] bg-gradient-to-b from-secondary-container/40 via-surface-container-low/20 to-transparent blur-3xl pointer-events-none -z-10"></div>

        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-margin-md lg:px-margin-lg pt-12 pb-20 lg:pt-16 lg:pb-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-lg items-center">
            {/* Left: Pitch & CTAs */}
            <div className="lg:col-span-7 flex flex-col items-start">
              <div className="inline-flex items-center gap-space-xs px-space-md py-space-xs rounded-full bg-secondary-container text-on-secondary-fixed font-label-sm text-label-sm uppercase tracking-wider shadow-sm mb-space-lg">
                <span className="material-symbols-outlined text-primary text-[15px]">verified</span>
                <span>Intelligent Circular Economy Platform • ISO 14001 Compliant Operations</span>
              </div>
              <h1 className="font-headline-xl text-headline-xl text-on-surface tracking-tight mb-space-md font-bold">
                Turn Waste Into Value.<br />
                <span className="text-primary">Build a Circular Future.</span>
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mb-space-xl">
                Manage recyclable materials, schedule doorstep collections, estimate scrap value, and give reusable products a second life through one intelligent, auditable platform.
              </p>
              <div className="flex flex-wrap items-center gap-space-md w-full sm:w-auto">
                <button
                  onClick={() => onNavigate('schedule-pickup')}
                  className="inline-flex items-center justify-center px-space-lg py-3 bg-primary-container text-on-primary font-label-md text-label-md rounded-lg shadow-sm hover:bg-primary transition-all duration-200 font-semibold"
                >
                  <span className="material-symbols-outlined mr-space-xs text-[18px]">local_shipping</span>
                  Schedule a Pickup
                </button>
                <button
                  onClick={() => onNavigate('marketplace')}
                  className="inline-flex items-center justify-center px-space-lg py-3 bg-surface-container-lowest text-on-surface font-label-md text-label-md rounded-lg shadow-sm hover:bg-surface-container-high transition-all duration-200 border border-outline-variant/30 font-semibold"
                >
                  Explore Marketplace
                  <span className="material-symbols-outlined ml-space-xs text-[18px]">arrow_forward</span>
                </button>
              </div>

              {/* Micro Proof Stats */}
              <div className="grid grid-cols-3 gap-gutter mt-space-xl pt-space-lg w-full max-w-xl">
                <div>
                  <p className="font-metric-num text-metric-num text-on-surface font-bold font-mono">99.4%</p>
                  <p className="font-label-sm text-label-sm text-on-surface-variant uppercase mt-1 font-semibold">Audit Traceability</p>
                </div>
                <div>
                  <p className="font-metric-num text-metric-num text-on-surface font-bold font-mono">24-48h</p>
                  <p className="font-label-sm text-label-sm text-on-surface-variant uppercase mt-1 font-semibold">Pickup Dispatch</p>
                </div>
                <div>
                  <p className="font-metric-num text-metric-num text-on-surface font-bold font-mono">₹0</p>
                  <p className="font-label-sm text-label-sm text-on-surface-variant uppercase mt-1 font-semibold">Hidden Log Fees</p>
                </div>
              </div>
            </div>

            {/* Right: Interactive Bulk Manifest Preview Visual Card */}
            <div className="lg:col-span-5 w-full">
              <div className="relative bg-surface-container-lowest rounded-xl shadow-xl p-space-lg overflow-hidden border border-outline-variant/30">
                {/* Accent Top Line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-secondary-fixed-dim"></div>

                {/* Card Header */}
                <div className="flex items-center justify-between pb-space-md mb-space-md">
                  <div className="flex items-center gap-space-sm">
                    <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-primary">
                      <span className="material-symbols-outlined text-[20px]">inventory_2</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-space-xs">
                        <span className="font-label-sm text-label-sm uppercase font-semibold text-on-surface font-mono">Batch #RCV-84920</span>
                        <span className="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-fixed font-label-sm text-label-sm font-semibold">
                          VERIFIED
                        </span>
                      </div>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">Metro Logistics Hub • Zone 4</p>
                    </div>
                  </div>
                  <span className="font-label-sm text-label-sm font-mono text-on-surface-variant">09:42 UTC</span>
                </div>

                {/* Material Mass Segment Bar */}
                <div className="mb-space-md">
                  <div className="flex justify-between items-center text-label-sm font-label-sm mb-1.5">
                    <span className="text-on-surface-variant">Cumulative Manifest Mass</span>
                    <span className="font-bold text-on-surface font-mono">695.0 kg</span>
                  </div>
                  <div className="w-full h-2 rounded-full overflow-hidden flex bg-surface-container">
                    <div className="h-full bg-primary" style={{ width: '60%' }} title="Aluminium 420kg"></div>
                    <div className="h-full bg-secondary" style={{ width: '26%' }} title="Copper 180kg"></div>
                    <div className="h-full bg-tertiary-fixed-dim" style={{ width: '14%' }} title="E-Waste 95kg"></div>
                  </div>
                  <div className="flex justify-between items-center text-[11px] text-on-surface-variant mt-1.5 font-mono">
                    <span className="inline-flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-primary inline-block"></span> AL 60%
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-secondary inline-block"></span> CU 26%
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-tertiary-fixed-dim inline-block"></span> E-CIRC 14%
                    </span>
                  </div>
                </div>

                {/* Material Items Breakdown Ledger */}
                <div className="space-y-space-xs mb-space-lg">
                  <div className="p-space-sm bg-surface-container-low rounded-lg flex items-center justify-between">
                    <div className="flex items-center gap-space-sm">
                      <span className="material-symbols-outlined text-primary text-[18px]">category</span>
                      <div>
                        <p className="font-label-md text-label-md font-semibold text-on-surface">Industrial Aluminium T6</p>
                        <p className="font-body-sm text-body-sm text-on-surface-variant">Clean profile extrusions</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-label-md text-label-md font-bold text-on-surface font-mono">420.0 kg</p>
                      <p className="font-body-sm text-body-sm text-primary font-mono font-medium">₹88,200</p>
                    </div>
                  </div>

                  <div className="p-space-sm bg-surface-container-low rounded-lg flex items-center justify-between">
                    <div className="flex items-center gap-space-sm">
                      <span className="material-symbols-outlined text-secondary text-[18px]">cable</span>
                      <div>
                        <p className="font-label-md text-label-md font-semibold text-on-surface">Insulated Copper Wire</p>
                        <p className="font-body-sm text-body-sm text-on-surface-variant">Grade-A bright stripped</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-label-md text-label-md font-bold text-on-surface font-mono">180.0 kg</p>
                      <p className="font-body-sm text-body-sm text-primary font-mono font-medium">₹1,18,800</p>
                    </div>
                  </div>

                  <div className="p-space-sm bg-surface-container-low rounded-lg flex items-center justify-between">
                    <div className="flex items-center gap-space-sm">
                      <span className="material-symbols-outlined text-tertiary text-[18px]">memory</span>
                      <div>
                        <p className="font-label-md text-label-md font-semibold text-on-surface">Server Circuit Boards</p>
                        <p className="font-body-sm text-body-sm text-on-surface-variant">RoHS gold-plated pins</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-label-md text-label-md font-bold text-on-surface font-mono">95.0 kg</p>
                      <p className="font-body-sm text-body-sm text-primary font-mono font-medium">₹45,600</p>
                    </div>
                  </div>
                </div>

                {/* Chain of Custody Stepper */}
                <div className="pt-space-sm bg-surface-container-lowest">
                  <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-space-sm font-semibold">
                    Live Chain-of-Custody Track
                  </p>
                  <div className="flex items-center justify-between relative px-2">
                    {/* Step 1 */}
                    <div className="flex flex-col items-center z-10">
                      <div className="w-6 h-6 rounded-full bg-primary text-on-primary flex items-center justify-center text-[10px]">
                        <span className="material-symbols-outlined text-[14px]">check</span>
                      </div>
                      <span className="font-label-sm text-[10px] text-on-surface font-semibold mt-1">Intake</span>
                    </div>
                    <div className="flex-1 h-0.5 bg-primary -mx-1"></div>

                    {/* Step 2 */}
                    <div className="flex flex-col items-center z-10">
                      <div className="w-6 h-6 rounded-full bg-primary text-on-primary flex items-center justify-center text-[10px]">
                        <span className="material-symbols-outlined text-[14px]">check</span>
                      </div>
                      <span className="font-label-sm text-[10px] text-on-surface font-semibold mt-1">Weighed</span>
                    </div>
                    <div className="flex-1 h-0.5 bg-primary -mx-1"></div>

                    {/* Step 3 */}
                    <div className="flex flex-col items-center z-10">
                      <div className="w-6 h-6 rounded-full bg-primary text-on-primary flex items-center justify-center text-[10px]">
                        <span className="material-symbols-outlined text-[14px]">check</span>
                      </div>
                      <span className="font-label-sm text-[10px] text-on-surface font-semibold mt-1">Valued</span>
                    </div>
                    <div className="flex-1 h-0.5 bg-secondary-container -mx-1"></div>

                    {/* Step 4 */}
                    <div className="flex flex-col items-center z-10">
                      <div className="w-6 h-6 rounded-full bg-secondary-container text-on-secondary-fixed flex items-center justify-center text-[10px] animate-pulse">
                        <span className="material-symbols-outlined text-[14px]">cycle</span>
                      </div>
                      <span className="font-label-sm text-[10px] text-primary font-semibold mt-1">Processing</span>
                    </div>
                  </div>
                </div>

                {/* Card Bottom Bar */}
                <div className="mt-space-md pt-space-sm flex items-center justify-between text-on-surface-variant font-body-sm text-body-sm bg-surface-container-low px-space-md py-space-xs rounded-lg">
                  <span className="flex items-center gap-1 text-primary font-medium">
                    <span className="material-symbols-outlined text-[16px]">shield_with_heart</span>
                    Tamper-evident manifest
                  </span>
                  <span className="font-mono text-[11px]">Sha256: 9b2d...f41a</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Trust Capabilities / Pillars */}
      <section className="w-full bg-surface-container-lowest py-16 shadow-sm border-y border-outline-variant/30">
        <div className="max-w-7xl mx-auto px-margin-md lg:px-margin-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter-lg">
            <div className="p-space-lg bg-surface-container-low rounded-xl flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 border border-outline-variant/20">
              <div>
                <div className="w-10 h-10 rounded-lg bg-secondary-container text-on-secondary-fixed flex items-center justify-center mb-space-md">
                  <span className="material-symbols-outlined text-[22px]">event_repeat</span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold mb-space-xs">
                  Simplified Collection Management
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  On-demand doorstep pickups and scheduled recurring hauls for households, offices, and commercial industrial zones.
                </p>
              </div>
              <div className="mt-space-lg pt-space-sm flex items-center text-primary font-label-md text-label-md font-semibold">
                <span>Automated Fleet Routing</span>
              </div>
            </div>

            <div className="p-space-lg bg-surface-container-low rounded-xl flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 border border-outline-variant/20">
              <div>
                <div className="w-10 h-10 rounded-lg bg-secondary-container text-on-secondary-fixed flex items-center justify-center mb-space-md">
                  <span className="material-symbols-outlined text-[22px]">monitoring</span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold mb-space-xs">
                  Transparent Indicative Pricing
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  Dynamic valuation calculated against daily regional scrap commodity indices, ensuring accurate rate parity on every kilogram.
                </p>
              </div>
              <div className="mt-space-lg pt-space-sm flex items-center text-primary font-label-md text-label-md font-semibold">
                <span>Live Spot Rates</span>
              </div>
            </div>

            <div className="p-space-lg bg-surface-container-low rounded-xl flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 border border-outline-variant/20">
              <div>
                <div className="w-10 h-10 rounded-lg bg-secondary-container text-on-secondary-fixed flex items-center justify-center mb-space-md">
                  <span className="material-symbols-outlined text-[22px]">verified_user</span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold mb-space-xs">
                  Responsible E-Waste Handling
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  Strict compliance-backed destruction, demanufacturing, and mineral recovery with digital Green Certificates for audit readiness.
                </p>
              </div>
              <div className="mt-space-lg pt-space-sm flex items-center text-primary font-label-md text-label-md font-semibold">
                <span>Pollution Board Standard</span>
              </div>
            </div>

            <div className="p-space-lg bg-surface-container-low rounded-xl flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 border border-outline-variant/20">
              <div>
                <div className="w-10 h-10 rounded-lg bg-secondary-container text-on-secondary-fixed flex items-center justify-center mb-space-md">
                  <span className="material-symbols-outlined text-[22px]">storefront</span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold mb-space-xs">
                  Circular Recommerce Marketplace
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  Curated enterprise IT assets, office furnishings, and factory spares refurbished for verified circular lifecycle reuse.
                </p>
              </div>
              <div className="mt-space-lg pt-space-sm flex items-center text-primary font-label-md text-label-md font-semibold">
                <span>Condition-Graded Inventory</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem vs Solution Matrix */}
      <section className="max-w-7xl mx-auto px-margin-md lg:px-margin-lg py-20 lg:py-24">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-label-sm text-label-sm font-semibold uppercase tracking-wider text-primary">Systemic Optimization</span>
          <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold mt-2">Transforming the Linear Waste Paradox</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant mt-3">
            Legacy recycling relies on unverified brokers, uncertain payouts, and unnecessary disposal of working goods. Recyvora introduces automated clarity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter-lg">
          {/* Matrix Item 1 */}
          <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm border border-outline-variant/30 flex flex-col justify-between">
            <div className="space-y-space-md">
              <div className="p-space-md bg-error-container/40 rounded-lg">
                <div className="flex items-center gap-space-xs text-error font-label-sm text-label-sm uppercase font-semibold mb-1">
                  <span className="material-symbols-outlined text-[16px]">close</span>
                  Legacy Waste Problem
                </div>
                <p className="font-headline-sm text-headline-sm font-semibold text-on-surface">Fragmented Workflows</p>
                <p className="font-body-md text-body-md text-on-surface-variant mt-1">
                  Unscheduled doorstep calls, missing receipts, zero digital chain-of-custody, and hazardous landfill dumping.
                </p>
              </div>
              <div className="flex items-center justify-center py-1">
                <span className="material-symbols-outlined text-primary text-[24px]">arrow_downward</span>
              </div>
              <div className="p-space-md bg-secondary-container/50 rounded-lg">
                <div className="flex items-center gap-space-xs text-primary font-label-sm text-label-sm uppercase font-semibold mb-1">
                  <span className="material-symbols-outlined text-[16px]">check_circle</span>
                  The Recyvora Solution
                </div>
                <p className="font-headline-sm text-headline-sm font-semibold text-on-surface">Unified Digital Tracking</p>
                <p className="font-body-md text-body-md text-on-surface-variant mt-1">
                  Instant geofenced logistics dispatch, automated weighing with calibrated digital load sensors, and auditable manifest IDs.
                </p>
              </div>
            </div>
          </div>

          {/* Matrix Item 2 */}
          <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm border border-outline-variant/30 flex flex-col justify-between">
            <div className="space-y-space-md">
              <div className="p-space-md bg-error-container/40 rounded-lg">
                <div className="flex items-center gap-space-xs text-error font-label-sm text-label-sm uppercase font-semibold mb-1">
                  <span className="material-symbols-outlined text-[16px]">close</span>
                  Legacy Waste Problem
                </div>
                <p className="font-headline-sm text-headline-sm font-semibold text-on-surface">Opaque Scrap Valuation</p>
                <p className="font-body-md text-body-md text-on-surface-variant mt-1">
                  Subjective pricing, fluctuating arbitrary margins, zero metric benchmark standards, and unrecorded cash settlements.
                </p>
              </div>
              <div className="flex items-center justify-center py-1">
                <span className="material-symbols-outlined text-primary text-[24px]">arrow_downward</span>
              </div>
              <div className="p-space-md bg-secondary-container/50 rounded-lg">
                <div className="flex items-center gap-space-xs text-primary font-label-sm text-label-sm uppercase font-semibold mb-1">
                  <span className="material-symbols-outlined text-[16px]">check_circle</span>
                  The Recyvora Solution
                </div>
                <p className="font-headline-sm text-headline-sm font-semibold text-on-surface">Real-Time Pricing Engines</p>
                <p className="font-body-md text-body-md text-on-surface-variant mt-1">
                  Indexed algorithm calculating fair scrap values derived from direct industrial smelting and secondary commodity trade benchmarks.
                </p>
              </div>
            </div>
          </div>

          {/* Matrix Item 3 */}
          <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm border border-outline-variant/30 flex flex-col justify-between">
            <div className="space-y-space-md">
              <div className="p-space-md bg-error-container/40 rounded-lg">
                <div className="flex items-center gap-space-xs text-error font-label-sm text-label-sm uppercase font-semibold mb-1">
                  <span className="material-symbols-outlined text-[16px]">close</span>
                  Legacy Waste Problem
                </div>
                <p className="font-headline-sm text-headline-sm font-semibold text-on-surface">Premature Hardware Scrapping</p>
                <p className="font-body-md text-body-md text-on-surface-variant mt-1">
                  Functional workstations, components, and premium office furnishings prematurely crushed rather than circulated for second life.
                </p>
              </div>
              <div className="flex items-center justify-center py-1">
                <span className="material-symbols-outlined text-primary text-[24px]">arrow_downward</span>
              </div>
              <div className="p-space-md bg-secondary-container/50 rounded-lg">
                <div className="flex items-center gap-space-xs text-primary font-label-sm text-label-sm uppercase font-semibold mb-1">
                  <span className="material-symbols-outlined text-[16px]">check_circle</span>
                  The Recyvora Solution
                </div>
                <p className="font-headline-sm text-headline-sm font-semibold text-on-surface">Verified Recommerce Hub</p>
                <p className="font-body-md text-body-md text-on-surface-variant mt-1">
                  Tiered grading, diagnostics inspection, transparent warranties, and multi-tenant marketplace for institutional equipment trade.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="w-full bg-surface-container py-20">
        <div className="max-w-7xl mx-auto px-margin-md lg:px-margin-lg">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-gutter">
            <div>
              <span className="font-label-sm text-label-sm uppercase font-semibold tracking-wider text-primary">Operational Verticals</span>
              <h2 className="font-headline-lg text-headline-lg font-bold text-on-surface mt-2">Comprehensive Circular Solutions</h2>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-md">
              Modular service suites engineered to support both municipal household recycling and industrial enterprise scrap streams.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter-lg">
            {/* Service 1 */}
            <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow border border-outline-variant/30">
              <div>
                <div className="w-12 h-12 rounded-lg bg-surface-container flex items-center justify-center text-primary mb-space-md">
                  <span className="material-symbols-outlined text-[28px]">recycling</span>
                </div>
                <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface mb-2">Scrap Collection</h3>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  Scheduled or on-demand pickups for dry recyclables: metals, plastics, corrugated boards, and mixed polymers.
                </p>
                <ul className="mt-space-md space-y-1.5 font-body-sm text-body-sm text-on-surface-variant">
                  <li className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-primary text-[16px]">check</span> Digital scales on site
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-primary text-[16px]">check</span> Instant bank payout
                  </li>
                </ul>
              </div>
              <div className="mt-space-lg pt-space-md">
                <button
                  type="button"
                  onClick={() => onNavigate('schedule-pickup')}
                  className="inline-flex items-center text-primary font-label-md text-label-md font-semibold hover:text-primary-container transition-colors"
                >
                  Book Scrap Pickup
                  <span className="material-symbols-outlined ml-1 text-[16px]">arrow_forward</span>
                </button>
              </div>
            </div>

            {/* Service 2 */}
            <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow border border-outline-variant/30">
              <div>
                <div className="w-12 h-12 rounded-lg bg-surface-container flex items-center justify-center text-primary mb-space-md">
                  <span className="material-symbols-outlined text-[28px]">devices_other</span>
                </div>
                <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface mb-2">E-Waste Management</h3>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  End-to-end safe disposal of obsolete electronics, servers, and hazardous lithium battery assemblies.
                </p>
                <ul className="mt-space-md space-y-1.5 font-body-sm text-body-sm text-on-surface-variant">
                  <li className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-primary text-[16px]">check</span> Secure data sanitization
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-primary text-[16px]">check</span> Form-6 destruction cert
                  </li>
                </ul>
              </div>
              <div className="mt-space-lg pt-space-md">
                <button
                  type="button"
                  onClick={() => onNavigate('e-waste-requests')}
                  className="inline-flex items-center text-primary font-label-md text-label-md font-semibold hover:text-primary-container transition-colors"
                >
                  Request E-Waste Audit
                  <span className="material-symbols-outlined ml-1 text-[16px]">arrow_forward</span>
                </button>
              </div>
            </div>

            {/* Service 3 */}
            <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow border border-outline-variant/30">
              <div>
                <div className="w-12 h-12 rounded-lg bg-surface-container flex items-center justify-center text-primary mb-space-md">
                  <span className="material-symbols-outlined text-[28px]">calculate</span>
                </div>
                <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface mb-2">Scrap Price Estimator</h3>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  Instant rate computation engine based on material grade, weight estimates, and current regional yard spot prices.
                </p>
                <ul className="mt-space-md space-y-1.5 font-body-sm text-body-sm text-on-surface-variant">
                  <li className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-primary text-[16px]">check</span> Real-time commodity index
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-primary text-[16px]">check</span> Instant bulk quotation
                  </li>
                </ul>
              </div>
              <div className="mt-space-lg pt-space-md">
                <button
                  type="button"
                  onClick={() => onNavigate('scrap-price-estimator')}
                  className="inline-flex items-center text-primary font-label-md text-label-md font-semibold hover:text-primary-container transition-colors"
                >
                  Calculate Scrap Value
                  <span className="material-symbols-outlined ml-1 text-[16px]">arrow_forward</span>
                </button>
              </div>
            </div>

            {/* Service 4 */}
            <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow border border-outline-variant/30">
              <div>
                <div className="w-12 h-12 rounded-lg bg-surface-container flex items-center justify-center text-primary mb-space-md">
                  <span className="material-symbols-outlined text-[28px]">sync_alt</span>
                </div>
                <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface mb-2">Reusable Marketplace</h3>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  Connect pre-inspected business and residential products with buyers seeking quality equipment at lower costs.
                </p>
                <ul className="mt-space-md space-y-1.5 font-body-sm text-body-sm text-on-surface-variant">
                  <li className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-primary text-[16px]">check</span> Certified functional tests
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-primary text-[16px]">check</span> Escrow settlement safety
                  </li>
                </ul>
              </div>
              <div className="mt-space-lg pt-space-md">
                <button
                  type="button"
                  onClick={() => onNavigate('marketplace')}
                  className="inline-flex items-center text-primary font-label-md text-label-md font-semibold hover:text-primary-container transition-colors"
                >
                  Browse Listings
                  <span className="material-symbols-outlined ml-1 text-[16px]">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section: 4-Step Process */}
      <section className="max-w-7xl mx-auto px-margin-md lg:px-margin-lg py-20 lg:py-24">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-label-sm text-label-sm uppercase font-semibold tracking-wider text-primary">Process Architecture</span>
          <h2 className="font-headline-lg text-headline-lg font-bold text-on-surface mt-2">Frictionless from Intake to Settlement</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant mt-3">
            Four structured touchpoints deliver certified traceability, guaranteed weights, and rapid financial reconciliations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter-lg relative">
          {/* Step 01 */}
          <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm relative border border-outline-variant/30">
            <span className="font-mono text-3xl font-extrabold text-secondary-container">01</span>
            <h4 className="font-headline-sm text-headline-sm font-bold text-on-surface mt-2 mb-space-xs">Choose a Service</h4>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Select scrap haulage, certified e-waste decommission, or list high-grade inventory for marketplace recommerce.
            </p>
            <div className="mt-space-md pt-space-sm">
              <span className="font-label-sm text-label-sm text-primary uppercase font-semibold">Step 1: Classification</span>
            </div>
          </div>

          {/* Step 02 */}
          <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm relative border border-outline-variant/30">
            <span className="font-mono text-3xl font-extrabold text-secondary-container">02</span>
            <h4 className="font-headline-sm text-headline-sm font-bold text-on-surface mt-2 mb-space-xs">Provide Details</h4>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Input estimated tonnage, photograph lots, select material grades, and declare any data-bearing enterprise media.
            </p>
            <div className="mt-space-md pt-space-sm">
              <span className="font-label-sm text-label-sm text-primary uppercase font-semibold">Step 2: Manifest Entry</span>
            </div>
          </div>

          {/* Step 03 */}
          <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm relative border border-outline-variant/30">
            <span className="font-mono text-3xl font-extrabold text-secondary-container">03</span>
            <h4 className="font-headline-sm text-headline-sm font-bold text-on-surface mt-2 mb-space-xs">Schedule &amp; Publish</h4>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Lock in a verified logistics window, review transparent price valuations, or launch an active verified marketplace listing.
            </p>
            <div className="mt-space-md pt-space-sm">
              <span className="font-label-sm text-label-sm text-primary uppercase font-semibold">Step 3: Dispatch &amp; Lock</span>
            </div>
          </div>

          {/* Step 04 */}
          <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm relative border border-outline-variant/30">
            <span className="font-mono text-3xl font-extrabold text-secondary-container">04</span>
            <h4 className="font-headline-sm text-headline-sm font-bold text-on-surface mt-2 mb-space-xs">Track &amp; Settle</h4>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Monitor live GPS vehicle approach, review calibrated digital scale records, and receive instant digital settlement.
            </p>
            <div className="mt-space-md pt-space-sm">
              <span className="font-label-sm text-label-sm text-primary uppercase font-semibold">Step 4: Payout &amp; Certificate</span>
            </div>
          </div>
        </div>
      </section>

      {/* Marketplace Preview Section */}
      <section className="w-full bg-surface-container-low py-20">
        <div className="max-w-7xl mx-auto px-margin-md lg:px-margin-lg">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-gutter">
            <div>
              <span className="font-label-sm text-label-sm uppercase font-semibold tracking-wider text-primary">Circular Asset Exchange</span>
              <h2 className="font-headline-lg text-headline-lg font-bold text-on-surface mt-2">Active Recommerce Listings</h2>
              <p className="font-body-md text-body-md text-on-surface-variant mt-1">
                High-performance corporate assets inspected, wiped, and ready for deployment.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('marketplace')}
              className="inline-flex items-center text-primary font-label-md text-label-md font-semibold hover:underline"
            >
              View All Marketplace Lots
              <span className="material-symbols-outlined ml-1 text-[18px]">arrow_forward</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter-lg">
            {marketplaceProducts.slice(0, 4).map((prod) => (
              <div
                key={prod.id}
                className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between border border-outline-variant/30 group"
              >
                <div>
                  <div className="relative h-48 w-full bg-surface-container overflow-hidden">
                    <img
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      src={prod.imageUrl}
                      alt={prod.title}
                      referrerPolicy="no-referrer"
                    />
                    <span className="absolute top-3 left-3 px-2 py-0.5 rounded bg-surface-container-lowest/90 backdrop-blur-sm text-on-surface font-label-sm text-label-sm font-semibold">
                      {prod.conditionGrade}
                    </span>
                  </div>
                  <div className="p-space-md">
                    <div className="flex items-center gap-1 text-on-surface-variant text-[11px] font-mono mb-1">
                      <span className="material-symbols-outlined text-[14px]">pin_drop</span>
                      <span>{prod.location}</span>
                    </div>
                    <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface line-clamp-1">
                      {prod.title}
                    </h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 line-clamp-2">
                      {prod.subtitle}
                    </p>
                  </div>
                </div>

                <div className="p-space-md pt-0 flex items-center justify-between">
                  <div>
                    <span className="font-label-sm text-label-sm text-on-surface-variant">Price</span>
                    <p className="font-metric-num text-metric-num font-bold text-primary font-mono">
                      ₹{prod.price.toLocaleString('en-IN')}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleProductClick(prod)}
                    className="p-2 rounded-lg bg-surface-container hover:bg-secondary-container text-on-surface transition-colors"
                    title="View details"
                  >
                    <span className="material-symbols-outlined text-[20px]">visibility</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Business Solutions Section */}
      <section className="max-w-7xl mx-auto px-margin-md lg:px-margin-lg py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-lg items-center">
          <div className="lg:col-span-6 space-y-space-md">
            <span className="font-label-sm text-label-sm uppercase font-semibold tracking-wider text-primary">Enterprise Ecosystem</span>
            <h2 className="font-headline-lg text-headline-lg font-bold text-on-surface">Recycling Operations, Built for Business</h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant">
              Centralize circular governance across your entire enterprise footprint. Seamlessly handle multi-facility scrap collections, automate compliance documentation, and extract auditable ESG performance figures.
            </p>

            <div className="space-y-space-md pt-space-sm">
              <div className="flex items-start gap-space-md">
                <div className="w-8 h-8 rounded bg-secondary-container text-primary flex items-center justify-center shrink-0 mt-1">
                  <span className="material-symbols-outlined text-[18px]">receipt_long</span>
                </div>
                <div>
                  <h4 className="font-headline-sm text-headline-sm font-semibold text-on-surface">Bulk Manifests &amp; Multi-Facility Fleet</h4>
                  <p className="font-body-md text-body-md text-on-surface-variant">
                    Coordinate unified scrap dispatch across 100+ branches, plants, or campuses with single-pane console oversight.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-space-md">
                <div className="w-8 h-8 rounded bg-secondary-container text-primary flex items-center justify-center shrink-0 mt-1">
                  <span className="material-symbols-outlined text-[18px]">assignment_turned_in</span>
                </div>
                <div>
                  <h4 className="font-headline-sm text-headline-sm font-semibold text-on-surface">
                    Automated Statutory Compliance Certificates
                  </h4>
                  <p className="font-body-md text-body-md text-on-surface-variant">
                    Instant download of Form-2, Form-6, and safe destruction certificates mapped to national state pollution control norms.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-space-md">
                <div className="w-8 h-8 rounded bg-secondary-container text-primary flex items-center justify-center shrink-0 mt-1">
                  <span className="material-symbols-outlined text-[18px]">bar_chart</span>
                </div>
                <div>
                  <h4 className="font-headline-sm text-headline-sm font-semibold text-on-surface">
                    One-Click ESG &amp; Scope 3 Data Export
                  </h4>
                  <p className="font-body-md text-body-md text-on-surface-variant">
                    Export verified material diversion and carbon avoidance datasets ready for BRSR, GRI, and CDP sustainability filings.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-space-md">
              <button
                type="button"
                onClick={() => onNavigate('business')}
                className="inline-flex items-center px-space-lg py-3 bg-primary-container text-on-primary font-label-md text-label-md rounded-lg shadow-sm hover:bg-primary transition-colors font-semibold"
              >
                Schedule Enterprise Consultation
                <span className="material-symbols-outlined ml-space-xs text-[18px]">arrow_forward</span>
              </button>
            </div>
          </div>

          {/* Business Dashboard Graphic Visual */}
          <div className="lg:col-span-6 bg-surface-container-lowest p-space-lg rounded-xl shadow-md border border-outline-variant/30">
            <div className="flex items-center justify-between pb-space-md mb-space-md bg-surface-container-low px-space-md py-space-xs rounded-lg">
              <div className="flex items-center gap-space-xs">
                <span className="w-2.5 h-2.5 rounded-full bg-primary inline-block"></span>
                <span className="font-label-sm text-label-sm font-mono text-on-surface font-semibold">
                  FACILITY CONSOLE // CORP-NORTH-01
                </span>
              </div>
              <span className="font-label-sm text-label-sm font-mono text-primary font-semibold">Q3 AUDIT READY</span>
            </div>

            {/* Inline SVG Visualization Chart: Monthly Mass Diversion Flow */}
            <div className="p-space-md bg-surface rounded-lg mb-space-md">
              <div className="flex justify-between items-center mb-3">
                <span className="font-label-sm text-label-sm font-semibold text-on-surface uppercase">
                  Monthly Scrap Mass Flow (Metric Tonnes)
                </span>
                <span className="font-mono text-xs text-primary font-semibold">+18.4% vs Q2</span>
              </div>
              <svg className="w-full h-36" preserveAspectRatio="none" viewBox="0 0 400 120">
                <defs>
                  <linearGradient id="landingChartGradient" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#176B50" stopOpacity="0.25"></stop>
                    <stop offset="100%" stopColor="#176B50" stopOpacity="0.0"></stop>
                  </linearGradient>
                </defs>
                {/* Grid lines */}
                <line stroke="#d4e7e0" strokeDasharray="4" strokeWidth="1" x1="0" x2="400" y1="30" y2="30"></line>
                <line stroke="#d4e7e0" strokeDasharray="4" strokeWidth="1" x1="0" x2="400" y1="65" y2="65"></line>
                <line stroke="#d4e7e0" strokeWidth="1" x1="0" x2="400" y1="100" y2="100"></line>
                {/* Area & Line */}
                <polygon fill="url(#landingChartGradient)" points="0,90 65,82 130,70 195,55 260,60 325,40 400,22 400,100 0,100"></polygon>
                <polyline fill="none" points="0,90 65,82 130,70 195,55 260,60 325,40 400,22" stroke="#176B50" strokeWidth="2.5"></polyline>
                {/* Data Points */}
                <circle cx="65" cy="82" fill="#176B50" r="3.5"></circle>
                <circle cx="130" cy="70" fill="#176B50" r="3.5"></circle>
                <circle cx="195" cy="55" fill="#176B50" r="3.5"></circle>
                <circle cx="260" cy="60" fill="#176B50" r="3.5"></circle>
                <circle cx="325" cy="40" fill="#176B50" r="3.5"></circle>
                <circle cx="400" cy="22" fill="#176B50" r="4.5"></circle>
              </svg>
              <div className="flex justify-between text-[11px] font-mono text-on-surface-variant mt-1">
                <span>MAY</span>
                <span>JUN</span>
                <span>JUL</span>
                <span>AUG</span>
                <span>SEP</span>
                <span>OCT</span>
                <span>NOV (PEAK)</span>
              </div>
            </div>

            {/* 2 Column Micro KPI Cards */}
            <div className="grid grid-cols-2 gap-space-sm font-mono">
              <div className="p-space-sm bg-surface-container-low rounded-lg">
                <span className="text-[11px] text-on-surface-variant block font-sans">Scope 3 Emission Offset</span>
                <span className="text-base font-bold text-on-surface">412.8 TCO2e</span>
              </div>
              <div className="p-space-sm bg-surface-container-low rounded-lg">
                <span className="text-[11px] text-on-surface-variant block font-sans">Corporate Landfill Zero Factor</span>
                <span className="text-base font-bold text-primary">94.2%</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Environmental Impact Data Section */}
      <section className="w-full bg-primary text-on-primary py-20">
        <div className="max-w-7xl mx-auto px-margin-md lg:px-margin-lg">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-gutter">
            <div>
              <span className="font-label-sm text-label-sm uppercase font-semibold tracking-wider text-secondary-fixed">
                Quantifiable Ecological Recovery
              </span>
              <h2 className="font-headline-lg text-headline-lg font-bold text-on-primary mt-2">Certified Environmental Footprint</h2>
            </div>
            <div className="px-space-md py-space-xs rounded-lg bg-tertiary-container text-on-tertiary-container font-mono text-xs">
              * Illustrative demonstration data derived from 2024–2025 audited cohort samples
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter-lg">
            {/* Impact 1 */}
            <div className="bg-primary-container p-space-lg rounded-xl flex flex-col justify-between border border-secondary/30">
              <div>
                <div className="w-12 h-12 rounded-lg bg-tertiary-container flex items-center justify-center text-secondary-fixed mb-space-md">
                  <span className="material-symbols-outlined text-[28px]">delete_sweep</span>
                </div>
                <p className="font-metric-num text-metric-num font-extrabold text-on-primary tracking-tight font-mono">1,840+ MT</p>
                <h4 className="font-headline-sm text-headline-sm font-semibold mt-1">Landfill Material Diverted</h4>
                <p className="font-body-md text-body-md text-on-primary-container mt-2">
                  Dry scrap streams channelized directly into regional smelting furnaces and certified plastics re-granulation lines.
                </p>
              </div>
              <div className="mt-space-lg pt-space-sm text-xs font-mono text-secondary-fixed">
                EQUIVALENT TO 142 TRUCKLOADS
              </div>
            </div>

            {/* Impact 2 */}
            <div className="bg-primary-container p-space-lg rounded-xl flex flex-col justify-between border border-secondary/30">
              <div>
                <div className="w-12 h-12 rounded-lg bg-tertiary-container flex items-center justify-center text-secondary-fixed mb-space-md">
                  <span className="material-symbols-outlined text-[28px]">bolt</span>
                </div>
                <p className="font-metric-num text-metric-num font-extrabold text-on-primary tracking-tight font-mono">3,420 MWh</p>
                <h4 className="font-headline-sm text-headline-sm font-semibold mt-1">Primary Energy Conserved</h4>
                <p className="font-body-md text-body-md text-on-primary-container mt-2">
                  Energy saved by recirculating secondary metals versus bauxite ore reduction and virgin petrochemical cracking.
                </p>
              </div>
              <div className="mt-space-lg pt-space-sm text-xs font-mono text-secondary-fixed">
                POWER FOR 2,850 HOMES / YR
              </div>
            </div>

            {/* Impact 3 */}
            <div className="bg-primary-container p-space-lg rounded-xl flex flex-col justify-between border border-secondary/30">
              <div>
                <div className="w-12 h-12 rounded-lg bg-tertiary-container flex items-center justify-center text-secondary-fixed mb-space-md">
                  <span className="material-symbols-outlined text-[28px]">cloud_done</span>
                </div>
                <p className="font-metric-num text-metric-num font-extrabold text-on-primary tracking-tight font-mono">2,150 TCO2e</p>
                <h4 className="font-headline-sm text-headline-sm font-semibold mt-1">Emissions Mitigated</h4>
                <p className="font-body-md text-body-md text-on-primary-container mt-2">
                  Direct lifecycle CO2 abatement verified through GHG Protocol Corporate Value Chain calculation modules.
                </p>
              </div>
              <div className="mt-space-lg pt-space-sm text-xs font-mono text-secondary-fixed">
                OFFSET EQUAL TO 98,000 TREES
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Banner */}
      <section className="max-w-7xl mx-auto px-margin-md lg:px-margin-lg py-20 lg:py-28">
        <div className="bg-surface-container-lowest rounded-2xl p-space-xl lg:p-16 shadow-xl relative overflow-hidden border border-outline-variant/30">
          <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-secondary-container/40 rounded-full blur-3xl pointer-events-none"></div>
          <div className="max-w-2xl relative z-10">
            <span className="font-label-sm text-label-sm font-semibold uppercase tracking-wider text-primary">Accelerate Your Circular Transition</span>
            <h2 className="font-headline-xl text-headline-xl font-bold text-on-surface mt-2 mb-space-md">Make Every Material Count.</h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-space-xl">
              Bring your collection, recycling, and reuse activities into one connected platform. Fast doorstep pickups, real-time scrap pricing, and compliant ESG assurance.
            </p>
            <div className="flex flex-wrap items-center gap-space-md">
              <button
                type="button"
                onClick={() => onNavigate('schedule-pickup')}
                className="inline-flex items-center justify-center px-space-lg py-3.5 bg-primary-container text-on-primary font-label-md text-label-md rounded-lg shadow-sm hover:bg-primary transition-all font-semibold"
              >
                Get Started with Recyvora
                <span className="material-symbols-outlined ml-space-xs text-[18px]">arrow_forward</span>
              </button>
              <button
                type="button"
                onClick={() => onNavigate('scrap-price-estimator')}
                className="inline-flex items-center justify-center px-space-lg py-3.5 bg-surface-container-low text-on-surface font-label-md text-label-md rounded-lg shadow-sm hover:bg-surface-container-high transition-all font-semibold"
              >
                Explore Scrap Valuation
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Product Quick-View Dialog */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-on-background/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-surface-container-lowest rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden border border-outline-variant/40 max-h-[90vh] flex flex-col">
            <div className="p-4 bg-surface-container-low border-b border-outline-variant/30 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-secondary-container text-on-secondary-fixed text-xs font-bold">
                  {selectedProduct.conditionGrade}
                </span>
                <span className="text-body-sm text-outline font-mono">{selectedProduct.location}</span>
              </div>
              <button
                onClick={() => setSelectedProduct(null)}
                className="w-8 h-8 rounded-lg hover:bg-surface-container flex items-center justify-center"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4">
              <div className="h-64 rounded-xl overflow-hidden bg-surface-container">
                <img
                  src={selectedProduct.imageUrl}
                  alt={selectedProduct.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div>
                <h3 className="text-2xl font-bold text-on-surface">{selectedProduct.title}</h3>
                <p className="text-primary font-bold text-2xl font-mono mt-1">₹{selectedProduct.price.toLocaleString('en-IN')}</p>
                <p className="text-body-md text-on-surface-variant mt-2 leading-relaxed">{selectedProduct.description}</p>
              </div>

              <div className="bg-surface-container-low p-4 rounded-xl">
                <h4 className="font-bold text-sm text-on-surface mb-2">Verified Diagnostic Inspection:</h4>
                <ul className="space-y-1.5 text-xs text-on-surface-variant font-mono">
                  {selectedProduct.testedSpecs.map((spec, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary text-[16px]">verified</span>
                      <span>{spec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center justify-between text-xs text-outline font-mono">
                <span>Seller: {selectedProduct.sellerName}</span>
                <span>Protected by Recyvora Escrow</span>
              </div>
            </div>

            <div className="p-4 bg-surface-container-low border-t border-outline-variant/30 flex gap-3">
              <button
                onClick={() => setSelectedProduct(null)}
                className="px-4 py-2 bg-surface-container text-on-surface rounded-lg font-semibold text-sm hover:bg-surface-container-high"
              >
                Close
              </button>
              <button
                onClick={() => {
                  showToast(`Purchase Inquiry Submitted for ${selectedProduct.title}! Our escrow coordinator has reserved this asset and notified ${selectedProduct.sellerName}.`, 'success', 'Inquiry Registered');
                  setSelectedProduct(null);
                }}
                className="flex-1 py-2 bg-primary text-on-primary rounded-lg font-semibold text-sm hover:bg-tertiary-container shadow-sm flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-[18px]">shopping_bag</span>
                <span>Initiate Recommerce Purchase Request</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
