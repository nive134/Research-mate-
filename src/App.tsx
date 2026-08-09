import { useState } from 'react';
import {
  INITIAL_PAPERS,
  RECENT_PAPERS_SUGGESTIONS,
  INITIAL_ALERTS,
  INITIAL_WORKSPACES,
  INITIAL_PROFILE,
} from './data/mockData';
import { Paper, ResearchAlert, UserProfile } from './types';

// Components
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { DashboardView } from './components/DashboardView';
import { DiscoverView } from './components/DiscoverView';
import { LibraryView } from './components/LibraryView';
import { PaperDetailView } from './components/PaperDetailView';
import { ProfileView } from './components/ProfileView';
import { AiChatView } from './components/AiChatView';
import { NotificationsModal } from './components/NotificationsModal';
import { ReviewDraftModal } from './components/ReviewDraftModal';
import { OnboardingSlider } from './components/OnboardingSlider';

export default function App() {
  // Navigation State
  const [activeTab, setActiveTab] = useState<
    'dashboard' | 'discover' | 'library' | 'profile'
  >('dashboard');

  // Selected Paper State (for Paper Detail view)
  const [selectedPaper, setSelectedPaper] = useState<Paper | null>(null);

  // Overlay Modals
  const [showAiChat, setShowAiChat] = useState(false);
  const [chatPrompt, setChatPrompt] = useState<string | undefined>(undefined);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showDraftModal, setShowDraftModal] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);

  // Core Data State
  const [papers, setPapers] = useState<Paper[]>(INITIAL_PAPERS);
  const [alerts, setAlerts] = useState<ResearchAlert[]>(INITIAL_ALERTS);
  const [profile, setProfile] = useState<UserProfile>(INITIAL_PROFILE);

  const unreadAlertsCount = alerts.filter((a) => !a.read).length;

  const handleOpenPaper = (paper: Paper) => {
    setSelectedPaper(paper);
  };

  const handleAddPaper = (newPaper: Paper) => {
    setPapers([newPaper, ...papers]);
  };

  const handleOpenChatWithPrompt = (prompt: string) => {
    setChatPrompt(prompt);
    setShowAiChat(true);
  };

  const handleClearNotifications = () => {
    setAlerts(alerts.map((a) => ({ ...a, read: true })));
  };

  return (
    <div className="min-h-screen bg-[#faf9f7] text-[#1a1c1b] font-sans antialiased selection:bg-[#041627]/10 selection:text-[#041627] relative">
      {/* Global Header Bar */}
      {!selectedPaper && (
        <Header
          unreadCount={unreadAlertsCount}
          onOpenNotifications={() => setShowNotifications(true)}
          onOpenProfile={() => setActiveTab('profile')}
        />
      )}

      {/* Main View Router */}
      <main className="w-full min-h-screen">
        {selectedPaper ? (
          <PaperDetailView
            paper={selectedPaper}
            onBack={() => setSelectedPaper(null)}
            onOpenChatWithPrompt={handleOpenChatWithPrompt}
          />
        ) : activeTab === 'dashboard' ? (
          <DashboardView
            papers={papers}
            recentSuggestions={RECENT_PAPERS_SUGGESTIONS}
            alerts={alerts}
            onSelectPaper={handleOpenPaper}
            onOpenDraftModal={() => setShowDraftModal(true)}
            onOpenDiscover={() => setActiveTab('discover')}
          />
        ) : activeTab === 'discover' ? (
          <DiscoverView
            papers={papers}
            onSelectPaper={handleOpenPaper}
            onOpenChatWithPrompt={handleOpenChatWithPrompt}
          />
        ) : activeTab === 'library' ? (
          <LibraryView
            papers={papers}
            workspaces={INITIAL_WORKSPACES}
            onSelectPaper={handleOpenPaper}
            onAddPaper={handleAddPaper}
            onOpenChatWithPrompt={handleOpenChatWithPrompt}
          />
        ) : (
          <ProfileView
            profile={profile}
            onUpdateProfile={setProfile}
            onOpenOnboarding={() => setShowOnboarding(true)}
          />
        )}
      </main>

      {/* Global Fixed Bottom Navigation (hidden when in paper detail view) */}
      {!selectedPaper && (
        <BottomNav
          activeTab={activeTab}
          onSelectTab={(tab) => {
            setSelectedPaper(null);
            setActiveTab(tab);
          }}
          onOpenChat={() => {
            setChatPrompt(undefined);
            setShowAiChat(true);
          }}
        />
      )}

      {/* Overlays and Modals */}
      {showAiChat && (
        <AiChatView
          initialPrompt={chatPrompt}
          onClose={() => setShowAiChat(false)}
        />
      )}

      {showNotifications && (
        <NotificationsModal
          alerts={alerts}
          onClose={() => setShowNotifications(false)}
          onClearAll={handleClearNotifications}
        />
      )}

      {showDraftModal && (
        <ReviewDraftModal onClose={() => setShowDraftModal(false)} />
      )}

      {showOnboarding && (
        <OnboardingSlider onComplete={() => setShowOnboarding(false)} />
      )}
    </div>
  );
}
