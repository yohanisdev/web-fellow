// lib/apiBible.ts
import { BibleVersion, BibleBook, BibleChapterContent } from '../types/bible';

const BASE_URL = 'https://api.scripture.api.bible/v1';

// We get the API key safely from environment variables
const API_KEY = process.env.NEXT_PUBLIC_BIBLE_API_KEY || '';

// A reusable fetch wrapper to save us from writing headers every time
async function fetchFromBibleApi<T>(endpoint: string): Promise<T> {
  if (!API_KEY) {
    console.warn("API.Bible key is missing! Make sure to add NEXT_PUBLIC_BIBLE_API_KEY to your .env file.");
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      'api-key': API_KEY,
      'Accept': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Bible API error: ${response.status} ${response.statusText}`);
  }

  const json = await response.json();
  return json.data as T; // API.Bible nests everything under a "data" object
}

// 1. Fetch all available Bible versions/translations
export async function getBibleVersions(): Promise<BibleVersion[]> {
  return fetchFromBibleApi<BibleVersion[]>('/bibles');
}

// 2. Fetch all books for a specific Bible version (e.g., KJV)
export async function getBibleBooks(bibleId: string): Promise<BibleBook[]> {
  return fetchFromBibleApi<BibleBook[]>(`/bibles/${bibleId}/books?include-chapters=true`);
}

// 3. Fetch the actual content of a specific chapter
export async function getChapterContent(bibleId: string, chapterId: string): Promise<BibleChapterContent> {
  // we add include-chapters-and-references to get clean content mapping
  return fetchFromBibleApi<BibleChapterContent>(
    `/bibles/${bibleId}/chapters/${chapterId}?content-type=html&include-notes=false&include-titles=true&include-chapter-numbers=false&include-verse-numbers=true&include-verse-spans=false`
  );
}


// Add this to the bottom of app/bible/lib/apiBible.ts

export interface SearchVerseResult {
  id: string;
  bibleId: string;
  bookId: string;
  chapterId: string;
  reference: string;
  text: string;
}

interface SearchApiResponse {
  query: string;
  limit: number;
  offset: number;
  total: number;
  verses: SearchVerseResult[];
}

// 4. Search the Bible for a keyword or phrase
export async function searchBible(bibleId: string, query: string): Promise<SearchVerseResult[]> {
  if (!query.trim()) return [];
  
  // Encode the query string to handle spaces safely in the URL
  const encodedQuery = encodeURIComponent(query);
  
  const result = await fetchFromBibleApi<SearchApiResponse>(
    `/bibles/${bibleId}/search?query=${encodedQuery}&limit=20`
  );
  
  return result.verses || [];
}
