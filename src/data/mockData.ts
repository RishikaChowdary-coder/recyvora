import { CommodityBenchmark, MarketplaceProduct, ScrapPickup, EWasteItem, UserProfile } from '../types';

export const currentUser: UserProfile = {
  name: 'Elena Vance',
  roleTitle: 'Chief Sustainability Lead',
  role: 'business',
  facilityId: 'DEL-8803',
  companyName: 'Recyvora Enterprise Solutions',
  avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDrD35kzcKUnxlHZK3KEtuIQBtTNj4jGBwWpFRL-k6cTS_ms54HznpRMlsle9XFeF6J69FpfZYdcSeLfoyubBbCB3nVe0nUA_mr81zYAahisQGk9wRVLWZqj_PuL-zo2HUzptOE3QZETnWShbl-cVESkzRhA5AUZkKp4DtL_zHTEjHZg7cBlH4zIBZwlgfcmX9NvIRD2gW8zfyPLwrsmUMel-R6myErJAvIPWSbOd7lYHMDkud7KRUNhw'
};

export const initialPickups: ScrapPickup[] = [
  {
    id: 'pk-1',
    requestNumber: '#RCV-8942',
    title: 'Heavy Copper & Telecom Cable',
    categoryLabel: 'Industrial Non-Ferrous',
    items: [
      {
        id: 'item-1',
        name: 'Copper Wire (Clean Scrap)',
        subtext: 'Grade 1 Heavy Bare • Approx. 15.0 kg',
        category: 'non-ferrous',
        weightKg: 15.0,
        ratePerKg: 480,
        totalValue: 7200,
        grade: 'Millberry 99.9%'
      },
      {
        id: 'item-2',
        name: 'Aluminium Cast & Extrusion',
        subtext: 'Tense Grade Scrap • Approx. 20.0 kg',
        category: 'non-ferrous',
        weightKg: 20.0,
        ratePerKg: 145,
        totalValue: 2900,
        grade: 'HE9 Clean'
      },
      {
        id: 'item-3',
        name: 'Server Scrap PCBs',
        subtext: 'Dual Xeon Motherboards • Approx. 10.0 kg',
        category: 'ewaste',
        weightKg: 10.0,
        ratePerKg: 940,
        totalValue: 9400,
        grade: 'Gold-Plated'
      }
    ],
    totalWeightKg: 45.0,
    estimatedPayoutFloor: 8400,
    estimatedPayoutCeiling: 9200,
    date: 'Tomorrow, Oct 24, 2024',
    timeSlot: '10:30 AM - 11:30 AM',
    status: 'collector_assigned',
    facilityName: 'HQ Bangalore Tech Park - Dock 4 (Saved)',
    facilityAddress: 'Plot 42, Outer Ring Road, Devarabisanahalli',
    city: 'Bengaluru',
    postalCode: '560103',
    dockDetails: 'Sub-Level B2, Freight Bay 04, Service Lift Access',
    contactName: 'Elena Vance',
    contactPhone: '+91 98765 43210',
    specialInstructions: 'Security clearance required at Gate 2. Elevator accessible for bulk trolleys.',
    collectorName: 'Ramesh Kumar',
    collectorId: '#104',
    collectorVehicle: 'Tata Ace Electric (KA-03-HA-8842)',
    etaMinutes: 24,
    manifestHash: '9b2df41a94e823cd0b11568e',
    createdAt: '2024-10-21 09:42 UTC',
    isPriorityNext: true
  },
  {
    id: 'pk-2',
    requestNumber: '#RCV-8931',
    title: 'Obsolete Office Laptops & Servers',
    categoryLabel: 'E-Waste Class 1',
    items: [
      {
        id: 'item-4',
        name: 'Enterprise Workstations & Laptops',
        subtext: 'Dismantled IT hardware with erased storage',
        category: 'ewaste',
        weightKg: 120.0,
        ratePerKg: 320,
        totalValue: 38400
      }
    ],
    totalWeightKg: 120.0,
    estimatedPayoutFloor: 36000,
    estimatedPayoutCeiling: 39500,
    date: 'Apr 18, 2024',
    timeSlot: '11:00 AM - 01:00 PM',
    status: 'in_progress',
    facilityName: 'Whitefield Assembly Plant - Yard 2',
    facilityAddress: 'EPIP Zone, Phase 1, Whitefield',
    city: 'Bengaluru',
    postalCode: '560066',
    dockDetails: 'Gate 3, Ramp B',
    contactName: 'Aakash Varma',
    contactPhone: '+91 98765 11223',
    collectorName: 'Aakash Varma',
    collectorId: '#089',
    collectorVehicle: 'Eicher Pro EV (KA-04-EV-9901)',
    etaMinutes: 45,
    manifestHash: '4f8ae21184c980df990b7612',
    createdAt: '2024-04-18 10:15 UTC'
  },
  {
    id: 'pk-3',
    requestNumber: '#RCV-8890',
    title: 'Sorted Corrugated Cartons',
    categoryLabel: 'Cellulose Pulp Grade B',
    items: [
      {
        id: 'item-5',
        name: 'Corrugated Cardboard (OCC 11)',
        subtext: 'Double wall baled warehouse cartons',
        category: 'paper',
        weightKg: 220.0,
        ratePerKg: 14.8,
        totalValue: 3256
      }
    ],
    totalWeightKg: 220.0,
    estimatedPayoutFloor: 3000,
    estimatedPayoutCeiling: 3400,
    finalWeightKg: 224.5,
    finalPayout: 3322.6,
    date: 'Apr 14, 2024',
    timeSlot: '02:00 PM - 04:00 PM',
    status: 'completed',
    facilityName: 'Bellandur Storage Facility - Gate 3',
    facilityAddress: 'Survey 88, Bellandur Lake Road',
    city: 'Bengaluru',
    postalCode: '560103',
    dockDetails: 'Loading Bay 1',
    contactName: 'Elena Vance',
    contactPhone: '+91 98765 43210',
    collectorName: 'Vikram Logistics Corp',
    collectorId: '#012',
    manifestHash: '1a90c44bb837fe109cde8821',
    createdAt: '2024-04-14 08:30 UTC'
  },
  {
    id: 'pk-4',
    requestNumber: '#RCV-8845',
    title: 'Lead Acid Industrial Batteries',
    categoryLabel: 'Special HazMat Regulated',
    items: [
      {
        id: 'item-6',
        name: 'Battery Lead Scrap (Drained)',
        subtext: 'IS 13369 / Rains sealed commercial VRLA',
        category: 'batteries',
        weightKg: 180.0,
        ratePerKg: 142,
        totalValue: 25560
      }
    ],
    totalWeightKg: 180.0,
    estimatedPayoutFloor: 24500,
    estimatedPayoutCeiling: 26200,
    date: 'Apr 11, 2024',
    timeSlot: '09:00 AM - 11:00 AM',
    status: 'requested',
    facilityName: 'HQ Bangalore Tech Park - Dock 4 (Saved)',
    facilityAddress: 'Plot 42, Outer Ring Road, Devarabisanahalli',
    city: 'Bengaluru',
    postalCode: '560103',
    dockDetails: 'Sub-Level B2, Freight Bay 04',
    contactName: 'Elena Vance',
    contactPhone: '+91 98765 43210',
    createdAt: '2024-04-11 14:00 UTC'
  }
];

export const commodityBenchmarks: CommodityBenchmark[] = [
  {
    id: 'cb-1',
    name: 'Pure Copper Wire (Grade 1)',
    stream: 'Metals',
    categoryKey: 'non-ferrous',
    standardGrade: 'IS 1244 / Millberry',
    indicativeBaseRate: 720.00,
    trend7dPercent: 2.4,
    refreshedTime: 'Today, 08:00',
    co2FactorKg: 2.49,
    unit: 'kg'
  },
  {
    id: 'cb-2',
    name: 'Brass Scrap Honey',
    stream: 'Metals',
    categoryKey: 'non-ferrous',
    standardGrade: 'IS 319 / Extruded',
    indicativeBaseRate: 485.00,
    trend7dPercent: 1.1,
    refreshedTime: 'Today, 08:00',
    co2FactorKg: 1.85,
    unit: 'kg'
  },
  {
    id: 'cb-3',
    name: 'Aluminium Extrusions',
    stream: 'Metals',
    categoryKey: 'non-ferrous',
    standardGrade: 'HE9 / 6063 Clean',
    indicativeBaseRate: 218.40,
    trend7dPercent: -0.8,
    refreshedTime: 'Today, 08:00',
    co2FactorKg: 4.12,
    unit: 'kg'
  },
  {
    id: 'cb-4',
    name: 'Heavy Melting Steel (HMS 1)',
    stream: 'Metals',
    categoryKey: 'ferrous',
    standardGrade: 'IS 2062 Grade',
    indicativeBaseRate: 38.50,
    trend7dPercent: 0.5,
    refreshedTime: 'Today, 08:00',
    co2FactorKg: 1.45,
    unit: 'kg'
  },
  {
    id: 'cb-5',
    name: 'Stainless Steel 304',
    stream: 'Metals',
    categoryKey: 'ferrous',
    standardGrade: 'AISI 304 Non-Mag',
    indicativeBaseRate: 128.00,
    trend7dPercent: 1.8,
    refreshedTime: 'Today, 08:00',
    co2FactorKg: 2.20,
    unit: 'kg'
  },
  {
    id: 'cb-6',
    name: 'Server Motherboards (Gold/Ag)',
    stream: 'E-Waste',
    categoryKey: 'ewaste',
    standardGrade: 'Dual Socket Xeon',
    indicativeBaseRate: 940.00,
    trend7dPercent: 3.2,
    refreshedTime: 'Today, 08:00',
    co2FactorKg: 6.80,
    unit: 'kg'
  },
  {
    id: 'cb-7',
    name: 'Telecom Switching Boards',
    stream: 'E-Waste',
    categoryKey: 'ewaste',
    standardGrade: 'Class A High Au',
    indicativeBaseRate: 1120.00,
    trend7dPercent: 4.1,
    refreshedTime: 'Today, 08:00',
    co2FactorKg: 8.40,
    unit: 'kg'
  },
  {
    id: 'cb-8',
    name: 'HDPE Regrind Natural',
    stream: 'Plastics',
    categoryKey: 'plastics',
    standardGrade: 'Blow Mould Clean',
    indicativeBaseRate: 72.00,
    trend7dPercent: -1.2,
    refreshedTime: 'Today, 08:00',
    co2FactorKg: 1.30,
    unit: 'kg'
  },
  {
    id: 'cb-9',
    name: 'PET Clear Flakes (Hot Washed)',
    stream: 'Plastics',
    categoryKey: 'plastics',
    standardGrade: '<50ppm PVC',
    indicativeBaseRate: 64.50,
    trend7dPercent: 0.6,
    refreshedTime: 'Today, 08:00',
    co2FactorKg: 1.45,
    unit: 'kg'
  },
  {
    id: 'cb-10',
    name: 'Corrugated Cardboard (OCC 11)',
    stream: 'Paper',
    categoryKey: 'paper',
    standardGrade: 'Double Wall Baled',
    indicativeBaseRate: 14.80,
    trend7dPercent: -0.4,
    refreshedTime: 'Today, 08:00',
    co2FactorKg: 0.95,
    unit: 'kg'
  },
  {
    id: 'cb-11',
    name: 'Sorted Office Paper (SOP)',
    stream: 'Paper',
    categoryKey: 'paper',
    standardGrade: 'Deinkable Grade',
    indicativeBaseRate: 21.50,
    trend7dPercent: 1.0,
    refreshedTime: 'Today, 08:00',
    co2FactorKg: 1.20,
    unit: 'kg'
  },
  {
    id: 'cb-12',
    name: 'Battery Lead Scrap (Drained)',
    stream: 'Metals',
    categoryKey: 'batteries',
    standardGrade: 'IS 13369 / Rains',
    indicativeBaseRate: 142.00,
    trend7dPercent: 0.3,
    refreshedTime: 'Today, 08:00',
    co2FactorKg: 1.10,
    unit: 'kg'
  }
];

export const marketplaceProducts: MarketplaceProduct[] = [
  {
    id: 'prod-1',
    title: 'ThinkPad T14 Gen 2',
    subtitle: 'i7-1185G7 • 16GB RAM • 512GB NVMe • Tested Battery',
    category: 'Electronics',
    price: 34500,
    conditionGrade: 'Grade A Refurbished',
    location: 'Bengaluru Tech Park Hub',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB6ZnF--qVWNr1nZ1jjfkSt-isB2CCy5SvbJWOKDXBYznJHBMXcOERMIDNtRibZOFvsIKQkZFIzuH9oTaWh6yiMArC0B3V8F04f1PkstwAEfpO2dAFBn0z0R4prbHHWNdCW_pUJhENUwh6vQTRwyDogztU3NeFoXlWQKg8z4QPIBUsuFuelysvX5Fa8sP5K3uZiYZpRhOS5nVqeR5OwqHlyslNfwnpbskD3L4M2LvcOTllEb2s_ENocQQ',
    description: 'Decommissioned enterprise laptop thoroughly inspected and certified. BIOS reset, new battery cell health tested at 94%, keyboard and IPS panel sanitized with 90-day warranty.',
    testedSpecs: ['Intel Core i7 11th Gen', '16GB DDR4 Dual-channel', '512GB PCIe M.2 NVMe SSD', 'FHD Antiglare Display', 'Windows 11 Pro Verified OEM Key'],
    sellerName: 'Wipro Corporate Assets Liquidator',
    status: 'active',
    postedDate: 'Oct 20, 2024'
  },
  {
    id: 'prod-2',
    title: 'Steel Storage Shelving',
    subtitle: '4-Tier 800kg load capacity • Powder coated finish',
    category: 'Industrial Storage',
    price: 8200,
    conditionGrade: 'Excellent Struct',
    location: 'Pune Industrial Depot',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB_9R_ukVcG5lB6K6lin-wG9ZAIO1_91ffC_iIZsq-aMi5WMWFb6btFobcR7IaTfvHsJIfXGdN9UwleklAUt6Xs4sZetRzHR7kvxgbrhOOGoGeDkWHMxyE1mEfa7mvq3s8htE9XF3peJZM4CQLLDrkVUxPygIzh-EFeedglR0MYXe03ccG8JI1J008N0ZO_tRZFmLzwQHrgvhuwRQqz3iXMGVQapu5MkSmMQkQkaQ--Wq6JWBNTcFHq4w',
    description: 'Heavy duty modular warehouse racking disassembled from an FMCG distribution center in Chakan. Structurally sound cold-rolled steel with minimal surface scuffs.',
    testedSpecs: ['4 Adjustable Tiers', '200kg per shelf payload', 'Powder-coated evergreen grey', 'Toolless boltless assembly pins'],
    sellerName: 'Godrej Storage Reclaim Program',
    status: 'active',
    postedDate: 'Oct 19, 2024'
  },
  {
    id: 'prod-3',
    title: 'Herman Miller Aeron Chair',
    subtitle: 'Size B • Fully Adjustable Arms • PostureFit SL Lumbar',
    category: 'Office Furnishing',
    price: 28000,
    conditionGrade: 'Certified Refurb',
    location: 'Gurugram Corporate Sector',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDfOKCOyuFlSBHMqoOftn6-XMZejshb4RvAHE6zM9AxFEjPQ3Fs7TULnYsytdQ4NT2rm607JbpTIZToRaPgFOW5-yCc0zCGT62rZYmmfNvN7c8BWCLCzwlStKRLoxiV5SKFhzoK0x5kIzasKVJsNk_JzkWM6gID2jbHtoKzDhSP7NHYjghtjrPidfUpo6UzVJJjR_y9A-e9R7tJdkspJte_LE-7ry1ByCYYSsIwpvDt7pM6x1fBM6kQlw',
    description: 'Classic graphite mineral mesh ergonomic task chair from a multinational financial tech firm. Cylinder replaced with heavy-duty OEM gas lift, casters lubricated.',
    testedSpecs: ['Size B Medium frame', 'Pellicle 8Z breathable mesh', 'Harmonic tilt limiter', 'PostureFit SL lumbar support module'],
    sellerName: 'DLF CyberCity Circular Asset Exchange',
    status: 'active',
    postedDate: 'Oct 18, 2024'
  },
  {
    id: 'prod-4',
    title: 'Cisco Catalyst 2960-X',
    subtitle: '48 GigE PoE+ • 4x 1G SFP • Factory reset firmware',
    category: 'Networking Hardware',
    price: 14200,
    conditionGrade: 'Diagnostic Verified',
    location: 'Navi Mumbai Data Center',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB_Ug2uQ7O0gXnHC5piO_P_D0TfD7BINyAriiGZbf4odYDvcek1o9wZvPTS34_iQcBiiezzNMV0LJiKXv_79MHBG6nYIjcXlNrLMxM2lZ8_djaZFh7mimObDYjtFL8YtTrJktIU5XG1NChUgCYyGAtckZY-l3Ce4F69LHIaL9Y_L_1w1K0SPmSI8QjSXJ_twj3EaLawcYajzqC4dXPMQCC7nWCVcC2Wa_SjZSJmjFKC2a0DS5r4h2hlLQ',
    description: 'Enterprise rackmount network switch with 740W PoE power budget. Port diagnostics run clean with 0 packet drops. Includes rack ears and power cable.',
    testedSpecs: ['48 Ethernet 10/100/1000 Gigabit ports', 'PoE+ 370W / 740W capacity', '4 SFP uplink ports', 'Cisco IOS 15.2 LAN Base verified'],
    sellerName: 'Reliance Jio Data Center Facility',
    status: 'active',
    postedDate: 'Oct 16, 2024'
  }
];

export const ewasteRequests: EWasteItem[] = [
  {
    id: 'ew-1',
    requestNumber: '#EW-1092',
    title: 'Decommissioned Dell PowerEdge R740 Racks',
    deviceType: 'Enterprise Servers',
    brandModel: 'Dell PowerEdge R740 (3 Units)',
    quantity: 3,
    weightKg: 84.0,
    dataDestructionRequested: true,
    status: 'Processing',
    certificateUrl: '#form-6-cert',
    facilityAddress: 'Plot 42, Outer Ring Road, Bengaluru',
    date: 'Oct 19, 2024'
  },
  {
    id: 'ew-2',
    requestNumber: '#EW-1077',
    title: 'Disposed Li-Ion Laptop Battery Assemblies',
    deviceType: 'Hazardous Batteries',
    brandModel: 'Lenovo ThinkPad 45N1127 Cells',
    quantity: 38,
    weightKg: 19.5,
    dataDestructionRequested: false,
    status: 'Certified Destroyed',
    certificateUrl: '#form-2-cert',
    facilityAddress: 'EPIP Zone, Whitefield, Bengaluru',
    date: 'Oct 12, 2024'
  }
];
