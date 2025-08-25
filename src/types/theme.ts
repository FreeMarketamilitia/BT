export type ThemeMode = 'light' | 'dark' | 'system'

export type ThemeColors =
  | 'Zinc'
  | 'Red'
  | 'Rose'
  | 'Orange'
  | 'Green'
  | 'Blue'
  | 'Yellow'
  | 'Violet'

export type ThemeRadius = 0 | 0.3 | 0.5 | 0.7 | 1.0

export interface ThemeColorStateParams {
  themeColor: ThemeColors
  setThemeColor: (color: ThemeColors) => void
  themeRadius: ThemeRadius
  setThemeRadius: (radius: ThemeRadius) => void
}

export interface ThemeProviderProps {
  children: React.ReactNode
}

// Period Tracking Types
export type PeriodNumber = 1 | 2 | 3 | 4 | 5 | 6

export interface TeacherPeriod {
  periodNumber: PeriodNumber
  startTime: string // "8:00 AM"
  endTime: string   // "9:00 AM"
  className: string // "Math 101"
  roomNumber?: string
}

export interface PassData {
  id: number
  studentId: string
  studentName: string
  studentGrade: string
  destination: string
  issuedAt: string
  expectedReturn: string
  duration: string
  status: 'active' | 'overdue' | 'returned'
  location: string
  avatar: string
  issuedByScan: boolean
  period: PeriodNumber
  teacherId?: string
  reason?: string
}

export interface PeriodStats {
  period: PeriodNumber
  activePasses: number
  overduePasses: number
  avgDuration: number
  totalPassesToday: number
}

export interface DashboardFilters {
  period?: PeriodNumber | 'all'
  teacher?: string
  destination?: string
  status?: 'active' | 'overdue' | 'returned' | 'all'
}

// Color definitions for different themes
export const themeColorDefinitions = {
  Zinc: { light: 'bg-zinc-900', dark: 'bg-zinc-100' },
  Red: { light: 'bg-red-900', dark: 'bg-red-100' },
  Rose: { light: 'bg-rose-900', dark: 'bg-rose-100' },
  Orange: { light: 'bg-orange-900', dark: 'bg-orange-100' },
  Green: { light: 'bg-green-900', dark: 'bg-green-100' },
  Blue: { light: 'bg-blue-900', dark: 'bg-blue-100' },
  Yellow: { light: 'bg-yellow-900', dark: 'bg-yellow-100' },
  Violet: { light: 'bg-violet-900', dark: 'bg-violet-100' },
} as const

// Utility functions
export const getSavedThemeColor = (): ThemeColors => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('themeColor')
    return (saved as ThemeColors) || 'Zinc'
  }
  return 'Zinc'
}

export const getSavedThemeRadius = (): ThemeRadius => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('themeRadius')
    return saved ? Number(saved) as ThemeRadius : 0.5
  }
  return 0.5
}

export const setGlobalColorTheme = (
  theme: ThemeMode,
  color: ThemeColors,
  radius: ThemeRadius
) => {
  if (typeof window === 'undefined') return

  const root = document.documentElement
  root.style.setProperty('--radius', `${radius}rem`)

  // Apply color theme classes
  const colorClass = `theme-${color.toLowerCase()}`
  root.classList.add(colorClass)

  // Remove other color classes
  Object.keys(themeColorDefinitions).forEach(c => {
    if (c !== color) {
      root.classList.remove(`theme-${c.toLowerCase()}`)
    }
  })
}
