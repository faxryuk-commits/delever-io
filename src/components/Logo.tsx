import { cn } from '@/lib/utils'

interface LogoProps {
  variant?: 'horizontal' | 'compact' | 'original' | 'white'
  className?: string
  height?: number
}

export function Logo({ variant, className, height = 40 }: LogoProps) {
  // Определяем какой логотип использовать
  const getLogoPath = () => {
    if (variant) {
      switch (variant) {
        case 'horizontal':
          return '/logo/logo-horizontal.svg'
        case 'compact':
          return '/logo/logo-compact.svg'
        case 'original':
          return '/logo/logo-original.svg'
        case 'white':
          return '/logo/logo-white.svg'
        default:
          return '/logo/logo-horizontal.svg'
      }
    }
    return '/logo/logo-horizontal.svg'
  }

  return (
    <img
      src={getLogoPath()}
      alt="Delever"
      className={cn('h-auto', className)}
      style={{ height: `${height}px` }}
    />
  )
}

