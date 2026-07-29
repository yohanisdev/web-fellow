// lib/constants.ts

export const API_BIBLE_BASE_URL = "https://rest.api.bible/v1";

export const DEFAULT_LANGUAGE = "eng";

export const DEFAULT_VERSION = {
  id: "",
  name: "King James Version",
  abbreviation: "KJV",
};

export const SUPPORTED_LANGUAGES = [
  {
    id: "eng",
    code: "en",
    name: "English",
  },
  {
    id: "amh",
    code: "am",
    name: "አማርኛ",
  },
];

export const BOOKS = [
  // Old Testament
  "Genesis",
  "Exodus",
  "Leviticus",
  "Numbers",
  "Deuteronomy",
  "Joshua",
  "Judges",
  "Ruth",
  "1 Samuel",
  "2 Samuel",
  "1 Kings",
  "2 Kings",
  "1 Chronicles",
  "2 Chronicles",
  "Ezra",
  "Nehemiah",
  "Esther",
  "Job",
  "Psalms",
  "Proverbs",
  "Ecclesiastes",
  "Song of Solomon",
  "Isaiah",
  "Jeremiah",
  "Lamentations",
  "Ezekiel",
  "Daniel",
  "Hosea",
  "Joel",
  "Amos",
  "Obadiah",
  "Jonah",
  "Micah",
  "Nahum",
  "Habakkuk",
  "Zephaniah",
  "Haggai",
  "Zechariah",
  "Malachi",

  // New Testament
  "Matthew",
  "Mark",
  "Luke",
  "John",
  "Acts",
  "Romans",
  "1 Corinthians",
  "2 Corinthians",
  "Galatians",
  "Ephesians",
  "Philippians",
  "Colossians",
  "1 Thessalonians",
  "2 Thessalonians",
  "1 Timothy",
  "2 Timothy",
  "Titus",
  "Philemon",
  "Hebrews",
  "James",
  "1 Peter",
  "2 Peter",
  "1 John",
  "2 John",
  "3 John",
  "Jude",
  "Revelation",
];

export const DEFAULT_BOOK = "John";

export const DEFAULT_CHAPTER = 1;

export const REQUEST_HEADERS = {
  "Content-Type": "application/json",
};