import style from "./[id].module.css";
import { GetServerSidePropsContext, InferGetStaticPropsType } from "next";
import fetchOneBook from "@/lib/fetch-one-book";
import { useRouter } from "next/router";

// Catch all segment: [...id] : book 뒤에 아이디가 연달아 들어올 수 있다는 뜻 -> 여러개면 배열로 들어옴
// Optional catch All segment: [[id]] 따로 index.tsx 파일을 만들지 않고 해당 파일을 기본 파일로 하고 싶으면 대괄호로 한번 더 감싸줌

// 동적 경로 범위 설정
export const getStaticPaths = () => {
  return {
    paths: [
      { params: { id: "1" } },
      { params: { id: "2" } },
      { params: { id: "3" } },
    ],
     // false: 범위에 없는 경로가 들어올 경우 404 처리
     // "blocking": 해당 페이지가 없으면 ssr 방식으로 동작해 페이지 생성
     // true: 해당 페이지가 없으면 ssr 방식으로 동작해 우선 페이지만 먼저 렌더링하고, 데이터는 나중에 보냄
    fallback: true,
  }
};

export const getStaticProps = async (context: GetServerSidePropsContext) => {
  const id = context.params!.id;
  const book = await fetchOneBook(Number(id));
  if(!book) {
    return {
      notFound: true,
    }
  }
  return {
      props: {book},
    }
}

export default function Page({ book }: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();

  if(router.isFallback) return "로딩 중입니다";
  if(!book) return "문재 발생! 다시 시도하세요!!";
  const {
    //id,
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