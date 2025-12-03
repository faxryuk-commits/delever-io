import { useState, useRef } from 'react'
import { Button } from '@/components/ui/Button'
import { ContactForm } from '@/components/ContactForm'
import { useLocale } from '@/i18n/LocaleContext'
import { motion, useInView } from 'framer-motion'
import { Smartphone, Globe, MessageSquare, QrCode, ArrowRight, Check, Sparkles } from 'lucide-react'
import { SEO } from '@/components/SEO'

export function Channels() {
  const [contactFormOpen, setContactFormOpen] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const { t, language } = useLocale()

  const channels = [
    {
      icon: Smartphone,
      titleKey: 'channels.mobileApp',
      descKey: 'channels.mobileAppDesc',
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: Globe,
      titleKey: 'channels.website',
      descKey: 'channels.websiteDesc',
      color: 'from-purple-500 to-purple-600',
    },
    {
      icon: MessageSquare,
      titleKey: 'channels.telegramBot',
      descKey: 'channels.telegramBotDesc',
      color: 'from-cyan-500 to-cyan-600',
    },
    {
      icon: QrCode,
      titleKey: 'channels.qrMenu',
      descKey: 'channels.qrMenuDesc',
      color: 'from-orange-500 to-orange-600',
    },
  ]

  const benefitKeys = [
    'channels.noCommission',
    'channels.fullControl',
    'channels.pushAndMailing',
    'channels.yourBrand',
  ]

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
    <>
      <SEO 
        title={language === 'uz' ? "Savdo kanallari" : language === 'en' ? 'Sales Channels' : 'Каналы продаж'}
        description={language === 'uz' 
          ? "Sayt, ilova, Telegram-bot, QR-menyu - barcha buyurtmalar bitta tizimda komissiyasiz"
          : language === 'en'
          ? 'Website, mobile app, Telegram bot, QR-menu - all orders in one system without commissions'
          : 'Сайт, приложение, Telegram-бот, QR-меню — все заказы в одной системе без комиссий'}
        keywords={language === 'uz'
          ? "savdo kanallari, restoran sayti, Telegram bot buyurtma, QR menyu, mobil ilova restoran, O'zbekiston"
          : language === 'en'
          ? 'sales channels, restaurant website, Telegram bot order, QR menu, restaurant mobile app, white label app, Uzbekistan'
          : 'каналы продаж, сайт ресторана, Telegram бот заказы, QR меню, мобильное приложение ресторан, своё приложение, Узбекистан'}
      />
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
              className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 text-sm font-medium px-4 py-1.5 rounded-full mb-4"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Sparkles className="w-4 h-4" />
              {t('channels.badge')}
            </motion.span>
            <h1 className="text-4xl lg:text-5xl font-bold text-brand-darkBlue mb-4 tracking-tight">
              {t('channels.title')}
            </h1>
            <p className="text-lg text-brand-darkBlue/70 max-w-xl mx-auto mb-8">
              {t('channels.subtitle')}
            </p>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button size="lg" onClick={() => setContactFormOpen(true)}>
                {t('channels.launchChannels')}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </motion.div>
        </section>

        {/* Channels */}
        <section className="container mx-auto max-w-4xl mb-16">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {channels.map((channel, idx) => {
              const Icon = channel.icon
              return (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-xl p-6 border border-brand-lightTeal/30 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    <motion.div 
                      className={`w-14 h-14 rounded-xl bg-gradient-to-br ${channel.color} flex items-center justify-center text-white flex-shrink-0 shadow-lg`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <Icon className="h-7 w-7" />
                    </motion.div>
                    <div>
                      <h3 className="font-semibold text-brand-darkBlue mb-1">{t(channel.titleKey)}</h3>
                      <p className="text-sm text-brand-darkBlue/60">{t(channel.descKey)}</p>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </section>

        {/* Benefits */}
        <section className="container mx-auto max-w-3xl mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
            className="bg-brand-lightBlue/30 rounded-2xl p-8"
          >
            <h3 className="text-xl font-bold text-brand-darkBlue mb-6 text-center">{t('channels.benefits')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {benefitKeys.map((key, idx) => (
                <motion.div 
                  key={idx}
                  className="flex items-center gap-3 bg-white rounded-lg p-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.5 + idx * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <Check className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                  <span className="text-brand-darkBlue">{t(key)}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* CTA */}
        <section className="container mx-auto max-w-3xl">
          <motion.div 
            className="bg-brand-darkBlue rounded-2xl p-8 lg:p-12 text-center overflow-hidden relative"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6 }}
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="relative z-10">
              <h2 className="text-2xl lg:text-3xl font-bold mb-3 text-white tracking-tight">
                {t('channels.launchInWeek')}
              </h2>
              <p className="text-white/70 mb-6">
                {t('channels.launchInWeekDesc')}
              </p>
              <Button size="lg" variant="secondary" onClick={() => setContactFormOpen(true)}>
                {t('channels.discussLaunch')}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        </section>
      </div>

      <ContactForm open={contactFormOpen} onOpenChange={setContactFormOpen} />
    </>
  )
}
