import React, { useState } from 'react';
import { Paper } from '../types';
import { askResearchMateAI } from '../services/aiService';

interface DiscoverViewProps {
  papers: Paper[];
  onSelectPaper: (paper: Paper) => void;
  onOpenChatWithPrompt: (prompt: string) => void;
}

export const DiscoverView: React.FC<DiscoverViewProps> = ({
  papers,
  onSelectPaper,
  onOpenChatWithPrompt,
}) => {
  const [activeFilter, setActiveFilter] = useState<'papers' | 'patents' | 'github' | 'news'>('papers');
  const [searchQuery, setSearchQuery] = useState('');
  const [aiSearchResults, setAiSearchResults] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const filteredPapers = papers.filter((p) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      p.title.toLowerCase().includes(q) ||
      p.authors.toLowerCase().includes(q) ||
      p.journal.toLowerCase().includes(q) ||
      p.tags?.some((t) => t.toLowerCase().includes(q))
    );
  });

  const handleSearchSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setLoading(true);
    setAiSearchResults(null);
    const result = await askResearchMateAI(
      `Search research literature and database for: "${searchQuery}". Provide top seminal papers, key authors, and breakthroughs in bullet points.`
    );
    setAiSearchResults(result);
    setLoading(false);
  };

  return (
    <div className="flex flex-col w-full pb-32 pt-16 bg-[#faf9f7] min-h-screen">
      {/* Search Input & Filters */}
      <section className="px-5 pt-4 pb-4 flex flex-col gap-4 relative">
        <div className="absolute -inset-2 bg-[#b8c3ff]/20 rounded-full blur-xl -z-10 animate-pulse" />
        
        <form onSubmit={handleSearchSubmit} className="relative group">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-[#44474c]">
            <span className="material-symbols-outlined">search</span>
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#e3e2e0] text-[#1a1c1b] placeholder:text-[#44474c]/70 rounded-full py-4 pl-12 pr-16 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#001e78] shadow-sm transition-all border border-[#c4c6cd]/30"
            placeholder="Search papers, authors, or concepts..."
          />
          <button
            type="submit"
            aria-label="Submit Search"
            className="absolute inset-y-1 right-1 px-4 bg-[#041627] text-white flex items-center justify-center rounded-full text-xs font-semibold hover:bg-[#1a2b3c] transition-colors active:scale-95 my-1"
          >
            Search
          </button>
        </form>

        {/* Filter Chips */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
          <button
            onClick={() => setActiveFilter('papers')}
            className={`flex-shrink-0 px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 border ${
              activeFilter === 'papers'
                ? 'bg-[#001e78] text-white border-[#001e78]'
                : 'bg-[#e9e8e6] text-[#1a1c1b] border-[#c4c6cd]/30 hover:bg-[#e3e2e0]'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">
              description
            </span>
            <span>Papers</span>
          </button>

          <button
            onClick={() => setActiveFilter('patents')}
            className={`flex-shrink-0 px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 border ${
              activeFilter === 'patents'
                ? 'bg-[#001e78] text-white border-[#001e78]'
                : 'bg-[#e9e8e6] text-[#1a1c1b] border-[#c4c6cd]/30 hover:bg-[#e3e2e0]'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">
              lightbulb
            </span>
            <span>Patents</span>
          </button>

          <button
            onClick={() => setActiveFilter('github')}
            className={`flex-shrink-0 px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 border ${
              activeFilter === 'github'
                ? 'bg-[#001e78] text-white border-[#001e78]'
                : 'bg-[#e9e8e6] text-[#1a1c1b] border-[#c4c6cd]/30 hover:bg-[#e3e2e0]'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">code</span>
            <span>GitHub</span>
          </button>

          <button
            onClick={() => setActiveFilter('news')}
            className={`flex-shrink-0 px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 border ${
              activeFilter === 'news'
                ? 'bg-[#001e78] text-white border-[#001e78]'
                : 'bg-[#e9e8e6] text-[#1a1c1b] border-[#c4c6cd]/30 hover:bg-[#e3e2e0]'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">
              newspaper
            </span>
            <span>News</span>
          </button>
        </div>
      </section>

      {/* AI Search Summary Block if searching */}
      {loading && (
        <section className="px-5 my-2">
          <div className="bg-[#ffffff] p-5 rounded-2xl border border-[#001e78]/20 shadow-sm flex items-center gap-3">
            <span className="material-symbols-outlined animate-spin text-[#2E5BFF] text-2xl">
              progress_activity
            </span>
            <p className="text-xs text-[#44474c] font-medium">
              Scanning 10,000+ academic databases and synthesizing results for "{searchQuery}"...
            </p>
          </div>
        </section>
      )}

      {aiSearchResults && (
        <section className="px-5 my-2">
          <div className="bg-[#ffffff] p-5 rounded-2xl border border-[#001e78]/20 shadow-sm flex flex-col gap-3">
            <div className="flex items-center justify-between border-b border-[#efeeec] pb-2">
              <span className="text-xs font-bold text-[#001e78] flex items-center gap-1.5 uppercase">
                <span className="material-symbols-outlined text-sm">auto_awesome</span>
                AI Literature Discovery
              </span>
              <button
                onClick={() => setAiSearchResults(null)}
                className="text-xs text-[#74777d] hover:underline"
              >
                Dismiss
              </button>
            </div>
            <p className="text-xs text-[#1a1c1b] leading-relaxed whitespace-pre-wrap">
              {aiSearchResults}
            </p>
          </div>
        </section>
      )}

      {/* Filtered Papers List if search query exists */}
      {searchQuery.trim() && (
        <section className="px-5 mb-6 flex flex-col gap-3">
          <h3 className="text-xs font-bold text-[#041627] uppercase tracking-wider">
            Matching Papers in Library ({filteredPapers.length})
          </h3>
          {filteredPapers.length === 0 ? (
            <p className="text-xs text-[#74777d] italic py-3">
              No matching local papers found. Use AI literature search above!
            </p>
          ) : (
            filteredPapers.map((paper) => (
              <div
                key={paper.id}
                onClick={() => onSelectPaper(paper)}
                className="bg-[#ffffff] p-4 rounded-xl border border-[#041627]/10 shadow-sm cursor-pointer hover:border-[#001e78]/40 transition-all flex flex-col gap-1"
              >
                <h4 className="text-xs font-bold text-[#1a1c1b] line-clamp-2">
                  {paper.title}
                </h4>
                <p className="text-[11px] text-[#44474c]">{paper.authors}</p>
                <span className="text-[10px] text-[#74777d] mt-1">
                  {paper.journal} • {paper.citations}
                </span>
              </div>
            ))
          )}
        </section>
      )}

      {/* Quick Starts */}
      <section className="px-5 mt-2 mb-6">
        <h2 className="text-xs font-bold text-[#44474c] mb-3 flex items-center gap-1.5 uppercase tracking-wider">
          <span className="material-symbols-outlined text-[16px]">bolt</span>
          <span>Quick Starts</span>
        </h2>

        <div className="grid grid-cols-1 gap-3">
          <button
            onClick={() =>
              onOpenChatWithPrompt(
                'Find seminal papers on Vision Transformers in medical image segmentation and summarize key breakthroughs.'
              )
            }
            className="text-left p-4 rounded-2xl bg-[#f4f3f1] hover:bg-[#efeeec] border border-[#c4c6cd]/20 shadow-sm transition-all group flex items-start gap-4"
          >
            <div className="w-10 h-10 rounded-full bg-[#1a2b3c] text-white flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined">auto_awesome</span>
            </div>
            <div>
              <p className="text-xs font-semibold text-[#1a1c1b] group-hover:text-[#001e78] transition-colors">
                Find seminal papers on...
              </p>
              <p className="text-[11px] text-[#44474c] mt-0.5">
                Start a deep dive into any new research topic.
              </p>
            </div>
          </button>

          <button
            onClick={() =>
              onOpenChatWithPrompt(
                'Analyze recent patent filings for protein structure prediction and AI drug discovery platforms.'
              )
            }
            className="text-left p-4 rounded-2xl bg-[#f4f3f1] hover:bg-[#efeeec] border border-[#c4c6cd]/20 shadow-sm transition-all group flex items-start gap-4"
          >
            <div className="w-10 h-10 rounded-full bg-[#dae2dc] text-[#5c6460] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined">timeline</span>
            </div>
            <div>
              <p className="text-xs font-semibold text-[#1a1c1b] group-hover:text-[#001e78] transition-colors">
                Analyze patents by...
              </p>
              <p className="text-[11px] text-[#44474c] mt-0.5">
                Track technological advancements of companies and institutions.
              </p>
            </div>
          </button>
        </div>
      </section>

      {/* Trending Topics */}
      <section className="px-5">
        <h2 className="text-xs font-bold text-[#44474c] mb-3 uppercase tracking-wider">
          Trending in Academia
        </h2>

        <div className="flex flex-col gap-3">
          {/* Topic Card 1 */}
          <div
            onClick={() =>
              onOpenChatWithPrompt(
                'Synthesize the latest developments in Generative AI for Protein Folding.'
              )
            }
            className="p-4 rounded-2xl bg-[#ffffff] border border-[#c4c6cd]/30 shadow-sm cursor-pointer hover:shadow-md transition-shadow relative overflow-hidden group"
          >
            <div className="flex justify-between items-start mb-2">
              <span className="px-2.5 py-1 bg-[#efeeec] text-[#44474c] rounded text-[10px] font-bold tracking-wide">
                Bio-Tech
              </span>
              <div className="flex items-center text-[#001e78] text-[11px] font-bold">
                <span className="material-symbols-outlined text-[14px] mr-1">
                  trending_up
                </span>{' '}
                +142%
              </div>
            </div>
            <h3 className="font-headline text-base font-bold text-[#1a1c1b] mb-2 group-hover:text-[#001e78] transition-colors">
              Generative AI in Protein Folding
            </h3>
            <div className="flex gap-4 text-[11px] text-[#44474c]">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">
                  article
                </span>{' '}
                24k Papers
              </span>
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">
                  psychology
                </span>{' '}
                High AI Interest
              </span>
            </div>
          </div>

          {/* Topic Card 2 */}
          <div
            onClick={() =>
              onOpenChatWithPrompt(
                'Explain the critical Quantum Error Correction Gaps and recent mitigation experiments.'
              )
            }
            className="p-4 rounded-2xl bg-[#ffffff] border border-[#c4c6cd]/30 shadow-sm cursor-pointer hover:shadow-md transition-shadow relative overflow-hidden group"
          >
            <div className="flex justify-between items-start mb-2">
              <span className="px-2.5 py-1 bg-[#efeeec] text-[#44474c] rounded text-[10px] font-bold tracking-wide">
                Computing
              </span>
              <div className="flex items-center text-[#001e78] text-[11px] font-bold">
                <span className="material-symbols-outlined text-[14px] mr-1">
                  trending_up
                </span>{' '}
                +89%
              </div>
            </div>
            <h3 className="font-headline text-base font-bold text-[#1a1c1b] mb-2 group-hover:text-[#001e78] transition-colors">
              Quantum Error Correction Gaps
            </h3>
            <div className="flex gap-4 text-[11px] text-[#44474c]">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">
                  article
                </span>{' '}
                12k Papers
              </span>
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">
                  lightbulb
                </span>{' '}
                4k Patents
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
