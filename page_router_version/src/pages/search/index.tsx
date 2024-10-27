// next/navigation은 앱 라우터용이므로 호환성 문제가 있을 수 있음
import BookItem from "@/components/book-item";
import { ReactNode, useEffect, useState } from "react";
import SearchableLayout from "@/components/searchable-layout";
import fetchBooks from "@/lib/fetch-books";
import { useRouter } from "next/router";
import { BookData } from "@/types";
import Head from "next/head";

// getStaticProps 방식으론 query string을 받아올 수 없음 -> 사전 렌더링 이후 컴포넌트에서 query string 받아오기
// export const getStaticProps = async (context: GetStaticPropsContext) => {
//   const query = context.query.queryString;
//   const books = await fetchBooks(query as string);
//   return {
//       props: {books},
//     }
// }
export default function Page() {
  const [books, setBooks] = useState<BookData[]>([]);

  const router = useRouter();
  const { queryString } = router.query; // query는 useRouter 객체 안에서 꺼내올 수 있음
  
  const fetchSearchResult = async () => {
    const data = await fetchBooks(queryString as string);
    setBooks(data);
  }
  useEffect(() => {
    if(queryString) {
      fetchSearchResult()
    }
  }, [queryString])
  return (
  <>
    <Head>
      <title>Book Project - 검색 결과</title>
      <meta property="og:image" content="/logo.png" />
      <meta property="og:title" content="Book Project"/>
      <meta property="og:description" content="책 검색 결과"/>
    </Head>
    <div>
      {
        books.map(book => <BookItem key={book.id} {...book} />)
      }
    </div>
  </>
  )
}

Page.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};