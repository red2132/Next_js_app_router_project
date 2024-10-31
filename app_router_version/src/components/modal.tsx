"use client";

import { ReactNode, useEffect, useRef } from 'react';
import style from './modal.module.css';
import { createPortal } from 'react-dom';
import { useRouter } from 'next/navigation';

export default function Modal({ children } : { children : ReactNode }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const router = useRouter();

  useEffect(() => {
    if(!dialogRef.current?.open) {
      // 화면에 렌더링될 시 강제로 모달 오픈
      dialogRef.current?.showModal();
      // 상단 고정
      dialogRef.current?.scrollTo({
        top: 0,
      });
    }
  }, []);
  
  return createPortal(
  <div>
    <dialog 
      onClose={() => router.back()}
      // 모달의 배경을 클릭할 경우 뒤로가기
      onClick={(e) => {
        // 현재 nodename에 대응하는 타입이 없어 any로 단언
        if((e.target as any).nodeName === "DIALOG") {
          router.back();
        }
      }}
      ref={dialogRef}
      className={style.modal}
    >
    {children}
  </dialog>
  </div>,
  document.getElementById("modal-root") as HTMLElement
);
}