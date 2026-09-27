# Hero Lab

> 증권업과 투자 생태계는 어떻게 작동하는가?

개인 개발 블로그 · 연구노트 · 실험실을 하나로 합친 **Research OS**.
2026년 9월 ~ 11월, 5개의 인터랙티브 프로젝트를 하나의 정적 사이트에 담는다.

| 프로젝트 | 한 줄 요약 |
|---|---|
| Hero Lab | 사용자 유형별 영웅문 화면·기능 큐레이션 |
| VOC Studio | 고객 목소리 키워드·트렌드 분석 |
| Broker Atlas | 증권사는 어디서 돈을 버는가 — 수익구조 시각화 |
| Time Machine Investor | "2016년에 NVIDIA를 샀다면?" 과거 투자 시뮬레이션 |
| Broker Tycoon | 증권사 경영 시뮬레이션 게임 |

## 시작하기

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # dist/ 생성 (배포: scarletbreeze.github.io)
npm run lint
```

## 구조

```
docs/      프로젝트 헌장, 아키텍처, 결정 기록, 변경 이력
content/   Markdown 글 (posts, notes, research, learnings)
data/      JSON/CSV 데이터 — UI와 분리
src/
  projects/    프로젝트별 코드 (서로 import 금지)
  components/  공통 UI (layout, cards, charts, interactive, common)
  pages/       라우트 단위 페이지
  types/       공용 타입
  styles/      디자인 토큰 + 전역 스타일
```

개발 규칙은 [AGENTS.md](./AGENTS.md), 배경과 목표는 [docs/00_project_charter.md](./docs/00_project_charter.md).
