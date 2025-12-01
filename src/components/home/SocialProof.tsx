import { useRef, useEffect, useState } from 'react'

interface AnimatedCounterProps {
  value: number
  suffix?: string
  prefix?: string
  duration?: number
  format?: 'M' | 'K' | 'number'
}

function AnimatedCounter({ value, suffix = '', prefix = '', duration = 2000, format = 'number' }: AnimatedCounterProps) {
  const [count, setCount] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (hasAnimated) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setHasAnimated(true)
          const startTime = Date.now()
          const startValue = 0
          const endValue = value

          const animate = () => {
            const now = Date.now()
            const elapsed = now - startTime
            const progress = Math.min(elapsed / duration, 1)

            const currentValue = Math.floor(startValue + (endValue - startValue) * progress)
            setCount(currentValue)

            if (progress < 1) {
              requestAnimationFrame(animate)
            } else {
              setCount(endValue)
            }
          }

          animate()
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [hasAnimated, value, duration])

  const formatNumber = (num: number) => {
    if (format === 'M') {
      const millions = num / 1000000
      return millions >= 1 ? millions.toFixed(0) : '0'
    }
    if (format === 'K') {
      const thousands = num / 1000
      return thousands >= 1 ? thousands.toFixed(0) : '0'
    }
    return num.toLocaleString()
  }

  return (
    <div ref={ref} className="text-4xl md:text-5xl font-bold text-brand-darkBlue">
      {prefix}
      {formatNumber(count)}
      {format === 'M' ? 'M' : format === 'K' ? 'K' : ''}
      {suffix}
    </div>
  )
}

const stats: Array<{
  value: number
  suffix?: string
  prefix?: string
  label: string
  format?: 'M' | 'K' | 'number'
}> = [
  { value: 13000000, suffix: '+', label: 'Заказов обработано', format: 'M' },
  { value: 5, suffix: '', label: 'Стран', format: 'number' },
  { value: 1000, suffix: '+', label: 'Ресторанов и магазинов', format: 'K' },
  { value: 40, suffix: '+', label: 'Интеграций', format: 'number' },
  { value: 100000000, prefix: '$', suffix: '+', label: 'Продаж через платформу', format: 'M' },
]

export function SocialProof() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-brand-darkBlue mb-4 tracking-tight">
            Delever в цифрах
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {stats.map((stat, idx) => (
            <div key={idx} className="text-center">
              <AnimatedCounter value={stat.value} suffix={stat.suffix} prefix={stat.prefix || ''} format={stat.format || 'number'} />
              <p className="text-lg text-brand-darkBlue/65 mt-2 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

