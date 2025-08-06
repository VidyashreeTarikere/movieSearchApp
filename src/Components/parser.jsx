const GENRES = [
  "action",
  "adventure",
  "animation",
  "comedy",
  "crime",
  "documentary",
  "drama",
  "family",
  "fantasy",
  "history",
  "horror",
  "music",
  "mystery",
  "romance",
  "sci-fi",
  "science fiction",
  "sport",
  "thriller",
  "war",
  "western",
];

const DECADE_REGEX = /\b(19|20)?(\d{2})(s)?\b/g;

function extractDecade(text) {
  const matches = [...text.matchAll(DECADE_REGEX)];
  for (const match of matches) {
    let century = match[1] || "19";
    let year = match[2];
    if (match[3] === "s") {
      return parseInt(century + year[0] + "0", 10);
    } else {
      return parseInt(century + year, 10);
    }
  }
  return null;
}

function extractGenre(text) {
  const lower = text.toLowerCase();
  for (const genre of GENRES) {
    if (lower.includes(genre)) {
      return genre;
    }
  }
  return null;
}

function extractPerson(text) {
  const nameRegex = /\b([A-Z][a-z]+(?:\s[A-Z][a-z]+)+)\b/g;
  const matches = [...text.matchAll(nameRegex)];
  for (const match of matches) {
    const name = match[1];
    if (name.length > 3 && name.split(" ").length >= 2) {
      return name;
    }
  }
  return null;
}

export function parseTMDBQuery(text) {
  return {
    decade: extractDecade(text),
    genre: extractGenre(text),
    person: extractPerson(text),
  };
}
