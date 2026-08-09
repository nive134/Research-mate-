import React from 'react';

interface HeaderProps {
  unreadCount: number;
  onOpenNotifications: () => void;
  onOpenProfile: () => void;
  title?: string;
  showBack?: boolean;
  onBack?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  unreadCount,
  onOpenNotifications,
  onOpenProfile,
  title,
  showBack = false,
  onBack,
}) => {
  return (
    <header className="fixed top-0 w-full z-50 bg-[#faf9f7]/80 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] pt-safe">
      <div className="h-16 px-5 flex items-center justify-between">
        {showBack ? (
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="w-11 h-11 flex items-center justify-center text-[#1a1c1b] hover:bg-[#efeeec] rounded-full transition-colors"
              aria-label="Go back"
            >
              <span className="material-symbols-outlined">arrow_back</span>
            </button>
            <h1 className="font-headline text-xl font-bold text-[#041627] truncate">
              {title || 'Paper Detail'}
            </h1>
          </div>
        ) : (
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={onBack}
          >
            <img
              alt="ResearchMate AI Logo"
              className="h-8 w-auto object-contain"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAUBMzXTWg9znmqGhDlMCDrqdhs3OdyZVJZIS3bgL5-oRX_GXeU7o8I45Cxo8OWzxSSeaXzYlt1UsMZqWkF_v0P5Hx2xxPoaVh9KHRIJfiGCD9qAnlbToDGSf1Gc4fRIuxJi1DQZlKXQk48pw-sii8nwAM1goF7JnaCq2RdLvlky5OeHWQ0LZb4qbqs_TT2DDrcTBUwjSkjJzZ3gCQMZee59yoB86QLKoWfvC9IYNm5Adhvy-BcSOEt"
            />
            <span className="font-headline text-xl font-bold text-[#041627] tracking-tight">
              ResearchMate
            </span>
          </div>
        )}

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenNotifications}
            className="w-11 h-11 relative flex items-center justify-center text-[#44474c] hover:bg-[#efeeec] rounded-full transition-colors"
            aria-label="Notifications"
          >
            <span className="material-symbols-outlined">notifications</span>
            {unreadCount > 0 && (
              <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-[#ba1a1a]" />
            )}
          </button>
          <button
            onClick={onOpenProfile}
            className="w-9 h-9 rounded-full overflow-hidden ring-1 ring-[#041627]/10 hover:ring-[#041627]/30 transition-all active:scale-95"
            aria-label="Profile"
          >
            <img
              alt="Profile"
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDRkoOHLfwG29_e0xHdMwVVN44w89VEr5p5vtv19UyGZbySxgd7ZKLssXUNPM-Mon-dsT4XrWoB6Z2yex_KHx5llagTixl21olUJWY0uFH74XRPJz6qLKZgX72Xut5H3NLeXlHQoXIDVVhaKOo-HqG55QmnJ3YxmhsW7qoiYzYJHUEAXJW3Ky4saJxrFcRzbXSQICT5j1TMhgPW_TnkDxTrcJXwvgm15JmrA-4AT8eWsSYfPMCMnrU6"
            />
          </button>
        </div>
      </div>
    </header>
  );
};
