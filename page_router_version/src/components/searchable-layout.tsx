import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react";
import style from "./searchable-layout.module.css";

export default function SearchableLayout (
  { children }: { children: ReactNode; }) {
  const [search, setSearch] = useState("");
  const router = useRouter()
  // query가 여러개 들어올 수 있으므로 string으로 타입 단언
  const query = router.query.queryString as string;

  useEffect(() => {
    setSearch(query || "");
  }, [query])

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  }
  const onSubmit = () => {
    if(!search || query === search) return;
    router.push(`/search?queryString=${search}`);
  }
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if(e.key === 'Enter') {
      onSubmit()
    }
  }
  return (
    <div>
      <div className={style.searchbar_container}>
        <input
          value={ search }
          onChange={ onChangeSearch }
          type="text"
          placeholder="검색어를 입력하세요"
          onKeyDown={onKeyDown}
        />
        <button onClick={onSubmit}>검색</button>
      </div>
      { children }
    </div>
  )
}