'use client'

import { useThemeContext } from '@/providers/colors-theme-provider'
import { useTheme } from 'next-themes'
import { themeColorDefinitions } from '@/types/theme'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export function ThemeColorToggler() {
  const { themeColor, setThemeColor } = useThemeContext()
  const { theme } = useTheme()

  const availableThemeColors = Object.entries(themeColorDefinitions)

  return (
    <Select onValueChange={setThemeColor} value={themeColor}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select Color" />
      </SelectTrigger>
      <SelectContent>
        {availableThemeColors.map(([name, colors]) => (
          <SelectItem key={name} value={name}>
            <div className="flex items-center gap-3">
              <div className={`w-5 h-5 rounded-full ${theme === 'light' ? colors.light : colors.dark}`} />
              <span>{name}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
