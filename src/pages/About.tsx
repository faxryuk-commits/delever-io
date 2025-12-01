import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { MapPin, Users, Rocket, Award, Globe, Target } from 'lucide-react'

const stats = [
  { value: '1000+', label: 'Бизнесов' },
  { value: '5', label: 'Стран' },
  { value: '13M+', label: 'Заказов' },
  { value: '40+', label: 'Интеграций' },
]

const values = [
  {
    icon: Rocket,
    title: 'Скорость',
    description: 'Запуск за неделю, внедрение без простоев',
    color: 'from-blue-500 to-blue-600',
  },
  {
    icon: Award,
    title: 'Качество',
    description: '99.9% uptime, надёжная инфраструктура',
    color: 'from-purple-500 to-purple-600',
  },
  {
    icon: Users,
    title: 'Поддержка',
    description: '24/7 техподдержка на русском языке',
    color: 'from-emerald-500 to-emerald-600',
  },
  {
    icon: Target,
    title: 'Результат',
    description: 'Рост выручки, снижение издержек',
    color: 'from-orange-500 to-orange-600',
  },
]

const countries = [
  { name: 'Узбекистан', flag: '🇺🇿', status: 'main' },
  { name: 'Казахстан', flag: '🇰🇿', status: 'active' },
  { name: 'Кыргызстан', flag: '🇰🇬', status: 'active' },
  { name: 'Азербайджан', flag: '🇦🇿', status: 'active' },
  { name: 'Грузия', flag: '🇬🇪', status: 'active' },
]

export function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  }

  return (
    <div ref={ref} className="min-h-screen pt-28 pb-16 lg:pt-36 lg:pb-24 px-4 sm:px-6 lg:px-8">
      {/* Hero */}
      <section className="container mx-auto max-w-4xl mb-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <motion.span 
            className="inline-flex items-center gap-2 bg-brand-lightBlue text-brand-darkBlue text-sm font-medium px-4 py-1.5 rounded-full mb-4"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Globe className="w-4 h-4" />
            О компании
          </motion.span>
          <h1 className="text-4xl lg:text-5xl font-bold text-brand-darkBlue mb-4 tracking-tight">
            Delever — операционная система для доставки
          </h1>
          <p className="text-lg text-brand-darkBlue/70 max-w-2xl mx-auto">
            Помогаем бизнесам запустить собственную доставку и управлять всеми каналами продаж из единой платформы
          </p>
        </motion.div>
      </section>

      {/* Stats */}
      <section className="container mx-auto max-w-4xl mb-16">
        <motion.div 
          className="bg-brand-darkBlue rounded-2xl p-8 overflow-hidden relative"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.3 }}
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 relative z-10">
            {stats.map((stat, idx) => (
              <motion.div 
                key={idx}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 + idx * 0.1 }}
              >
                <motion.div 
                  className="text-4xl font-bold text-white mb-1"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: idx * 0.2 }}
                >
                  {stat.value}
                </motion.div>
                <div className="text-sm text-white/60">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Values */}
      <section className="container mx-auto max-w-4xl mb-16">
        <motion.h2 
          className="text-2xl font-bold text-brand-darkBlue mb-8 text-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
        >
          Наши ценности
        </motion.h2>
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {values.map((value, idx) => {
            const Icon = value.icon
            return (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl p-6 border border-brand-lightTeal/30 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <motion.div 
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${value.color} flex items-center justify-center text-white flex-shrink-0 shadow-lg`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <Icon className="h-6 w-6" />
                  </motion.div>
                  <div>
                    <h3 className="font-semibold text-brand-darkBlue mb-1">{value.title}</h3>
                    <p className="text-sm text-brand-darkBlue/60">{value.description}</p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </section>

      {/* Geography */}
      <section className="container mx-auto max-w-4xl mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="bg-brand-lightBlue/30 rounded-2xl p-8"
        >
          <div className="flex items-center gap-3 mb-6 justify-center">
            <MapPin className="h-6 w-6 text-brand-darkBlue" />
            <h3 className="text-xl font-bold text-brand-darkBlue">География</h3>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {countries.map((country, idx) => (
              <motion.div 
                key={idx}
                className={`flex items-center gap-2 px-4 py-2 rounded-full ${
                  country.status === 'main' 
                    ? 'bg-brand-darkBlue text-white' 
                    : 'bg-white border border-brand-lightTeal/30 text-brand-darkBlue'
                }`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.7 + idx * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <span className="text-lg">{country.flag}</span>
                <span className="text-sm font-medium">{country.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Contact */}
      <section className="container mx-auto max-w-3xl">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
        >
          <h2 className="text-2xl font-bold text-brand-darkBlue mb-3">
            Офис в Ташкенте
          </h2>
          <p className="text-brand-darkBlue/70 mb-4">
            Проспект Амира Темура 129Б, БЦ Анор Плаза, 2 этаж
          </p>
          <motion.a 
            href="https://maps.app.goo.gl/1iobehkkfP83hAMj6"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-brand-darkBlue font-medium hover:underline"
            whileHover={{ scale: 1.02 }}
          >
            <MapPin className="h-4 w-4" />
            Открыть на карте
          </motion.a>
        </motion.div>
      </section>
    </div>
  )
}
