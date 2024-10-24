// next/navigation은 앱 라우터용이므로 호환성 문제가 있을 수 있음
import { useRouter } from "next/router"

export default function Page() {
  const router = useRouter();
  const { queryString } = router.query; // query는 useRouter 객체 안에서 꺼내올 수 있음
  return <h1>Search { queryString }</h1>
}