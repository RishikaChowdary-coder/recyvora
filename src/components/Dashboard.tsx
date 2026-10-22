import React, { useState } from 'react';
import { ScrapPickup } from '../types';
import { useToast } from './Toast';

interface DashboardProps {
  pickups: ScrapPickup[];
  onNavigate: (path: string) => void;
  onOpenTracking: (pickup: ScrapPickup) => void;
  onOpenCertificate: () => void;
  facilityId?: string;
}

export const Dashboard: React.FC<DashboardProps> = ({
  pickups,
  onNavigate,
  onOpenTracking,
  onOpenCertificate,
  facilityId = 'DEL-8803'
}) => {
  const { showToast } = useToast();
  const [timeRange, setTimeRange] = useState<string>('30');
  const [activeChartMonth, setActiveChartMonth] = useState<string | null>(null);
  const [selectedPickupDetail, setSelectedPickupDetail] = useState<ScrapPickup | null>(null);

  // Find priority next pickup
  const nextPickup = pickups.find((p) => p.isPriorityNext) || pickups[0];

  // Dynamic KPI calculations based on pickups
  const totalPickupsCount = 24 + (pickups.length > 4 ? pickups.length - 4 : 0);
  const completedCount = pickups.filter((p) => p.status === 'completed').length + 17;
  const inTransitCount = pickups.filter((p) => p.status === 'in_progress').length + 1;
  const scheduledCount = pickups.filter((p) => p.status === 'collector_assigned' || p.status === 'requested').length + 3;

  return (
    <div className="flex flex-col w-full px-gutter-lg py-space-xl flex flex-col gap-space-xl pb-20">
      {/* Top Action & Meta Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md">
        <div>
          <div className="flex items-center gap-space-sm mb-1">
            <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-bold">
              Industrial ESG &amp; Recovery
            </span>
            <span className="w-1 h-1 rounded-full bg-outline"></span>
            <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
              Facility ID #{facilityId}
            </span>
          </div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight font-bold">Overview</h1>
          <p className="font-body-md text-body-md text-on-surface-variant mt-0.5">
            Your recycling activity, collection requests, and material value in one place.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-space-sm">
          {/* Date Filter Pill */}
          <div className="flex items-center bg-surface-container-lowest px-space-md py-1.5 rounded-lg shadow-sm border border-outline-variant/40">
            <span className="material-symbols-outlined text-[16px] text-on-surface-variant mr-1.5">calendar_month</span>
            <select
              className="bg-transparent font-label-md text-label-md text-on-surface focus:outline-none cursor-pointer pr-1"
              id="timeRangeFilter"
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
            >
              <option value="30">Last 30 Days</option>
              <option value="90">Quarter to Date</option>
              <option value="180">Last 6 Months</option>
              <option value="365">Fiscal Year 2024</option>
            </select>
          </div>

          {/* Operational Status Indicator */}
          <div className="flex items-center gap-space-xs bg-surface-container-high px-space-md py-1.5 rounded-lg">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <span className="font-label-sm text-label-sm text-secondary font-semibold">All Systems Operational</span>
          </div>

          {/* Primary CTA */}
          <button
            onClick={() => onNavigate('schedule-pickup')}
            className="inline-flex items-center gap-space-xs px-space-lg py-2 bg-primary-container text-on-primary font-label-md text-label-md rounded-lg shadow-sm hover:bg-primary transition-all duration-150 font-semibold"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            <span>Schedule Pickup</span>
          </button>
        </div>
      </div>

      {/* Pinned Next Priority Pickup Banner */}
      {nextPickup && (
        <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/30 overflow-hidden">
          <div className="p-space-lg flex flex-col xl:flex-row items-start xl:items-center justify-between gap-space-lg">
            <div className="flex items-start gap-space-md">
              <div className="w-12 h-12 rounded-xl bg-surface-container-high flex items-center justify-center flex-shrink-0 text-primary">
                <span className="material-symbols-outlined text-[26px]">local_shipping</span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-space-sm">
                  <span className="font-label-sm text-label-sm bg-secondary-container text-on-secondary-container px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                    Priority Next Run
                  </span>
                  <span className="font-label-md text-label-md text-outline font-semibold font-mono">
                    {nextPickup.requestNumber}
                  </span>
                </div>
                <div className="font-headline-sm text-headline-sm text-on-surface font-bold mt-1">
                  Scheduled for {nextPickup.date} at {nextPickup.timeSlot.split('-')[0].trim()}
                </div>
                <div className="flex flex-wrap items-center gap-x-space-md gap-y-1 font-body-sm text-body-sm text-on-surface-variant mt-1.5">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[15px] text-outline">category</span>
                    {nextPickup.title} (~{nextPickup.totalWeightKg} kg)
                  </span>
                  <span className="w-1 h-1 rounded-full bg-outline-variant"></span>
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[15px] text-primary">verified</span>
                    {nextPickup.collectorName || 'Ramesh Kumar'} ({nextPickup.collectorId || 'COL-104'})
                  </span>
                  <span className="w-1 h-1 rounded-full bg-outline-variant"></span>
                  <span className="flex items-center gap-1 font-mono">
                    <span className="material-symbols-outlined text-[15px] text-outline">schedule</span>
                    Window: {nextPickup.timeSlot}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-space-sm w-full xl:w-auto justify-end">
              <button
                type="button"
                onClick={() => {
                  showToast(`Reschedule requested for ${nextPickup.requestNumber}. Dispatch coordinator will offer next available slots.`, 'info', 'Reschedule Requested');
                }}
                className="px-space-md py-2 bg-surface-container text-on-surface-variant hover:text-on-surface rounded-lg font-label-md text-label-md transition-colors"
              >
                Reschedule
              </button>
              <button
                type="button"
                onClick={() => onOpenTracking(nextPickup)}
                className="inline-flex items-center gap-1 px-space-md py-2 bg-primary text-on-primary rounded-lg font-label-md text-label-md hover:bg-tertiary-container shadow-sm transition-colors font-semibold"
              >
                <span className="material-symbols-outlined text-[16px]">navigation</span>
                <span>Track Real-time</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* KPI Metric Cards (4-Column Bento Layout) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md">
        {/* Card 1: Total Pickups */}
        <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm border border-outline-variant/30 flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold">Total Pickups</span>
            <span className="inline-flex items-center text-[11px] font-semibold text-secondary bg-surface-container px-2 py-0.5 rounded">
              +3 this month
            </span>
          </div>
          <div className="my-space-md">
            <div className="font-metric-num text-metric-num text-on-surface font-bold font-mono">{totalPickupsCount}</div>
          </div>
          <div className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
            <span>
              {completedCount} completed • {inTransitCount} in transit • {scheduledCount} scheduled
            </span>
          </div>
        </div>

        {/* Card 2: Completed Collections */}
        <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm border border-outline-variant/30 flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold">
              Completed Collections
            </span>
            <span className="material-symbols-outlined text-[18px] text-primary">verified_user</span>
          </div>
          <div className="my-space-md">
            <div className="font-metric-num text-metric-num text-on-surface font-bold font-mono">{completedCount}</div>
          </div>
          <div className="font-body-sm text-body-sm text-secondary font-medium flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">trending_up</span>
            <span>94.2% on-time execution rate</span>
          </div>
        </div>

        {/* Card 3: Material Value Yield */}
        <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm border border-outline-variant/30 flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold">
              Estimated Scrap Value
            </span>
            <span className="inline-flex items-center text-[11px] font-semibold text-primary bg-secondary-container text-on-secondary-container px-2 py-0.5 rounded font-mono">
              +₹12.4k settled
            </span>
          </div>
          <div className="my-space-md">
            <div className="font-metric-num text-metric-num text-on-surface font-bold font-mono">₹48,250</div>
          </div>
          <div className="font-body-sm text-body-sm text-on-surface-variant">Cumulative indicative net recovery</div>
        </div>

        {/* Card 4: Verified Material Weight */}
        <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm border border-outline-variant/30 flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold">
              Material Collected
            </span>
            <span className="material-symbols-outlined text-[18px] text-tertiary">scale</span>
          </div>
          <div className="my-space-md">
            <div className="font-metric-num text-metric-num text-on-surface font-bold font-mono">
              1,420 <span className="font-label-md text-label-md text-outline font-normal">kg</span>
            </div>
          </div>
          <div className="font-body-sm text-body-sm text-on-surface-variant truncate">
            820kg metals • 380kg tech • 220kg paper
          </div>
        </div>
      </div>

      {/* Main Analytics Section (2-Column Grid) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-lg">
        {/* Left: Collection Activity Trends (7-Cols) */}
        <div className="lg:col-span-7 bg-surface-container-lowest rounded-xl p-space-lg shadow-sm border border-outline-variant/30 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-space-md">
              <div>
                <div className="font-headline-sm text-headline-sm text-on-surface font-bold">Collection Activity</div>
                <p className="font-body-sm text-body-sm text-on-surface-variant">Volume recovered (kg) vs liquidated scrap yield value (₹)</p>
              </div>
              <div className="flex items-center gap-space-sm">
                <div className="flex items-center gap-1.5 font-label-sm text-label-sm text-on-surface-variant">
                  <span className="w-3 h-3 rounded-sm bg-primary-container"></span>
                  <span>Volume (kg)</span>
                </div>
                <div className="flex items-center gap-1.5 font-label-sm text-label-sm text-on-surface-variant">
                  <span className="w-3 h-3 rounded-sm bg-tertiary-fixed-dim"></span>
                  <span>Value (₹)</span>
                </div>
              </div>
            </div>

            {/* SVG Data Chart Visualization */}
            <div className="relative w-full h-64 pt-space-md">
              <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 540 180">
                {/* Grid lines */}
                <line className="text-surface-container-high" stroke="#d4e7e0" strokeDasharray="4" strokeWidth="1" x1="0" x2="540" y1="20" y2="20"></line>
                <line className="text-surface-container-high" stroke="#d4e7e0" strokeDasharray="4" strokeWidth="1" x1="0" x2="540" y1="65" y2="65"></line>
                <line className="text-surface-container-high" stroke="#d4e7e0" strokeDasharray="4" strokeWidth="1" x1="0" x2="540" y1="110" y2="110"></line>
                <line className="text-surface-container-high" stroke="#d4e7e0" strokeWidth="1" x1="0" x2="540" y1="155" y2="155"></line>

                {/* Nov Group */}
                <g onMouseEnter={() => setActiveChartMonth('Nov: 180kg • ₹6,200')} onMouseLeave={() => setActiveChartMonth(null)} className="cursor-pointer">
                  <rect className="fill-primary-container hover:opacity-80 transition-all" height="65" rx="3" width="18" x="25" y="90"></rect>
                  <rect className="fill-tertiary-fixed-dim hover:opacity-80 transition-all" height="40" rx="3" width="18" x="47" y="115"></rect>
                  <text className="fill-outline font-label-sm text-[11px]" textAnchor="middle" x="45" y="172">Nov</text>
                </g>

                {/* Dec Group */}
                <g onMouseEnter={() => setActiveChartMonth('Dec: 240kg • ₹8,100')} onMouseLeave={() => setActiveChartMonth(null)} className="cursor-pointer">
                  <rect className="fill-primary-container hover:opacity-80 transition-all" height="85" rx="3" width="18" x="110" y="70"></rect>
                  <rect className="fill-tertiary-fixed-dim hover:opacity-80 transition-all" height="60" rx="3" width="18" x="132" y="95"></rect>
                  <text className="fill-outline font-label-sm text-[11px]" textAnchor="middle" x="130" y="172">Dec</text>
                </g>

                {/* Jan Group */}
                <g onMouseEnter={() => setActiveChartMonth('Jan: 210kg • ₹7,400')} onMouseLeave={() => setActiveChartMonth(null)} className="cursor-pointer">
                  <rect className="fill-primary-container hover:opacity-80 transition-all" height="75" rx="3" width="18" x="195" y="80"></rect>
                  <rect className="fill-tertiary-fixed-dim hover:opacity-80 transition-all" height="55" rx="3" width="18" x="217" y="100"></rect>
                  <text className="fill-outline font-label-sm text-[11px]" textAnchor="middle" x="215" y="172">Jan</text>
                </g>

                {/* Feb Group */}
                <g onMouseEnter={() => setActiveChartMonth('Feb: 290kg • ₹10,200')} onMouseLeave={() => setActiveChartMonth(null)} className="cursor-pointer">
                  <rect className="fill-primary-container hover:opacity-80 transition-all" height="105" rx="3" width="18" x="280" y="50"></rect>
                  <rect className="fill-tertiary-fixed-dim hover:opacity-80 transition-all" height="80" rx="3" width="18" x="302" y="75"></rect>
                  <text className="fill-outline font-label-sm text-[11px]" textAnchor="middle" x="300" y="172">Feb</text>
                </g>

                {/* Mar Group */}
                <g onMouseEnter={() => setActiveChartMonth('Mar: 340kg • ₹12,450')} onMouseLeave={() => setActiveChartMonth(null)} className="cursor-pointer">
                  <rect className="fill-primary-container hover:opacity-80 transition-all" height="117" rx="3" width="18" x="365" y="38"></rect>
                  <rect className="fill-tertiary-fixed-dim hover:opacity-80 transition-all" height="97" rx="3" width="18" x="387" y="58"></rect>
                  <text className="fill-outline font-label-sm text-[11px]" textAnchor="middle" x="385" y="172">Mar</text>
                </g>

                {/* Apr Group (Current peak) */}
                <g onMouseEnter={() => setActiveChartMonth('Apr (Peak): 385kg • ₹14,900')} onMouseLeave={() => setActiveChartMonth(null)} className="cursor-pointer">
                  <rect className="fill-primary-container hover:opacity-80 transition-all" height="131" rx="3" width="18" x="450" y="24"></rect>
                  <rect className="fill-tertiary-fixed-dim hover:opacity-80 transition-all" height="113" rx="3" width="18" x="472" y="42"></rect>
                  <text className="fill-primary font-label-sm text-[11px] font-bold" textAnchor="middle" x="470" y="172">Apr (Now)</text>
                </g>
              </svg>

              {activeChartMonth && (
                <div className="absolute top-2 right-4 bg-surface-container-highest px-3 py-1 rounded text-xs font-mono font-semibold text-primary shadow-sm">
                  {activeChartMonth}
                </div>
              )}
            </div>
          </div>

          <div className="mt-space-md pt-space-sm bg-surface-container-low px-space-md py-space-sm rounded-lg flex items-center justify-between text-on-surface-variant font-body-sm text-body-sm">
            <span className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-primary">eco</span>
              Mass balance diversion efficiency increased by <strong>18.4%</strong> since January.
            </span>
            <button
              onClick={onOpenCertificate}
              className="text-primary font-label-md text-label-md hover:underline font-semibold"
            >
              Detailed Report →
            </button>
          </div>
        </div>

        {/* Right: Material Composition (5-Cols) */}
        <div className="lg:col-span-5 bg-surface-container-lowest rounded-xl p-space-lg shadow-sm border border-outline-variant/30 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-space-sm">
              <div>
                <div className="font-headline-sm text-headline-sm text-on-surface font-bold">Material Breakdown</div>
                <p className="font-body-sm text-body-sm text-on-surface-variant">Cumulative recovered distribution</p>
              </div>
              <span className="font-label-sm text-label-sm text-outline uppercase font-semibold font-mono">1,420 kg Total</span>
            </div>

            {/* Material Multi-segment Progress Bar */}
            <div className="w-full flex h-3 rounded-full overflow-hidden my-space-md gap-0.5">
              <div className="bg-primary transition-all duration-500" style={{ width: '58%' }} title="Metals: 58%"></div>
              <div className="bg-secondary-fixed-dim transition-all duration-500" style={{ width: '27%' }} title="E-Waste: 27%"></div>
              <div className="bg-surface-container-highest transition-all duration-500" style={{ width: '15%' }} title="Paper: 15%"></div>
            </div>

            {/* Category Specific Metrics */}
            <div className="flex flex-col gap-space-sm mt-space-md">
              <div className="flex items-center justify-between p-space-sm bg-surface-container-low rounded-lg">
                <div className="flex items-center gap-space-sm">
                  <span className="w-3 h-3 rounded-full bg-primary flex-shrink-0"></span>
                  <div>
                    <div className="font-label-md text-label-md text-on-surface font-semibold">Ferrous &amp; Non-Ferrous Metals</div>
                    <div className="font-body-sm text-body-sm text-on-surface-variant">Copper, Cast Aluminium, Brass scrap</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-label-md text-label-md text-on-surface font-bold font-mono">820 kg (58%)</div>
                  <div className="font-body-sm text-body-sm text-primary font-medium font-mono">₹31,400 est.</div>
                </div>
              </div>

              <div className="flex items-center justify-between p-space-sm bg-surface-container-low rounded-lg">
                <div className="flex items-center gap-space-sm">
                  <span className="w-3 h-3 rounded-full bg-secondary-fixed-dim flex-shrink-0"></span>
                  <div>
                    <div className="font-label-md text-label-md text-on-surface font-semibold">E-Waste &amp; Circuitry</div>
                    <div className="font-body-sm text-body-sm text-on-surface-variant">Server PCBs, Network switches, Inverters</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-label-md text-label-md text-on-surface font-bold font-mono">380 kg (27%)</div>
                  <div className="font-body-sm text-body-sm text-primary font-medium font-mono">₹13,850 est.</div>
                </div>
              </div>

              <div className="flex items-center justify-between p-space-sm bg-surface-container-low rounded-lg">
                <div className="flex items-center gap-space-sm">
                  <span className="w-3 h-3 rounded-full bg-surface-container-highest flex-shrink-0"></span>
                  <div>
                    <div className="font-label-md text-label-md text-on-surface font-semibold">Clean Paper &amp; Cardboard</div>
                    <div className="font-body-sm text-body-sm text-on-surface-variant">High-density corrugated packaging</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-label-md text-label-md text-on-surface font-bold font-mono">220 kg (15%)</div>
                  <div className="font-body-sm text-body-sm text-primary font-medium font-mono">₹3,000 est.</div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-space-md flex items-center justify-between">
            <span className="font-body-sm text-body-sm text-on-surface-variant">Current price index updated 24m ago</span>
            <button
              onClick={() => onNavigate('scrap-price-estimator')}
              className="font-label-md text-label-md text-primary hover:underline font-semibold flex items-center gap-1"
            >
              <span>Price Calculator</span>
              <span className="material-symbols-outlined text-[14px]">arrow_outward</span>
            </button>
          </div>
        </div>
      </div>

      {/* Quick Action Launchpad / Operations Dock */}
      <div>
        <div className="flex items-center justify-between mb-space-sm">
          <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold">Operations Dock</h2>
          <span className="font-label-sm text-label-sm text-outline">Fast-track requests</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md">
          <button
            onClick={() => onNavigate('schedule-pickup')}
            className="group bg-surface-container-lowest p-space-md rounded-xl shadow-sm border border-outline-variant/30 hover:shadow-md hover:border-primary/40 transition-all flex items-center gap-space-md text-left"
          >
            <div className="w-10 h-10 rounded-lg bg-surface-container-high text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-on-primary transition-colors">
              <span className="material-symbols-outlined text-[20px]">calendar_add_on</span>
            </div>
            <div>
              <div className="font-label-md text-label-md text-on-surface font-semibold group-hover:text-primary transition-colors">
                Schedule Pickup
              </div>
              <div className="font-body-sm text-body-sm text-on-surface-variant">Book logistics transport</div>
            </div>
          </button>

          <button
            onClick={() => onNavigate('e-waste-requests')}
            className="group bg-surface-container-lowest p-space-md rounded-xl shadow-sm border border-outline-variant/30 hover:shadow-md hover:border-primary/40 transition-all flex items-center gap-space-md text-left"
          >
            <div className="w-10 h-10 rounded-lg bg-surface-container-high text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-on-primary transition-colors">
              <span className="material-symbols-outlined text-[20px]">devices_other</span>
            </div>
            <div>
              <div className="font-label-md text-label-md text-on-surface font-semibold group-hover:text-primary transition-colors">
                Request E-Waste
              </div>
              <div className="font-body-sm text-body-sm text-on-surface-variant">Hazardous compliance pickup</div>
            </div>
          </button>

          <button
            onClick={() => onNavigate('scrap-price-estimator')}
            className="group bg-surface-container-lowest p-space-md rounded-xl shadow-sm border border-outline-variant/30 hover:shadow-md hover:border-primary/40 transition-all flex items-center gap-space-md text-left"
          >
            <div className="w-10 h-10 rounded-lg bg-surface-container-high text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-on-primary transition-colors">
              <span className="material-symbols-outlined text-[20px]">currency_rupee</span>
            </div>
            <div>
              <div className="font-label-md text-label-md text-on-surface font-semibold group-hover:text-primary transition-colors">
                Estimate Scrap Value
              </div>
              <div className="font-body-sm text-body-sm text-on-surface-variant">Real-time spot indices</div>
            </div>
          </button>

          <button
            onClick={() => onNavigate('marketplace')}
            className="group bg-surface-container-lowest p-space-md rounded-xl shadow-sm border border-outline-variant/30 hover:shadow-md hover:border-primary/40 transition-all flex items-center gap-space-md text-left"
          >
            <div className="w-10 h-10 rounded-lg bg-surface-container-high text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-on-primary transition-colors">
              <span className="material-symbols-outlined text-[20px]">store</span>
            </div>
            <div>
              <div className="font-label-md text-label-md text-on-surface font-semibold group-hover:text-primary transition-colors">
                List Reusable Item
              </div>
              <div className="font-body-sm text-body-sm text-on-surface-variant">B2B circular marketplace</div>
            </div>
          </button>
        </div>
      </div>

      {/* Verified Environmental Impact Snapshot Card */}
      <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm border border-outline-variant/30">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-space-md pb-space-md mb-space-md border-b border-outline-variant/20">
          <div>
            <div className="flex items-center gap-space-xs text-primary font-label-sm text-label-sm uppercase font-bold tracking-wider">
              <span className="material-symbols-outlined text-[16px]">verified</span>
              <span>ESG Audited Ledger</span>
            </div>
            <div className="font-headline-sm text-headline-sm text-on-surface font-bold mt-0.5">
              Environmental Impact Snapshot
            </div>
          </div>
          <button
            type="button"
            onClick={onOpenCertificate}
            className="flex items-center gap-space-xs bg-surface-container px-space-md py-1.5 rounded-lg text-primary font-label-md text-label-md font-semibold hover:bg-surface-container-high transition-colors"
          >
            <span className="material-symbols-outlined text-[16px]">download</span>
            <span>Download ESG Certificate</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
          <div className="bg-surface-container-low p-space-md rounded-lg flex items-center gap-space-md">
            <div className="w-12 h-12 rounded-xl bg-secondary-container text-on-secondary-container flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-[24px]">cloud_off</span>
            </div>
            <div>
              <div className="font-metric-num text-metric-num text-on-surface font-bold font-mono">
                840 <span className="font-label-md text-label-md text-outline font-normal">kg</span>
              </div>
              <div className="font-label-md text-label-md text-on-surface font-semibold">CO₂ Emissions Avoided</div>
              <div className="font-body-sm text-body-sm text-on-surface-variant">Equivalent to ~3,400 km car travel</div>
            </div>
          </div>

          <div className="bg-surface-container-low p-space-md rounded-lg flex items-center gap-space-md">
            <div className="w-12 h-12 rounded-xl bg-secondary-container text-on-secondary-container flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-[24px]">bolt</span>
            </div>
            <div>
              <div className="font-metric-num text-metric-num text-on-surface font-bold font-mono">
                1,200 <span className="font-label-md text-label-md text-outline font-normal">kWh</span>
              </div>
              <div className="font-label-md text-label-md text-on-surface font-semibold">Grid Energy Conserved</div>
              <div className="font-body-sm text-body-sm text-on-surface-variant">Direct smelting savings</div>
            </div>
          </div>

          <div className="bg-surface-container-low p-space-md rounded-lg flex items-center gap-space-md">
            <div className="w-12 h-12 rounded-xl bg-secondary-container text-on-secondary-container flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-[24px]">security</span>
            </div>
            <div>
              <div className="font-metric-num text-metric-num text-on-surface font-bold font-mono">
                42 <span className="font-label-md text-label-md text-outline font-normal">kg</span>
              </div>
              <div className="font-label-md text-label-md text-on-surface font-semibold">Toxic Lead Diverted</div>
              <div className="font-body-sm text-body-sm text-on-surface-variant">Safely neutralized via ISO plant</div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Collections Table */}
      <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/30 overflow-hidden">
        <div className="p-space-lg flex items-center justify-between">
          <div>
            <div className="font-headline-sm text-headline-sm text-on-surface font-bold">Recent Collections</div>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Track status, assigned logistics partners, and mass reconciliation
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('my-pickups')}
            className="font-label-md text-label-md text-primary font-semibold hover:underline flex items-center gap-1"
          >
            <span>View All Pickups</span>
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider">
              <tr>
                <th className="py-space-sm px-space-lg font-semibold" scope="col">
                  Request ID
                </th>
                <th className="py-space-sm px-space-md font-semibold" scope="col">
                  Material Category
                </th>
                <th className="py-space-sm px-space-md font-semibold" scope="col">
                  Requested Date
                </th>
                <th className="py-space-sm px-space-md font-semibold" scope="col">
                  Estimated Qty
                </th>
                <th className="py-space-sm px-space-md font-semibold" scope="col">
                  Collector Assigned
                </th>
                <th className="py-space-sm px-space-md font-semibold" scope="col">
                  Status
                </th>
                <th className="py-space-sm px-space-lg text-right font-semibold" scope="col">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y-0 text-on-surface font-body-sm text-body-sm">
              {pickups.map((p) => {
                const isAssigned = p.status === 'collector_assigned';
                const isInProgress = p.status === 'in_progress';
                const isCompleted = p.status === 'completed';

                return (
                  <tr
                    key={p.id}
                    className={`hover:bg-surface-container-low transition-colors ${
                      isInProgress ? 'bg-surface-container-low/30' : ''
                    }`}
                  >
                    <td className="py-space-md px-space-lg font-semibold text-primary font-label-md text-label-md font-mono">
                      {p.requestNumber}
                    </td>
                    <td className="py-space-md px-space-md">
                      <div className="font-medium text-on-surface">{p.title}</div>
                      <div className="text-on-surface-variant text-[11px]">{p.categoryLabel}</div>
                    </td>
                    <td className="py-space-md px-space-md text-on-surface-variant">{p.date}</td>
                    <td className="py-space-md px-space-md font-semibold font-mono">~{p.totalWeightKg} kg</td>
                    <td className="py-space-md px-space-md">
                      {p.collectorName ? (
                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-[16px] text-primary">badge</span>
                          <span>
                            {p.collectorName} ({p.collectorId || '#104'})
                          </span>
                        </div>
                      ) : (
                        <span className="text-outline italic">Pending Route Allocation</span>
                      )}
                    </td>
                    <td className="py-space-md px-space-md">
                      {isAssigned && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-surface-container-high text-secondary px-2.5 py-1 rounded-full">
                          <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                          Collector Assigned
                        </span>
                      )}
                      {isInProgress && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-secondary-container text-on-secondary-container px-2.5 py-1 rounded-full">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping"></span>
                          In Progress
                        </span>
                      )}
                      {isCompleted && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-surface-container text-primary px-2.5 py-1 rounded-full">
                          <span className="material-symbols-outlined text-[12px]">check</span>
                          Completed
                        </span>
                      )}
                      {p.status === 'requested' && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-surface-container-highest text-on-surface-variant px-2.5 py-1 rounded-full">
                          Requested
                        </span>
                      )}
                    </td>
                    <td className="py-space-md px-space-lg text-right">
                      <button
                        type="button"
                        onClick={() => {
                          if (p.collectorName) {
                            onOpenTracking(p);
                          } else {
                            setSelectedPickupDetail(p);
                          }
                        }}
                        className="text-primary hover:text-tertiary-container font-label-md text-label-md font-semibold hover:underline"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Modal if requested pickup clicked */}
      {selectedPickupDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-on-background/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-surface-container-lowest rounded-2xl shadow-xl max-w-md w-full p-6 border border-outline-variant/30">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-lg text-on-surface">{selectedPickupDetail.requestNumber} Details</h3>
              <button
                onClick={() => setSelectedPickupDetail(null)}
                className="text-outline hover:text-on-surface"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="space-y-3 text-sm">
              <p><strong>Category:</strong> {selectedPickupDetail.categoryLabel}</p>
              <p><strong>Scheduled Date:</strong> {selectedPickupDetail.date}</p>
              <p><strong>Window:</strong> {selectedPickupDetail.timeSlot}</p>
              <p><strong>Location:</strong> {selectedPickupDetail.facilityAddress}</p>
              <p><strong>Estimated Range:</strong> ₹{selectedPickupDetail.estimatedPayoutFloor} - ₹{selectedPickupDetail.estimatedPayoutCeiling}</p>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setSelectedPickupDetail(null)}
                className="px-4 py-2 bg-primary text-on-primary rounded-lg text-sm font-semibold"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
