#  [ZOOFLIX] 주식 구독 플랫폼
![div.section_home-hero__1_](/uploads/e3ae7cc0243d12bb0ff9c7c807eb0d2e/div.section_home-hero__1_.png)


## 주식 구독 플랫폼, ZOOFLIX 입니다.


## 💡 주요 기능
![기능](/uploads/de7bc9a9b014564c94516d5cb36132ce/기능.png)

## 주식 정기 구독
![주식구독](/uploads/751663a4299865bc17e6916373b47539/주식구독.gif)
- 매월 정해둔 날짜에 정해둔 수량만큼 주식이 자동 매매 됩니다.
- 한국투자증권 API를 사용하여 실제 주식 구매가 가능합니다.


## 사용자 구독
![유저구독](/uploads/ee42120437313d6ea4bbf31cf6bea5be/유저구독.gif)

## 포트폴리오
![주비티아이](/uploads/034b71bbfa8e6f6ace0a560bd807ed83/주비티아이.PNG)
![주비티아이](/uploads/e2190a7b709219ef743a67d329226f6c/주비티아이.gif)
- 투자성향 테스트를 통해 맞춤형 포트폴리오가 제공됩니다.
- 테스트 결과에 따라 UI가 맞춤 3D캐릭터로 커스텀됩니다. 

## 해외뉴스 라디오
![라디오](/uploads/aac5b8d57d1de77dce6a2b9813f39617/라디오.gif)
- 투자 유형 테스트에 따른 3D 캐릭터가 해외 뉴스를 번역, 요약해서 들려줍니다.
- 파파고 Open API, 클로바 보이스 Open API를 사용했습니다.

## ✨프로젝트 소개
삼성 청년 SW 아카데미 10기 2학기 특화 프로젝트 팀 B203

| 프로젝트 기간 | 2024.02.19 ~ 2024.04.05 (총 7주) |
| --- | --- |

작업 노션 : https://www.notion.so/Zooflix-749a582357964297a00d2c22ef653832

## ✨기획 배경
구독 경제 사회라고 들어보셨나요? 넷플릭스, 유튜브, 밀리의 서재 등 오늘날 다양한 산업 분야에서 구독이라는 개념의 상품들이 나오고 있습니다. 저희는 이러한 구독이라는 개념을 주식과 연관시켜 보는 것은 어떨까 라는 생각에서 주플릭스를 기획하게 되었습니다.
주식 정보에 대한 구독으로 주식을 처음 접해보는 분들께 도움을 드릴 뿐만 아니라,
직접 주식을 선정하여 매달 사야하는 번거로움을 줄여주는 자동 적립식 투자를 기획하였습니다.

<br>
<br>

# 📖목차 
- [README](#readme)
	- [📝 설계 문서](##-설계-문서)
	    - 요구사항 명세서
	    - ERD
        - API 명세서
		- 와이어 프레임
	- [🚧 시스템 아키텍쳐](##-시스템-아키텍쳐)
	- [🛠 기술 스택](##-기술-스택)
	- [📂 파일 구조](##-파일-구조)
    - [🎥 시연 영상](##-시연-영상)
	- [💾 결과물](##-결과물)
    - [❤ 역할](##-역할)

<br>
<br>


## 🛠 기술 스택


### Front

- Visual Studio Code : x64-1.85.1
- Node.js : v20.10.0
- React : v18.2.0
- react-router-dom : v6.21.3
- recoil : v0.7.7
- axios : ^1.6.5

- APIs
  - KAKAO LINK API
  - KAKAO LOGIN API
- Library
	- html2canvas v1.4.1
	- @mui 
	- js-file-download v0.4.12
	- jszip : v3.10.1
	- @stomp/stompjs : v7.0.0
	- dajjs. v.1.11.10
	- moment : ^2.30.1


### Back

- Intellij : 2023.3.2
- Spring-boot : 3.2
- Java : jdk 17.0.9 2023-10-17 LTS

### DB

- Amazon S3
- MySQL : 8.0.34

### CI/CD

- Docker
- Jenkins
- NGINX

### 협업 툴

- GitLab
- Notion
- JIRA
- MatterMost
- Webex
- Gerrit

<br>
<br>




## 👨‍👩‍👧‍👦 팀원 소개
이수민(팀장) - 풀스택

김진우 - 풀스택, 인프라

김혜진 - 풀스택

박소현 - 풀스택

양성주 - 풀스택

조민준 - 풀스택
