# 다음 업무: GitHub 배포

## 작업 순서

### 0. 사전 준비 (Claude가 대신 생성 — 세션 시작 시 요청)
- [ ] `.gitignore` 생성 (`_workspace/`, `.bkit/`, `.claude/` 등 제외)
- [ ] `README.md` 작성 (포트폴리오용 소개, 뷰어 링크, 스크린샷 안내)

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
- [ ] `book_viewer/index.html` 로컬 더블클릭 정상 동작 확인
- [ ] GitHub Pages 배포 후 온라인에서 두 페이지 뷰어 동작 확인
- [ ] 모바일 브라우저에서 터치 스와이프 확인

## 완료된 작업 이력

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

## 참고

- 배포 환경(http)에서는 `fetch('./book_draft.md')` 경로도 동작 가능
- 단, `book-data.js`(245KB) 인라인 방식이 기본이므로 별도 처리 불필요
- 원고 수정 시: `node build.mjs` → `book-data.js` 재생성 → git push
