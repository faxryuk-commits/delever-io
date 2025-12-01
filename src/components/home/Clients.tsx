import { motion } from 'framer-motion'
import { useLocale } from '@/i18n/LocaleContext'

// Клиенты с логотипами (порядок по запросу)
const clients = [
  { name: 'Pizza Hut', logo: '/logos/pizza-hut-logo-png_seeklogo-257097.png' },
  { name: 'Hardees', logo: '/logos/hardees.jpg' },
  { name: 'Pinkberry', logo: '/logos/pinkberry.png' },
  { name: 'Dodo Pizza', logo: '/logos/dodo.png' },
  { name: 'ABR', logo: '/logos/abr.png' },
  { name: 'EVOS', logo: '/logos/evos.png' },
  { name: 'MAXWAY', logo: '/logos/maxway.png' },
]

export function Clients() {
  const { t } = useLocale()

  return (
    <section className="pt-4 pb-10 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-brand-lightBeige/20">
      <div className="container mx-auto max-w-5xl">
        {/* Title */}
        <motion.p 
          className="text-center text-sm text-brand-darkBlue/50 uppercase tracking-widest font-medium mb-8"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {t('clients.title')}
        </motion.p>

        {/* Logos Container */}
        <motion.div 
          className="flex flex-wrap justify-center items-center gap-x-8 gap-y-6 lg:gap-x-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {clients.map((client, idx) => (
            <motion.div
              key={idx}
              className="relative flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              whileHover={{ scale: 1.1 }}
            >
              <img
                src={client.logo}
                alt={client.name}
                className="h-8 lg:h-10 w-auto max-w-[100px] lg:max-w-[120px] object-contain grayscale hover:grayscale-0 opacity-50 hover:opacity-100 transition-all duration-300"
                style={{
                  filter: 'grayscale(100%)',
                }}
                onMouseEnter={(e) => {
                  const target = e.target as HTMLImageElement
                  target.style.filter = 'grayscale(0%)'
                }}
                onMouseLeave={(e) => {
                  const target = e.target as HTMLImageElement
                  target.style.filter = 'grayscale(100%)'
                }}
                onError={(e) => {
                  // Fallback на текст если логотип не найден
                  const target = e.target as HTMLImageElement
                  target.style.display = 'none'
                  const parent = target.parentElement
                  if (parent && !parent.querySelector('span')) {
                    const span = document.createElement('span')
                    span.className = 'text-lg font-bold text-brand-darkBlue/30 hover:text-brand-darkBlue/60 transition-colors'
                    span.textContent = client.name
                    parent.appendChild(span)
                  }
                }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
