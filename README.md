# Wanted Front-end onBoarding # 2

## Mr.Camel : 고객들이 원하는 상품 목록을 위한 사용자의 상품 조회 이력 제작

### 과제 구현 목록
- [x] ClassComponent 사용
- [x] SessionStorage 또는 LocalStorage 사용해서 이력을 관리
- [x] 외부 API를 사용하지 않고, Client의 리소스만 사용
- [x] 편리하게 Storage를 사용할 수 있는 Utils 생성
- [x] '최근 조회이력 목록'에서 정렬/필터의 자연스러운 갱신 처리

### 설치 및 시작하는 법
```jsx
npm install && npm start
```

### 프로젝트 구조 설명
```html
📦src
 ┣ 📂components
 ┃ ┗ 📜ProductCard.jsx
 ┣ 📂pages
 ┃ ┣ 📜Product.jsx
 ┃ ┗ 📜RecentList.jsx
 ┣ 📂styles
 ┃ ┗ 📜GlobalStyle.js
 ┣ 📂utils
 ┃ ┣ 📜config.js
 ┃ ┣ 📜fetches.js
 ┃ ┗ 📜storage.js
 ┣ 📜App.js
 ┣ 📜Routes.js
 ┗ 📜index.js
```
### 기능구현 데모
<p align="center">
<img width="450" src=""/>
</p>

