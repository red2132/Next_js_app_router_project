// url 파라미터 값이 Page의 props를 통해 전달됨
export default async function Page({ searchParams }: { searchParams: Promise<{q: string}>}  ) {
  const { q } = await searchParams;
  return (
    <div>search 페이지: { q }</div>
  )
}