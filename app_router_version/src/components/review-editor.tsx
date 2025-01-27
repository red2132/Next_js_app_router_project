'use client';

import { createReviewAction } from "@/actions/create-review.action";
import  style  from "./review-editor.module.css";
import { useActionState, useEffect } from "react";

export default function ReviewEditor({ bookId }:{ bookId: string }) {

  const [state, formAction, isPending] = useActionState(
    createReviewAction, null);

  useEffect(() => {
    if(state && !state.status) {
      alert(state.error);
    }
  })
  return (
    <section>
      <form 
        className={style.form_container}
        action={formAction}
      >
        <input name="bookId" value={bookId} hidden readOnly/>
        <textarea required name="content" placeholder="리뷰 내용" disabled={isPending}/>
        <div className={style.submit_container}>
          <input required name="author" type="text" placeholder="작성자" disabled={isPending}/>
          <button disabled={isPending} type="submit" >
            {isPending ? "저장 중..." : "작성하기"}
          </button>
        </div>
      </form>
    </section>
  );
};