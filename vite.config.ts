import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import { GoogleGenAI } from '@google/genai';

function geminiApiPlugin() {
  return {
    name: 'gemini-api-middleware',
    configureServer(server: any) {
      server.middlewares.use('/api/ai', async (req: any, res: any) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          return res.end(JSON.stringify({ error: 'Method not allowed' }));
        }

        let body = '';
        req.on('data', (chunk: any) => {
          body += chunk;
        });

        req.on('end', async () => {
          try {
            const data = JSON.parse(body || '{}');
            const apiKey = process.env.GEMINI_API_KEY;

            if (!apiKey) {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              return res.end(
                JSON.stringify({
                  error: 'GEMINI_API_KEY environment variable is missing.',
                })
              );
            }

            const ai = new GoogleGenAI({
              apiKey: apiKey,
              httpOptions: {
                headers: {
                  'User-Agent': 'aistudio-build',
                },
              },
            });

            const action = data.action || 'chat';

            if (action === 'chat') {
              const systemInstruction = data.deepDive
                ? "You are ResearchMate AI in 'Deep Dive' mode. Provide rigorous, scholarly, and deeply contextual academic analysis with citations, research gaps, and detailed explanations."
                : "You are ResearchMate AI, an intelligent academic research assistant. Provide helpful, precise, clear, and scholarly explanations and responses.";

              const response = await ai.models.generateContent({
                model: 'gemini-3.6-flash',
                contents: data.prompt || 'Hello',
                config: {
                  systemInstruction,
                },
              });

              res.setHeader('Content-Type', 'application/json');
              return res.end(JSON.stringify({ text: response.text }));
            } else if (action === 'summarize') {
              const response = await ai.models.generateContent({
                model: 'gemini-3.6-flash',
                contents: `Summarize the following research text into key findings, methodology, and limitations:\n\n${data.text}`,
                config: {
                  systemInstruction:
                    'You are an expert research paper reviewer. Extract key findings, methodology highlights, dataset details, and critical gaps.',
                },
              });

              res.setHeader('Content-Type', 'application/json');
              return res.end(JSON.stringify({ summary: response.text }));
            } else if (action === 'explain') {
              const response = await ai.models.generateContent({
                model: 'gemini-3.6-flash',
                contents: `Explain the following academic concept simply with real-world analogies and scholarly references:\n\n${data.concept}`,
                config: {
                  systemInstruction:
                    'Explain scientific and academic concepts clearly for researchers with intuitive metaphors and citation references.',
                },
              });

              res.setHeader('Content-Type', 'application/json');
              return res.end(JSON.stringify({ explanation: response.text }));
            } else if (action === 'bibliography') {
              const response = await ai.models.generateContent({
                model: 'gemini-3.6-flash',
                contents: `Generate formatted bibliographies in ${data.style || 'APA 7'} format for the following papers:\n\n${JSON.stringify(data.papers)}`,
                config: {
                  systemInstruction:
                    'Format academic citations precisely according to specified guidelines (APA 7, MLA 9, or BibTeX).',
                },
              });

              res.setHeader('Content-Type', 'application/json');
              return res.end(
                JSON.stringify({ bibliography: response.text })
              );
            }

            res.statusCode = 400;
            res.setHeader('Content-Type', 'application/json');
            return res.end(JSON.stringify({ error: 'Unknown action' }));
          } catch (err: any) {
            console.error('Gemini API error:', err);
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            return res.end(
              JSON.stringify({ error: err.message || 'Internal Server Error' })
            );
          }
        });
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), geminiApiPlugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    host: true,
  },
});
