// client쪽 오류든 server쪽 오류든 대응할 수 있도록 use client 이용
"use client";

import { useRouter } from "next/navigation";
import { startTransition, useEffect } from "react";

export default function Error({ error, reset }: {
  error: Error;  
  reset: () => void;
}) {
  const router = useRouter();
  useEffect(() => {
    console.error(error.message);
  }, [error])
  return (
    <div>
      <h3>오류가 발생했습니다.</h3>
      <button 
        onClick={() => {
          // 모든 작업을 일괄적으로 처리(react.18)
          startTransition(() => {
            router.refresh(); // 현재 페이지에 필요한 서버 컴포넌트를 다시 불러옴
            reset(); // 에러상태 초기화, 컴포넌트 재렌더링(브라우저측만, 서버엔 영향x), 비동기함수
          })
        }}>다시 시도</button>
    </div>
  )
}