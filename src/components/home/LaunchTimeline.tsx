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
import { useLocale } from '@/i18n/LocaleContext'

function TimelineStep({ 
  step, 
  index, 
  isActive, 
  isCompleted,
  onClick,
  t
}: { 
  step: {
    day: string
    titleKey: string
    descKey: string
    icon: React.ComponentType<{ className?: string }>
    color: string
    detailKeys: string[]
  }
  index: number
  isActive: boolean
  isCompleted: boolean
  onClick: () => void
  t: (key: string) => string
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
      {/* Connector line */}
      {index < 4 && (
        <div className="absolute top-7 left-1/2 w-full h-0.5 bg-brand-lightTeal/30 hidden lg:block">
          <motion.div 
            className="h-full bg-emerald-500"
            initial={{ width: 0 }}
            animate={{ width: isCompleted ? '100%' : '0%' }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />
        </div>
      )}
      
      {/* Icon */}
      <motion.div 
        className={`relative z-10 w-14 h-14 rounded-xl flex items-center justify-center shadow-lg transition-all duration-300 ${
          isActive 
            ? `bg-gradient-to-br ${step.color} text-white scale-110` 
            : isCompleted
              ? 'bg-emerald-500 text-white'
              : 'bg-white border-2 border-brand-lightTeal/30 text-brand-darkBlue/50 group-hover:border-brand-darkBlue/30'
        }`}
        whileHover={{ scale: isActive ? 1.1 : 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {isCompleted && !isActive ? (
          <CheckCircle2 className="h-6 w-6" />
        ) : (
          <Icon className="h-6 w-6" />
        )}
      </motion.div>

      {/* Label */}
      <div className="mt-3 text-center">
        <div className={`text-xs font-medium mb-1 ${isActive ? 'text-brand-darkBlue' : 'text-brand-darkBlue/50'}`}>
          {t('timeline.day')} {step.day}
        </div>
        <div className={`text-sm font-semibold ${isActive ? 'text-brand-darkBlue' : 'text-brand-darkBlue/70'}`}>
          {t(step.titleKey)}
        </div>
      </div>
    </motion.div>
  )
}

export function LaunchTimeline() {
  const [activeStep, setActiveStep] = useState(0)
  const [contactFormOpen, setContactFormOpen] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const { t } = useLocale()

  const timelineSteps = [
    {
      day: '1',
      titleKey: 'timeline.step1Title',
      descKey: 'timeline.step1Desc',
      icon: FileText,
      color: 'from-blue-500 to-blue-600',
      detailKeys: ['timeline.step1Detail1', 'timeline.step1Detail2', 'timeline.step1Detail3'],
    },
    {
      day: '2-3',
      titleKey: 'timeline.step2Title',
      descKey: 'timeline.step2Desc',
      icon: Palette,
      color: 'from-purple-500 to-purple-600',
      detailKeys: ['timeline.step2Detail1', 'timeline.step2Detail2', 'timeline.step2Detail3'],
    },
    {
      day: '4-5',
      titleKey: 'timeline.step3Title',
      descKey: 'timeline.step3Desc',
      icon: Smartphone,
      color: 'from-emerald-500 to-emerald-600',
      detailKeys: ['timeline.step3Detail1', 'timeline.step3Detail2', 'timeline.step3Detail3'],
    },
    {
      day: '6',
      titleKey: 'timeline.step4Title',
      descKey: 'timeline.step4Desc',
      icon: Link2,
      color: 'from-orange-500 to-orange-600',
      detailKeys: ['timeline.step4Detail1', 'timeline.step4Detail2', 'timeline.step4Detail3'],
    },
    {
      day: '7',
      titleKey: 'timeline.step5Title',
      descKey: 'timeline.step5Desc',
      icon: Rocket,
      color: 'from-rose-500 to-rose-600',
      detailKeys: ['timeline.step5Detail1', 'timeline.step5Detail2', 'timeline.step5Detail3'],
    },
  ]

  // Auto-advance timeline
  useEffect(() => {
    if (!isInView) return
    
    const timer = setInterval(() => {
      setActiveStep(prev => (prev + 1) % timelineSteps.length)
    }, 4000)

    return () => clearInterval(timer)
  }, [isInView, timelineSteps.length])

  const currentStep = timelineSteps[activeStep]
  const CurrentIcon = currentStep.icon

  return (
    <>
      <section ref={ref} className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden">
        <div className="container mx-auto max-w-5xl">
          {/* Header */}
          <motion.div 
            className="text-center mb-12 lg:mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <motion.div 
              className="inline-flex items-center gap-2 bg-brand-lightBlue text-brand-darkBlue text-sm font-medium px-4 py-1.5 rounded-full mb-4"
              initial={{ scale: 0.9 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ delay: 0.2 }}
            >
              <Sparkles className="w-4 h-4" />
              {t('timeline.badge')}
            </motion.div>
            <h2 className="text-3xl lg:text-4xl font-bold text-brand-darkBlue mb-3 tracking-tight">
              {t('timeline.title')} <span className="text-emerald-500">{t('timeline.titleHighlight')}</span>
            </h2>
            <p className="text-lg text-brand-darkBlue/70 max-w-xl mx-auto">
              {t('timeline.subtitle')}
            </p>
          </motion.div>

          {/* Timeline */}
          <div className="grid grid-cols-5 gap-2 lg:gap-4 mb-10">
            {timelineSteps.map((step, index) => (
              <TimelineStep
                key={index}
                step={step}
                index={index}
                isActive={index === activeStep}
                isCompleted={index < activeStep}
                onClick={() => setActiveStep(index)}
                t={t}
              />
            ))}
          </div>

          {/* Active step details */}
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl p-6 lg:p-8 border border-brand-lightTeal/30 shadow-soft max-w-2xl mx-auto"
          >
            <div className="flex items-start gap-4">
              <motion.div 
                className={`w-14 h-14 rounded-xl bg-gradient-to-br ${currentStep.color} flex items-center justify-center text-white shadow-lg flex-shrink-0`}
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <CurrentIcon className="h-7 w-7" />
              </motion.div>
              <div className="flex-1">
                <div className="text-xs text-brand-darkBlue/50 font-medium mb-1">
                  {t('timeline.day')} {currentStep.day}
                </div>
                <h3 className="text-xl font-bold text-brand-darkBlue mb-2">
                  {t(currentStep.titleKey)}
                </h3>
                <p className="text-brand-darkBlue/70 mb-4">
                  {t(currentStep.descKey)}
                </p>
                <div className="flex flex-wrap gap-2">
                  {currentStep.detailKeys.map((detailKey, idx) => (
                    <motion.span 
                      key={idx}
                      className="inline-flex items-center gap-1.5 text-xs bg-brand-lightBlue/50 text-brand-darkBlue px-3 py-1.5 rounded-full"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.1 }}
                    >
                      <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                      {t(detailKey)}
                    </motion.span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div 
            className="text-center mt-10"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.8 }}
          >
            <Button size="lg" onClick={() => setContactFormOpen(true)}>
              {t('timeline.cta')}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <p className="text-sm text-brand-darkBlue/50 mt-3">
              {t('timeline.ctaSubtext')}
            </p>
          </motion.div>
        </div>
      </section>

      <ContactForm open={contactFormOpen} onOpenChange={setContactFormOpen} />
    </>
  )
}
