// types/bible.ts

export interface BibleVersion {
  id: string;
  name: string;
  abbreviation: string;
  description: string;
  language: {
    id: string;
    name: string;
  };
}

export interface BibleBook {
  id: string;
  bibleId: string;
  number: string;
  name: string;
  nameLong: string;
  chapters: BibleChapterSummary[];
}

export interface BibleChapterSummary {
  id: string;
  bibleId: string;
  number: string;
  bookId: string;
}

export interface BibleChapterContent {
  id: string;
  bibleId: string;
  number: string;
  bookId: string;
  content: string; // This will contain the HTML text of the verses
  reference: string; // e.g., "John 3"
  next?: {
    id: string;
    number: string;
  };
  previous?: {
    id: string;
    number: string;
  };
}