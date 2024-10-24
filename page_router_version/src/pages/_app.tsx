import GlobalLayout from "@/components/global-layout";
import "@/styles/globals.css";
import { NextPage } from "next";
import type { AppProps } from "next/app";
import { ReactNode } from "react";

// 인터섹션 타입을 이용해 기존 NextPage에 getLayout 메서드를 추가 -> getLayout이 있는 메서드라고 확실시함
type NextPageWithLayout = NextPage & {
  // getLayout이 없을 수도 있으니 ?로 optional 설정
  getLayout?: (page: ReactNode) => ReactNode;
}
export default function App({ Component, pageProps }: AppProps & {
  Component: NextPageWithLayout
}) {
  const getLayout = Component.getLayout ?? ((page: ReactNode) => page);
  return (
    <>
    <GlobalLayout>
      { getLayout(<Component {...pageProps} />) }
    </GlobalLayout>
    </>
  );
}
