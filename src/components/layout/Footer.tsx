import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner muted">
        <span>© {new Date().getFullYear()} Hero Lab — 증권업과 투자 생태계는 어떻게 작동하는가?</span>
        <span className="mono">static · public data only</span>
      </div>
    </footer>
  )
}
