import React, { useState } from 'react';
import { askResearchMateAI } from '../services/aiService';

interface ReviewDraftModalProps {
  onClose: () => void;
}

export const ReviewDraftModal: React.FC<ReviewDraftModalProps> = ({ onClose }) => {
  const [topic, setTopic] = useState('Transformers vs CNNs in Computer Vision');
  const [draft, setDraft] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    setCopied(false);
    const prompt = `Write a comprehensive, publication-grade academic review section synthesizing: "${topic}". Compare methodology, dataset dependencies, key gaps, and benchmark results using formal scientific prose.`;
    const result = await askResearchMateAI(prompt, true);
    setDraft(result);
    setLoading(false);
  };

  const handleCopy = () => {
    if (draft) {
      navigator.clipboard.writeText(draft);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex justify-center items-center p-4">
      <div className="bg-[#faf9f7] w-full max-w-2xl rounded-2xl p-6 shadow-2xl flex flex-col gap-4 max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between border-b border-[#e3e2e0] pb-3 shrink-0">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#001e78]">
              edit_document
            </span>
            <h2 className="font-headline text-xl font-bold text-[#041627]">
              Generate Review Draft
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#efeeec] text-[#44474c]"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        <div className="flex flex-col gap-3 shrink-0">
          <label className="text-xs font-semibold text-[#041627] uppercase tracking-wider">
            Comparison Topic / Focus Area
          </label>
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="w-full bg-[#ffffff] border border-[#c4c6cd] rounded-xl px-4 py-2.5 text-sm font-medium focus:ring-2 focus:ring-[#041627] outline-none"
            placeholder="e.g. Transformers vs CNNs in Medical Imaging"
          />
          <button
            onClick={handleGenerate}
            disabled={loading || !topic.trim()}
            className="bg-[#041627] text-white py-3 px-5 rounded-full font-semibold text-sm flex items-center justify-center gap-2 shadow-md hover:bg-[#1a2b3c] transition-all disabled:opacity-50"
          >
            {loading ? (
              <>
                <span className="material-symbols-outlined animate-spin text-lg">
                  progress_activity
                </span>
                <span>Synthesizing Literature Draft with AI...</span>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-lg">
                  auto_awesome
                </span>
                <span>Generate Literature Review Section</span>
              </>
            )}
          </button>
        </div>

        <div className="flex-1 overflow-y-auto bg-[#ffffff] border border-[#e3e2e0] rounded-xl p-4 font-sans text-sm text-[#1a1c1b] leading-relaxed relative min-h-[160px]">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-40 gap-3 text-[#74777d]">
              <span className="material-symbols-outlined text-3xl animate-pulse text-[#2E5BFF]">
                psychology
              </span>
              <p className="text-xs">
                Analyzing citation matrix, empirical findings, and methodological tradeoffs...
              </p>
            </div>
          ) : draft ? (
            <div className="whitespace-pre-wrap flex flex-col gap-2">
              <div className="flex justify-between items-center pb-2 border-b border-[#efeeec]">
                <span className="text-xs font-semibold text-[#001e78] uppercase">
                  Draft Preview (Gemini AI)
                </span>
                <button
                  onClick={handleCopy}
                  className="text-xs font-semibold text-[#041627] flex items-center gap-1 hover:underline"
                >
                  <span className="material-symbols-outlined text-sm">
                    {copied ? 'check' : 'content_copy'}
                  </span>
                  {copied ? 'Copied!' : 'Copy Section'}
                </button>
              </div>
              <p>{draft}</p>
            </div>
          ) : (
            <div className="text-[#74777d] text-center py-10 flex flex-col items-center gap-2">
              <span className="material-symbols-outlined text-3xl opacity-40">
                description
              </span>
              <p className="text-xs">
                Click "Generate Literature Review Section" to create a publication draft synthesizing your saved papers.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
