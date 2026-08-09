import React, { useState } from 'react';
import { Paper, Workspace } from '../types';
import { generateBibliographyAI } from '../services/aiService';

interface LibraryViewProps {
  papers: Paper[];
  workspaces: Workspace[];
  onSelectPaper: (paper: Paper) => void;
  onAddPaper: (paper: Paper) => void;
  onOpenChatWithPrompt: (prompt: string) => void;
}

export const LibraryView: React.FC<LibraryViewProps> = ({
  papers,
  workspaces,
  onSelectPaper,
  onAddPaper,
  onOpenChatWithPrompt,
}) => {
  const [activeTab, setActiveTab] = useState<'papers' | 'notes' | 'citations'>('papers');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedWorkspace, setSelectedWorkspace] = useState(workspaces[0]);
  const [bibFormat, setBibFormat] = useState<string | null>(null);
  const [bibOutput, setBibOutput] = useState<string | null>(null);
  const [bibLoading, setBibLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  // New paper form state
  const [newTitle, setNewTitle] = useState('');
  const [newAuthors, setNewAuthors] = useState('');
  const [newJournal, setNewJournal] = useState('');
  const [newYear, setNewYear] = useState('2024');

  const filteredPapers = papers.filter((p) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      p.title.toLowerCase().includes(q) ||
      p.authors.toLowerCase().includes(q) ||
      p.journal.toLowerCase().includes(q)
    );
  });

  const handleGenerateBib = async (style: string) => {
    setBibFormat(style);
    setBibLoading(true);
    setBibOutput(null);
    setCopied(false);
    const result = await generateBibliographyAI(papers.slice(0, 4), style);
    setBibOutput(result);
    setBibLoading(false);
  };

  const handleCopyBib = () => {
    if (bibOutput) {
      navigator.clipboard.writeText(bibOutput);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleCreatePaperSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newPaper: Paper = {
      id: `paper-${Date.now()}`,
      title: newTitle,
      authors: newAuthors || 'Dr. Elena Rostova et al.',
      journal: newJournal || 'Stanford Academic Repository',
      year: parseInt(newYear) || 2024,
      citations: '0 Citations',
      statusTag: 'To Read',
      notesCount: 0,
      readProgress: 0,
      abstract: 'Recently added research manuscript imported into user workspace for literature review.',
      keyFindings: ['Imported into literature review workspace.'],
    };

    onAddPaper(newPaper);
    setShowAddModal(false);
    setNewTitle('');
    setNewAuthors('');
    setNewJournal('');
  };

  return (
    <div className="flex flex-col w-full pb-32 pt-16 bg-[#faf9f7] min-h-screen">
      <div className="px-5 pt-4">
        {/* Title and Add Button */}
        <div className="flex items-center justify-between mb-4">
          <h1 className="font-headline text-2xl font-bold text-[#1a1c1b]">
            Library
          </h1>
          <button
            onClick={() => setShowAddModal(true)}
            aria-label="Add new paper or project"
            className="w-10 h-10 flex items-center justify-center bg-[#041627] text-white rounded-full shadow-sm active:scale-95 transition-transform hover:bg-[#1a2b3c]"
          >
            <span className="material-symbols-outlined text-xl">add</span>
          </button>
        </div>

        {/* Workspace Selector / Breadcrumb */}
        <div className="flex items-center gap-2 mb-5 overflow-x-auto no-scrollbar py-1">
          <button className="flex items-center gap-1 text-[#44474c] bg-[#e9e8e6] px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap hover:bg-[#e3e2e0] transition-colors">
            <span className="material-symbols-outlined text-[18px]">
              folder_open
            </span>
            Workspaces
          </button>
          <span className="material-symbols-outlined text-[#74777d] text-sm">
            chevron_right
          </span>
          <button className="flex items-center gap-1 text-[#0b1d2d] bg-[#d2e4fb] px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap">
            <span className="material-symbols-outlined text-[18px]">
              school
            </span>
            {selectedWorkspace.name}
          </button>
          <span className="material-symbols-outlined text-[#74777d] text-sm">
            chevron_right
          </span>
          <button className="flex items-center gap-1 text-[#44474c] bg-[#e9e8e6] px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap">
            Literature
          </button>
        </div>

        {/* Search & Filter Bar */}
        <div className="relative mb-4">
          <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[#44474c]">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#efeeec] h-12 pl-11 pr-10 rounded-xl text-sm font-medium text-[#1a1c1b] placeholder:text-[#44474c] focus:outline-none focus:ring-2 focus:ring-[#041627]/20 transition-all border border-[#c4c6cd]/30"
            placeholder="Search papers, notes, authors..."
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#74777d] hover:text-[#1a1c1b]"
            >
              <span className="material-symbols-outlined text-lg">close</span>
            </button>
          )}
        </div>

        {/* Content Tabs */}
        <div className="flex gap-4 mb-4 border-b border-[#c4c6cd]/30 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('papers')}
            className={`pb-2 text-xs font-bold whitespace-nowrap border-b-2 transition-colors ${
              activeTab === 'papers'
                ? 'text-[#041627] border-[#041627]'
                : 'text-[#44474c] border-transparent hover:text-[#1a1c1b]'
            }`}
          >
            Saved Papers ({filteredPapers.length})
          </button>
          <button
            onClick={() => setActiveTab('notes')}
            className={`pb-2 text-xs font-bold whitespace-nowrap border-b-2 transition-colors ${
              activeTab === 'notes'
                ? 'text-[#041627] border-[#041627]'
                : 'text-[#44474c] border-transparent hover:text-[#1a1c1b]'
            }`}
          >
            Active Notes (3)
          </button>
          <button
            onClick={() => setActiveTab('citations')}
            className={`pb-2 text-xs font-bold whitespace-nowrap border-b-2 transition-colors ${
              activeTab === 'citations'
                ? 'text-[#041627] border-[#041627]'
                : 'text-[#44474c] border-transparent hover:text-[#1a1c1b]'
            }`}
          >
            Citations
          </button>
        </div>

        {/* Papers List */}
        {activeTab === 'papers' && (
          <div className="flex flex-col gap-3 mb-6">
            {filteredPapers.map((paper) => (
              <div
                key={paper.id}
                className="group bg-[#ffffff] rounded-xl p-4 flex flex-col gap-3 shadow-sm border border-[#041627]/10 transition-all hover:shadow-md hover:border-[#041627]/30 relative overflow-hidden"
              >
                <div
                  className={`absolute top-0 left-0 w-1 h-full ${
                    paper.statusTag === 'Summarized'
                      ? 'bg-[#829E85]'
                      : paper.statusTag === 'Used in Draft'
                      ? 'bg-[#001e78]'
                      : 'bg-[#c4c6cd]'
                  }`}
                />

                <div className="flex justify-between items-start gap-3">
                  <div
                    onClick={() => onSelectPaper(paper)}
                    className="flex flex-col gap-1 cursor-pointer flex-1"
                  >
                    <h3 className="font-headline text-base font-bold text-[#1a1c1b] group-hover:text-[#001e78] transition-colors leading-snug">
                      {paper.title}
                    </h3>
                    <p className="text-xs text-[#44474c]">
                      {paper.authors} • {paper.year} • {paper.journal}
                    </p>
                  </div>
                  <button
                    onClick={() =>
                      onOpenChatWithPrompt(
                        `Extract key methodologies, findings, and limitations from "${paper.title}"`
                      )
                    }
                    className="text-[#74777d] hover:text-[#041627] transition-colors p-1"
                    title="Ask AI about paper"
                  >
                    <span className="material-symbols-outlined text-xl">
                      more_vert
                    </span>
                  </button>
                </div>

                <div className="flex items-center justify-between mt-1">
                  <div className="flex items-center gap-2">
                    {paper.statusTag && (
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide ${
                          paper.statusTag === 'Summarized'
                            ? 'bg-[#829E85]/15 text-[#1a2b3c]'
                            : paper.statusTag === 'Used in Draft'
                            ? 'bg-[#001e78]/10 text-[#001e78]'
                            : 'bg-[#efeeec] text-[#44474c]'
                        }`}
                      >
                        {paper.statusTag}
                      </span>
                    )}

                    {paper.notesCount ? (
                      <span className="inline-flex items-center gap-1 text-[#74777d] text-xs font-medium">
                        <span className="material-symbols-outlined text-[14px]">
                          description
                        </span>{' '}
                        {paper.notesCount} Notes
                      </span>
                    ) : null}
                  </div>

                  <button
                    onClick={() => onSelectPaper(paper)}
                    className="text-[#041627] text-xs font-semibold flex items-center gap-1 hover:underline"
                  >
                    {paper.statusTag === 'Summarized' ? (
                      'View AI Summary'
                    ) : paper.statusTag === 'To Read' ? (
                      <>
                        <span className="material-symbols-outlined text-[15px] text-[#2E5BFF]">
                          smart_toy
                        </span>
                        <span>Extract Key Points</span>
                      </>
                    ) : (
                      'Open Paper'
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'notes' && (
          <div className="flex flex-col gap-3 mb-6">
            <div className="bg-[#ffffff] p-4 rounded-xl border border-[#041627]/10 shadow-sm flex flex-col gap-2">
              <span className="text-xs font-bold text-[#001e78]">
                Note on Vision Transformers
              </span>
              <p className="text-xs text-[#1a1c1b] leading-relaxed">
                ViT patches (16x16) lack standard CNN inductive bias (locality & translation invariance), which makes pre-training dataset scale crucial.
              </p>
              <span className="text-[10px] text-[#74777d]">
                Saved 2 days ago • Linked to Dosovitskiy et al.
              </span>
            </div>

            <div className="bg-[#ffffff] p-4 rounded-xl border border-[#041627]/10 shadow-sm flex flex-col gap-2">
              <span className="text-xs font-bold text-[#001e78]">
                ResNet Skip Connection Equation
              </span>
              <p className="text-xs text-[#1a1c1b] leading-relaxed">
                y = F(x, {`{Wi}`}) + x. The residual mapping F(x) is easier to optimize than unreferenced target functions.
              </p>
              <span className="text-[10px] text-[#74777d]">
                Saved 3 days ago • Linked to He et al.
              </span>
            </div>
          </div>
        )}

        {activeTab === 'citations' && (
          <div className="bg-[#ffffff] p-4 rounded-xl border border-[#041627]/10 shadow-sm flex flex-col gap-2 mb-6">
            <h4 className="text-xs font-bold text-[#041627] uppercase">
              Citation Graph Summary
            </h4>
            <p className="text-xs text-[#44474c]">
              12 cited references in active thesis workspace spanning 2015-2024. Total academic citations aggregated: 198,000+.
            </p>
          </div>
        )}

        {/* Quick Actions / AI Bibliography Generator Block */}
        <div className="bg-[#1a2b3c] text-white rounded-2xl p-5 flex flex-col gap-3 relative overflow-hidden shadow-md">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#2E5BFF] rounded-full blur-[40px] opacity-30" />

          <div className="flex items-start gap-3 relative z-10">
            <div className="w-8 h-8 rounded-full bg-[#041627]/40 flex items-center justify-center shrink-0 border border-white/10">
              <span className="material-symbols-outlined text-[#2E5BFF] text-[18px]">
                auto_awesome
              </span>
            </div>
            <div className="flex flex-col">
              <h4 className="text-sm font-bold text-white">
                Generate Bibliography
              </h4>
              <p className="text-xs text-white/80 mt-0.5">
                Format {papers.length} cited sources in this workspace with AI precision.
              </p>
            </div>
          </div>

          <div className="flex gap-2 mt-1 relative z-10">
            <button
              onClick={() => handleGenerateBib('APA 7')}
              className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-colors border ${
                bibFormat === 'APA 7'
                  ? 'bg-[#2E5BFF] text-white border-[#2E5BFF]'
                  : 'bg-white/10 hover:bg-white/20 text-white border-white/10'
              }`}
            >
              APA 7
            </button>
            <button
              onClick={() => handleGenerateBib('MLA 9')}
              className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-colors border ${
                bibFormat === 'MLA 9'
                  ? 'bg-[#2E5BFF] text-white border-[#2E5BFF]'
                  : 'bg-white/10 hover:bg-white/20 text-white border-white/10'
              }`}
            >
              MLA 9
            </button>
            <button
              onClick={() => handleGenerateBib('BibTeX')}
              className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-colors border ${
                bibFormat === 'BibTeX'
                  ? 'bg-[#2E5BFF] text-white border-[#2E5BFF]'
                  : 'bg-white/10 hover:bg-white/20 text-white border-white/10'
              }`}
            >
              BibTeX
            </button>
          </div>

          {bibLoading && (
            <div className="text-xs text-white/80 flex items-center gap-2 pt-2 relative z-10">
              <span className="material-symbols-outlined text-sm animate-spin text-[#2E5BFF]">
                progress_activity
              </span>
              <span>Formatting references into {bibFormat}...</span>
            </div>
          )}

          {bibOutput && !bibLoading && (
            <div className="mt-2 p-3 bg-black/30 rounded-xl font-mono text-[11px] text-white/90 whitespace-pre-wrap relative z-10 border border-white/10 max-h-40 overflow-y-auto">
              <div className="flex justify-between items-center mb-2 pb-1 border-b border-white/10">
                <span className="text-[10px] text-[#2E5BFF] font-sans font-bold uppercase">
                  {bibFormat} Formatted Citations
                </span>
                <button
                  onClick={handleCopyBib}
                  className="text-[10px] text-white underline font-sans hover:text-[#2E5BFF]"
                >
                  {copied ? 'Copied!' : 'Copy Text'}
                </button>
              </div>
              {bibOutput}
            </div>
          )}
        </div>
      </div>

      {/* Add Paper Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex justify-center items-center p-4">
          <div className="bg-[#faf9f7] w-full max-w-md rounded-2xl p-6 shadow-2xl flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-[#e3e2e0] pb-3">
              <h3 className="font-headline text-lg font-bold text-[#041627]">
                Add Paper to Workspace
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#efeeec] text-[#44474c]"
              >
                <span className="material-symbols-outlined text-xl">close</span>
              </button>
            </div>

            <form onSubmit={handleCreatePaperSubmit} className="flex flex-col gap-3">
              <div>
                <label className="text-xs font-semibold text-[#041627] block mb-1">
                  Paper Title *
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-white border border-[#c4c6cd] rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#041627]"
                  placeholder="e.g. Attention Mechanisms in Medical AI"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#041627] block mb-1">
                  Authors
                </label>
                <input
                  type="text"
                  value={newAuthors}
                  onChange={(e) => setNewAuthors(e.target.value)}
                  className="w-full bg-white border border-[#c4c6cd] rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#041627]"
                  placeholder="e.g. Smith, J., et al."
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-semibold text-[#041627] block mb-1">
                    Journal / Conference
                  </label>
                  <input
                    type="text"
                    value={newJournal}
                    onChange={(e) => setNewJournal(e.target.value)}
                    className="w-full bg-white border border-[#c4c6cd] rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#041627]"
                    placeholder="e.g. Nature Medicine"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#041627] block mb-1">
                    Year
                  </label>
                  <input
                    type="text"
                    value={newYear}
                    onChange={(e) => setNewYear(e.target.value)}
                    className="w-full bg-white border border-[#c4c6cd] rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#041627]"
                    placeholder="2024"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="mt-2 w-full py-3 bg-[#041627] text-white rounded-xl text-xs font-semibold hover:bg-[#1a2b3c] transition-colors"
              >
                Add Paper
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
