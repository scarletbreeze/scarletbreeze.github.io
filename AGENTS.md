# AGENTS.md — AI 개발 도구 공통 규칙

이 저장소에서 코드를 작성하는 모든 AI 도구(Claude Code, Codex 등)와 사람이 따르는 규칙이다.
대화 기록이 아니라 **이 저장소가 최종 기억장치**다. 결정은 `docs/decisions.md`에, 진행은 `docs/changelog.md`에 남긴다.

## 핵심 원칙

| 원칙 | 의미 |
|---|---|
| **Static First** | 서버·DB 없이 정적 데이터 + 프론트엔드로 먼저 만든다. |
| **Server Later** | 서버가 *반드시* 필요한 기능이 생겼을 때만 추가한다. 미리 설계하지 않는다. |
| **Data First** | 콘텐츠를 UI 코드에 박지 않는다. `data/`(JSON/CSV)와 `content/`(Markdown)에 분리한다. |
| **AI Later** | 데이터와 UX를 먼저. AI는 요약·분석·추천 레이어로 나중에 얹는다. |
| **Public Data Only** | 회사 내부·비공개 데이터는 절대 사용하지 않는다. |
| **Reusable Components** | 한 번 만든 UI는 `src/components/`에 두고 여러 프로젝트에서 재사용한다. |
| **Simple but Extensible** | 지금 필요한 만큼만 만들되, 확장이 쉬운 구조를 유지한다. |
| **Demo First** | 모든 기능은 3~5분 안에 설명·시연 가능해야 한다. |

## 코드 규칙

- **의존성 추가 금지(기본값).** 새 패키지가 필요하면 먼저 `docs/decisions.md`에 이유를 적는다. 현재 허용: `react`, `react-dom`, `react-router-dom`, `marked`. 차트가 필요해지면 `recharts` 또는 `d3` 중 하나.
- **추상화를 위한 추상화 금지.** 두 번 이상 반복될 때 컴포넌트/훅으로 뽑는다.
- **프로젝트별 코드는 `src/projects/<slug>/` 안에만** 둔다. 프로젝트 간 직접 import 금지 — 공통이 필요하면 `src/components/`로 올린다.
- **데이터는 `data/`에서 import.** 컴포넌트 안에 목록·문구를 하드코딩하지 않는다. (`@data/*` alias)
- **한 파일 200줄 이내**를 목표로 한다. 넘으면 분리를 검토한다.
- **TypeScript strict.** `any` 금지. 타입은 `src/types/`에 둔다.
- **스타일은 CSS(토큰 기반).** CSS-in-JS·UI 프레임워크 추가 금지. 디자인 토큰은 `src/styles/tokens.css`.
- **라우트는 `src/App.tsx` 한 곳에서만** 정의한다. 프로젝트 라우트는 `src/projects/registry.ts`를 통해 등록한다.
- 이름은 설명적으로. 약어 금지(`brk` ✗ → `broker` ✓).

## 작업 단위

한 번에 전체를 만들지 않는다. 작업은 아래 크기로 쪼갠다.

```
Task: Route 생성 → Task: 공통 카드 → Task: Mock Data schema → Task: 화면 → Task: 리팩터 → Task: 문서 갱신
```

각 Task가 끝나면:
1. `npm run build`와 `npm run lint`가 통과하는지 확인한다.
2. 구조를 바꿨거나 기술 선택을 했다면 `docs/decisions.md`에 기록한다.
3. `docs/changelog.md`에 한 줄 남긴다.

## 하지 말 것

- 서버, DB, 인증, AI API를 "나중을 위해" 미리 붙이는 것
- 5개 프로젝트를 동시에 진행하는 것 (한 번에 하나)
- 사용하지 않는 코드·컴포넌트·스타일을 남겨두는 것
- 문서 갱신 없이 구조를 바꾸는 것

## 도구 역할 분담

- **Claude Code**: 코드 작성·수정, 커밋, 문서 갱신. 이 저장소를 변경하는 유일한 에이전트.
- **Codex / ChatGPT**: 리서치, 읽기 전용 코드 리뷰, 세컨드 오피니언. 파일을 직접 수정하지 않는다.
- 이유: 두 에이전트가 동시에 `decisions.md`·`AGENTS.md`를 갱신하면 기록이 어긋난다.
