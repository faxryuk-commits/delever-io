import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  variant?: 'default' | 'feature' | 'stat' | 'integration'
  hover?: boolean
}

/**
 * Единый компонент карточки по стилю Delever
 * Цвета: #002A47 (primary), #E8FBFF (light), #CBE1DA (accent), #EEEADF (beige)
 */
export function Card({ children, className, variant = 'default', hover = true }: CardProps) {
  const baseStyles = 'rounded-xl bg-white transition-all duration-200'
  
  const variantStyles = {
    default: 'p-6 border border-brand-lightTeal/30 shadow-sm',
    feature: 'p-8 border border-brand-lightTeal/30 shadow-sm',
    stat: 'p-6 text-center',
    integration: 'p-4 border border-brand-lightTeal/30',
  }

  const hoverStyles = hover 
    ? 'hover:shadow-md hover:border-brand-darkBlue/20' 
    : ''

  return (
    <div className={cn(baseStyles, variantStyles[variant], hoverStyles, className)}>
      {children}
    </div>
  )
}

interface CardIconProps {
  children: ReactNode
  className?: string
  color?: 'primary' | 'blue' | 'green' | 'orange' | 'purple'
}

export function CardIcon({ children, className, color = 'primary' }: CardIconProps) {
  const colorStyles = {
    primary: 'bg-brand-lightBlue text-brand-darkBlue',
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-emerald-50 text-emerald-600',
    orange: 'bg-orange-50 text-orange-600',
    purple: 'bg-purple-50 text-purple-600',
  }

  return (
    <div className={cn(
      'w-12 h-12 rounded-xl flex items-center justify-center',
      colorStyles[color],
      className
    )}>
      {children}
    </div>
  )
}

interface CardTitleProps {
  children: ReactNode
  className?: string
  as?: 'h2' | 'h3' | 'h4'
}

export function CardTitle({ children, className, as: Component = 'h3' }: CardTitleProps) {
  return (
    <Component className={cn(
      'font-semibold text-brand-darkBlue tracking-tight',
      Component === 'h2' && 'text-2xl',
      Component === 'h3' && 'text-lg',
      Component === 'h4' && 'text-base',
      className
    )}>
      {children}
    </Component>
  )
}

interface CardDescriptionProps {
  children: ReactNode
  className?: string
}

export function CardDescription({ children, className }: CardDescriptionProps) {
  return (
    <p className={cn('text-brand-darkBlue/70 text-sm leading-relaxed', className)}>
      {children}
    </p>
  )
}

interface StatCardProps {
  value: string
  label: string
  className?: string
}

export function StatCard({ value, label, className }: StatCardProps) {
  return (
    <Card variant="stat" hover={false} className={cn('bg-brand-lightBlue/30', className)}>
      <div className="text-3xl md:text-4xl font-bold text-brand-darkBlue tracking-tight mb-1">
        {value}
      </div>
      <div className="text-sm text-brand-darkBlue/60 font-medium">
        {label}
      </div>
    </Card>
  )
}

interface FeatureCardProps {
  icon: ReactNode
  title: string
  description: string
  className?: string
}

export function FeatureCard({ icon, title, description, className }: FeatureCardProps) {
  return (
    <Card variant="feature" className={cn('flex flex-col h-full', className)}>
      <CardIcon className="mb-4">{icon}</CardIcon>
      <CardTitle className="mb-2">{title}</CardTitle>
      <CardDescription className="flex-grow">{description}</CardDescription>
    </Card>
  )
}

