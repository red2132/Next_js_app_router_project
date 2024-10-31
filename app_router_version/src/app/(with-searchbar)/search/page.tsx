import BookItem from "@/components/book-item";
import BookListSkeleton from "@/components/skeleton/book-list-skeleton";
import { BookData } from "@/types";
import { Metadata } from "next";
import { Suspense } from "react";

async function SearchResult({ q } : { q: string }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/search?q=${q}`, { cache: "force-cache" });
  if(!response.ok) {
    return (
      <div>오류가 발생했습니다</div>
    );
  }

  const searchBooks: BookData[] = await response.json();
  if(searchBooks.length === 0) {
    return (
      <div>검색 결과가 없습니다</div>
    )
  }
  return (
    <div>
      {searchBooks.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
};

// 현재 페이지의 메타 데이터를 동적으로 생성
export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}): Promise<Metadata> {
  const { q } = await searchParams;
  return {
    title: `Book Project: "${q}" 검색 결과`,
    description: `"${q}" 검색 결과입니다`,
    openGraph: {
      title: `Book Project: "${q}" 검색 결과`,
      description: `"${q}" 검색 결과입니다`,
      images: ["/logo.jpg"],
    }
  }
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{
    q?: string;
  }>;
}) {
  const { q } = await searchParams;
  return (
    <Suspense key={q || ""} fallback={
      <BookListSkeleton count={3}/>
    }>
      <SearchResult q={ q || "" } />
    </Suspense>
  )
}
