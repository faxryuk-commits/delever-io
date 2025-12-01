import React from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    const variants = {
      primary: 'bg-gradient-dark text-white hover:opacity-90 font-semibold shadow-soft hover:shadow-medium',
      secondary: 'bg-white text-brand-darkBlue hover:bg-brand-lightBlue/50 font-semibold border border-brand-darkBlue/20 shadow-soft',
      outline: 'border border-brand-darkBlue/30 bg-transparent text-brand-darkBlue hover:bg-brand-lightBlue/30 hover:border-brand-darkBlue/50 font-semibold',
      ghost: 'bg-transparent text-brand-darkBlue hover:bg-brand-lightBlue/30 font-semibold',
    }

    const sizes = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
    }

    return (
      <button
        ref={ref}
        className={cn(
          'rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
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

