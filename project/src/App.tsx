import React, { useState } from 'react';
import { Navigation } from './components/Navigation';
import { About } from './components/About';
import StatCards from './components/StatCard';
import { FileUpload } from './components/FileUpload';
import { XCircle } from 'lucide-react';
import { analyzeChat } from './utils/analyzer';
import { AnalysisResult } from './types';

function App() {
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<'home' | 'about'>('home');

  const handleFileSelect = async (file: File) => {
    setAnalyzing(true);
    setError(null);
    try {
      if (file.type !== 'text/plain') {
        throw new Error('Please upload a valid text file (.txt)');
      }
      const text = await file.text();
      const analysis = await analyzeChat(text);
      setResult(analysis);
    } catch (error) {
      console.error('Error analyzing chat:', error);
      setError(error instanceof Error ? error.message : 'Failed to analyze chat file');
      setResult(null);
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation onNavigate={setCurrentPage} currentPage={currentPage} />
      
      {currentPage === 'home' ? (
        <>
          <header className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 py-6">
              <h1 className="text-3xl font-bold text-gray-900">Chat Analyzer</h1>
              <p className="mt-2 text-gray-600">Upload your chat history for instant insights</p>
            </div>
          </header>

          <main className="max-w-7xl mx-auto px-4 py-8">
            {!result && (
              <div className="flex flex-col items-center justify-center space-y-8">
                <FileUpload onFileSelect={handleFileSelect} />
                {analyzing && (
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Analyzing your chat history...</p>
                  </div>
                )}
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start space-x-3">
                    <XCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="text-sm font-medium text-red-800">Error</h3>
                      <p className="mt-1 text-sm text-red-700">{error}</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {result && (
              <div className="space-y-8">
                <StatCards
                  messageCounts={result.messageCounts}
                  complimentCount={result.complimentCount}
                  emojiCount={result.emojiCount}
                  greetingCount={result.greetingCount}
                  cussCount={result.cussCount}
                  complimentMessages={result.complimentMessages}
                  emojiMessages={result.emojiMessages}
                  greetingMessages={result.greetingMessages}
                  cussMessages={result.cussMessages}
                />

                <button
                  onClick={() => setResult(null)}
                  className="mt-8 px-4 py-2 bg-gray-100 text-gray-600 rounded hover:bg-gray-200 transition-colors"
                >
                  Analyze Another Chat
                </button>
              </div>
            )}
          </main>
        </>
      ) : (
        <About />
      )}
    </div>
  );
}

export default App;