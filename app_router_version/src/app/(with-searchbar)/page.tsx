import BookItem from "@/components/book-item";
import style from "./page.module.css";
import { BookData } from "@/types";
import { Metadata } from "next";

// export const dynamic = "force-dynamic";

async function AllBooks() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`, { cache: 'force-cache' });
  if(!response.ok) {
    return <div>오류 발생...</div>
  }
  const allBooks: BookData[] = await response.json();
  return (
    <div>
      {allBooks.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

async function RecoBook() {
  //특정 주기마다 캐싱
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/random`, { next: { revalidate: 3 }});
    if(!response.ok) {
      return <div>오류 발생...</div>
    }
    const recoBooks: BookData[] = await response.json();
    return (
      <div>
        {recoBooks.map((book) => (
          <BookItem key={book.id} {...book} />
        ))}
      </div>
    );
}

export const metadata: Metadata = {
  title: "Book Project",
  description: "등록된 도서를 만나보세요!",
  openGraph: {
    title: "Book Project",
    description: "등록된 도서를 만나보세요!",
    images: ["/logo.jpg"],
  }
}

export default function Home() {
  return (
    <div className={style.container}>
      <section>
        <h3>지금 추천하는 도서</h3>
        <RecoBook />
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
          <AllBooks />
      </section>
    </div>
  );
}
