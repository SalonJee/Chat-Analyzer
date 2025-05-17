// Basic message type
export interface Message {
  timestamp: Date;
  sender: string;
  content: string;
}

export interface AnalysisResult {
  // Basic Stats
  messageCounts: Record<string, number>;
  complimentCount: number;
  emojiCount: number;
  greetingCount: number;
  
  // Message Examples
  complimentMessages: Array<Message>;
  emojiMessages: Array<Message>;
  greetingMessages: Array<Message>;
}