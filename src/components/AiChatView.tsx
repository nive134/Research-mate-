import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { askResearchMateAI } from '../services/aiService';

interface AiChatViewProps {
  onClose?: () => void;
  initialPrompt?: string;
}

export const AiChatView: React.FC<AiChatViewProps> = ({
  onClose,
  initialPrompt,
}) => {
  const [deepDive, setDeepDive] = useState(false);
  const [inputPrompt, setInputPrompt] = useState(initialPrompt || '');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'user',
      text: 'Explain the attention mechanism in simple terms.',
      timestamp: '10:42 AM',
    },
    {
      id: 'msg-2',
      sender: 'ai',
      text: `Imagine you're at a loud cocktail party. There are dozens of conversations happening at once, but you're only trying to listen to the person right in front of you.\n\nThe **attention mechanism** in neural networks works similarly. Instead of a model trying to process an entire sentence or document with equal focus, it learns to "pay attention" only to the most relevant parts of the input when generating each word of the output. It weighs the importance of different words based on their context.`,
      timestamp: '10:42 AM',
      citation: {
        title: 'Attention Is All You Need',
        authors: 'Vaswani, A., et al. (2017)',
        section: 'Section 3.2: Attention',
      },
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSend = async (textToSend?: string) => {
    const text = textToSend || inputPrompt;
    if (!text.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputPrompt('');
    setLoading(true);

    const aiText = await askResearchMateAI(text, deepDive);

    const aiMsg: ChatMessage = {
      id: `ai-${Date.now()}`,
      sender: 'ai',
      text: aiText,
      timestamp: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
      deepDive,
      citation: deepDive
        ? {
            title: 'Transformer Models in Medical Imaging: A Comprehensive Review',
            authors: 'Smith, J., et al. (2023)',
            section: 'Section 4: Empirical Benchmarks',
          }
        : undefined,
    };

    setMessages((prev) => [...prev, aiMsg]);
    setLoading(false);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#faf9f7] flex flex-col pt-safe pb-safe animate-fade-in">
      {/* Top Header Bar */}
      <header className="h-16 px-4 flex items-center justify-between border-b border-[#e3e2e0]/60 bg-[#faf9f7]/90 backdrop-blur-md sticky top-0 z-20">
        <div className="flex items-center gap-3">
          {onClose && (
            <button
              onClick={onClose}
              className="w-10 h-10 flex items-center justify-center text-[#1a1c1b] hover:bg-[#efeeec] rounded-full transition-colors"
              aria-label="Back"
            >
              <span className="material-symbols-outlined">arrow_back</span>
            </button>
          )}
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#2E5BFF] text-xl fill-1">
              smart_toy
            </span>
            <h1 className="font-headline text-lg font-bold text-[#041627]">
              Ai Chat
            </h1>
          </div>
        </div>

        <button
          onClick={() => setDeepDive(!deepDive)}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full transition-all ${
            deepDive
              ? 'bg-[#2E5BFF] text-white shadow-sm'
              : 'bg-[#2E5BFF]/10 text-[#2E5BFF] hover:bg-[#2E5BFF]/20'
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">
            travel_explore
          </span>
          <span className="text-xs font-semibold">
            {deepDive ? 'Deep Dive Active' : 'Deep Dive'}
          </span>
        </button>
      </header>

      {/* Main Conversation Stream */}
      <main className="flex-1 overflow-y-auto px-4 py-6 max-w-3xl mx-auto w-full flex flex-col gap-6 relative">
        {/* Glow background */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-5 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#2E5BFF] via-transparent to-transparent animate-pulse" />

        <div className="relative z-10 flex flex-col gap-6">
          {/* Header context badge */}
          <div className="flex items-center justify-between bg-[#efeeec]/60 backdrop-blur-md rounded-full px-4 py-2 ring-1 ring-[#c4c6cd]/30">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#041627] text-lg fill-1">
                graphic_eq
              </span>
              <span className="text-xs font-semibold text-[#041627] uppercase tracking-wider">
                ResearchMate Assistant
              </span>
            </div>
            <span className="text-xs text-[#74777d]">
              Connected to Gemini 3.6
            </span>
          </div>

          {messages.map((msg) =>
            msg.sender === 'user' ? (
              <div key={msg.id} className="flex flex-col items-end gap-1 w-full">
                <div className="bg-[#e9e8e6] text-[#1a1c1b] rounded-2xl rounded-tr-none px-4 py-3 max-w-[85%] shadow-sm ring-1 ring-[#c4c6cd]/20">
                  <p className="text-sm leading-relaxed">{msg.text}</p>
                </div>
                <span className="text-[10px] text-[#74777d] pr-1">
                  {msg.timestamp}
                </span>
              </div>
            ) : (
              <div key={msg.id} className="flex gap-3 w-full">
                <div className="w-8 h-8 shrink-0 rounded-full bg-[#1a2b3c] text-white flex items-center justify-center ring-1 ring-[#041627]/10 shadow-sm mt-1">
                  <span className="material-symbols-outlined text-[18px]">
                    auto_awesome
                  </span>
                </div>

                <div className="flex flex-col gap-2 w-full">
                  <div className="bg-[#ffffff] text-[#1a1c1b] rounded-2xl rounded-tl-none px-5 py-4 shadow-[0_4px_12px_rgba(0,0,0,0.05)] ring-1 ring-[#001e78]/10 w-full max-w-[92%]">
                    <p className="text-sm leading-relaxed whitespace-pre-line">
                      {msg.text}
                    </p>

                    {msg.citation && (
                      <div className="mt-4 p-3 rounded-xl bg-[#f4f3f1] ring-1 ring-[#c4c6cd]/40 border-l-2 border-l-[#2E5BFF]">
                        <div className="flex items-start gap-2 mb-1">
                          <span className="material-symbols-outlined text-[16px] text-[#2E5BFF] mt-0.5 fill-1">
                            menu_book
                          </span>
                          <span className="text-xs font-semibold text-[#1a1c1b]">
                            Referenced from your library:
                          </span>
                        </div>
                        <p className="text-xs text-[#44474c] ml-6">
                          {msg.citation.authors}. <em>{msg.citation.title}</em>. {msg.citation.section}.
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2 ml-1">
                    <button
                      onClick={() => handleCopy(msg.text)}
                      className="w-8 h-8 rounded-full flex items-center justify-center text-[#44474c] hover:bg-[#efeeec] transition-colors"
                      title="Copy response"
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        content_copy
                      </span>
                    </button>
                    <button
                      className="w-8 h-8 rounded-full flex items-center justify-center text-[#44474c] hover:bg-[#efeeec] transition-colors"
                      title="Save to notes"
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        bookmark_add
                      </span>
                    </button>
                    <button
                      onClick={() => handleSend(messages[messages.length - 2]?.text || 'Elaborate')}
                      className="w-8 h-8 rounded-full flex items-center justify-center text-[#44474c] hover:bg-[#efeeec] transition-colors"
                      title="Regenerate"
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        refresh
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            )
          )}

          {loading && (
            <div className="flex gap-3 w-full">
              <div className="w-8 h-8 shrink-0 rounded-full bg-[#1a2b3c] text-white flex items-center justify-center ring-1 ring-[#041627]/10 shadow-sm mt-1 animate-spin">
                <span className="material-symbols-outlined text-[18px]">
                  auto_awesome
                </span>
              </div>
              <div className="bg-[#ffffff] text-[#44474c] rounded-2xl rounded-tl-none px-4 py-3 shadow-sm ring-1 ring-[#001e78]/10 text-xs font-medium flex items-center gap-2">
                <span className="material-symbols-outlined text-base animate-spin text-[#2E5BFF]">
                  progress_activity
                </span>
                <span>Searching literature database and synthesizing answer...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </main>

      {/* Input Footer Bar */}
      <footer className="p-3 bg-[#faf9f7] border-t border-[#e3e2e0] z-20">
        <div className="max-w-3xl mx-auto flex items-end gap-2 p-2 rounded-3xl bg-[#ffffff] ring-1 ring-[#c4c6cd]/50 shadow-[0_2px_8px_rgba(0,0,0,0.04)] focus-within:ring-[#041627] focus-within:ring-2 transition-shadow">
          <button
            type="button"
            className="w-10 h-10 shrink-0 rounded-full flex items-center justify-center text-[#44474c] hover:bg-[#efeeec] transition-colors"
            title="Attach Paper or PDF"
          >
            <span className="material-symbols-outlined text-xl">
              attach_file
            </span>
          </button>

          <textarea
            value={inputPrompt}
            onChange={(e) => setInputPrompt(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Ask a follow-up question..."
            rows={1}
            className="w-full bg-transparent border-none focus:outline-none focus:ring-0 resize-none font-sans text-sm text-[#1a1c1b] placeholder:text-[#44474c]/60 py-2.5 max-h-32 min-h-[44px]"
          />

          <div className="flex items-center gap-1 shrink-0 pb-1 pr-1">
            <button
              type="button"
              className="w-9 h-9 rounded-full flex items-center justify-center text-[#44474c] hover:bg-[#efeeec] transition-colors"
              title="Voice Input"
            >
              <span className="material-symbols-outlined text-xl">mic</span>
            </button>
            <button
              onClick={() => handleSend()}
              disabled={!inputPrompt.trim() || loading}
              className="w-9 h-9 rounded-full flex items-center justify-center bg-[#041627] text-white hover:bg-[#1a2b3c] transition-colors shadow-sm disabled:opacity-40"
              title="Send Message"
            >
              <span className="material-symbols-outlined text-xl fill-1">
                send
              </span>
            </button>
          </div>
        </div>

        <div className="text-center mt-2">
          <span className="text-[11px] text-[#74777d]">
            ResearchMate AI can make mistakes. Consider verifying important information.
          </span>
        </div>
      </footer>
    </div>
  );
};
