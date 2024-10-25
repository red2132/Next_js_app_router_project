import style from "./[id].module.css";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import fetchOneBook from "@/lib/fetch-one-book";

// Catch all segment: [...id] : book 뒤에 아이디가 연달아 들어올 수 있다는 뜻 -> 여러개면 배열로 들어옴
// Optional catch All segment: [[id]] 따로 index.tsx 파일을 만들지 않고 해당 파일을 기본 파일로 하고 싶으면 대괄호로 한번 더 감싸줌

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const id = context.params!.id;
  const book = await fetchOneBook(Number(id));
  return {
      props: {book},
    }
}

export default function Page({ book }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  if(!book) return "문재 발생! 다시 시도하세요!!";
  const {
    id,
    title,
    subTitle,
    description,
    author,
    publisher,
    coverImgUrl
  } = book;

  return (
    <div className={style.container}>
      <div 
        className={style.cover_img_container}
        style={{backgroundImage: `url('${coverImgUrl}')`}}
      >
        <img src={coverImgUrl} />
      </div>
      <div className={style.title}>{title}</div>
      <div className={style.subTitle}>{subTitle}</div>
      <div className={style.author}>
        {author} | {publisher}
      </div>
      <div className={style.description}>{description}</div>
    </div>
  )
}  