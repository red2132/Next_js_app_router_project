"use server";
//간결한 동작을 api대신 쓰고 서버에서 작동하기에 보안상 이점이 있음
export async function createReviewAction(formData: FormData) {
  const bookId = formData.get("bookId")?.toString();
  const content = formData.get("content")?.toString();
  const author = formData.get("author")?.toString();

  console.log(bookId, content, author)

  if(!bookId|| !content || !author) {
    return;
  }

  // post api 호출
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review`, {
        method: "POST",
        body: JSON.stringify({ bookId ,content, author })
      }
    )
    console.log(response.status);
  } catch (error) {
    console.error(error);
    return;
  }
}