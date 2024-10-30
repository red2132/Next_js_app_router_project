import { ReactNode, Suspense } from "react";
import Searchbar from "../../components/searchbar";

export default function Layout({
  children,
}: {
  children: ReactNode;
}) {
  //searchbar 안의 useparam은 build시에 값이 없음 -> suspence로 감싸서 사전 렌더링에서제외
  return (
    <div>
      <Suspense fallback={<div>로딩 중...</div>}>
        <Searchbar />
      </Suspense>
      { children }
    </div>
  );
}
