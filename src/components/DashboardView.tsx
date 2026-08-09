import React from 'react';
import { Paper, ResearchAlert } from '../types';

interface DashboardViewProps {
  papers: Paper[];
  recentSuggestions: Paper[];
  alerts: ResearchAlert[];
  onSelectPaper: (paper: Paper) => void;
  onOpenDraftModal: () => void;
  onOpenDiscover: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  papers,
  recentSuggestions,
  alerts,
  onSelectPaper,
  onOpenDraftModal,
  onOpenDiscover,
}) => {
  const paperA = papers.find((p) => p.id === 'vit-2020') || papers[0];
  const paperB = papers.find((p) => p.id === 'resnet-2015') || papers[1];
  const medicalPaper = papers.find((p) => p.id === 'medical-transformer-2023') || papers[2];

  return (
    <div className="flex flex-col w-full pb-32 pt-16 bg-[#faf9f7] min-h-screen">
      {/* Top Header Quote & Greeting Section */}
      <section className="px-5 mt-4 mb-6">
        <div className="bg-[#efeeec] rounded-2xl p-5 shadow-sm relative overflow-hidden border border-[#041627]/5">
          <div className="absolute -right-8 -top-8 opacity-10 pointer-events-none">
            <span className="material-symbols-outlined text-[120px] text-[#041627]">
              local_library
            </span>
          </div>
          <div className="relative z-10 flex flex-col gap-2">
            <h1 className="font-headline text-2xl font-bold text-[#1a1c1b]">
              Good morning, Dr. Chen
            </h1>
            <p className="font-sans text-sm text-[#44474c] italic border-l-2 border-[#041627]/30 pl-3 leading-relaxed">
              "The most exciting phrase to hear in science, the one that heralds new discoveries, is not 'Eureka!' but 'That's funny...'" — Isaac Asimov
            </p>
          </div>
        </div>
      </section>

      {/* Comparison Matrix Title & Actions */}
      <section className="px-5 flex flex-col gap-3 mb-6">
        <div className="flex items-center gap-1.5 text-[#001e78]">
          <span className="material-symbols-outlined text-sm">
            compare_arrows
          </span>
          <span className="text-xs font-semibold uppercase tracking-wider">
            Comparison Matrix
          </span>
        </div>
        <h2 className="font-headline text-2xl font-bold text-[#1a1c1b] leading-tight">
          Transformers vs. CNNs in Computer Vision
        </h2>

        <div className="flex items-center gap-3 mt-1">
          <button
            onClick={onOpenDraftModal}
            className="flex-1 bg-[#041627] text-white py-3 px-4 rounded-full text-xs font-semibold flex items-center justify-center gap-2 shadow-md active:scale-95 transition-transform"
          >
            <span className="material-symbols-outlined text-[18px]">
              edit_document
            </span>
            <span>Generate Review Draft</span>
          </button>
          <button
            onClick={() => alert('Comparison matrix saved to library!')}
            className="w-12 h-12 shrink-0 bg-[#dae2dc] text-[#5c6460] rounded-full flex items-center justify-center shadow-sm active:scale-95 transition-transform hover:bg-[#dce4df]"
            aria-label="Bookmark Comparison Matrix"
          >
            <span className="material-symbols-outlined">bookmark_add</span>
          </button>
        </div>

        <div className="flex items-center gap-2 mt-1">
          <div className="h-1.5 flex-1 bg-[#e3e2e0] rounded-full overflow-hidden">
            <div className="h-full w-full bg-[#041627] rounded-full" />
          </div>
          <span className="text-xs text-[#44474c] font-medium">
            Analysis 100% Complete
          </span>
        </div>
      </section>

      {/* Comparison Matrix Horizontal Cards Scroll */}
      <section className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-6 px-5 no-scrollbar">
        {/* Paper A Column */}
        <div className="w-[88vw] sm:w-[320px] shrink-0 snap-center flex flex-col gap-3">
          <div className="bg-[#ffffff] shadow-sm p-4 rounded-2xl flex flex-col gap-2 relative overflow-hidden border border-[#041627]/10">
            <div className="absolute top-0 left-0 w-1 h-full bg-[#001e78]" />
            <div className="bg-[#dde1ff] text-[#001356] text-[10px] font-bold px-2 py-0.5 rounded w-fit uppercase">
              Paper A
            </div>
            <h3
              onClick={() => onSelectPaper(paperA)}
              className="font-headline text-lg font-bold text-[#1a1c1b] hover:text-[#001e78] cursor-pointer transition-colors leading-snug"
            >
              {paperA.title}
            </h3>
            <p className="text-xs text-[#44474c]">{paperA.authors}</p>
            <div className="flex gap-2 mt-1">
              <span className="bg-[#efeeec] text-[#44474c] px-2 py-0.5 rounded text-[10px] font-medium">
                {paperA.citations}
              </span>
              <span className="bg-[#efeeec] text-[#44474c] px-2 py-0.5 rounded text-[10px] font-medium">
                {paperA.venue}
              </span>
            </div>
          </div>

          {/* Methodology */}
          <div className="bg-[#ffffff] shadow-sm p-4 rounded-2xl flex flex-col gap-1 border border-[#041627]/10">
            <h4 className="text-xs font-semibold text-[#041627] flex items-center gap-2">
              <span className="material-symbols-outlined text-sm bg-[#041627]/10 p-1 rounded">
                science
              </span>{' '}
              Methodology
            </h4>
            <p className="text-xs text-[#44474c] mt-1 leading-relaxed">
              {paperA.methodology}
            </p>
          </div>

          {/* Dataset */}
          <div className="bg-[#ffffff] shadow-sm p-4 rounded-2xl flex flex-col gap-1 border border-[#041627]/10">
            <h4 className="text-xs font-semibold text-[#041627] flex items-center gap-2">
              <span className="material-symbols-outlined text-sm bg-[#041627]/10 p-1 rounded">
                database
              </span>{' '}
              Dataset
            </h4>
            <p className="text-xs text-[#44474c] mt-1 leading-relaxed">
              {paperA.dataset}
            </p>
          </div>

          {/* Key Gaps */}
          <div className="bg-[#ffdad6] text-[#93000a] shadow-sm p-4 rounded-2xl flex flex-col gap-1">
            <h4 className="text-xs font-semibold flex items-center gap-2">
              <span className="material-symbols-outlined text-sm bg-[#93000a]/10 p-1 rounded">
                warning
              </span>{' '}
              Key Gaps
            </h4>
            <p className="text-xs mt-1 leading-relaxed">{paperA.keyGaps}</p>
          </div>

          {/* Results */}
          <div className="bg-[#ffffff] shadow-sm p-4 rounded-2xl flex flex-col gap-1 border border-[#041627]/10">
            <h4 className="text-xs font-semibold text-[#041627] flex items-center gap-2">
              <span className="material-symbols-outlined text-sm bg-[#041627]/10 p-1 rounded">
                insights
              </span>{' '}
              Results
            </h4>
            <p className="text-xs text-[#44474c] mt-1 leading-relaxed">
              {paperA.results}
            </p>
          </div>
        </div>

        {/* Paper B Column */}
        <div className="w-[88vw] sm:w-[320px] shrink-0 snap-center flex flex-col gap-3">
          <div className="bg-[#ffffff] shadow-sm p-4 rounded-2xl flex flex-col gap-2 relative overflow-hidden border border-[#041627]/10">
            <div className="absolute top-0 left-0 w-1 h-full bg-[#58605c]" />
            <div className="bg-[#dce4df] text-[#161d1a] text-[10px] font-bold px-2 py-0.5 rounded w-fit uppercase">
              Paper B
            </div>
            <h3
              onClick={() => onSelectPaper(paperB)}
              className="font-headline text-lg font-bold text-[#1a1c1b] hover:text-[#001e78] cursor-pointer transition-colors leading-snug"
            >
              {paperB.title}
            </h3>
            <p className="text-xs text-[#44474c]">{paperB.authors}</p>
            <div className="flex gap-2 mt-1">
              <span className="bg-[#efeeec] text-[#44474c] px-2 py-0.5 rounded text-[10px] font-medium">
                {paperB.citations}
              </span>
              <span className="bg-[#efeeec] text-[#44474c] px-2 py-0.5 rounded text-[10px] font-medium">
                {paperB.venue}
              </span>
            </div>
          </div>

          {/* Methodology */}
          <div className="bg-[#ffffff] shadow-sm p-4 rounded-2xl flex flex-col gap-1 border border-[#041627]/10">
            <h4 className="text-xs font-semibold text-[#041627] flex items-center gap-2">
              <span className="material-symbols-outlined text-sm bg-[#041627]/10 p-1 rounded">
                science
              </span>{' '}
              Methodology
            </h4>
            <p className="text-xs text-[#44474c] mt-1 leading-relaxed">
              {paperB.methodology}
            </p>
          </div>

          {/* Dataset */}
          <div className="bg-[#ffffff] shadow-sm p-4 rounded-2xl flex flex-col gap-1 border border-[#041627]/10">
            <h4 className="text-xs font-semibold text-[#041627] flex items-center gap-2">
              <span className="material-symbols-outlined text-sm bg-[#041627]/10 p-1 rounded">
                database
              </span>{' '}
              Dataset
            </h4>
            <p className="text-xs text-[#44474c] mt-1 leading-relaxed">
              {paperB.dataset}
            </p>
          </div>

          {/* Key Gaps */}
          <div className="bg-[#ffdad6] text-[#93000a] shadow-sm p-4 rounded-2xl flex flex-col gap-1">
            <h4 className="text-xs font-semibold flex items-center gap-2">
              <span className="material-symbols-outlined text-sm bg-[#93000a]/10 p-1 rounded">
                warning
              </span>{' '}
              Key Gaps
            </h4>
            <p className="text-xs mt-1 leading-relaxed">{paperB.keyGaps}</p>
          </div>

          {/* Results */}
          <div className="bg-[#ffffff] shadow-sm p-4 rounded-2xl flex flex-col gap-1 border border-[#041627]/10">
            <h4 className="text-xs font-semibold text-[#041627] flex items-center gap-2">
              <span className="material-symbols-outlined text-sm bg-[#041627]/10 p-1 rounded">
                insights
              </span>{' '}
              Results
            </h4>
            <p className="text-xs text-[#44474c] mt-1 leading-relaxed">
              {paperB.results}
            </p>
          </div>
        </div>

        {/* Add Paper Placeholder Column */}
        <div className="w-[88vw] sm:w-[320px] shrink-0 snap-center flex flex-col justify-center items-center gap-3 bg-[#ffffff]/60 shadow-sm rounded-2xl border-2 border-dashed border-[#c4c6cd] p-6 text-center">
          <div className="w-14 h-14 bg-[#efeeec] rounded-full flex items-center justify-center text-[#44474c] mb-2">
            <span className="material-symbols-outlined text-3xl">add</span>
          </div>
          <h3 className="font-headline text-lg font-bold text-[#1a1c1b]">
            Add 3rd Paper
          </h3>
          <p className="text-xs text-[#44474c]">
            Select another paper from your library to compare.
          </p>
          <button
            onClick={onOpenDiscover}
            className="mt-2 bg-[#dae2dc] text-[#1a1c1b] px-5 py-2 rounded-full text-xs font-semibold hover:bg-[#dce4df] transition-colors"
          >
            Browse Library
          </button>
        </div>
      </section>

      {/* Continue Reading Section */}
      <section className="px-5 mt-4 mb-6 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h2 className="font-headline text-lg font-bold text-[#1a1c1b] flex items-center gap-2">
            <span className="material-symbols-outlined text-[#041627]">
              menu_book
            </span>
            <span>Continue Reading</span>
          </h2>
          <button
            onClick={() => onSelectPaper(medicalPaper)}
            className="text-xs font-semibold text-[#041627] hover:underline"
          >
            See paper detail
          </button>
        </div>

        <div
          onClick={() => onSelectPaper(medicalPaper)}
          className="bg-[#efeeec] rounded-2xl p-4 flex items-start gap-4 shadow-sm cursor-pointer hover:bg-[#e9e8e6] transition-all relative overflow-hidden group border border-[#041627]/5"
        >
          <div className="absolute top-0 left-0 w-1.5 h-full bg-[#041627] group-hover:w-2.5 transition-all" />
          <div className="w-12 h-16 bg-[#e9e8e6] rounded-xl flex items-center justify-center shrink-0 relative border border-[#c4c6cd]/40">
            <span className="material-symbols-outlined text-[#44474c] text-2xl absolute opacity-20">
              description
            </span>
            <div className="w-8 h-8 rounded-full bg-[#041627]/10 flex items-center justify-center relative z-10">
              <span className="text-[10px] font-bold text-[#041627]">
                74%
              </span>
            </div>
          </div>

          <div className="flex flex-col flex-1 gap-1">
            <div className="flex justify-between items-start w-full">
              <span className="text-[10px] font-bold text-[#44474c] uppercase tracking-wider">
                Nature Neuroscience
              </span>
              <span className="text-[10px] text-[#74777d]">2 days ago</span>
            </div>
            <h3 className="text-xs font-semibold text-[#1a1c1b] line-clamp-2 leading-snug">
              Synaptic plasticity in the hippocampus during sleep-dependent memory consolidation
            </h3>
            <p className="text-[11px] text-[#44474c]">Smith, J., et al. (2024)</p>

            <div className="w-full bg-[#e3e2e0] h-1.5 rounded-full mt-2 overflow-hidden">
              <div
                className="bg-[#041627] h-full rounded-full transition-all"
                style={{ width: '74%' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Recent Papers for You (Horizontal Scroll) */}
      <section className="mt-2 mb-6 flex flex-col gap-3">
        <div className="px-5">
          <h2 className="font-headline text-lg font-bold text-[#1a1c1b] flex items-center gap-2">
            <span className="material-symbols-outlined text-[#041627]">
              article
            </span>
            <span>Recent Papers for You</span>
          </h2>
        </div>

        <div className="flex overflow-x-auto gap-4 px-5 pb-2 no-scrollbar">
          {recentSuggestions.map((paper) => (
            <div
              key={paper.id}
              onClick={() => onSelectPaper(paper)}
              className="shrink-0 w-64 bg-[#efeeec] rounded-2xl p-4 shadow-sm flex flex-col gap-2 relative h-[210px] cursor-pointer hover:shadow-md transition-shadow border border-[#041627]/5"
            >
              {paper.impactFactor && (
                <div className="absolute top-3 right-3 bg-[#dae2dc] text-[#161d1a] px-2 py-0.5 rounded text-[10px] font-bold">
                  IF: {paper.impactFactor}
                </div>
              )}
              <div className="flex flex-col gap-1 flex-1">
                <span className="text-[10px] text-[#44474c] font-medium">
                  {paper.journal}
                </span>
                <h3 className="text-xs font-semibold text-[#1a1c1b] line-clamp-3 mt-1 leading-snug">
                  {paper.title}
                </h3>
                <p className="text-[11px] text-[#44474c] mt-auto">
                  {paper.authors}
                </p>
              </div>

              <div className="flex gap-1.5 mt-auto pt-2 border-t border-[#c4c6cd]/30 flex-wrap">
                {paper.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] bg-[#e3e2e0] text-[#44474c] px-2 py-0.5 rounded font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Today's Research Alerts */}
      <section className="px-5 mt-2 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h2 className="font-headline text-lg font-bold text-[#1a1c1b] flex items-center gap-2">
            <span className="material-symbols-outlined text-[#041627]">
              notifications_active
            </span>
            <span>Today's Research Alerts</span>
          </h2>
          <button
            onClick={onOpenDiscover}
            className="w-8 h-8 rounded-full bg-[#efeeec] flex items-center justify-center text-[#44474c] hover:bg-[#e9e8e6]"
            aria-label="Filter Alerts"
          >
            <span className="material-symbols-outlined text-lg">tune</span>
          </button>
        </div>

        <div className="flex flex-col gap-3">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className="bg-[#efeeec] rounded-2xl p-4 flex gap-3 shadow-sm border border-[#041627]/5"
            >
              <div
                className={`w-2 h-2 mt-2 rounded-full shrink-0 ${alert.badgeColor}`}
              />
              <div className="flex flex-col gap-1">
                <span className="text-xs font-semibold text-[#041627]">
                  {alert.title}
                </span>
                <p className="text-xs text-[#1a1c1b] leading-relaxed">
                  {alert.description}
                </p>
                <span className="text-[10px] text-[#74777d] mt-1">
                  {alert.meta}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
