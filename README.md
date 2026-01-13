# 🔮 Saju AI Advisor (사주 AI 챗봇) - PostgreSQL Edition

> **Kotlin + Spring Boot + Gemini API**를 활용하고 **Oracle DB**를 사용하는 맞춤형 운세 분석 서비스입니다.

---

## 📝 프로젝트 소개
사용자의 정보를 입력받아 Google Gemini AI가 사주를 분석하고, 그 결과를 PostgreSQL에 저장하는 프로젝트입니다. 오픈 소스 DB인 PostgreSQL을 활용하여 효율적인 데이터 관리를 구현했습니다.

## 🛠 기술 스택
- **Language**: Kotlin 2.x
- **Framework**: Spring Boot 3.x
- **Database**: PostgreSQL (v15+)
- **ORM**: Spring Data JPA
- **AI API**: Google Gemini 1.5 Flash
- **Frontend**: HTML5, CSS3, JavaScript (Vanilla JS)

---

## 💎 왜 코틀린(Kotlin)을 선택했는가?
Java 대신 Kotlin을 사용하여 다음과 같은 기술적 이점을 확보했습니다.

1. **간결성 (Conciseness)**
    - `Data Class`를 활용하여 Java 대비 DTO 및 Entity의 보일러플레이트 코드를 대폭 줄였습니다.
2. **Null 안정성 (Null Safety)**
    - 태어난 시간(`birthTime`) 등 선택적 입력값에 대해 언어 차원의 Null 제어를 적용하여 `NullPointerException`을 컴파일 단계에서 방지했습니다.
3. **가독성 높은 프롬프트 관리 (String Templates)**
    - 멀티라인 스트링(`"""`)과 변수 치환(`${}`) 기능을 사용하여 AI에게 전달하는 복잡한 사주 분석 프롬프트를 직관적으로 관리했습니다.
4. **유지보수 효율**
    - 불필요한 코드를 줄이고 비즈니스 로직(사주 분석 및 저장)에 집중할 수 있는 환경을 구축했습니다.

---

## ✨ 핵심 기능
1. **AI 사주 분석**: Gemini API 연동을 통한 실시간 신년 운세(이직, 재물 등) 분석 제공.
2. **AI ChatBot**: Gemini API 연동을 통한 실시간 ChatBot 제공.
3. **채팅 UI**: Gemini 스타일의 모던하고 직관적인 챗봇 인터페이스 구현.
4. **히스토리 관리**: 과거 분석 기록을 DB에서 조회하여 지속적인 상담 데이터 유지.