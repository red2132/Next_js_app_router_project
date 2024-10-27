import { BookData } from "@/types";

export default async function fetchBooks(query?: string): Promise<BookData[]> {
  let url = `https://backend-tawny-eta-89.vercel.app/book`;
  if(query) {
    url += `/search?q=${query}`;
  }
  try {
    const response = await fetch(url);
    if(!response.ok) {
      throw new Error();
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
  
}