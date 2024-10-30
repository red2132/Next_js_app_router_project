"use server";

import { delay } from "@/util/delay";
import { revalidateTag } from "next/cache";

// 서버 액션: 간결한 동작을 api대신 쓰고 서버에서 작동하기에 보안상 이점이 있음
// useActionState: 첫번째 파라미터로 state를 받아야 함
export async function createReviewAction(_: any, formData: FormData) {
  const bookId = formData.get("bookId")?.toString();
  const content = formData.get("content")?.toString();
  const author = formData.get("author")?.toString();

  if(!bookId|| !content || !author) {
    return{
      status: false,
      error: '리뷰 내용과 작성자를 입력해 주세요'
    };
  }

  // post api 호출
  try {
    await delay(2000);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review`, {
        method: "POST",
        body: JSON.stringify({ bookId ,content, author })
      }
    );
    if(!response.ok) {
      throw new Error(response.statusText);
    }

    // 재검증을 통해 달라진 부분이 있으면 리로드(서버쪽에서만 호출 가능, 캐시, 풀라우트 캐시 제거, 새롭게 만든 페이지를 응답)
    // revalidatePath(`book/${bookId}`);
    // 태그를 기준으로 데이터 캐시 재검증
    revalidateTag(`review-${bookId}`);
    return {
      status: true,
      error: "",
    }
  } catch (error) {
    return {
      status: false,
      error: `리뷰 저장에 실패했습니다: ${error}`,
    };
  }
}