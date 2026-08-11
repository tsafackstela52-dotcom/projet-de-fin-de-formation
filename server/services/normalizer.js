// ==================================================
// NORMALIZER
// Toutes les fonctions de normalisation du texte
// ==================================================

// --------------------------------------------------
// Normaliser un texte
// --------------------------------------------------

const normalizeText = (text) => {
  if (!text) {
    return "";
  }

  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[’']/g, " ")
    .replace(/[.,!?;:()[\]{}]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
};

// --------------------------------------------------
// Distance de Levenshtein
// --------------------------------------------------

const levenshteinDistance = (a, b) => {
  const matrix = [];

  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // remplacement
          matrix[i][j - 1] + 1, // insertion
          matrix[i - 1][j] + 1, // suppression
        );
      }
    }
  }

  return matrix[b.length][a.length];
};

// --------------------------------------------------
// Comparer deux mots avec une tolérance aux fautes
// --------------------------------------------------

const wordsAreSimilar = (word1, word2) => {
  word1 = normalizeText(word1);
  word2 = normalizeText(word2);

  const distance = levenshteinDistance(word1, word2);

  const maxLength = Math.max(word1.length, word2.length);

  if (maxLength <= 4) {
    return distance === 0;
  }

  if (maxLength <= 7) {
    return distance <= 1;
  }

  return distance <= 2;
};

// --------------------------------------------------
// Vérifier si une phrase contient un mot-clé
// même avec quelques fautes
// --------------------------------------------------

const phraseContainsKeyword = (text, keyword) => {
  const normalizedText = normalizeText(text);
  const normalizedKeyword = normalizeText(keyword);

  // Correspondance exacte
  if (normalizedText.includes(normalizedKeyword)) {
    return true;
  }

  const textWords = normalizedText.split(" ");
  const keywordWords = normalizedKeyword.split(" ");

  // Cas d'un seul mot
  if (keywordWords.length === 1) {
    return textWords.some((textWord) =>
      wordsAreSimilar(textWord, keywordWords[0]),
    );
  }

  // Cas d'une expression
  let matchedWords = 0;

  keywordWords.forEach((keywordWord) => {
    const found = textWords.some((textWord) =>
      wordsAreSimilar(textWord, keywordWord),
    );

    if (found) {
      matchedWords++;
    }
  });

  return matchedWords >= Math.ceil(keywordWords.length * 0.7);
};

// --------------------------------------------------
// Export
// --------------------------------------------------

module.exports = {
  normalizeText,
  levenshteinDistance,
  wordsAreSimilar,
  phraseContainsKeyword,
};
