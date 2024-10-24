import { useRouter } from "next/router"

// Catch all segment: [...id] : book 뒤에 아이디가 연달아 들어올 수 있다는 뜻 -> 여러개면 배열로 들어옴
// Optional catch All segment: [[id]] 따로 index.tsx 파일을 만들지 않고 해당 파일을 기본 파일로 하고 싶으면 대괄호로 한번 더 감싸줌
export default function Page() {
  const { id } = useRouter().query;
  return <h1>Book { id }</h1>
}