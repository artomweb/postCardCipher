function insertOrderedWords(array, wordsToInsert) {
  const numWords = wordsToInsert.length;
  const indices = getRandomIndices(array.length, numWords);
  const sortedIndices = indices.sort((a, b) => b - a);

  for (let i = 0; i < numWords; i++) {
    const index = sortedIndices[i];
    const word = wordsToInsert[numWords - 1 - i];
    array.splice(index, 0, word);
  }
}

function getRandomIndices(max, count) {
  const indices = [];
  for (let i = 0; i < count; i++) {
    let index = Math.floor(Math.random() * (max + 1));
    indices.push(index);
  }
  return indices;
}

// Example usage
const words = ["apple", "banana", "cat", "dog", "elephant", "fish", "gorilla"];
const wordsToInsert = ["orange", "peach", "mango"];

insertOrderedWords(words, wordsToInsert);
console.log(words);
