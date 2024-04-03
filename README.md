#  [ZOOFLIX] 주식 구독 플랫폼
![div.section_home-hero__1_](/uploads/e3ae7cc0243d12bb0ff9c7c807eb0d2e/div.section_home-hero__1_.png)


## 주식 구독 플랫폼, ZOOFLIX 입니다.
<br>


# 📖목차 
- [README](#readme)
	- [✨ 프로젝트 소개](#-프로젝트-소개)
	- [✨ 기획 배경](#-기획-배경)
	- [💡 주요 기능](#-주요-기능)
		- 주식 정기 구독
		- 사용자 구독
		- 포트폴리오
		- 해외뉴스 라디오
	- [📝 설계 문서](#-설계-문서)
		- 와이어 프레임
	    - ERD
	    - 기능 명세서
        - API 명세서
	- [🚧 서비스 아키텍쳐](#-서비스-아키텍쳐)
	- [🛠 기술 스택](#-기술-스택)
	- [📂 파일 구조](#-파일-구조)
    - [🎥 시연 영상](#-시연-영상)
	- [💾 결과물](#-결과물)
    - [❤ 팀원 소개](#-팀원-소개)

<br>
<br>

## ✨프로젝트 소개
삼성 청년 SW 아카데미 10기 2학기 특화 프로젝트 팀 B203

| 프로젝트 기간 | 2024.02.19 ~ 2024.04.05 (총 7주) |
| --- | --- |

작업 노션 : https://www.notion.so/Zooflix-749a582357964297a00d2c22ef653832

<br>

## ✨기획 배경
구독 경제 사회라고 들어보셨나요? 넷플릭스, 유튜브, 밀리의 서재 등 오늘날 다양한 산업 분야에서 구독이라는 개념의 상품들이 나오고 있습니다. 저희는 이러한 구독이라는 개념을 주식과 연관시켜 보는 것은 어떨까 라는 생각에서 주플릭스를 기획하게 되었습니다.
주식 정보에 대한 구독으로 주식을 처음 접해보는 분들께 도움을 드릴 뿐만 아니라,
직접 주식을 선정하여 매달 사야하는 번거로움을 줄여주는 자동 적립식 투자를 기획하였습니다.

<br>

## 💡 주요 기능
![기능](/uploads/de7bc9a9b014564c94516d5cb36132ce/기능.png)

<br>

## 주식 정기 구독
![주식구독](/uploads/751663a4299865bc17e6916373b47539/주식구독.gif)
- 매월 정해둔 날짜에 정해둔 수량만큼 주식이 자동 매매 됩니다.
- 한국투자증권 API를 사용하여 실제 주식 구매가 가능합니다.

<br>

## 주식 예측 커뮤니티
![예측페이지](/uploads/1c98ec31bd28f4839d25d5479890583c/예측페이지.gif)
- 예측 리스트를 확인하고 특정 사용자 클릭시, 해당 종목의 한달 간의 주가와 사용자의 예측 히스토리를 비교할 수 있습니다.
- 예측 결과에 따라 주스트라다무스 랭킹을 제공합니다.
<br>

## 사용자 구독
![유저구독](/uploads/ee42120437313d6ea4bbf31cf6bea5be/유저구독.gif)
- 구독한 사용자의 구독, 예측 정보를 알려줍니다.


<br>

## 포트폴리오
![주비티아이](/uploads/034b71bbfa8e6f6ace0a560bd807ed83/주비티아이.PNG)
![주비티아이](/uploads/e2190a7b709219ef743a67d329226f6c/주비티아이.gif)
- 투자성향 테스트를 통해 맞춤형 포트폴리오가 제공됩니다.
- 테스트 결과에 따라 UI가 맞춤 3D캐릭터로 커스텀됩니다. 

<br>

## 해외뉴스 라디오
![라디오](/uploads/aac5b8d57d1de77dce6a2b9813f39617/라디오.gif)
- 투자 유형 테스트에 따른 3D 캐릭터가 해외 뉴스를 번역, 요약해서 들려줍니다.
- 파파고 Open API, 클로바 보이스 Open API를 사용했습니다.

<br>

## 📝 설계 문서

## 와이어 프레임
피그마 링크 : https://www.figma.com/file/dEX5XTOWUgf2YJlal4eTkE/Zooflix?type=design&node-id=0-1&mode=design&t=CZOzcR4NJneLxIWr-0

<br>

## ERD
![ERD](/uploads/e439c5880a9875780477e86287fc64d9/ERD.PNG)
erdcloud 링크 : https://www.erdcloud.com/d/aYNeA42SgzizSQ4sD

<br>

## 기능 명세서
![기능명세서1](/uploads/980a79619e136411d5e5c919737fa09b/기능명세서1.PNG)
![기능명세서2](/uploads/108e8060031ef56cc8a80bae48151b0d/기능명세서2.PNG)
![기능명세서3](/uploads/1e9399d10c39118d1ce226aa2cfefc87/기능명세서3.PNG)
<br>
노션 링크 : https://www.notion.so/1df7af87bf02416b985264e42c93e389

<br>

## API 명세서
노션 링크 : https://www.notion.so/API-149bda589c204683abee01b64ab28a36




<br>

## 🚧 서비스 아키텍쳐
![서비스_아키텍처3D](/uploads/a85a91d339e8d7fe80f19c3cfbbffdec/서비스_아키텍처3D.PNG)


<br>

## 🛠 기술 스택


### ☑Backend

- **Java** : Oracle Open JDK 17.0.9
- **Spring Boot** : 3.2.1
- **JPA** : hibernate-core-6.4.1
- **DB:** MySQL 8.0
- **IntelliJ** : 2023. 3

### ☑Frontend

- **Node.js** : 20.10.0
- **TypeScript** : 4.9.5
- **React** : 18.2.9
- **Recoil** : 0.7.7
- **Axios** : 1.6.7
- **Vscode** : 1.85.1

### ☑Server

- **AWS EC2**
    - 서버 사양

### ☑Service

- **NginX : 1.24.0**
- **nginx-proxy-manager** : 2.11.1
- **Docker** : 24.0.5
- **Jenkins** : lts-jdk17
- **Sonarqube** : lts-community

### ☑협업 툴

- GitLab
- Notion
- JIRA
- MatterMost
- Webex
- Gerrit

<br>
<br>

## 📂 파일 구조

### 리액트 + TypeScript
```
📦front
┣ 📂.vscode
┣ 📂conf
┣ 📂node_modules
┣ 📂public
┣ 📂src
┃ ┣ 📂apis
┃ ┣ 📂assets
┃ ┣ 📂components  
┃ ┃ ┣ 📂Alarm
┃ ┃ ┣ 📂Character
┃ ┃ ┣ 📂Common
┃ ┃ ┣ 📂Landing
┃ ┃ ┣ 📂Main
┃ ┃ ┣ 📂Mypage
┃ ┃ ┣ 📂Portfolio
┃ ┃ ┣ 📂Predict
┃ ┃ ┣ 📂SubscribeStock
┃ ┃ ┣ 📂User
┃ ┃ ┣ 📂UserPage
┃ ┃ ┗ 📂Zbti
┃ ┣ 📂fonts
┃ ┣ 📂pages
┃ ┣ 📂Store
┃ ┣ 📜App.tsx
┃ ┣ 📜index.tsx
┃ ┣ 📜react-app-env.d.ts
┃ ┣ 📜reportWebVitals.ts
┃ ┗ 📜setupTests.ts
┣ 📜.env
┣ 📜.gitignore
┣ 📜Dockerfile
┣ 📜package-lock.json
┣ 📜package.json
┣ 📜README.md
┣ 📜sonar-project.properties
┗ 📜tsconfig.json
```
<br>

### Python
```
📦python
┣ 📂src
┃ ┗ 📜main.py
┣ 📂venv
┣ 📜Dockerfile
┣ 📜package.json
┣ 📜package-lock.json
┗ 📜requiremenets.txt
```
<br>

### BackEnd
```
📦back
┣ 📂.gradle
┣ 📂.idea
┣ 📂build
┣ 📂gradle
┣ 📂src
┃ ┣ 📂main
┃ ┃ ┣ 📂java
┃ ┃ ┃ ┗ 📂com.zooflix.be_zooflix
┃ ┃ ┃   ┣ 📂domain
┃ ┃ ┃   ┃ ┣ 📂alarm
┃ ┃ ┃   ┃ ┣ 📂main
┃ ┃ ┃   ┃ ┣ 📂myPage
┃ ┃ ┃   ┃ ┣ 📂portfolio
┃ ┃ ┃   ┃ ┣ 📂predict
┃ ┃ ┃   ┃ ┣ 📂radio
┃ ┃ ┃   ┃ ┣ 📂report
┃ ┃ ┃   ┃ ┣ 📂stockSubscribe
┃ ┃ ┃   ┃ ┣ 📂user
┃ ┃ ┃   ┃ ┗ 📂userSubscribe
┃ ┃ ┃   ┣ 📂global
┃ ┃ ┃   ┣ 📂scheduled
┃ ┃ ┃   ┗ 📜BeZooflixApplication
┃ ┃ ┗ 📂resources
┃ ┗ 📂test
┣ 📜.gitignore
┣ 📜build.gradle
┣ 📜Dockerfile
┣ 📜gradlew
┣ 📜gradlew.bat
┣ 📜hs_err_pid23608.log
┣ 📜settings.gradle
┗ 📜sonar-project.properties
```
<br>

## ❤ 팀원 소개
![팀원](/uploads/59e70a144426b0377726dc50092a8d5d/팀원.PNG)
