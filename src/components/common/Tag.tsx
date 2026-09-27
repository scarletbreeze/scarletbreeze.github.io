import './Tag.css'

export default function Tag({ children }: { children: string }) {
  return <span className="tag mono">#{children}</span>
}
