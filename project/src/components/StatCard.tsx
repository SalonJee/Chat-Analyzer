import React, { useState } from 'react';
import { MessageCircle, Heart, Smile, MessageSquare, ChevronLeft, AlertTriangle } from 'lucide-react';
import { Message } from '../types';

// Add this CSS to your global stylesheet or as a component style
const flipCardStyle = `
  .flip-card {
    perspective: 1000px;
  }
  .flip-card-inner {
    position: relative;
    width: 100%;
    height: 100%;
    transition: transform 0.6s;
    transform-style: preserve-3d;
  }
  .flip-card.flipped .flip-card-inner {
    transform: rotateY(180deg);
  }
  .flip-card-front, .flip-card-back {
    position: absolute;
    width: 100%;
    height: 100%;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
  }
  .flip-card-back {
    transform: rotateY(180deg);
  }
`;

interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: number;
  subtitle?: string;
  messages?: Message[];
}

const StatCard: React.FC<StatCardProps> = ({ icon, title, value, subtitle, messages }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <>
      <style>{flipCardStyle}</style>
      <div className={`flip-card h-[200px] ${isFlipped ? 'flipped' : ''}`}>
        <div className="flip-card-inner">
          {/* Front of card - Statistics */}
          <div 
            className="flip-card-front bg-white p-6 rounded-lg shadow cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => messages?.length && setIsFlipped(true)}
          >
            <div className="flex items-center">
              {icon}
              <h3 className="ml-2 text-lg font-semibold">{title}</h3>
            </div>
            <div className="mt-4 text-center">
              <p className="text-3xl font-bold">{value}</p>
              {subtitle && <p className="text-sm text-gray-600 mt-1">{subtitle}</p>}
            </div>
            {messages && messages.length > 0 && (
              <div className="absolute bottom-4 right-4 text-sm text-blue-500">
                Click to view messages
              </div>
            )}
          </div>

          {/* Back of card - Messages */}
          <div className="flip-card-back bg-white p-6 rounded-lg shadow">
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-semibold">{title} Messages</h4>
              <button 
                onClick={() => setIsFlipped(false)}
                className="text-gray-500 hover:text-gray-700 flex items-center"
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Back
              </button>
            </div>
            <div className="overflow-auto h-[calc(100%-40px)]">
              {messages && messages.length > 0 ? (
                messages.map((msg, index) => (
                  <div key={index} className="text-sm mb-2 pb-2 border-b last:border-b-0">
                    <div className="flex justify-between items-start">
                      <p className="font-medium text-gray-700">{msg.sender}</p>
                      <p className="text-xs text-gray-400">
                        {msg.timestamp.toLocaleString()}
                      </p>
                    </div>
                    <p className="mt-1 text-gray-600">{msg.content}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center">No messages available</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const StatCards: React.FC<{
  messageCounts: Record<string, number>;
  complimentCount: number;
  emojiCount: number;
  greetingCount: number;
  cussCount: number;
  complimentMessages: Message[];
  emojiMessages: Message[];
  greetingMessages: Message[];
  cussMessages: Message[];
}> = ({
  messageCounts,
  complimentCount,
  emojiCount,
  greetingCount,
  cussCount,
  complimentMessages,
  emojiMessages,
  greetingMessages,
  cussMessages
}) => {
  const totalMessages = Object.values(messageCounts).reduce((a, b) => a + b, 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      <StatCard 
        icon={<MessageCircle className="h-6 w-6 text-blue-500" />} 
        title="Total Messages"
        value={totalMessages}
        subtitle="messages exchanged"
      />

      <StatCard 
        icon={<Heart className="h-6 w-6 text-red-500" />} 
        title="Compliments"
        value={complimentCount}
        subtitle="nice words shared"
        messages={complimentMessages}
      />

      <StatCard 
        icon={<Smile className="h-6 w-6 text-yellow-500" />} 
        title="Emoji Usage"
        value={emojiCount}
        subtitle="emojis used"
        messages={emojiMessages}
      />

      <StatCard 
        icon={<MessageSquare className="h-6 w-6 text-orange-500" />} 
        title="Greetings"
        value={greetingCount}
        subtitle="hello & goodbye"
        messages={greetingMessages}
      />

      <StatCard 
        icon={<AlertTriangle className="h-6 w-6 text-purple-500" />} 
        title="Gali Galoch"
        value={cussCount}
        subtitle="inappropriate language"
        messages={cussMessages}
      />
    </div>
  );
};

export default StatCards;
