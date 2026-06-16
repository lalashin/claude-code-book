# CLAUDE.md

## 프로젝트

Claude Code 입문서 집필 프로젝트. 비개발자부터 심화 사용자까지 전 레벨을 커버하는 Claude Code 실용서.

## 하네스: 책 집필 자동화

**목표:** 커리큘럼 설계 → 챕터 집필 → 예제 생성 → 편집 검토의 전 과정을 에이전트 팀으로 자동화

**트리거:** 책 집필 관련 작업 요청 시 `book-director` 스킬을 사용하라. "챕터 써줘", "목차 만들어줘", "예제 만들어줘", "검토해줘", "수정해줘" 등 집필 관련 요청은 모두 이 스킬로 처리한다. 단순 질문("Claude Code가 뭐야?")은 직접 응답 가능.

**에이전트 팀:**
- `curriculum-designer` — 커리큘럼/목차 설계
- `content-writer` — 챕터 본문 집필
- `example-creator` — 예제 코드 및 실습 과제
- `visual-designer` — 시각화 요소 생성 (Mermaid, ASCII, 표, PlantUML)
- `editor-reviewer` — 품질 검토 및 편집

## 하네스: 책 뷰어 웹사이트

**목표:** book_draft.md를 마우스/터치로 페이지를 넘겨 읽는 웹사이트로 변환

**트리거:** 뷰어/웹사이트 관련 요청 시 `book-viewer` 스킬을 사용하라. "뷰어 만들어줘", "웹사이트로 보고 싶어", "페이지 넘기기", "수정해줘" 등은 이 스킬로 처리한다.

**에이전트 팀:**
- `book-ui-architect` — UI 구조·애니메이션 명세 설계
- `book-ui-builder` — HTML/CSS/JS 구현
- `book-ui-qa` — 동작 시나리오 검증

**변경 이력:**
| 날짜 | 변경 내용 | 대상 | 사유 |
|------|----------|------|------|
| 2026-06-15 | 초기 구성 | 전체 | Claude Code 입문서 집필 프로젝트 시작 |
| 2026-06-15 | visual-designer 에이전트 추가 | agents/visual-designer.md | 시각화 요소 보강 요청 |
| 2026-06-15 | visual-designer 스킬 추가 | skills/visual-designer/ | 시각화 요소 보강 요청 |
| 2026-06-15 | book-director Phase B-3 추가 | skills/book-director/ | 시각화 파이프라인 통합 |
| 2026-06-15 | editor-reviewer 시각화 검토 기준 추가 | skills/editor-reviewer/ | 시각화 품질 검증 |
| 2026-06-15 | book-viewer 하네스 추가 | agents/book-ui-*, skills/book-viewer/ | 페이지 넘김 웹사이트 제작 요청 |
