# 02. Design System

## 방향
**Research Lab / Product Lab.** 장난감 같은 개인 프로젝트도, 금융회사 홈페이지도 아니다.
키워드: clean · modern · data-driven · minimal · interactive · professional · experimental

## 토큰 (`src/styles/tokens.css`)
- 색: `--bg`, `--surface`, `--border`, `--text`, `--text-muted`, `--accent`, `--accent-soft`
- 라이트/다크는 `prefers-color-scheme`으로 자동 전환. 컴포넌트는 토큰만 사용.
- 간격: `--space-1`(4px) ~ `--space-8`(64px)
- 글꼴: 시스템 산세리프 + `--font-mono` (숫자·코드)
- 반경: `--radius-sm` 6px, `--radius` 12px

## 컴포넌트 원칙
- 카드 1종(`ProjectCard`)으로 시작. 변형이 3개 넘기 전까지 새 카드 만들지 않는다.
- 상태 표시는 `StatusBadge` (planned / in-progress / live).
- 페이지 상단은 항상 `PageHeader` (eyebrow · title · description).
- 모바일 우선. 브레이크포인트 1개(`720px`)로 시작.
