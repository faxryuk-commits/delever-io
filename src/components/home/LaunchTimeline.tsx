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
  t,
  totalSteps
}: { 
  step: {
    stepNum: number
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
  totalSteps: number
}) {
  const Icon = step.icon

  return (
    <motion.div
      className="relative flex flex-col items-center cursor-pointer group"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      onClick={onClick}
    >
      {/* Connector line */}
      {index < totalSteps - 1 && (
        <div className="absolute top-7 left-1/2 w-full h-1 bg-brand-lightTeal/20 hidden lg:block rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: isCompleted ? '100%' : '0%' }}
            transition={{ duration: 0.4, delay: 0.1 }}
          />
        </div>
      )}
      
      {/* Step number badge */}
      <motion.div
        className={`absolute -top-2 -right-1 w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center z-20 ${
          isCompleted 
            ? 'bg-emerald-500 text-white' 
            : isActive 
              ? 'bg-brand-darkBlue text-white'
              : 'bg-brand-lightTeal/30 text-brand-darkBlue/50'
        }`}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: index * 0.1 + 0.2 }}
      >
        {isCompleted ? '✓' : step.stepNum}
      </motion.div>
      
      {/* Icon */}
      <motion.div 
        className={`relative z-10 w-14 h-14 lg:w-16 lg:h-16 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-300 ${
          isActive 
            ? `bg-gradient-to-br ${step.color} text-white scale-110 shadow-xl` 
            : isCompleted
              ? 'bg-gradient-to-br from-emerald-400 to-emerald-500 text-white'
              : 'bg-white border-2 border-brand-lightTeal/30 text-brand-darkBlue/40 group-hover:border-brand-darkBlue/20 group-hover:shadow-md'
        }`}
        whileHover={{ scale: isActive ? 1.1 : 1.08 }}
        whileTap={{ scale: 0.95 }}
      >
        {isCompleted && !isActive ? (
          <CheckCircle2 className="h-6 w-6 lg:h-7 lg:w-7" />
        ) : (
          <Icon className="h-6 w-6 lg:h-7 lg:w-7" />
        )}
      </motion.div>

      {/* Label */}
      <div className="mt-4 text-center">
        <div className={`text-sm lg:text-base font-semibold transition-colors ${
          isActive ? 'text-brand-darkBlue' : isCompleted ? 'text-emerald-600' : 'text-brand-darkBlue/60'
        }`}>
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
      stepNum: 1,
      titleKey: 'timeline.step1Title',
      descKey: 'timeline.step1Desc',
      icon: FileText,
      color: 'from-blue-500 to-blue-600',
      detailKeys: ['timeline.step1Detail1', 'timeline.step1Detail2', 'timeline.step1Detail3'],
    },
    {
      stepNum: 2,
      titleKey: 'timeline.step2Title',
      descKey: 'timeline.step2Desc',
      icon: Palette,
      color: 'from-purple-500 to-purple-600',
      detailKeys: ['timeline.step2Detail1', 'timeline.step2Detail2', 'timeline.step2Detail3'],
    },
    {
      stepNum: 3,
      titleKey: 'timeline.step3Title',
      descKey: 'timeline.step3Desc',
      icon: Smartphone,
      color: 'from-emerald-500 to-emerald-600',
      detailKeys: ['timeline.step3Detail1', 'timeline.step3Detail2', 'timeline.step3Detail3'],
    },
    {
      stepNum: 4,
      titleKey: 'timeline.step4Title',
      descKey: 'timeline.step4Desc',
      icon: Link2,
      color: 'from-orange-500 to-orange-600',
      detailKeys: ['timeline.step4Detail1', 'timeline.step4Detail2', 'timeline.step4Detail3'],
    },
    {
      stepNum: 5,
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
    }, 3500)

    return () => clearInterval(timer)
  }, [isInView, timelineSteps.length])

  const currentStep = timelineSteps[activeStep]
  const CurrentIcon = currentStep.icon

  return (
    <>
      <section ref={ref} className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-brand-lightBeige/30 overflow-hidden">
        <div className="container mx-auto max-w-5xl">
          {/* Header */}
          <motion.div 
            className="text-center mb-14 lg:mb-20"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <motion.div 
              className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 text-sm font-semibold px-4 py-2 rounded-full mb-5"
              initial={{ scale: 0.9 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ delay: 0.2 }}
            >
              <Sparkles className="w-4 h-4" />
              {t('timeline.badge')}
            </motion.div>
            <h2 className="text-3xl lg:text-5xl font-bold text-brand-darkBlue mb-4 tracking-tight">
              {t('timeline.title')} <span className="text-emerald-500">{t('timeline.titleHighlight')}</span>
            </h2>
            <p className="text-lg text-brand-darkBlue/60 max-w-xl mx-auto">
              {t('timeline.subtitle')}
            </p>
          </motion.div>

          {/* Timeline Steps */}
          <div className="grid grid-cols-5 gap-2 lg:gap-6 mb-12">
            {timelineSteps.map((step, index) => (
              <TimelineStep
                key={index}
                step={step}
                index={index}
                isActive={index === activeStep}
                isCompleted={index < activeStep}
                onClick={() => setActiveStep(index)}
                t={t}
                totalSteps={timelineSteps.length}
              />
            ))}
          </div>

          {/* Progress bar */}
          <div className="max-w-2xl mx-auto mb-10">
            <div className="h-2 bg-brand-lightTeal/20 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full"
                initial={{ width: '0%' }}
                animate={{ width: `${((activeStep + 1) / timelineSteps.length) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <div className="flex justify-between mt-2 text-xs text-brand-darkBlue/40">
              <span>{t('timeline.start')}</span>
              <span>{t('timeline.ready')}</span>
            </div>
          </div>

          {/* Active step details */}
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-3xl p-6 lg:p-8 border border-brand-lightTeal/20 shadow-xl max-w-2xl mx-auto"
          >
            <div className="flex items-start gap-5">
              <motion.div 
                className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${currentStep.color} flex items-center justify-center text-white shadow-lg flex-shrink-0`}
                animate={{ rotate: [0, 3, -3, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <CurrentIcon className="h-8 w-8" />
              </motion.div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-bold text-white bg-brand-darkBlue px-2 py-0.5 rounded">
                    {t('timeline.step')} {currentStep.stepNum}
                  </span>
                </div>
                <h3 className="text-xl lg:text-2xl font-bold text-brand-darkBlue mb-2">
                  {t(currentStep.titleKey)}
                </h3>
                <p className="text-brand-darkBlue/60 mb-5">
                  {t(currentStep.descKey)}
                </p>
                <div className="flex flex-wrap gap-2">
                  {currentStep.detailKeys.map((detailKey, idx) => (
                    <motion.span 
                      key={idx}
                      className="inline-flex items-center gap-1.5 text-sm bg-brand-lightBlue/40 text-brand-darkBlue px-3 py-1.5 rounded-full"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                    >
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                      {t(detailKey)}
                    </motion.span>
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
            transition={{ delay: 0.8 }}
          >
            <Button size="lg" onClick={() => setContactFormOpen(true)} className="shadow-lg">
              {t('timeline.cta')}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <p className="text-sm text-brand-darkBlue/40 mt-4">
              {t('timeline.ctaSubtext')}
            </p>
          </motion.div>
        </div>
      </section>

      <ContactForm open={contactFormOpen} onOpenChange={setContactFormOpen} />
    </>
  )
}
