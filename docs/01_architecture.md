# 01. Architecture

## 스택
- **Vite 8 + React 19 + TypeScript 6** — 정적 SPA
- **react-router-dom 7** — 클라이언트 라우팅
- **marked** — 저장소 내부 Markdown 렌더링 (archive)
- **CSS + 디자인 토큰** — 프레임워크 없음
- **GitHub Pages** — GitHub Actions로 `main` push 시 자동 배포

## 라우트
```
/                          Home
/projects                  프로젝트 목록
/projects/:slug            프로젝트 상세 (registry에서 slug로 컴포넌트 조회)
   hero-lab | voc-studio | broker-atlas | time-machine | broker-tycoon
/research  /notes  /blog   콘텐츠 섹션 (초기 Placeholder)
/archive                   옛 블로그(2017–2019) 연도별 목록
/archive/:slug             옛 글 본문 (Markdown lazy load)
/about
*                          NotFound
```

## 디렉터리 책임
| 경로 | 책임 |
|---|---|
| `src/App.tsx` | 모든 라우트 정의. 유일한 라우트 진입점 |
| `src/pages/` | 라우트 1개 = 파일 1개. 데이터 조회 + 레이아웃 조합만 |
| `src/projects/<slug>/` | 프로젝트 고유 UI·로직. 다른 프로젝트 import 금지 |
| `src/projects/registry.ts` | slug → 프로젝트 컴포넌트 매핑. 새 프로젝트는 여기에만 등록 |
| `src/components/layout/` | Header, Footer, Layout(Outlet) |
| `src/components/cards/` | ProjectCard 등 카드류 |
| `src/components/common/` | PageHeader, Tag, StatusBadge 등 원자 컴포넌트 |
| `src/components/charts/` `interactive/` | (예약) 차트·인터랙션 공통 |
| `src/types/` | 공용 타입. `data/*.json`의 스키마와 1:1 |
| `src/styles/tokens.css` | 색·간격·글꼴 토큰. 컴포넌트 CSS는 토큰만 참조 |
| `data/` | JSON/CSV. `@data/*` alias로 import |
| `content/archive/<year>/` | 이관된 옛 글. `import.meta.glob` raw + `marked`로 렌더링 |
| `content/posts|notes|research/` | 새 글 (아직 비어 있음). archive와 같은 방식으로 렌더링 예정 |

## 데이터 흐름
```
data/projects.json ──(import)──▶ src/pages/*  ──(props)──▶ src/components/*
                                      │
                                      └──▶ src/projects/registry.ts ──▶ src/projects/<slug>/
```
UI는 데이터를 **읽기만** 한다. 데이터 형태가 바뀌면 `src/types/`를 먼저 고친다.

## 배포
- 배포 대상은 `scarletbreeze.github.io` 루트 → `base: '/'` (필요 시 `VITE_BASE`로 변경).
- `BrowserRouter basename={import.meta.env.BASE_URL}` 로 라우터와 일치시킨다.
- GitHub Pages는 SPA 폴백이 없으므로 `public/404.html` → `index.html` 리다이렉트 트릭 사용 (decisions.md 참조).

## 아직 없는 것 (의도적으로)
서버 · DB · 인증 · AI API · 상태관리 라이브러리 · CSS 프레임워크 · 테스트 프레임워크(첫 로직이 생기면 Vitest 추가 검토)
