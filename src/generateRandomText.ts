// Function to generate random text between 100 to 150 words
function generateRandomText() {
  const MAX = 50
  const MIN = 20
  const words = [
    "Lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit", "sed", "do", "eiusmod", "tempor", "incididunt", "labore", "et", "dolore", "magna", "aliqua", "Ut", "enim", "ad", "minim", "veniam", "quis", "nostrud", "exercitation", "ullamco", "laboris", "nisi", "ut", "aliquip", "ex", "ea", "commodo", "consequat", "Duis", "aute", "irure", "dolor", "in", "reprehenderit", "in", "voluptate", "velit", "esse", "cillum", "dolore", "eu", "fugiat", "nulla", "pariatur", "Excepteur", "sint", "occaecat", "cupidatat", "non", "proident", "sunt", "in", "culpa", "qui", "officia", "deserunt", "mollit", "anim", "id", "est", "laborum"
  ];

  const numWords = Math.floor(Math.random() * (MAX - MIN) + MIN); // Random number of words between 100-150
  let text = '';

  for (let i = 0; i < numWords; i++) {
    const randomIndex = Math.floor(Math.random() * words.length);
    text += words[randomIndex] + ' ';
  }

  return text.trim(); // Remove trailing space
}

// Generate an array of 10 objects with random text field
export const generateDataOfLength = (length: number) => Array.from({ length }, (_, index) => ({
  id: index + 1,
  text: generateRandomText()
}));

