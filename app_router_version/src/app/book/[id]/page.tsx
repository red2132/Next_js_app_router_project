import { BookData, ReviewData } from "@/types";
import style from "./page.module.css";
import { notFound } from "next/navigation";
import ReviewItem from "@/components/review-item";
import ReviewEditor from "@/components/review-editor";
import Image from "next/image";
import { Metadata } from "next";

//export const dynamicParams = false; -> 명시되지 않은 페이지는 not found로 이동

export async function generateStaticParams() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`
  );
  if(!response.ok) {
    throw new Error(response.statusText);
  }

  const books: BookData[] = await response.json();

  return books.map((book) => ({
    id: book.id.toString(),
  }))
}

async function BookDetail({ bookId }:{ bookId: string}) {
  const response = await fetch(`${ process.env.NEXT_PUBLIC_API_SERVER_URL }/book/${ bookId }`);
  if(!response.ok) {
    if(response.status === 404) {
      notFound();
    }
    return (
      <div>오류가 발생했습니다</div>
    );
  }
  const book: BookData = await response.json();
  const {
    title,
    subTitle,
    description,
    author,
    publisher,
    coverImgUrl,
  } = book;
  return (
    <section>
      <div
        className={style.cover_img_container}
        style={{ backgroundImage: `url('${coverImgUrl}')` }}
      >
        <Image src={coverImgUrl} width={240} height={300} alt={`도서 ${title}의 표지 이미지`}/>
      </div>
      <div className={style.title}>{title}</div>
      <div className={style.subTitle}>{subTitle}</div>
      <div className={style.author}>
        {author} | {publisher}
      </div>
      <div className={style.description}>{description}</div>
    </section>
  );
}

async function ReviewList({ bookId }: {bookId: string}) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review/book/${bookId}`,
    { next: { tags: [`review-${bookId}`] } }
  );
  if(!response.ok) {
    throw new Error(`${response.statusText}: 리뷰를 불러올 수 없었습니다`);
  }
  const reviews: ReviewData[] = await response.json();
  return <section>
    {
      reviews.map((review) => <ReviewItem key={`review-item-${review.id}`} {...review}/>)
    }
  </section>;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id?: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const response = await fetch(`${ process.env.NEXT_PUBLIC_API_SERVER_URL }/book/${ id }`);
  
  if(!response.ok) {
    throw new Error(response.statusText);
  }
  const book: BookData = await response.json();
  return {
    title: `Book project: "${book.title}"의 상세 정보`,
    description: `"${book.title}"의 상세 정보입니다`,
    openGraph: {
      title: `Book project: "${book.title}"의 상세 정보`,
      description: `"${book.title}"의 상세 정보입니다`,
      images: [book.coverImgUrl],
    }
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div className={style.container}>
      <BookDetail bookId={id} />
      <ReviewEditor bookId={id} />
      <ReviewList bookId={id} />
    </div>
  )
}
