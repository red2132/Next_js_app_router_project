"use client";

import { deleteReviewAction } from "@/actions/delete-review.action";
import { useActionState, useEffect, useRef } from "react";

export default function ReviewItemDeleteButton({ reviewId, bookId } : {
  reviewId: number,
  bookId: number
}) {
  // div 태그일 경우 useRef를 이용해 submit 이벤트 만들기
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, isPending] = useActionState(
    deleteReviewAction, null);


  //error 핸들링
  useEffect(() => {
    if(state && !state.status) {
      alert(state.error);
    }
  });

  return (
    <form ref={formRef} action={formAction}>
      <input name="reviewId" value={reviewId} hidden readOnly/>
      <input name="bookId" value={bookId} hidden readOnly/>
      {
        isPending ? 
        <div>삭제중...</div> :
        <div onClick={() => formRef.current?.requestSubmit()}>
          삭제하기
        </div>
      }
    </form>
  )
}