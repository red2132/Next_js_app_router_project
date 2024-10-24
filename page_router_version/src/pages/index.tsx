import { ReactNode } from "react";
import style from "./index.module.css";
import SearchableLayout from "@/components/searchable-layout";
import books from "@/mock/books.json";
import BookItem from "@/components/book-item";

export default function Home() {
  return (
    <div className={style.container}>
      <section>
        <h3>지금 추천하는 도서</h3>
        { books.map(book => <BookItem key={book.id} {...book} />) }
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
        { books.map(book => <BookItem key={book.id} {...book} />) }
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
