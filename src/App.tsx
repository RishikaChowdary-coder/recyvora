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
import { ScreenSwitcherBar } from './components/ScreenSwitcherBar';
import { ReferenceImageModal } from './components/ReferenceImageModal';

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>('landing');
  const [pickups, setPickups] = useState<ScrapPickup[]>(initialPickups);
  const [currentUser, setCurrentUser] = useState<UserProfile>(defaultUser);
  const [trackingPickup, setTrackingPickup] = useState<ScrapPickup | null>(null);
  const [showCertificate, setShowCertificate] = useState<boolean>(false);
  const [showNotifications, setShowNotifications] = useState<boolean>(false);
  const [activeReferenceScreen, setActiveReferenceScreen] = useState<string | null>(null);

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
        avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDrD35kzcKUnxlHZK3KEtuIQBtTNj4jGBwWpFRL-k6cTS_ms54HznpRMlsle9XFeF6J69FpfZYdcSeLfoyubBbCB3nVe0nUA_mr81zYAahisQGk9wRVLWZqj_PuL-zo2HUzptOE3QZETnWShbl-cVESkzRhA5AUZkKp4DtL_zHTEjHZg7cBlH4zIBZwlgfcmX9NvIRD2gW8zfyPLwrsmUMel-R6myErJAvIPWSbOd7lYHMDkud7KRUNhw'
      });
      setCurrentPath('dashboard');
    } else if (role === 'partner') {
      setCurrentUser({
        name: 'Dr. K. S. Sundaram',
        roleTitle: 'E-Waste Demanufacturing Auditor',
        role: 'partner',
        facilityId: 'PRT-900',
        companyName: 'CleanCycle Hydrometallurgy Labs',
        avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDrD35kzcKUnxlHZK3KEtuIQBtTNj4jGBwWpFRL-k6cTS_ms54HznpRMlsle9XFeF6J69FpfZYdcSeLfoyubBbCB3nVe0nUA_mr81zYAahisQGk9wRVLWZqj_PuL-zo2HUzptOE3QZETnWShbl-cVESkzRhA5AUZkKp4DtL_zHTEjHZg7cBlH4zIBZwlgfcmX9NvIRD2gW8zfyPLwrsmUMel-R6myErJAvIPWSbOd7lYHMDkud7KRUNhw'
      });
      setCurrentPath('e-waste-requests');
    } else {
      setCurrentUser(defaultUser);
      setCurrentPath('dashboard');
    }
  };

  const handleNavigate = (path: string) => {
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isPublic = currentPath === 'landing';

  return (
    <div className="min-h-screen bg-surface font-sans text-on-surface antialiased flex flex-col">
      {/* 1-Click Screen Navigation Bar (Directly switch between Screen 1, 2, 3, 4) */}
      <ScreenSwitcherBar
        currentPath={currentPath}
        onNavigate={handleNavigate}
        onOpenReferenceImage={(screenId) => setActiveReferenceScreen(screenId)}
      />

      {/* Top Header / Left Sidebar Shell */}
      <Navigation
        currentPath={currentPath}
        onNavigate={handleNavigate}
        currentUser={currentUser}
        onSwitchRole={handleSwitchRole}
        onOpenNotifications={() => setShowNotifications(true)}
      />

      {/* Main Interactive Screen Content (Rendered directly from HTML files) */}
      <main className={`flex-1 w-full ${isPublic ? '' : 'md:pl-72 pt-16'}`}>
        {/* Screen 1: Landing Page (from Image_2_156418d7.html) */}
        {currentPath === 'landing' && (
          <div className="pt-16">
            <LandingPage onNavigate={handleNavigate} />
          </div>
        )}

        {/* Screen 2: Schedule a Scrap Pickup (from Image_4_3bcff0b6.html) */}
        {currentPath === 'schedule-pickup' && (
          <SchedulePickup
            onPickupCreated={handlePickupCreated}
            onNavigate={handleNavigate}
            initialMaterial={prefilledMaterial?.name}
            initialRate={prefilledMaterial?.rate}
          />
        )}

        {/* Screen 3: Scrap Price Estimator (from Image_6_b8866f61.html) */}
        {currentPath === 'scrap-price-estimator' && (
          <PriceEstimator
            onLockAndSchedule={handleLockAndSchedule}
            onNavigate={handleNavigate}
          />
        )}

        {/* Screen 4: Operational Overview Dashboard (from Image_8_8270ebd3.html) */}
        {currentPath === 'dashboard' && (
          <Dashboard
            pickups={pickups}
            onNavigate={handleNavigate}
            onOpenTracking={(p) => setTrackingPickup(p)}
            onOpenCertificate={() => setShowCertificate(true)}
            facilityId={currentUser.facilityId}
          />
        )}

        {/* Circular Recommerce Marketplace */}
        {currentPath === 'marketplace' && (
          <Marketplace onNavigate={handleNavigate} />
        )}

        {/* E-Waste Management Portal */}
        {currentPath === 'e-waste-requests' && (
          <EWastePortal
            onNavigate={handleNavigate}
            onOpenCertificate={() => setShowCertificate(true)}
          />
        )}

        {/* EcoGuide AI Assistant */}
        {currentPath === 'ecoguide-ai' && <EcoGuideAI />}

        {/* My Pickups / Orders View */}
        {(currentPath === 'my-pickups' || currentPath === 'orders') && (
          <div className="px-gutter-lg py-space-xl">
            <Dashboard
              pickups={pickups}
              onNavigate={handleNavigate}
              onOpenTracking={(p) => setTrackingPickup(p)}
              onOpenCertificate={() => setShowCertificate(true)}
            />
          </div>
        )}

        {/* Real-Time Pickup Tracking Screen */}
        {currentPath === 'pickup-tracking' && (
          <div className="px-gutter-lg py-space-xl">
            <Dashboard
              pickups={pickups}
              onNavigate={handleNavigate}
              onOpenTracking={(p) => setTrackingPickup(p)}
              onOpenCertificate={() => setShowCertificate(true)}
            />
            <PickupTrackingModal
              pickup={pickups.find((p) => p.isPriorityNext) || pickups[0]}
              onClose={() => setCurrentPath('dashboard')}
            />
          </div>
        )}

        {/* Business Hub & ESG Reporting */}
        {(currentPath === 'business' || currentPath === 'reports' || currentPath === 'environmental-impact') && (
          <BusinessHub
            onOpenCertificate={() => setShowCertificate(true)}
            onNavigate={handleNavigate}
          />
        )}

        {/* Ancillary Settings & Account Pages */}
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
                  onClick={() => handleNavigate('dashboard')}
                  className="px-4 py-2 bg-primary text-on-primary rounded-lg text-sm font-semibold hover:bg-tertiary-container transition-colors"
                >
                  Return to Dashboard
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Public Footer for Landing Page */}
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
            handleNavigate(path);
            setShowNotifications(false);
          }}
        />
      )}

      {/* Design Reference Spec Modal */}
      {activeReferenceScreen && (
        <ReferenceImageModal
          screenId={activeReferenceScreen}
          onClose={() => setActiveReferenceScreen(null)}
        />
      )}
    </div>
  );
}
