# 프로젝트명: Tagyou
- ~~**https://tagyou.site**~~
    - **23.08.25 기준 EC2 기간 만료로 인한 사이트 접속 불가**
- 온라인 화상 다대다 미팅 서비스

## 1. 프로젝트 개요

### 개발 기간

- 2023.07.14 ~ 2023.08.18

### 팀원 소개

| 팀원 | 역할 |
| --- | --- |
| 김성재 | 팀장, Infra(CI/CD), ERD |
| 조태규 | BE, TEST, DB |
| 김민정 | BE, TEST |
| 홍재연 | FE |
| 이연주 | FE |
| 박재민 | FE |

### 기획 배경

<aside>
💡 온라인 화상 **‘미팅’ 시스템** , 이를 이용하여 마음에 드는 사람을 1:1 방으로 이동

</aside>

![Untitled](https://github.com/ssjjaa-algo/tagyou-meeting/assets/57981401/a7836d91-c167-4266-85e4-ad687b71f6d9)

### 타겟층

![Untitled (1)](https://github.com/ssjjaa-algo/tagyou-meeting/assets/57981401/279bbe66-9555-4af9-91c2-d503b7608cfb)

## 2. 시스템 명세서

### 기능 명세서

![Untitled (2)](https://github.com/ssjjaa-algo/tagyou-meeting/assets/57981401/c73dc02d-3e91-4d81-be98-eb6ab8d09872)


### API 명세서

![Untitled (3)](https://github.com/ssjjaa-algo/tagyou-meeting/assets/57981401/20b87a82-7302-4b39-a073-1c33308110c9)

## 3. 기술 스택

### 요약

- WebRTC - **`openvidu`**
    - 화상 채팅 시스템을 지원하는 openvidu 서버 이용하여 미팅 기능 지원
    - EC2에 Docker 환경으로 서버 배포해서 이용하였음
- Redis **pub/sub**
    - pub/sub 구조를 이용하여 채팅 기능 구현
- Spring **WebSocket**
    - WebSocket을 통한 양방향 통신, 채팅 기능 구현
    - 친구 접속 여부, 친구 추가 기능 구현
- **S3**
    - **카카오 소셜 로그인**을 통해 불러온 프로필 이미지를 S3에 저장
- **CI / CD**
    - Gitlab & Jenkins를 이용한 CI, CD 과정 구축

### 백엔드

![Untitled (4)](https://github.com/ssjjaa-algo/tagyou-meeting/assets/57981401/3dd889c6-79ee-478d-93d7-e4f3957e31c6)

- SpringBoot 3.1.1
- Spring security 6.1.1
- JPA

### 프론트

![Untitled (5)](https://github.com/ssjjaa-algo/tagyou-meeting/assets/57981401/5ead8c64-bb4f-412e-b7d0-dfff33aaf74e)

- "react": "^18.2.0",
- "recoil": "^0.7.7",
- "storybook": "^7.0.26",
- "typescript": "^4.9.5",
- "@emotion/react": "^11.11.1"
- sourcetree 3.4.14

### 데이터베이스

![Untitled (6)](https://github.com/ssjjaa-algo/tagyou-meeting/assets/57981401/e7dc8f67-7f5f-4744-9ce1-65b6ecc9303c)

- MySQL 8.0.34
- redis 7.0.12

### 인프라, CICD

![Untitled (7)](https://github.com/ssjjaa-algo/tagyou-meeting/assets/57981401/5784e8f6-4135-452b-bd0d-61582f841352)

- EC2 (Ubuntu 20.04.6)
- S3
- jenkins (jenkins/jenkins:jdk17)
- nginx(1.18.0 Ubuntu)
- docker (24.0.5)
- Gitlab (ssafy gitlab )

### 협업 툴

- Jira
    - 조태규, 김성재 진행상황 관리 및 개인 이슈 작성
- Gitlab
    - 프론트, 백엔드 나누어서 MR 담당
- Notion
    - 서기 : 김민정

## 4. ERD

![Untitled (8)](https://github.com/ssjjaa-algo/tagyou-meeting/assets/57981401/a58d4739-e5d1-4e73-a440-016cfc9d100c)

## 5. 아키텍처

![Untitled (9)](https://github.com/ssjjaa-algo/tagyou-meeting/assets/57981401/b5b7435a-ae8e-40a8-bd15-692292779568)

- CI / CD 파이프라인 구축을 통한 자동 빌드, 배포 환경 구축
- CI 빌드시 application.yml에 있는 정보들은 모두 Jenkins에서 credential처리로 숨김

## 6. Git 전략

- Git-flow 채택
    - Master : 최종본
    - Develop : 1차 저장소
    - Feature : 개인 이름, 작업 후 프론트 & 백 별 확인하여 MR 실시
- Commit 컨벤션 → Jira 이슈 번호와 묶어서 실시
    
    ```bash
    Add : #[이슈번호][이름] 이슈내용 개발
    
    Fix : #[이슈번호][이름] 이슈내용 ~~~버그 수정.
    
    Style : #[이슈번호][이름] 이슈내용 CSS 수정 
    
    - Add : 개발
    - Fix : 버그 수정
    - Style: CSS 관련 수정
    ```
    

## 7. 프로젝트 회고

### 개발 기간 대비 서비스 규모 파악 실패

- 최초에 기획했던 다대다 미팅 서비스
    - 백엔드 / 부가적인 기능에 시간을 빼앗김
        - 친구 기능
        - 그룹 기능
        - 일대일 미팅방
        - 다대다 미팅방
    - 프론트엔드 / 중복된 페이지 생성
        - 마이페이지
        - 프로필 페이지
        - 미팅방 페이지
        - 게임방 페이지
- **MVP 모델을 구축 하지 못함**

### 새로운 기술에 대한 이해도 문제

- Java 17 + SpringBoot 3.1.1 버전 사용에 대한 이해도 부족
- 새로운 기술에 대한 이해도 부족
    - Spring Security
    - Redis
    - Stomp
    - Websocket
    - Openvidu

### 테스트 주도적 개발 부족

- 로컬 테스트 환경에서의 연동 부족
    - 백엔드와 프론트엔드 간의 소통 부족
    - DB 설계와 프론트 페이지 간의 간극이 존재
        - 친구의 소개글과 유저의 프로필이 존재하여 불필요한 조인 발생
        - 다대다 미팅에서 그룹 방장만이 입장 가능하여 추가적인 그룹 dto 수정 필요
- CI/CD 환경에서의 테스트 부족
    - 도메인 사이트 내에서 Websocket 연결 문제
