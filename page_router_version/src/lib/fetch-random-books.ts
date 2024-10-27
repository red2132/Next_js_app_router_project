import { BookData } from "@/types";

export default async function fetchRandomBooks(): Promise<BookData[]> {
  const url = `https://backend-tawny-eta-89.vercel.app/book/random`;

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