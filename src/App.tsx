import { useState, useEffect, useCallback } from 'react';
import { MediaProvider, useMedia } from './context/MediaContext';
import { MediaAdminModal } from './components/admin/MediaAdminModal';
import { AdminLiveBar } from './components/admin/AdminLiveBar';
import { Header } from './components/layout/Header';
import { MobileMenu } from './components/layout/MobileMenu';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/hero/Hero';
import { EditorialIntro } from './components/intro/EditorialIntro';
import { CommercialTrustBanner } from './components/commercial/CommercialTrustBanner';
import { DestinationSelector } from './components/destinations/DestinationSelector';
import { SriLankaMap } from './components/map/SriLankaMap';
import { OceanBeaches } from './components/beaches/OceanBeaches';
import { HighlandsStory } from './components/mountains/HighlandsStory';
import { WildlifeSanctuary } from './components/wildlife/WildlifeSanctuary';
import { HeritageTimeline } from './components/heritage/HeritageTimeline';
import { CulinaryExplorer } from './components/food/CulinaryExplorer';
import { OceanExperiences } from './components/experiences/OceanExperiences';
import { JourneyPlanner } from './components/planner/JourneyPlanner';
import { RegionalOverview } from './components/regions/RegionalOverview';
import { PracticalGuide } from './components/travelGuide/PracticalGuide';
import { FinalCTA } from './components/cta/FinalCTA';
import { AboutSerendib } from './components/about/AboutSerendib';
import { ScrollProgress } from './components/ui/ScrollProgress';
import { FloatingQuickNav } from './components/ui/FloatingQuickNav';
import { CursorGlow } from './components/ui/CursorGlow';
import { ConciergeModal } from './components/concierge/ConciergeModal';
import { WhatsAppConcierge } from './components/commercial/WhatsAppConcierge';
import { SerendibAIChatbot } from './components/concierge/SerendibAIChatbot';
import { useScrollSpy } from './hooks/useScrollSpy';
import { navigateToSection } from './utils/navigation';

function MainSiteContent() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isConciergeOpen, setIsConciergeOpen] = useState(false);
  const { setIsAdminOpen } = useMedia();

  const handleAdminTrigger = useCallback(() => {
    setIsAdminOpen(true);
  }, [setIsAdminOpen]);

  // Clean Semantic ScrollSpy and Deep Linking Hook
  useScrollSpy(handleAdminTrigger);

  // Admin shortcut: Ctrl + Shift + A (or Cmd + Shift + A) or URL query ?admin=true
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        setIsAdminOpen(true);
      }
    };

    const handleUrlCheck = () => {
      const urlParams = new URLSearchParams(window.location.search);
      if (
        window.location.pathname === '/admin' ||
        window.location.hash === '#admin' ||
        urlParams.get('admin') === 'true' ||
        urlParams.get('admin') === 'studio'
      ) {
        setIsAdminOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('hashchange', handleUrlCheck);
    handleUrlCheck();

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('hashchange', handleUrlCheck);
    };
  }, [setIsAdminOpen]);

  const handleOpenPlanner = () => {
    navigateToSection('/planner');
  };

  const handleExplore = () => {
    navigateToSection('/destinations');
  };

  const handleOpenConcierge = () => {
    setIsConciergeOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#0C0D0E] text-[#F3EFE6] font-sans selection:bg-[#C5A059] selection:text-[#0C0D0E] overflow-x-hidden relative">
      {/* Live Global Scroll Progress Bar */}
      <ScrollProgress />

      {/* Ambient Interactive Cursor Glow */}
      <CursorGlow />

      {/* Top Navigation */}
      <Header
        onOpenPlanner={handleOpenPlanner}
        onOpenMobileMenu={() => setMobileMenuOpen(true)}
        mobileMenuOpen={mobileMenuOpen}
      />

      {/* Full-Screen Mobile Drawer */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        onOpenPlanner={handleOpenPlanner}
      />

      {/* Media Admin Panel Modal (Passcode Protected) */}
      <MediaAdminModal />

      {/* Floating Live HUD Bar for Authenticated Admin */}
      <AdminLiveBar />

      {/* Bespoke Luxury Concierge Booking Modal */}
      <ConciergeModal
        isOpen={isConciergeOpen}
        onClose={() => setIsConciergeOpen(false)}
      />

      <main>
        {/* 1. Fullscreen Cinematic Parallax Hero */}
        <Hero onExplore={handleExplore} onPlan={handleOpenPlanner} />

        {/* 2. Editorial Introduction with Animated Island Metrics */}
        <EditorialIntro />

        {/* 2.5 Commercial SLTDA & Luxury Trust Banner */}
        <CommercialTrustBanner />

        {/* 3. Interactive Split-Screen Destination Selector */}
        <DestinationSelector onPlanTrip={handleOpenPlanner} />

        {/* 4. Interactive Geographically Accurate Stylized Vector SVG Map */}
        <SriLankaMap
          onSelectDestination={handleExplore}
          onOpenPlanner={handleOpenPlanner}
        />

        {/* 5. Indian Ocean Beaches & Surf Showcase */}
        <OceanBeaches />

        {/* 6. Highlands & Tea Country Vertical Storytelling */}
        <HighlandsStory />

        {/* 7. Wildlife Sanctuaries & Big 5 Spotlight */}
        <WildlifeSanctuary />

        {/* 8. 2,500 Years of Heritage & Ancient Kingdoms */}
        <HeritageTimeline />

        {/* 9. Taste the Island (Ceylon Culinary & Spice Explorer) */}
        <CulinaryExplorer />

        {/* 10. 10 Things Worth Crossing an Ocean For */}
        <OceanExperiences />

        {/* 11. "Build Your Sri Lanka" Interactive Journey Planner */}
        <JourneyPlanner />

        {/* 12. The 6 Island Regions Overview */}
        <RegionalOverview />

        {/* 13. Practical Compendium & Emergency Guide */}
        <PracticalGuide />

        {/* 14. Dramatic Final CTA */}
        <FinalCTA onExplore={handleExplore} onPlan={handleOpenPlanner} />

        {/* 15. About & Editorial Credibility */}
        <AboutSerendib />
      </main>

      {/* Serendib AI Island Expedition Concierge */}
      <SerendibAIChatbot onOpenBookingModal={handleOpenConcierge} />

      {/* Commercial Floating WhatsApp Concierge Button */}
      <WhatsAppConcierge onOpenConcierge={handleOpenConcierge} />

      {/* Floating Glass Quick Jump Dock with Back-To-Top Ring */}
      <FloatingQuickNav />

      {/* Grand Editorial Footer */}
      <Footer />
    </div>
  );
}

export function App() {
  return (
    <MediaProvider>
      <MainSiteContent />
    </MediaProvider>
  );
}

export default App;
