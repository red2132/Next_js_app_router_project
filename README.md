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
대신, 개선하면서, AllBooks와 RecoBook로 컴포넌트를 나누었다. 그리고 기존 getStaticProps 대신 app router 버전에서는 기본적으로 정적이며, 빌드 시에 렌더링되기에 이 부분은 컴포넌트를 asyc await 함수로 만들어 fetch로 데이터 통신을 하도록 만들었다.

### 도서 상세 화면
<div style="display: flex; justify-content: center; gap: 10px;">
  <img src="https://github.com/user-attachments/assets/df134602-1244-4bf1-8223-d1e5aa46fa1f" width="50%" height="50%">
  <img src="https://github.com/user-attachments/assets/5407307d-a0a2-489b-9516-2a5bdce97c92" width="50%" height="50%">
</div>


