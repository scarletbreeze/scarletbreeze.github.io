# 03. Data Strategy

## 원칙
- **Public Data Only.** 출처를 데이터 파일 안에 `source` 필드로 남긴다.
- **Data First.** 화면을 만들기 전에 JSON 스키마를 먼저 정한다 (`src/types/`와 1:1).
- **Mock → Real.** 모든 프로젝트는 `data/mock/`으로 먼저 동작하고, 이후 실제 데이터로 교체한다.

## 현재 데이터
| 파일 | 용도 | 상태 |
|---|---|---|
| `data/projects.json` | 5개 프로젝트 메타 (카드·상세·네비) | ✅ |
| `data/archive/index.json` | 옛 블로그 419편 목록 메타 (`scripts/migrate_legacy_posts.py` 생성) | ✅ |
| `data/brokers/` | 증권사 수익구조 (Broker Atlas, Tycoon) | 예정 |
| `data/markets/` | 가격 시계열 (Time Machine) | 예정 |
| `data/voc/` | 고객 문의 샘플 (VOC Studio) | 예정 (Mock 먼저) |
| `data/products/` | 영웅문 화면·기능 목록 (Hero Lab) | 예정 |

## 후보 공개 출처 (조사 필요)
- 증권사 사업보고서 / IR (DART)
- 금융투자협회 통계
- 한국거래소 시장 데이터
- Yahoo Finance / Stooq 등 가격 시계열
