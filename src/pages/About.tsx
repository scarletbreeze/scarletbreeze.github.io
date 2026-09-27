import PageHeader from '@/components/common/PageHeader'
import './About.css'

export default function About() {
  return (
    <>
      <PageHeader eyebrow="About" title="Hero Lab은 무엇인가" />
      <div className="prose">
        <p>
          Hero Lab은 <strong>증권업과 투자 생태계는 어떻게 작동하는가?</strong>라는 질문을 탐구하는 개인 연구소다.
          단순 블로그가 아니라 개발 블로그, 연구노트, 데이터 시각화, 인터랙티브 실험, 게임을 한곳에 모은 통합 사이트다.
        </p>
        <h2>원칙</h2>
        <ul>
          <li><strong>Static First</strong> — 서버 없이 정적 데이터와 프론트엔드로 먼저 만든다.</li>
          <li><strong>Data First</strong> — 콘텐츠는 UI와 분리해 JSON·Markdown으로 관리한다.</li>
          <li><strong>AI Later</strong> — 데이터와 UX를 먼저, AI는 요약·분석 레이어로 나중에.</li>
          <li><strong>Public Data Only</strong> — 공개 정보만 사용한다.</li>
          <li><strong>Demo First</strong> — 모든 것은 5분 안에 설명하고 시연할 수 있어야 한다.</li>
        </ul>
        <h2>기간</h2>
        <p>2026년 9월 ~ 11월. 이후에도 계속 확장하는 개인 Research OS를 목표로 한다.</p>
      </div>
    </>
  )
}
