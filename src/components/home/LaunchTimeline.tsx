import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { 
  FileText, 
  Palette, 
  Smartphone, 
  Link2, 
  Rocket,
  CheckCircle2,
  ArrowRight,
  Sparkles
} from 'lucide-react'
import { Button } from '../ui/Button'
import { ContactForm } from '../ContactForm'

const timelineSteps = [
  {
    day: '1',
    title: 'Заявка',
    description: 'Консультация и анализ вашего бизнеса',
    icon: FileText,
    color: 'from-blue-500 to-blue-600',
    details: ['Обсуждение целей', 'Выбор тарифа', 'Подписание договора'],
  },
  {
    day: '2-3',
    title: 'Настройка',
    description: 'Брендирование под ваш стиль',
    icon: Palette,
    color: 'from-purple-500 to-purple-600',
    details: ['Ваш логотип и цвета', 'Загрузка меню/каталога', 'Настройка зон доставки'],
  },
  {
    day: '4-5',
    title: 'Каналы продаж',
    description: 'Приложение, сайт и Telegram-бот',
    icon: Smartphone,
    color: 'from-emerald-500 to-emerald-600',
    details: ['iOS и Android приложение', 'Веб-сайт с заказами', 'Telegram-бот'],
  },
  {
    day: '6',
    title: 'Интеграция',
    description: 'Подключение к вашей кассе',
    icon: Link2,
    color: 'from-orange-500 to-orange-600',
    details: ['Синхронизация с POS', 'Настройка оплаты', 'Тестирование'],
  },
  {
    day: '7',
    title: 'Запуск!',
    description: 'Первые заказы уже сегодня',
    icon: Rocket,
    color: 'from-rose-500 to-rose-600',
    details: ['Публикация в сторах', 'Обучение команды', 'Старт продаж'],
  },
]

function TimelineStep({ 
  step, 
  index, 
  isActive, 
  isCompleted,
  onClick 
}: { 
  step: typeof timelineSteps[0]
  index: number
  isActive: boolean
  isCompleted: boolean
  onClick: () => void
}) {
  const Icon = step.icon

  return (
    <motion.div
      className="relative flex flex-col items-center cursor-pointer group"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.15, duration: 0.5 }}
      onClick={onClick}
    >
      {/* Connection Line */}
      {index < timelineSteps.length - 1 && (
        <div className="hidden md:block absolute top-8 left-[calc(50%+2rem)] w-[calc(100%-1rem)] h-1">
          <motion.div 
            className={`h-full rounded-full ${isCompleted ? 'bg-gradient-to-r from-emerald-400 to-emerald-500' : 'bg-gray-200'}`}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: isCompleted ? 1 : 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            style={{ transformOrigin: 'left' }}
          />
          <div className={`absolute inset-0 rounded-full ${isCompleted ? 'opacity-0' : 'bg-gray-200'}`} />
        </div>
      )}

      {/* Day Badge */}
      <motion.div
        className={`relative z-10 w-16 h-16 rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-lg transition-all duration-300 ${
          isActive ? 'scale-110 ring-4 ring-offset-2 ring-brand-darkBlue/20' : ''
        } ${isCompleted ? 'bg-emerald-500' : ''}`}
        style={{ 
          background: isCompleted 
            ? undefined 
            : `linear-gradient(135deg, var(--tw-gradient-stops))`,
        }}
        whileHover={{ scale: 1.05 }}
      >
        <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${step.color} ${isCompleted ? 'opacity-0' : 'opacity-100'}`} />
        <span className="relative z-10">
          {isCompleted ? <CheckCircle2 className="w-7 h-7" /> : <Icon className="w-7 h-7" />}
        </span>
      </motion.div>

      {/* Day Label */}
      <motion.div 
        className={`mt-3 text-sm font-bold ${isActive ? 'text-brand-darkBlue' : 'text-brand-darkBlue/50'}`}
        animate={{ scale: isActive ? 1.1 : 1 }}
      >
        День {step.day}
      </motion.div>

      {/* Title */}
      <motion.div 
        className={`mt-1 text-base font-semibold text-center ${isActive ? 'text-brand-darkBlue' : 'text-brand-darkBlue/70'}`}
      >
        {step.title}
      </motion.div>

      {/* Description - Mobile only */}
      <div className="md:hidden mt-2 text-xs text-brand-darkBlue/60 text-center max-w-[120px]">
        {step.description}
      </div>
    </motion.div>
  )
}

export function LaunchTimeline() {
  const [activeStep, setActiveStep] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [contactFormOpen, setContactFormOpen] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  // Auto-play animation
  useEffect(() => {
    if (!isInView) return
    
    const startAnimation = () => {
      setIsAnimating(true)
      setActiveStep(0)
    }

    // Start after a short delay when in view
    const timeout = setTimeout(startAnimation, 500)
    return () => clearTimeout(timeout)
  }, [isInView])

  useEffect(() => {
    if (!isAnimating) return

    const interval = setInterval(() => {
      setActiveStep(prev => {
        if (prev >= timelineSteps.length - 1) {
          setIsAnimating(false)
          return prev
        }
        return prev + 1
      })
    }, 1500)

    return () => clearInterval(interval)
  }, [isAnimating])

  const currentStep = timelineSteps[activeStep]

  return (
    <>
      <section ref={ref} className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-brand-lightBlue/30 to-white overflow-hidden">
        <div className="container mx-auto max-w-6xl">
          {/* Header */}
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <motion.div 
              className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium mb-6"
              initial={{ scale: 0.9 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ delay: 0.2 }}
            >
              <Sparkles className="w-4 h-4" />
              Быстрый старт
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bold text-brand-darkBlue mb-4 tracking-tight">
              Запуск за{' '}
              <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
                7 дней
              </span>
            </h2>
            <p className="text-xl text-brand-darkBlue/70 max-w-2xl mx-auto font-light">
              От заявки до первых заказов — всего неделя. Мы берём на себя всю техническую работу.
            </p>
          </motion.div>

          {/* Timeline */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-4 mb-12">
            {timelineSteps.map((step, index) => (
              <TimelineStep
                key={index}
                step={step}
                index={index}
                isActive={activeStep === index}
                isCompleted={activeStep > index}
                onClick={() => {
                  setIsAnimating(false)
                  setActiveStep(index)
                }}
              />
            ))}
          </div>

          {/* Active Step Details */}
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white rounded-3xl p-8 md:p-10 shadow-lg border border-brand-lightTeal/20 max-w-3xl mx-auto"
          >
            <div className="flex flex-col md:flex-row items-center gap-6">
              {/* Icon */}
              <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${currentStep.color} flex items-center justify-center text-white shadow-lg flex-shrink-0`}>
                <currentStep.icon className="w-10 h-10" />
              </div>

              {/* Content */}
              <div className="flex-1 text-center md:text-left">
                <div className="text-sm font-bold text-brand-darkBlue/50 mb-1">
                  День {currentStep.day}
                </div>
                <h3 className="text-2xl font-bold text-brand-darkBlue mb-2">
                  {currentStep.title}
                </h3>
                <p className="text-brand-darkBlue/70 mb-4">
                  {currentStep.description}
                </p>
                
                {/* Details */}
                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                  {currentStep.details.map((detail, idx) => (
                    <span 
                      key={idx}
                      className="inline-flex items-center gap-1.5 bg-brand-lightBlue/50 text-brand-darkBlue text-sm px-3 py-1.5 rounded-full"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                      {detail}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 1 }}
          >
            <Button 
              size="lg" 
              onClick={() => setContactFormOpen(true)}
              className="group text-lg px-8"
            >
              Запустить свой бизнес
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <p className="text-sm text-brand-darkBlue/50 mt-4">
              Бесплатная консультация • Без обязательств
            </p>
          </motion.div>
        </div>
      </section>

      <ContactForm open={contactFormOpen} onOpenChange={setContactFormOpen} />
    </>
  )
}

