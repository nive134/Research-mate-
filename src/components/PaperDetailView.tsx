import React, { useState } from 'react';
import { Paper } from '../types';
import { summarizeTextAI } from '../services/aiService';

interface PaperDetailViewProps {
  paper: Paper;
  onBack: () => void;
  onOpenChatWithPrompt: (prompt: string) => void;
}

export const PaperDetailView: React.FC<PaperDetailViewProps> = ({
  paper,
  onBack,
  onOpenChatWithPrompt,
}) => {
  const [saved, setSaved] = useState(true);
  const [copiedSummary, setCopiedSummary] = useState(false);
  const [expandedFig, setExpandedFig] = useState<string | null>(null);
  const [dynamicSummary, setDynamicSummary] = useState<string | null>(null);
  const [summarizing, setSummarizing] = useState(false);

  const handleCopySummary = () => {
    const summaryText =
      paper.keyFindings?.join('\n') || paper.abstract || '';
    navigator.clipboard.writeText(summaryText);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2000);
  };

  const handleSummarizeClick = async () => {
    setSummarizing(true);
    const result = await summarizeTextAI(
      `${paper.title}\n\n${paper.abstract}\n\n${paper.keyFindings?.join(' ')}`
    );
    setDynamicSummary(result);
    setSummarizing(false);
  };

  const handleDownloadPDF = () => {
    alert(`Downloading manuscript PDF for "${paper.title}"...`);
  };

  return (
    <div className="flex flex-col w-full pb-32 pt-16 bg-[#faf9f7] min-h-screen">
      {/* Top Header */}
      <header className="fixed top-0 w-full z-50 bg-[#faf9f7]/90 backdrop-blur-xl border-b border-[#e3e2e0]/60 pt-safe">
        <div className="h-16 px-4 flex items-center gap-3">
          <button
            onClick={onBack}
            className="w-10 h-10 flex items-center justify-center text-[#1a1c1b] hover:bg-[#efeeec] rounded-full transition-colors"
            aria-label="Back"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <h1 className="font-headline text-lg font-bold text-[#041627] truncate">
            Paper Detail
          </h1>
        </div>
      </header>

      {/* Main Content Article */}
      <article className="px-5 py-6 max-w-4xl mx-auto w-full flex flex-col gap-6">
        {/* Article Metadata & Header */}
        <header className="flex flex-col gap-3">
          <div className="flex gap-2 flex-wrap">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#e9e8e6] text-[#44474c] text-xs font-semibold">
              Review Article
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#e9e8e6] text-[#44474c] text-xs font-semibold">
              Medical Imaging
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#000e47]/10 text-[#000e47] text-xs font-semibold gap-1">
              <span className="material-symbols-outlined text-[14px]">
                auto_awesome
              </span>
              AI Analyzed
            </span>
          </div>

          <h1 className="font-headline text-2xl sm:text-3xl font-bold text-[#1a1c1b] leading-tight">
            {paper.title}
          </h1>

          <div className="flex flex-col gap-0.5">
            <p className="text-sm font-medium text-[#44474c]">
              {paper.authors}
            </p>
            <p className="text-xs text-[#74777d]">
              Published in {paper.journal}
            </p>
          </div>

          <div className="flex gap-4 mt-2">
            <button
              onClick={handleDownloadPDF}
              className="flex items-center gap-2 text-[#041627] text-xs font-semibold hover:opacity-80 transition-opacity"
            >
              <span className="material-symbols-outlined text-[20px]">
                download
              </span>
              <span>Download PDF</span>
            </button>
            <button
              onClick={() => setSaved(!saved)}
              className="flex items-center gap-2 text-[#041627] text-xs font-semibold hover:opacity-80 transition-opacity"
            >
              <span className="material-symbols-outlined text-[20px]">
                {saved ? 'bookmark' : 'bookmark_add'}
              </span>
              <span>{saved ? 'Saved in Library' : 'Save to Library'}</span>
            </button>
          </div>
        </header>

        {/* AI Summary Panel */}
        <section className="bg-[#ffffff] rounded-2xl p-6 relative overflow-hidden shadow-sm border border-[#041627]/10">
          <div className="absolute -top-10 -left-10 w-32 h-32 bg-[#2E5BFF]/10 rounded-full blur-2xl" />

          <div className="flex items-center justify-between mb-4 relative z-10">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#000e47] text-xl">
                auto_awesome
              </span>
              <h2 className="font-headline text-lg font-bold text-[#1a1c1b]">
                AI Summary
              </h2>
            </div>
            <div className="flex gap-1">
              <button
                onClick={() => alert('Summary feedback recorded!')}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#efeeec] text-[#74777d]"
                title="Helpful"
              >
                <span className="material-symbols-outlined text-[18px]">
                  thumb_up
                </span>
              </button>
              <button
                onClick={handleCopySummary}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#efeeec] text-[#74777d]"
                title="Copy summary"
              >
                <span className="material-symbols-outlined text-[18px]">
                  {copiedSummary ? 'check' : 'content_copy'}
                </span>
              </button>
            </div>
          </div>

          <div className="space-y-3 relative z-10">
            <p className="text-xs font-bold text-[#1a1c1b] uppercase tracking-wider">
              Key Findings:
            </p>

            {dynamicSummary ? (
              <p className="text-xs text-[#1a1c1b] leading-relaxed whitespace-pre-wrap">
                {dynamicSummary}
              </p>
            ) : (
              <ul className="list-none space-y-3">
                {paper.keyFindings?.map((finding, idx) => (
                  <li key={idx} className="flex gap-3 items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#000e47] mt-2 shrink-0" />
                    <p className="text-xs text-[#44474c] leading-relaxed">
                      {finding}
                    </p>
                  </li>
                )) || (
                  <li className="text-xs text-[#44474c]">
                    {paper.abstract}
                  </li>
                )}
              </ul>
            )}
          </div>
        </section>

        {/* Abstract Section */}
        <section className="flex flex-col gap-3 max-w-3xl">
          <h3 className="font-headline text-xl font-bold text-[#1a1c1b]">
            Abstract
          </h3>
          <p className="text-sm text-[#44474c] leading-relaxed">
            {paper.abstract}
          </p>
        </section>

        {/* Key Figures Section */}
        <section className="flex flex-col gap-3 mt-2">
          <h3 className="font-headline text-xl font-bold text-[#1a1c1b]">
            Key Figures
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Figure 1 */}
            <div className="bg-[#ffffff] rounded-2xl p-3 shadow-sm border border-[#041627]/10 flex flex-col gap-2">
              <img
                src={
                  paper.fig1Url ||
                  'https://lh3.googleusercontent.com/aida-public/AB6AXuBJHAQkbTswndD5FUeXSFzSqoKZwC1l9yZmAfoDudRfWQwwDR-cxvV5CPnmsfERtt8FO6m5kj3D4XPwmKV7lEVKZ4n_9ALgzCGbpAiDYDzBHL4XcKkM39KG9fFjudYuwetGlNK_dxcCvI8fFOgYDR4XQeuml5kKEzl7J0QchexvIyHkgSXIY0JAbDPO_pOJ3rfi4gU_S3BGlxx3btlkQf5h2rt3qODleufdcXohbRhUiANejZZ6fZGQ'
                }
                alt="Proposed Hybrid Architecture"
                onClick={() =>
                  setExpandedFig(
                    paper.fig1Url ||
                      'https://lh3.googleusercontent.com/aida-public/AB6AXuBJHAQkbTswndD5FUeXSFzSqoKZwC1l9yZmAfoDudRfWQwwDR-cxvV5CPnmsfERtt8FO6m5kj3D4XPwmKV7lEVKZ4n_9ALgzCGbpAiDYDzBHL4XcKkM39KG9fFjudYuwetGlNK_dxcCvI8fFOgYDR4XQeuml5kKEzl7J0QchexvIyHkgSXIY0JAbDPO_pOJ3rfi4gU_S3BGlxx3btlkQf5h2rt3qODleufdcXohbRhUiANejZZ6fZGQ'
                  )
                }
                className="w-full h-48 object-cover rounded-xl bg-[#efeeec] cursor-pointer hover:opacity-95 transition-opacity"
              />
              <p className="text-xs text-[#44474c] px-1 font-medium">
                Fig 1: Proposed Hybrid CNN-Transformer Architecture
              </p>
            </div>

            {/* Figure 2 */}
            <div className="bg-[#ffffff] rounded-2xl p-3 shadow-sm border border-[#041627]/10 flex flex-col gap-2">
              <img
                src={
                  paper.fig2Url ||
                  'https://lh3.googleusercontent.com/aida-public/AB6AXuDoXe50iZurylQvevqlZyAkdSrpeIstJcOjqulrBAbSUE4PC0F0Ueg-KeppyLk3n2BPPL8QvFUNnSz9dOchOMM1LPceuyw027VFlZbXHoLnL6N2tR-BSvyKonjUU_tYui19BgbOS3qqulOnTVxZ0hS2OAyNbKIgJLfF7amPINEuTcmEjk5CXVydag9w_Q06S5hf0aypwzoR_hhZrAP-vOaxOYGgnRzsVnbDWZ5GumOCrJETgslhrMC1'
                }
                alt="Performance Comparison across Datasets"
                onClick={() =>
                  setExpandedFig(
                    paper.fig2Url ||
                      'https://lh3.googleusercontent.com/aida-public/AB6AXuDoXe50iZurylQvevqlZyAkdSrpeIstJcOjqulrBAbSUE4PC0F0Ueg-KeppyLk3n2BPPL8QvFUNnSz9dOchOMM1LPceuyw027VFlZbXHoLnL6N2tR-BSvyKonjUU_tYui19BgbOS3qqulOnTVxZ0hS2OAyNbKIgJLfF7amPINEuTcmEjk5CXVydag9w_Q06S5hf0aypwzoR_hhZrAP-vOaxOYGgnRzsVnbDWZ5GumOCrJETgslhrMC1'
                  )
                }
                className="w-full h-48 object-cover rounded-xl bg-[#efeeec] cursor-pointer hover:opacity-95 transition-opacity"
              />
              <p className="text-xs text-[#44474c] px-1 font-medium">
                Fig 2: Performance Comparison across Datasets (Dice & IoU)
              </p>
            </div>
          </div>
        </section>

        {/* References Section */}
        <section className="flex flex-col gap-3 mt-4 mb-10">
          <h3 className="font-headline text-xl font-bold text-[#1a1c1b]">
            References (Excerpt)
          </h3>
          <div className="flex flex-col gap-3">
            <div className="bg-[#ffffff] rounded-2xl p-4 shadow-sm border border-[#041627]/10 flex flex-col gap-1">
              <p className="text-xs font-bold text-[#1a1c1b]">
                An Image is Worth 16x16 Words: Transformers for Image Recognition at Scale
              </p>
              <p className="text-[11px] text-[#44474c]">
                Dosovitskiy, A., et al. (2020). ICLR 2021.
              </p>
              <p className="text-[10px] text-[#74777d] mt-1 font-medium">
                Cited 24,105 times
              </p>
            </div>

            <div className="bg-[#ffffff] rounded-2xl p-4 shadow-sm border border-[#041627]/10 flex flex-col gap-1">
              <p className="text-xs font-bold text-[#1a1c1b]">
                TransUNet: Transformers Make Strong Encoders for Medical Image Segmentation
              </p>
              <p className="text-[11px] text-[#44474c]">
                Chen, J., et al. (2021). arXiv preprint arXiv:2102.04306.
              </p>
              <p className="text-[10px] text-[#74777d] mt-1 font-medium">
                Cited 1,832 times
              </p>
            </div>
          </div>
        </section>
      </article>

      {/* Floating Ask AI Button */}
      <button
        onClick={() =>
          onOpenChatWithPrompt(
            `Analyze the manuscript "${paper.title}" and explain its key methodological innovations.`
          )
        }
        className="fixed bottom-24 right-5 w-14 h-14 bg-[#041627] rounded-full shadow-lg flex items-center justify-center text-white hover:bg-[#1a2b3c] transition-transform active:scale-95 z-40 group"
        title="Ask AI about paper"
      >
        <span className="material-symbols-outlined text-[28px] fill-1 group-hover:scale-110 transition-transform">
          chat_spark
        </span>
      </button>

      {/* AI Actions Toolbar (Fixed Bottom) */}
      <div className="fixed bottom-0 left-0 w-full bg-[#ffffff]/95 backdrop-blur-xl border-t border-[#c4c6cd]/30 pb-safe z-50">
        <div className="max-w-4xl mx-auto px-4 py-3 flex gap-2 overflow-x-auto no-scrollbar">
          <button
            onClick={handleSummarizeClick}
            disabled={summarizing}
            className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#000e47]/10 text-[#000e47] text-xs font-semibold whitespace-nowrap shrink-0 hover:bg-[#000e47]/20 transition-colors shadow-sm disabled:opacity-50"
          >
            <span className="material-symbols-outlined text-[18px]">
              {summarizing ? 'progress_activity' : 'summarize'}
            </span>
            <span>{summarizing ? 'Summarizing...' : 'Summarize'}</span>
          </button>

          <button
            onClick={() =>
              onOpenChatWithPrompt(
                `Explain the core self-attention visual mechanism in "${paper.title}" using an accessible analogy.`
              )
            }
            className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#faf9f7] text-[#1a1c1b] text-xs font-semibold whitespace-nowrap shrink-0 hover:bg-[#efeeec] transition-colors border border-[#041627]/10 shadow-sm"
          >
            <span className="material-symbols-outlined text-[18px]">
              psychology
            </span>
            <span>Explain Concept</span>
          </button>

          <button
            onClick={() =>
              onOpenChatWithPrompt(
                `What are the critical research gaps and limitations mentioned in "${paper.title}"?`
              )
            }
            className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#faf9f7] text-[#1a1c1b] text-xs font-semibold whitespace-nowrap shrink-0 hover:bg-[#efeeec] transition-colors border border-[#041627]/10 shadow-sm"
          >
            <span className="material-symbols-outlined text-[18px]">
              troubleshoot
            </span>
            <span>Find Gaps</span>
          </button>

          <button
            onClick={() => {
              const citation = `${paper.authors} (${paper.year}). ${paper.title}. ${paper.journal}.`;
              navigator.clipboard.writeText(citation);
              alert(`Citation copied to clipboard:\n\n${citation}`);
            }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#faf9f7] text-[#1a1c1b] text-xs font-semibold whitespace-nowrap shrink-0 hover:bg-[#efeeec] transition-colors border border-[#041627]/10 shadow-sm"
          >
            <span className="material-symbols-outlined text-[18px]">
              format_quote
            </span>
            <span>Export Citation</span>
          </button>
        </div>
      </div>

      {/* Expanded Image Modal */}
      {expandedFig && (
        <div
          onClick={() => setExpandedFig(null)}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer"
        >
          <div className="relative max-w-3xl w-full">
            <img
              src={expandedFig}
              alt="Expanded figure"
              className="w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl"
            />
            <button
              onClick={() => setExpandedFig(null)}
              className="absolute top-3 right-3 bg-black/60 text-white rounded-full p-2 hover:bg-black"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
