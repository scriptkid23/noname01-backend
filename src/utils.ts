export function generateRandomName(): string {
    const adjectives = ['Red', 'Blue', 'Green', 'Yellow', 'Purple', 'Orange', 'Silver', 'Gold'];
    const nouns = ['Dragon', 'Phoenix', 'Tiger', 'Lion', 'Wolf', 'Eagle', 'Bear', 'Snake'];
  
    const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
  
    return `${randomAdjective} ${randomNoun}`;
  }