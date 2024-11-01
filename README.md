# Next.js 기반 도서 프로젝트
## 목표
이 프로젝트는 도서 api를 기반으로 각각 page Router 버전, app Router 버전으로 제작하며, 그에 따른 Next의 차이와 기능을 이해해 본다.
#### 서버 사이드 렌더링 구현
#### page Router -> app Router 순서대로 모자랐던 부분 개선

## 개발환경
언어: Typescript
프레임워크: Next.js 15버전
백엔드: prisma(지원 받음)

## 배포
[page Router 버전](https://bookprojectpagerouterver.vercel.app/) <br>
[App Router 버전](https://app-router-version.vercel.app/)

## 작업 과정
page router에서 app router로 개선한 부분들 위주로 작성한다.

### 메인화면
<p align="center"><img src="https://github.com/user-attachments/assets/dd38ff9c-e86b-401e-b34c-9a157b5c03dc" width="50%" height="50%" /></p>
<br>
화면 UI는 달라진 부분이 없다.
대신, 개선하면서, AllBooks와 RecoBook로 컴포넌트를 나누었다. 그리고 기존 getStaticProps 대신 app router 버전에서는 기본적으로 정적이며, 빌드 시에 렌더링되기에 이 부분은 컴포넌트를 asyc await 함수로 만들어 fetch로 데이터 통신을 하고, 캐싱을 통해 더 빠른 속도로 화면을 렌더링할 수 있도록 바꾸었다.

### 도서 상세 화면
<p align="center">
  <img src="https://github.com/user-attachments/assets/df134602-1244-4bf1-8223-d1e5aa46fa1f" width="35%" height="35%">
  <img src="https://dummyimage.com/50x1/ffffff/ffffff" width="20%" alt="Spacer">
  <img src="https://github.com/user-attachments/assets/5407307d-a0a2-489b-9516-2a5bdce97c92" width="35%" height="35%">
</p>
<br>
여기서는 큰 변화가 있었다.
우선 기존 page Router 버전에서는 그저 router.push를 이용해 이동한 반면, app Router에서는 인터셉팅 라우트를 이용해 modal을 호출해 상세 페이지 화면을 띄어주는 식으로 바뀌었다. 그리고 바깥화면을 누르면 바로 이전 목록 화면을 보여주도록 했다. 물론 app Router도 링크로 이동시 기존 page router 버전처럼 화면이 아예 이동한다.

#### 어려웠던 점
우선 모달을 다루는 게 어려웠다. dialog를 이용해 모달을 구현했는데, 기본적으로 닫혀있어서, useEffect 훅과 useRef를 이용해 화면에 렌더링될 시 강제로 모달을 여는 방법으로 해결했다.
```jsx
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
```
### 도서 상세화면 리뷰란(app router만)
<p align="center"><img src="https://github.com/user-attachments/assets/f32abc1b-b03c-474e-a021-eb6f185a78e0" width="50%" height="50%" /></p>
이 부분은 app router에서만 구현한 부분으로 서버 액선을 통해 구현했다. 서버 액션으로 구현한 이유는 보한상 이점이 있기 때문이다. <br>
따로 createReviewAction, deleteReviewAction을 만들어, 입력 정보를 검증하고 api를 호출한다. <br>
createReviewAction의 경우, revalidateTag로 해당 태그(`review-${bookId}`)에 해당하는 부분에 변경된 부분이 있으면 재렌더링 하는 식으로 작업했다.

### 검색
<p align="center">
  <img src="https://github.com/user-attachments/assets/a7ebbc7f-566c-479b-9df1-7bc69db1af2e" width="35%" height="35%">
  <img src="https://dummyimage.com/50x1/ffffff/ffffff" width="20%" alt="Spacer">
  <img src="https://github.com/user-attachments/assets/16c27ef9-dd9d-4ca5-a52a-3702dcc14d42" width="35%" height="35%">
</p>
<br>
검색 페이지는 queryString을 받기에 동적 페이지가 될 수밖에 없고, 검색량에 따라 로딩시간이 오래 걸릴 수 있다. 따라서 app Router 버전에서는 react의 suspense 훅을 이용해 로딩중에 따로 제작한 스켈레톤 이미지가 보여지도록 수정했다.<br>
데이터를 불러오는 방식은 기본적으로 상세페이지와 같다.

### 기타 달라진 점
기존 img 태그에서 NEXT에 내장된 Image를 이용해 이미지를 최적화했다. 

## 작업하면서 느낀 점
이번 프로젝트를 통해 서버사이드 렌더링, SSG에 대한 장점을 알게 되었고, 캐싱을 통해 로딩 속도를 최적화하는 등, 어떻게 하면 더 잘 최적화할 수 있을지 고민하게 된 계기가 되었다.



