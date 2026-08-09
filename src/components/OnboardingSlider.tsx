import React, { useState } from 'react';

interface OnboardingSliderProps {
  onComplete: () => void;
}

export const OnboardingSlider: React.FC<OnboardingSliderProps> = ({
  onComplete,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 4;

  const handleNext = () => {
    if (currentSlide < totalSlides - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onComplete();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#faf9f7] flex flex-col justify-between pt-safe pb-safe animate-fade-in overflow-y-auto">
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-10 max-w-md mx-auto w-full text-center">
        {currentSlide === 0 && (
          <div className="flex flex-col items-center animate-fade-in">
            <div className="w-48 h-48 mb-8 relative flex items-center justify-center rounded-full bg-[#f4f3f1] shadow-sm">
              <div className="absolute inset-0 bg-[#041627] opacity-5 rounded-full animate-pulse" />
              <svg
                className="w-32 h-32 text-[#44474c]"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 100 100"
              >
                <circle cx="50" cy="50" fill="currentColor" r="4" />
                <circle cx="20" cy="30" fill="currentColor" r="3" />
                <circle cx="80" cy="20" fill="currentColor" r="3" />
                <circle cx="70" cy="80" fill="currentColor" r="3" />
                <circle cx="30" cy="70" fill="currentColor" r="3" />
                <path
                  className="opacity-50"
                  d="M50 50 L20 30 M50 50 L80 20 M50 50 L70 80 M50 50 L30 70 M20 30 L30 70 M80 20 L70 80"
                  strokeDasharray="2 2"
                />
              </svg>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full bg-[#001e78]/10 text-[#001e78] shadow-sm">
              <span className="material-symbols-outlined text-[16px]">
                psychology
              </span>
              <span className="text-xs font-semibold uppercase tracking-wider">
                ResearchMate AI
              </span>
            </div>
            <h1 className="font-headline text-2xl font-bold text-[#041627] mb-4">
              Your Intelligent Research Partner
            </h1>
            <p className="text-sm text-[#44474c] leading-relaxed">
              Empowering university researchers and R&D teams to accelerate discovery and synthesize knowledge with AI-driven precision.
            </p>
          </div>
        )}

        {currentSlide === 1 && (
          <div className="flex flex-col items-center animate-fade-in">
            <div
              className="w-full h-64 mb-8 rounded-2xl bg-cover bg-center shadow-md relative overflow-hidden"
              style={{
                backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuAfblHTc66d_zHs6doQkvlw1qcNuqIojqUU-7ylWtcALJQTy-5dAesPGCfcX41fsqg_XyY4YSIY8_r2G-OywUBW8ua-VI3B_FKf_I1bW1CbrhHAeH-BmdlM9wZdvH5VvuUX-a8C6ESY6z6rjWb7kde5i97FaYL18fqyTbX3upNi7CJTJorp2CZDYziiNrrl8eBUGBdo1WE9rDJ4Z5_i0rxXYk2q4IBfCO34rfqoM0iriltHV4mRurRh')`,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                <div className="flex gap-2">
                  <span className="px-2.5 py-1 bg-[#faf9f7]/90 rounded text-[#1a1c1b] text-xs font-semibold backdrop-blur">
                    Papers
                  </span>
                  <span className="px-2.5 py-1 bg-[#faf9f7]/90 rounded text-[#1a1c1b] text-xs font-semibold backdrop-blur">
                    Patents
                  </span>
                </div>
                <span className="material-symbols-outlined text-[#041627] bg-[#faf9f7]/90 p-2 rounded-full shadow-sm backdrop-blur">
                  travel_explore
                </span>
              </div>
            </div>
            <h2 className="font-headline text-2xl font-bold text-[#041627] mb-4">
              Discover Deeply
            </h2>
            <p className="text-sm text-[#44474c] leading-relaxed">
              Instantly traverse millions of papers, patents, and GitHub repositories to find the missing link in your literature.
            </p>
          </div>
        )}

        {currentSlide === 2 && (
          <div className="flex flex-col items-center animate-fade-in">
            <div className="w-full p-6 mb-8 bg-[#ffffff] rounded-2xl shadow-md flex flex-col gap-4 text-left relative overflow-hidden border border-[#e3e2e0]">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#b7c8de]/20 rounded-bl-full blur-2xl" />
              <div className="h-2.5 w-1/3 bg-[#e3e2e0] rounded" />
              <div className="h-2.5 w-full bg-[#e3e2e0] rounded" />
              <div className="h-2.5 w-5/6 bg-[#e3e2e0] rounded" />
              <div className="mt-4 p-3 bg-[#001e78]/10 rounded-xl flex items-start gap-3">
                <span className="material-symbols-outlined text-[#001e78] mt-0.5">
                  auto_awesome
                </span>
                <div className="flex-1 flex flex-col gap-2">
                  <div className="h-2 w-full bg-[#001e78]/30 rounded" />
                  <div className="h-2 w-2/3 bg-[#001e78]/30 rounded" />
                </div>
              </div>
            </div>
            <h2 className="font-headline text-2xl font-bold text-[#041627] mb-4">
              Synthesize Intelligently
            </h2>
            <p className="text-sm text-[#44474c] leading-relaxed">
              Extract core methodologies, results, and limitations in seconds with context-aware AI summaries.
            </p>
          </div>
        )}

        {currentSlide === 3 && (
          <div className="flex flex-col items-center animate-fade-in">
            <div className="w-full mb-8 relative">
              <div className="absolute inset-0 top-4 scale-95 bg-[#efeeec] shadow-sm rounded-2xl" />
              <div className="absolute inset-0 top-2 scale-95 bg-[#e9e8e6] shadow-sm rounded-2xl translate-y-2" />
              <div className="w-full p-6 bg-[#ffffff] rounded-2xl shadow-md relative z-10 flex flex-col gap-3 text-left border border-[#e3e2e0]">
                <div className="flex items-center gap-3 text-[#041627]">
                  <span className="material-symbols-outlined">
                    library_books
                  </span>
                  <span className="text-sm font-semibold">
                    Literature Review
                  </span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-[#efeeec]">
                  <span className="text-sm font-medium text-[#1a1c1b]">
                    Neural Networks
                  </span>
                  <span className="text-xs text-[#74777d]">12 items</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm font-medium text-[#1a1c1b]">
                    CRISPR Tech
                  </span>
                  <span className="text-xs text-[#74777d]">8 items</span>
                </div>
              </div>
            </div>
            <h2 className="font-headline text-2xl font-bold text-[#041627] mb-4">
              Structure Your Thoughts
            </h2>
            <p className="text-sm text-[#44474c] leading-relaxed">
              Automatically organize your findings into dynamic literature reviews and annotated bibliographies.
            </p>
          </div>
        )}
      </div>

      {/* Bottom Controls */}
      <div className="p-6 bg-[#faf9f7] max-w-md mx-auto w-full flex flex-col items-center gap-6">
        <div className="flex gap-2">
          {Array.from({ length: totalSlides }).map((_, idx) => (
            <div
              key={idx}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === currentSlide
                  ? 'w-6 bg-[#041627]'
                  : 'w-2 bg-[#e3e2e0]'
              }`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          className="w-full py-4 bg-[#041627] text-white rounded-xl font-semibold text-sm flex items-center justify-center gap-2 shadow-md active:scale-95 transition-transform"
        >
          <span>{currentSlide === totalSlides - 1 ? 'Get Started' : 'Continue'}</span>
          <span className="material-symbols-outlined text-lg">
            {currentSlide === totalSlides - 1 ? 'rocket_launch' : 'arrow_forward'}
          </span>
        </button>
      </div>
    </div>
  );
};
