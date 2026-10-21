import React, { useState } from 'react';
import { initialPickups, currentUser as defaultUser } from './data/mockData';
import { ScrapPickup, UserProfile } from './types';
import { Navigation } from './components/Navigation';
import { LandingPage } from './components/LandingPage';
import { Dashboard } from './components/Dashboard';
import { SchedulePickup } from './components/SchedulePickup';
import { PriceEstimator } from './components/PriceEstimator';
import { Marketplace } from './components/Marketplace';
import { EWastePortal } from './components/EWastePortal';
import { EcoGuideAI } from './components/EcoGuideAI';
import { BusinessHub } from './components/BusinessHub';
import { PickupTrackingModal } from './components/PickupTrackingModal';
import { CertificateModal } from './components/CertificateModal';
import { NotificationsModal } from './components/NotificationsModal';

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>('landing');
  const [pickups, setPickups] = useState<ScrapPickup[]>(initialPickups);
  const [currentUser, setCurrentUser] = useState<UserProfile>(defaultUser);
  const [trackingPickup, setTrackingPickup] = useState<ScrapPickup | null>(null);
  const [showCertificate, setShowCertificate] = useState<boolean>(false);
  const [showNotifications, setShowNotifications] = useState<boolean>(false);

  // Pre-fill state when coming from Price Estimator
  const [prefilledMaterial, setPrefilledMaterial] = useState<{ name: string; rate: number } | null>(null);

  const handlePickupCreated = (newPickup: ScrapPickup) => {
    setPickups([newPickup, ...pickups]);
  };

  const handleLockAndSchedule = (material: string, rate: number) => {
    setPrefilledMaterial({ name: material, rate });
    setCurrentPath('schedule-pickup');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSwitchRole = (role: UserProfile['role']) => {
    if (role === 'collector') {
      setCurrentUser({
        name: 'Ravi Kumar',
        roleTitle: 'Certified Doorstep Logistics Operator',
        role: 'collector',
        facilityId: 'COL-104',
        companyName: 'Recyvora Fleet Logistics',
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'
      });
      setCurrentPath('dashboard');
    } else if (role === 'partner') {
      setCurrentUser({
        name: 'Dr. K. S. Sundaram',
        roleTitle: 'E-Waste Demanufacturing Auditor',
        role: 'partner',
        facilityId: 'PRT-900',
        companyName: 'CleanCycle Hydrometallurgy Labs',
        avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200'
      });
      setCurrentPath('e-waste-requests');
    } else {
      setCurrentUser(defaultUser);
      setCurrentPath('dashboard');
    }
  };

  const isPublic = currentPath === 'landing';

  return (
    <div className="min-h-screen bg-surface font-sans text-on-surface antialiased">
      {/* Navigation Shell */}
      <Navigation
        currentPath={currentPath}
        onNavigate={(path) => {
          setCurrentPath(path);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        currentUser={currentUser}
        onSwitchRole={handleSwitchRole}
        onOpenNotifications={() => setShowNotifications(true)}
      />

      {/* Main View Area */}
      <main className={`w-full ${isPublic ? 'pt-16' : 'md:pl-72 pt-16'}`}>
        {currentPath === 'landing' && (
          <LandingPage
            onNavigate={(path) => {
              setCurrentPath(path);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentPath === 'dashboard' && (
          <Dashboard
            pickups={pickups}
            onNavigate={(path) => {
              setCurrentPath(path);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenTracking={(p) => setTrackingPickup(p)}
            onOpenCertificate={() => setShowCertificate(true)}
            facilityId={currentUser.facilityId}
          />
        )}

        {currentPath === 'schedule-pickup' && (
          <SchedulePickup
            onPickupCreated={handlePickupCreated}
            onNavigate={(path) => {
              setCurrentPath(path);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            initialMaterial={prefilledMaterial?.name}
            initialRate={prefilledMaterial?.rate}
          />
        )}

        {currentPath === 'scrap-price-estimator' && (
          <PriceEstimator
            onLockAndSchedule={handleLockAndSchedule}
            onNavigate={(path) => {
              setCurrentPath(path);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentPath === 'marketplace' && (
          <Marketplace
            onNavigate={(path) => {
              setCurrentPath(path);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentPath === 'e-waste-requests' && (
          <EWastePortal
            onNavigate={(path) => {
              setCurrentPath(path);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenCertificate={() => setShowCertificate(true)}
          />
        )}

        {currentPath === 'ecoguide-ai' && <EcoGuideAI />}

        {(currentPath === 'my-pickups' || currentPath === 'orders') && (
          <div className="px-gutter-lg py-space-xl">
            <Dashboard
              pickups={pickups}
              onNavigate={(path) => setCurrentPath(path)}
              onOpenTracking={(p) => setTrackingPickup(p)}
              onOpenCertificate={() => setShowCertificate(true)}
            />
          </div>
        )}

        {currentPath === 'pickup-tracking' && (
          <div className="px-gutter-lg py-space-xl">
            <Dashboard
              pickups={pickups}
              onNavigate={(path) => setCurrentPath(path)}
              onOpenTracking={(p) => setTrackingPickup(p)}
              onOpenCertificate={() => setShowCertificate(true)}
            />
            {/* Auto-open tracking for the next priority pickup */}
            <PickupTrackingModal
              pickup={pickups.find((p) => p.isPriorityNext) || pickups[0]}
              onClose={() => setCurrentPath('dashboard')}
            />
          </div>
        )}

        {(currentPath === 'business' || currentPath === 'reports' || currentPath === 'environmental-impact') && (
          <BusinessHub
            onOpenCertificate={() => setShowCertificate(true)}
            onNavigate={(path) => setCurrentPath(path)}
          />
        )}

        {(currentPath === 'settings' || currentPath === 'help-support' || currentPath === 'my-listings' || currentPath === 'earnings') && (
          <div className="px-gutter-lg py-space-xl max-w-4xl">
            <div className="bg-surface-container-lowest p-space-lg rounded-2xl shadow-sm border border-outline-variant/30 space-y-4">
              <h2 className="text-xl font-bold text-on-surface capitalize">
                {currentPath.replace('-', ' ')}
              </h2>
              <p className="text-body-sm text-outline">
                {currentPath === 'earnings'
                  ? 'Total net scrap payout settled YTD: ₹48,250.00 via Instant NEFT.'
                  : currentPath === 'my-listings'
                  ? 'You have 4 active recommerce listings listed under your corporate facility.'
                  : 'Account configuration, API webhooks, and ISO 14001 compliance standards.'}
              </p>
              <div className="pt-4 border-t border-outline-variant/20 flex gap-3">
                <button
                  onClick={() => setCurrentPath('dashboard')}
                  className="px-4 py-2 bg-primary text-on-primary rounded-lg text-sm font-semibold"
                >
                  Return to Dashboard
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer for Public Landing Page */}
      {isPublic && (
        <footer className="w-full bg-surface-container-low mt-space-xl border-t border-outline-variant/30">
          <div className="max-w-7xl mx-auto px-margin-md lg:px-margin-lg py-margin-lg">
            <div className="flex flex-col md:flex-row items-center justify-between gap-gutter">
              <div className="flex items-center gap-space-sm">
                <img
                  alt="Recyvora Brand Logo"
                  className="h-6 w-auto object-contain"
                  src="https://lh3.googleusercontent.com/aida/AEtjO1XWz6UyrZ1fK4sFr4JA9xxkNMipjSe4hb7UPFs-2SvvKBR_ZOwpGlgZC0-JsJGUT2KvdExCgGDBBnmL1yd6-NVl97mCIwz10-Mt-XCnchAlyiUh5Vy6eKKuXHiErFR5En20D8rJgkjB_zB6D44yXsHQTUM4LxjcLNIFj8iOjltfgLMp5Y9Xmr7d5NgkCIEjna4XC-7DRR0dlZlBRkJeTRwfR7HI2reC8E5Do9HEJIbj1D5A_wLg6DBY1q55"
                />
                <span className="font-headline-sm text-headline-sm text-primary font-semibold">Recyvora</span>
                <span className="font-body-sm text-body-sm text-on-surface-variant ml-space-sm">
                  © 2025 Recyvora Circular Systems Inc. All rights reserved.
                </span>
              </div>
              <div className="flex items-center gap-gutter-lg">
                <button
                  onClick={() => alert('Privacy Policy: All customer scrap manifests and data media destruction logs are stored with SHA-256 tamper-evident security.')}
                  className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors"
                >
                  Privacy Policy
                </button>
                <button
                  onClick={() => alert('Terms of Service: Calibrated digital scales must be verified by on-site logistics lead before instant electronic funds transfer.')}
                  className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors"
                >
                  Terms of Service
                </button>
                <button
                  onClick={() => setShowCertificate(true)}
                  className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors"
                >
                  ESG Compliance
                </button>
              </div>
            </div>
          </div>
        </footer>
      )}

      {/* Live Tracking Modal */}
      {trackingPickup && (
        <PickupTrackingModal
          pickup={trackingPickup}
          onClose={() => setTrackingPickup(null)}
        />
      )}

      {/* Certificate Modal */}
      {showCertificate && (
        <CertificateModal
          onClose={() => setShowCertificate(false)}
          facilityId={currentUser.facilityId}
        />
      )}

      {/* Notifications Modal */}
      {showNotifications && (
        <NotificationsModal
          onClose={() => setShowNotifications(false)}
          onNavigate={(path) => {
            setCurrentPath(path);
            setShowNotifications(false);
          }}
        />
      )}
    </div>
  );
}
