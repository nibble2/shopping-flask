&#127799; Flower-shopping
=======
~~~
꽃을 주문할 수 있는 웹사이트
Html + Css + JS + Jquery + Flask + mogodb 를 본격적으로 사용하여 쇼핑몰 웹페이지를 완성해보자
~~~

### &#127807; 진행 상황

#### 첫째주: html + css 를 이용하여 쇼핑몰 디자인해보기
- [x] 사용한 부트스트랩: <https://html5up.net/spectral>


#### 둘째주: jquery, API 사용
- [x] jquery 적용
- [x] 주문 하기 API
- [x] 주문 보기 API

#### 넷째주: 셋쨰주에 배운 모든 것을 합하여 직접 api를 만들고 db까지 사용해보기
- [x] html css 파일 분리
- [x] flask로 주문하기 API 작성
- [x] flask로 주문 불러오기 API 작성
***

#### 보완 작업
- [x] Frontend - Javascript 코드 분리하기
- [x] Frontend - 사용자 입력값 유효성 검사 프론트엔드부분에 추가하기 (e.g. 핸드폰 번호 칸은 정말로 핸드폰 번호만 입력할 수 있게)
- [ ] Frontend - 다음 주소 입력 js를 가져와 주소 받아오기
- [x] Backend - 유효한 입력값인지 아닌지 확인하고 아니라면 예외처리하기

### &#128550; 의문점

1. API를 호출하는 ajax에서 success를 좀 더 알아보고 싶다. response, request, note만들때는 articles, 이번에는 orders로 변경되었는데,
API를 만들때 설정해주는건가,,, 궁굼하다..
=> orders나 alticles는 db명을 말하는 것

***

### &#128206; 변경사항
~~~
1. 꽃 선택 불가
	: 현재 사용하는 API로 꽃을 선택할 수 없었다. item으로 api url을 가져오기때문에 불가
~~~

##### 참고 링크
~~~
색 표: <https://www.color-hex.com/color/8f6c7d>
~~~