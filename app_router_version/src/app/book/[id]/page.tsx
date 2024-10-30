import { BookData, ReviewData } from "@/types";
import style from "./page.module.css";
import { notFound } from "next/navigation";
import ReviewItem from "@/components/review-item";
import ReviewEditor from "@/components/review-editor";

//export const dynamicParams = false; -> 명시되지 않은 페이지는 not found로 이동

export function generateStaticParams() {
  return [{ id: "1" }, { id: "2" }, { id: "3" }];
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
        <img src={coverImgUrl} />
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
