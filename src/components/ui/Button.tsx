import React from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}

/**
 * Единый компонент кнопки по стилю Delever
 * Primary: тёмно-синий (#002A47)
 * Secondary: белый с границей
 * Outline: прозрачный с границей
 * Ghost: без фона
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    const variants = {
      primary: 'bg-brand-darkBlue text-white hover:bg-brand-darkBlue/90 font-medium',
      secondary: 'bg-white text-brand-darkBlue hover:bg-brand-lightBlue/50 font-medium border border-brand-darkBlue/15',
      outline: 'border border-brand-darkBlue/25 bg-transparent text-brand-darkBlue hover:bg-brand-lightBlue/30 hover:border-brand-darkBlue/40 font-medium',
      ghost: 'bg-transparent text-brand-darkBlue hover:bg-brand-lightBlue/30 font-medium',
    }

    const sizes = {
      sm: 'h-8 px-3 text-sm rounded-lg',
      md: 'h-10 px-4 text-sm rounded-lg',
      lg: 'h-12 px-6 text-base rounded-xl',
    }

    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-darkBlue/20 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'
