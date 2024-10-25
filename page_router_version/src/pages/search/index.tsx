// next/navigation은 앱 라우터용이므로 호환성 문제가 있을 수 있음
import BookItem from "@/components/book-item";
import { ReactNode } from "react";
import SearchableLayout from "@/components/searchable-layout";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import fetchBooks from "@/lib/fetch-books";

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const query = context.query.queryString;
  const books = await fetchBooks(query as string);
  return {
      props: {books},
    }
}
export default function Page({ books }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  // const router = useRouter();
  // const { queryString } = router.query; // query는 useRouter 객체 안에서 꺼내올 수 있음
  return (
    <div>
      {
        books.map(book => <BookItem key={book.id} {...book} />)
      }
    </div>
  )
}

Page.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};