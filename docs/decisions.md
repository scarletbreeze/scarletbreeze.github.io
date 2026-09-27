# Decisions

기록 형식: Date / Decision / Why / Alternative / Why rejected

---

## 2026-09-28 — Vite + React + TypeScript SPA
- **Decision**: Vite 8 + React 19 + TS로 단일 정적 SPA.
- **Why**: Static First. 빌드 산출물이 정적 파일이라 GitHub Pages에 바로 올라간다. 5개 프로젝트가 인터랙션 위주라 React가 적합.
- **Alternative**: Next.js / Astro.
- **Why rejected**: Next.js는 서버 전제가 강해 Server Later 원칙과 충돌. Astro는 MD 콘텐츠엔 좋지만 인터랙티브 앱 5개를 담기엔 island 경계가 번거로움. 콘텐츠 렌더링이 필요해지면 그때 MD 파이프라인만 추가.

## 2026-09-28 — 추가 의존성은 react-router-dom 하나만
- **Decision**: 라우터 외 라이브러리 없음. CSS 프레임워크·상태관리·UI 킷 없음.
- **Why**: 불필요한 dependency 금지. 골격 단계에서 필요한 건 라우팅뿐.
- **Alternative**: Tailwind, shadcn/ui, zustand.
- **Why rejected**: 지금 문제를 풀지 않는다. 차트는 실제 첫 차트를 그릴 때 Recharts vs D3 결정.

## 2026-09-28 — 배포 대상은 scarletbreeze.github.io 루트 (base '/')
- **Decision**: 기존 Jekyll 블로그 저장소 `scarletbreeze/scarletbreeze.github.io`를 이 프로젝트로 교체한다. `base: '/'`, `BrowserRouter basename=BASE_URL`, `public/404.html` → `index.html` SPA 폴백(segmentCount=0).
- **Why**: 사용자 요청. 루트 도메인이 공유 링크·발표에 깔끔하고, 기존 블로그(2017–2019, 419편, 마지막 커밋 2020-04)는 새 사이트의 아카이브 섹션으로 흡수한다.
- **Alternative**: 별도 `hero_lab` 저장소에 프로젝트 페이지(`/hero_lab/`)로 배포하고 기존 블로그는 유지.
- **Why rejected**: 사이트가 둘로 갈라지고 "하나의 Research OS" 목표와 어긋남. 필요 시 `VITE_BASE=/hero_lab/`로 빌드하면 프로젝트 페이지로도 배포 가능하게 남겨둠.
- **Alternative 2**: HashRouter. **Why rejected**: URL이 지저분하고 공유·SEO에 불리.

## 2026-09-28 — 프로젝트 메타는 data/projects.json, 라우트 매핑은 registry.ts
- **Decision**: 카드·상세·네비에 쓰는 프로젝트 정보는 JSON에, slug→컴포넌트 매핑은 `src/projects/registry.ts`에.
- **Why**: Data First. 문구·상태·태그 수정에 코드 변경이 필요 없어야 한다. 컴포넌트 참조만은 JSON에 담을 수 없으므로 registry로 분리.
- **Alternative**: 각 프로젝트 폴더에 메타를 두고 glob import.
- **Why rejected**: 5개 고정이라 glob 마법이 과함. 필요해지면 그때.

## 2026-09-28 — Node는 Homebrew가 아닌 nvm으로 설치
- **Decision**: 개발 머신(macOS 14.5)에서 Node는 nvm으로 관리.
- **Why**: macOS 14.5는 Homebrew 지원 범위 밖이라 `brew install node`가 소스 빌드로 넘어감(30분+).
- **Alternative**: brew, 공식 .pkg.
- **Why rejected**: brew는 위 이유. .pkg는 버전 전환이 불편.

## 2026-09-28 — 옛 블로그 419편은 전부 `/archive`로 이관 (옵션 A)
- **Decision**: Jekyll `_posts` 전체를 `content/archive/<year>/<slug>.md`로 옮기고, 목록 메타는 `data/archive/index.json`, 로컬 이미지는 `public/legacy/`에 둔다. 옛 URL(`/articles/…`)은 유지하지 않는다(사용자 확인). 이관 스크립트: `scripts/migrate_legacy_posts.py`.
- **Why**: Markdown이라 이관 비용이 낮고, "2017년부터의 기록 위에 세운 연구소"라는 서사가 생긴다. Data First — 글은 `content/`, UI는 `src/`.
- **Alternative**: 시리즈 선별 이관(B) / 미이관(C).
- **Why rejected**: 선별 기준을 정하는 비용이 이관 비용보다 크다. 나중에 숨기고 싶은 글은 index.json에서 빼면 된다.

## 2026-09-28 — Markdown 렌더링은 `marked` (클라이언트), 본문은 글별 lazy chunk
- **Decision**: 두 번째 의존성으로 `marked` 추가. 본문은 `import.meta.glob('…/*.md', { query: '?raw' })`로 글마다 별도 청크로 분리해 열 때만 로드. 목록은 `index.json`만 사용.
- **Why**: 419편을 한 번들에 넣으면 초기 로드가 무거워진다. `marked`는 의존성 0개, 소형, GFM 지원. 저장소 내부 Markdown만 렌더링하므로 sanitizer는 붙이지 않는다(외부 입력 렌더링 시 재검토).
- **Alternative**: `react-markdown`(+remark 생태계), 빌드 타임 HTML 사전 렌더링.
- **Why rejected**: react-markdown은 의존성 트리가 크다. 사전 렌더링은 스크립트가 하나 더 늘고, 지금 규모에선 클라이언트 파싱으로 충분. 코드 하이라이트·검색이 필요해지면 그때 재검토.
