'use client'

import { useThemeContext } from '@/providers/colors-theme-provider'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export function ThemeRadiusToggler() {
  const { themeRadius, setThemeRadius } = useThemeContext()

  return (
    <Select
      onValueChange={(value) => setThemeRadius(Number(value) as 0 | 0.3 | 0.5 | 0.7 | 1.0)}
      value={String(themeRadius)}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Border Radius" />
      </SelectTrigger>
      <SelectContent>
        {[0, 0.3, 0.5, 0.7, 1.0].map((value) => (
          <SelectItem key={value} value={String(value)}>
            Radius: {value}rem
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
