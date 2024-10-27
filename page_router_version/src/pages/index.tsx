import { ReactNode } from "react";
import style from "./index.module.css";
import SearchableLayout from "@/components/searchable-layout";
import BookItem from "@/components/book-item";
import { InferGetStaticPropsType } from "next";
import fetchBooks from "@/lib/fetch-books";
import fetchRandomBooks from "@/lib/fetch-random-books";

// 약속된 함수명(getServerSideProps)으로 함수를 만들면 ssr 작동 -> 컴포넌트보다 먼저 진행, 컴포넌트에 필요한 데이터 불러옴
// getStaticProps로 함수로 만들면 ssg로 정적 사이트 생성
export const getStaticProps = async () => {
  console.log('인덱스 페이지')
  //Promise.all 병렬적으로 비동기함수 실행
  const [allBooks, recoBooks] = await Promise.all([
    fetchBooks(),
    fetchRandomBooks()
  ]) 
  // ssr에선 window 객체 사용할 수 없음 -> useEffect로 mounted된 이후에 접근 가능
  return {
    props: {
      allBooks,
      recoBooks
    }
  }
};

export default function Home({ allBooks, recoBooks }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div className={style.container}>
      <section>
        <h3>지금 추천하는 도서</h3>
        { recoBooks.map(book => <BookItem key={book.id} {...book} />) }
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
        { allBooks.map(book => <BookItem key={book.id} {...book} />) }
      </section>
    </div>
  );
}

// SearchableLayout로 감싸지는 별도의 메서드 추가
Home.getLayout = (page: ReactNode) => {
  return (
    <SearchableLayout>{ page }</SearchableLayout>
  )
}
