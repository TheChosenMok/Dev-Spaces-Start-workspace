import type { SimpleIcon } from 'simple-icons'

interface DependencyBrandIconProps {
  icon: SimpleIcon
  size?: number
}

export function DependencyBrandIcon({ icon, size = 20 }: DependencyBrandIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill={`#${icon.hex}`}
      aria-hidden
      style={{ flexShrink: 0 }}
    >
      <path d={icon.path} />
    </svg>
  )
}
