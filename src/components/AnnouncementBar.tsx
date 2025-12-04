import { motion } from 'framer-motion'

export function AnnouncementBar() {
  const items = [
    '🚀 Своя доставка. Свои клиенты. Свои деньги.',
    '📈 +45% рост выручки',
    '⚡ 1000+ бизнесов доверяют нам',
    '🎯 Запуск за 1 день',
  ]

  // Дублируем для бесшовной анимации
  const duplicatedItems = [...items, ...items, ...items]

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] bg-gradient-to-r from-brand-darkBlue via-brand-blue to-brand-darkBlue text-white overflow-hidden">
      <div className="relative flex">
        <motion.div
          className="flex whitespace-nowrap py-2"
          animate={{
            x: [0, -33.33 + '%'],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: 'loop',
              duration: 20,
              ease: 'linear',
            },
          }}
        >
          {duplicatedItems.map((item, idx) => (
            <span
              key={idx}
              className="inline-flex items-center px-6 text-sm font-medium"
            >
              {item}
              <span className="mx-6 text-white/30">•</span>
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

