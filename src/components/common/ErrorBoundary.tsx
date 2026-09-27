import { Component, type ReactNode } from 'react'

interface Props {
  fallback: (error: Error) => ReactNode
  children: ReactNode
}

// 렌더 중 throw된 오류(예: lazy 로드 실패)를 잡아 부분 UI만 대체한다.
export default class ErrorBoundary extends Component<Props, { error: Error | null }> {
  state = { error: null as Error | null }

  static getDerivedStateFromError(error: Error) {
    return { error }
  }

  render() {
    return this.state.error ? this.props.fallback(this.state.error) : this.props.children
  }
}
