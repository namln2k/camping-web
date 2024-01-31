export interface Message {
  type?: 'error' | 'success' | 'info' | 'warning'
  title?: string
  content?: string
}

export interface GlobalMessage extends Message {
  id: string
  duration: number
}

export const DEFAULT_DURATION = 4000
export const DURATION_CHECK_INTERVAL = 100
