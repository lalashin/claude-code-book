# 다음 업무: GitHub 배포

## 작업 순서

### 0. 사전 준비 (Claude가 대신 생성 — 세션 시작 시 요청)
- [x] `.gitignore` 생성 (`_workspace/`, `.bkit/`, `.claude/` 등 제외)
- [x] `README.md` 작성 (포트폴리오용 소개, 뷰어 링크, 스크린샷 안내)

### 1. GitHub 저장소 생성
- GitHub에서 새 저장소 생성 (예: `claude-code-book`)
- 공개(Public) 저장소로 설정 — 포트폴리오 목적

### 2. Git 초기화 및 첫 커밋
```bash
cd D:\harness\01_book
git init
git add .
git commit -m "Initial commit: Claude Code 실전 입문서 + 책 뷰어"
git remote add origin https://github.com/{사용자명}/claude-code-book.git
git push -u origin main
```

### 3. GitHub Pages 배포 (book_viewer)
- 저장소 Settings → Pages → Source: `main` 브랜치, `/book_viewer` 폴더
- 또는 `docs/` 폴더로 book_viewer 내용 복사 후 root로 배포
- 배포 URL: `https://{사용자명}.github.io/claude-code-book/`

### 4. 확인 사항
- [x] 로컬 서버(:8765) 렌더링 확인 — `file://` 더블클릭 방식은 미확인
- [ ] GitHub Pages 배포 후 온라인에서 두 페이지 뷰어 동작 확인
- [ ] 모바일 브라우저에서 터치 스와이프 확인

## 완료된 작업 이력

### 2026-08-29 — 뷰어 시각 요소 강화 + 챕터 4.4 에러 흐름 시각화

**[1차] Mermaid·코드 하이라이팅 도입** (커밋 `f4341d4`)
- mermaid@10 렌더러 추가 — 다크/라이트 테마 연동, 책 팔레트(`themeVariables`) 적용
- highlight.js@11.9 추가 (bash/js/json/yaml) + 책 테마에 맞춘 색상 오버라이드
- `preProcessMarkdown()` — 터미널 흐름·3박자 비교 ASCII를 HTML 카드로 치환
- `postProcessDiagrams()` — 페이지 DOM 삽입 후 `mermaid.run()` + `hljs.highlightElement()`
- 코드블록 한글 폰트 폴백 추가 (Malgun Gothic / Apple SD Gothic Neo)
- 원고: 챕터 2 단계 나누기, 챕터 4 만들기-확인-수정 루프 → HTML 카드 전환

**[2차] 챕터 4.4 "에러는 단서" 흐름 시각화** (뷰어 42페이지)

원인: ASCII 한 줄이 약 70자여서 `white-space:pre` 코드블록이 페이지 폭을 초과.
독자가 가로 스크롤을 해야만 마지막 `해결 ✅`이 보여, 이 절의 핵심 메시지가 화면에서 잘렸다.

수정:
- 4단계 파이프라인 HTML 카드로 교체 (①에러 발생 → ②메시지 복사 → ③붙여넣기 → ④진단·수정)
- `flex:1 1 0` + `min-width:88px` — 500px↑ 4열 1줄 / 380px↓ 2+2 접힘, 가로 스크롤 0
- `var(--rule)` `var(--ink-soft)` `var(--accent)` + hex 폴백 → 다크모드 자동 대응
- ④만 accent 테두리·배경으로 강조 (흐름의 종착점 각인)

시행착오: 최초 `flex:1 1 126px`로 작성 → 카드 4개가 페이지 폭을 넘겨 ④가 잘림.
`flex-basis`를 0으로 바꿔(기존 챕터 2·4 카드와 동일 방식) 해결.

검증 방법:
- Chrome 확장이 `file://`을 차단 → 임시 로컬 서버(node, :8765)로 띄워 확인
- 실측 `scrollWidth === clientWidth`(오버플로 없음), 컨테이너 폭 300/330/380/500px에서 행 수 확인
- 라이트·다크 양쪽 렌더링 확인 후 서버·탭·테마 원복

### 2026-06-16 — 책 뷰어 드래그 오류 수정 (PC + 모바일)

**[1차] PC 클릭 시 화면 흔들림 + 텍스트 복사 불가**

원인:
1. `pointerdown`이 책 전체에 걸려 단순 클릭에도 flip-leaf 나타났다 사라짐
2. `setPointerCapture`가 텍스트 선택 동작을 차단
3. `onUp`에서 `d.moved` 체크 없이 `revertDragLeaf()` 실행

수정:
- `onDown`에서 `.page__content` 감지 시 즉시 리턴 (본문 영역 드래그 제외)
- `setPointerCapture`를 `onMove` 드래그 확정 시점으로 이동
- `onUp`에서 `d.moved === false`이면 즉시 리턴
- `FLIP_MIN_PX = 50px` 추가 — 50px 미만 드래그는 넘김 미진입
- `cancelDrag`에서 불필요한 `renderSpread` 호출 제거

**[2차] 모바일 가장자리 오감지**

원인: 어디서든 8px 드래그만 해도 페이지 넘김 진입

수정 (C방안 — 존 제한 + 최소 거리):
- `MOBILE_EDGE_RATIO = 0.25` — 좌우 가장자리 25% 구간에서만 스와이프 감지
- `MOBILE_MIN_PX = 60` — 60px 이상 끌어야 넘김 시작
- 하단 힌트 텍스트: "좌우 가장자리 스와이프로 넘기기"로 변경

---

## 미결 사항

| 항목 | 내용 | 판단 필요 |
|------|------|----------|
| CDN 의존 | mermaid·highlight.js를 jsdelivr에서 로드 → 오프라인 `file://`에서는 다이어그램·하이라이팅 누락. README의 "완전 오프라인" 문구와 불일치 | `vendor/` 동봉 vs README 문구 조정 |
| chapters/ 드리프트 | 카드 전환이 `manuscript/book_draft.md`에만 적용됨. `chapters/chapter_02·04.md`에는 원본 ASCII 잔존 | 동기화 여부 |

---

## 참고

- 배포 환경(http)에서는 `fetch('./book_draft.md')` 경로도 동작 가능
- 단, `book-data.js`(245KB) 인라인 방식이 기본이므로 별도 처리 불필요
- 원고 수정 시: `node build.mjs` → `book-data.js` 재생성 → git push
