import "./globals.css";
import Link from "next/link";
import style from "./layout.module.css";
import { BookData } from "@/types";

async function Footer() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`,
    {cache: "force-cache"}
  );
  if(!response.ok) {
    return (
      <footer>제작 @red2132</footer>
    );
  }
  const books: BookData[] = await response.json();
  const booksCount = books.length;
  return (
    <footer>
      <div>제작 @red2132</div>
      <div>{booksCount}개의 도서가 등록되어 있습니다.</div>
    </footer>
  )
}
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className={style.container}>
          <header>
            <Link href={"/"}>📚 BOOK Project</Link>
          </header>
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
