import React from 'react';

interface BottomNavProps {
  activeTab: 'dashboard' | 'discover' | 'library' | 'profile';
  onSelectTab: (tab: 'dashboard' | 'discover' | 'library' | 'profile') => void;
  onOpenChat: () => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onSelectTab,
  onOpenChat,
}) => {
  return (
    <>
      {/* Floating AI Chat FAB Button */}
      <button
        onClick={onOpenChat}
        className="fixed bottom-24 right-5 w-14 h-14 bg-[#041627] text-white rounded-full shadow-lg flex items-center justify-center z-40 active:scale-95 transition-transform border border-white/10 group"
        aria-label="Open AI Chat"
      >
        <span className="material-symbols-outlined text-2xl fill-1 group-hover:rotate-12 transition-transform">
          smart_toy
        </span>
      </button>

      {/* Bottom Fixed Navigation Bar */}
      <nav className="fixed bottom-0 w-full z-50 bg-[#faf9f7]/90 backdrop-blur-xl shadow-[0_-1px_8px_rgba(0,0,0,0.04)] pb-safe border-t border-[#e3e2e0]/50">
        <div className="flex justify-around items-center h-16 px-2">
          <button
            onClick={() => onSelectTab('dashboard')}
            className={`flex flex-col items-center justify-center gap-1 w-full h-full transition-colors ${
              activeTab === 'dashboard'
                ? 'text-[#041627] font-bold'
                : 'text-[#44474c] hover:text-[#1a1c1b]'
            }`}
          >
            <span
              className={`material-symbols-outlined ${
                activeTab === 'dashboard' ? 'fill-1' : ''
              }`}
            >
              dashboard
            </span>
            <span className="text-[11px] font-medium tracking-wide">
              Dashboard
            </span>
          </button>

          <button
            onClick={() => onSelectTab('discover')}
            className={`flex flex-col items-center justify-center gap-1 w-full h-full transition-colors ${
              activeTab === 'discover'
                ? 'text-[#041627] font-bold'
                : 'text-[#44474c] hover:text-[#1a1c1b]'
            }`}
          >
            <span
              className={`material-symbols-outlined ${
                activeTab === 'discover' ? 'fill-1' : ''
              }`}
            >
              explore
            </span>
            <span className="text-[11px] font-medium tracking-wide">
              Discover
            </span>
          </button>

          <button
            onClick={() => onSelectTab('library')}
            className={`flex flex-col items-center justify-center gap-1 w-full h-full transition-colors ${
              activeTab === 'library'
                ? 'text-[#041627] font-bold'
                : 'text-[#44474c] hover:text-[#1a1c1b]'
            }`}
          >
            <span
              className={`material-symbols-outlined ${
                activeTab === 'library' ? 'fill-1' : ''
              }`}
            >
              auto_stories
            </span>
            <span className="text-[11px] font-medium tracking-wide">
              Library
            </span>
          </button>

          <button
            onClick={() => onSelectTab('profile')}
            className={`flex flex-col items-center justify-center gap-1 w-full h-full transition-colors ${
              activeTab === 'profile'
                ? 'text-[#041627] font-bold'
                : 'text-[#44474c] hover:text-[#1a1c1b]'
            }`}
          >
            <span
              className={`material-symbols-outlined ${
                activeTab === 'profile' ? 'fill-1' : ''
              }`}
            >
              person
            </span>
            <span className="text-[11px] font-medium tracking-wide">
              Profile
            </span>
          </button>
        </div>
      </nav>
    </>
  );
};
