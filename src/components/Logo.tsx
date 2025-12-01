import { cn } from '@/lib/utils'

interface LogoProps {
  variant?: 'horizontal' | 'compact' | 'original' | 'white'
  className?: string
  height?: number
  withHover?: boolean
  withGlow?: boolean
}

export function Logo({ variant, className, height = 40, withHover = false, withGlow = false }: LogoProps) {
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
    <div 
      className={cn(
        'relative inline-flex items-center',
        withHover && 'group cursor-pointer',
        className
      )}
    >
      {/* Glow effect behind logo */}
      {withGlow && (
        <div 
          className="absolute inset-0 bg-gradient-to-r from-brand-gradientStart/30 to-brand-gradientEnd/30 blur-xl rounded-full scale-150 opacity-60 group-hover:opacity-80 transition-opacity duration-500"
          aria-hidden="true"
        />
      )}
      
      <img
        src={getLogoPath()}
        alt="Delever"
        className={cn(
          'h-auto relative z-10',
          withHover && 'transition-all duration-300 group-hover:scale-105 group-hover:drop-shadow-[0_4px_12px_rgba(0,42,71,0.15)]'
        )}
        style={{ height: `${height}px` }}
      />
    </div>
  )
}

