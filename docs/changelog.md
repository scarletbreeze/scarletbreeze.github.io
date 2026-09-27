# Changelog

## 2026-09-28
- 개발 환경 구성: Homebrew, nvm + Node 24 LTS, gh, VS Code
- Vite + React + TS 프로젝트 초기화, react-router-dom 추가
- 사이트 골격: Layout/Header/Footer, 10개 라우트, Home/Projects/About/콘텐츠 섹션 Placeholder
- `data/projects.json` + `ProjectCard` + `StatusBadge` + `PageHeader`
- 5개 프로젝트 Placeholder (`src/projects/*`) 및 `registry.ts`
- 디자인 토큰(`tokens.css`, 라이트/다크), 반응형 1 브레이크포인트
- GitHub Pages 배포 워크플로 + SPA 404 폴백 (배포 대상: scarletbreeze.github.io 루트)
- 문서: AGENTS.md, charter, architecture, design system, data strategy, roadmap, decisions
- 옛 Jekyll 블로그 419편 이관 → `/archive`, `/archive/:slug` (연도 필터, lazy Markdown 로드), `marked` 추가
- `scripts/migrate_legacy_posts.py`, `data/archive/index.json`, `public/legacy/` 이미지
- **배포**: `scarletbreeze.github.io` 저장소를 교체. 옛 Jekyll은 `legacy-jekyll` 브랜치에 보존, 기본 브랜치 `master`→`main`, Pages 빌드 GitHub Actions로 전환. https://scarletbreeze.github.io 라이브.
