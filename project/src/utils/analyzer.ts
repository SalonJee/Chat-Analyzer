import { AnalysisResult, Message } from '../types';

const nepaliPhrases = {
  greetings: ['k cha', 'kasto cha', 'khana khayau', 'sanchai chau'],
  compliments: ['ramro', 'nice', 'good', 'best', 'awesome', 'great'],
  emotions: {
    positive: ['maja', 'ramro', 'khusi', 'love', 'haha', 'lol'],
    negative: ['naramro', 'dukha', 'rish', 'angry', 'sad'],
  }
};

function analyzeWords(content: string) {
  const emojiRegex = /[\u{1F300}-\u{1F9FF}]/gu;
  const emojis = content.match(emojiRegex) || [];
  return {
    emojiCount: emojis.length,
  };
}

export async function analyzeChat(text: string): Promise<AnalysisResult> {
  const messageRegex = /^\[(\d{2}\/\d{2}\/\d{4}), (\d{2}:\d{2}:\d{2})\] ([^:]+): (.+)$/gm;
  const messages: Message[] = [];
  let match;

  while ((match = messageRegex.exec(text)) !== null) {
    const [, date, time, sender, content] = match;
    const [day, month, year] = date.split('/');
    const timestamp = new Date(`${month}/${day}/${year} ${time}`);
    messages.push({ timestamp, sender: sender.trim(), content: content.trim() });
  }

  if (messages.length === 0) {
    throw new Error('No valid messages found in the file.');
  }

  const messageCounts: Record<string, number> = {};
  let totalEmojiCount = 0;
  let complimentCount = 0;
  let greetingCount = 0;

  messages.forEach(msg => {
    // Count messages per person
    messageCounts[msg.sender] = (messageCounts[msg.sender] || 0) + 1;

    // Count emojis
    const { emojiCount } = analyzeWords(msg.content);
    totalEmojiCount += emojiCount;

    // Count compliments
    if (nepaliPhrases.compliments.some(comp => 
      msg.content.toLowerCase().includes(comp))) {
      complimentCount++;
    }

    // Count greetings
    if (nepaliPhrases.greetings.some(greeting => 
      msg.content.toLowerCase().includes(greeting))) {
      greetingCount++;
    }
  });

  // Filter messages for details
  const complimentMessages = messages.filter(msg => 
    nepaliPhrases.compliments.some(comp => 
      msg.content.toLowerCase().includes(comp))
  );

  const emojiMessages = messages.filter(msg => 
    /[\u{1F300}-\u{1F9FF}]/gu.test(msg.content)
  );

  const greetingMessages = messages.filter(msg => 
    nepaliPhrases.greetings.some(greeting => 
      msg.content.toLowerCase().includes(greeting))
  );

  return {
    messageCounts,
    complimentCount,
    emojiCount: totalEmojiCount,
    greetingCount,
    complimentMessages,
    emojiMessages,
    greetingMessages
  };
}