export type MaterialCategory = 'non-ferrous' | 'ferrous' | 'ewaste' | 'plastics' | 'paper' | 'batteries';

export type PickupStatus = 'requested' | 'confirmed' | 'collector_assigned' | 'in_progress' | 'completed' | 'cancelled';

export interface ManifestItem {
  id: string;
  name: string;
  subtext: string;
  category: MaterialCategory;
  weightKg: number;
  ratePerKg: number;
  totalValue: number;
  grade?: string;
  icon?: string;
}

export interface ScrapPickup {
  id: string;
  requestNumber: string;
  title: string;
  categoryLabel: string;
  items: ManifestItem[];
  totalWeightKg: number;
  estimatedPayoutFloor: number;
  estimatedPayoutCeiling: number;
  finalWeightKg?: number;
  finalPayout?: number;
  date: string;
  timeSlot: string;
  status: PickupStatus;
  facilityName: string;
  facilityAddress: string;
  city: string;
  postalCode: string;
  dockDetails: string;
  contactName: string;
  contactPhone: string;
  specialInstructions?: string;
  collectorName?: string;
  collectorId?: string;
  collectorVehicle?: string;
  etaMinutes?: number;
  manifestHash?: string;
  createdAt: string;
  isPriorityNext?: boolean;
}

export interface CommodityBenchmark {
  id: string;
  name: string;
  stream: 'Metals' | 'E-Waste' | 'Plastics' | 'Paper';
  categoryKey: MaterialCategory;
  standardGrade: string;
  indicativeBaseRate: number;
  trend7dPercent: number;
  refreshedTime: string;
  co2FactorKg: number;
  unit: string;
}

export interface MarketplaceProduct {
  id: string;
  title: string;
  subtitle: string;
  category: 'Electronics' | 'Office Furnishing' | 'Industrial Storage' | 'Networking Hardware';
  price: number;
  conditionGrade: string;
  location: string;
  imageUrl: string;
  description: string;
  testedSpecs: string[];
  sellerName: string;
  status: 'active' | 'reserved' | 'sold';
  postedDate: string;
}

export interface EWasteItem {
  id: string;
  requestNumber: string;
  title: string;
  deviceType: string;
  brandModel: string;
  quantity: number;
  weightKg: number;
  dataDestructionRequested: boolean;
  status: 'Requested' | 'Assigned' | 'Processing' | 'Certified Destroyed';
  certificateUrl?: string;
  facilityAddress: string;
  date: string;
}

export interface UserProfile {
  name: string;
  roleTitle: string;
  role: 'household' | 'business' | 'collector' | 'partner' | 'admin';
  facilityId: string;
  avatarUrl: string;
  companyName: string;
}
