import { motion } from 'framer-motion'
import { Rocket, TrendingUp, Users, ArrowRight } from 'lucide-react'

export function AnnouncementBar() {
  const items = [
    { icon: Rocket, text: 'Своя доставка. Свои клиенты. Свои деньги.' },
    { icon: TrendingUp, text: '+45% рост выручки' },
    { icon: Users, text: '1000+ бизнесов доверяют нам' },
  ]

  // Дублируем для бесконечной анимации
  const allItems = [...items, ...items, ...items, ...items]

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] bg-gradient-to-r from-brand-darkBlue via-brand-blue to-brand-darkBlue text-white py-2 overflow-hidden">
      <motion.div
        className="flex items-center gap-8 whitespace-nowrap"
        animate={{
          x: [0, -50 * items.length * 4],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 30,
            ease: "linear",
          },
        }}
      >
        {allItems.map((item, idx) => {
          const Icon = item.icon
          return (
            <div key={idx} className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-sm font-medium">
                <Icon className="h-4 w-4 text-brand-yellow" />
                <span>{item.text}</span>
              </div>
              <ArrowRight className="h-3 w-3 text-white/40" />
            </div>
          )
        })}
      </motion.div>
    </div>
  )
}

