import React from 'react';

export const About = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">About Chat Analyzer</h2>
        
        <div className="space-y-6 text-gray-600">
          <section>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">What is Chat Analyzer?</h3>
            <p>
              Chat Analyzer is a powerful tool designed to help you gain insights from your chat conversations.
              Upload your chat history and discover patterns, analyze communication styles, and understand your
              messaging habits better.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Features</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Message frequency analysis</li>
              <li>Response time tracking</li>
              <li>Sentiment analysis through compliment detection</li>
              <li>Common words and phrases identification</li>
              <li>Timeline visualization</li>
              <li>Potential communication pattern detection</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">How to Use</h3>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Export your chat history from your messaging platform</li>
              <li>Upload the file using our simple drag-and-drop interface</li>
              <li>Wait for the analysis to complete</li>
              <li>Explore the detailed insights provided in various charts and statistics</li>
            </ol>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Privacy & Security</h3>
            <p>
              Your privacy is our top priority. All chat analysis is performed locally in your browser.
              We don't store or transmit any of your chat data to external servers. Your conversations
              remain completely private and secure.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default About;