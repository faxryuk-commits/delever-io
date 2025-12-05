import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { ContactForm } from '@/components/ContactForm'
import { useLocale } from '@/i18n/LocaleContext'
import { motion } from 'framer-motion'
import { 
  Smartphone, 
  Palette, 
  Shield, 
  Zap,
  ArrowRight,
  Sparkles,
  Star,
  Bell,
  CreditCard,
  Heart,
  Clock,
  MapPin,
  Gift,
  Users,
  Download
} from 'lucide-react'
import { SEO } from '@/components/SEO'

export function WhiteLabel() {
  const [contactFormOpen, setContactFormOpen] = useState(false)
  const { t, formatPrice, language } = useLocale()

  const features = [
    {
      icon: Palette,
      titleKey: 'whitelabel.fullBranding',
      descKey: 'whitelabel.fullBrandingDesc',
      color: 'from-purple-500 to-purple-600',
    },
    {
      icon: Smartphone,
      titleKey: 'whitelabel.storePublish',
      descKey: 'whitelabel.storePublishDesc',
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: Shield,
      titleKey: 'whitelabel.noMention',
      descKey: 'whitelabel.noMentionDesc',
      color: 'from-emerald-500 to-emerald-600',
    },
    {
      icon: Zap,
      titleKey: 'whitelabel.fastLaunch',
      descKey: 'whitelabel.fastLaunchDesc',
      color: 'from-orange-500 to-orange-600',
    },
  ]

  const appFeatures = [
    { icon: Bell, label: language === 'ru' ? 'Push-уведомления' : language === 'uz' ? 'Push-bildirishnomalar' : 'Push Notifications' },
    { icon: CreditCard, label: language === 'ru' ? 'Онлайн оплата' : language === 'uz' ? "Onlayn to'lov" : 'Online Payment' },
    { icon: Gift, label: language === 'ru' ? 'Программа лояльности' : language === 'uz' ? 'Sadoqat dasturi' : 'Loyalty Program' },
    { icon: MapPin, label: language === 'ru' ? 'Отслеживание заказа' : language === 'uz' ? 'Buyurtmani kuzatish' : 'Order Tracking' },
    { icon: Heart, label: language === 'ru' ? 'Избранное' : language === 'uz' ? 'Sevimlilar' : 'Favorites' },
    { icon: Clock, label: language === 'ru' ? 'История заказов' : language === 'uz' ? 'Buyurtmalar tarixi' : 'Order History' },
    { icon: Users, label: language === 'ru' ? 'Реферальная система' : language === 'uz' ? 'Referal tizimi' : 'Referral System' },
    { icon: Star, label: language === 'ru' ? 'Отзывы и рейтинги' : language === 'uz' ? "Sharhlar va reytinglar" : 'Reviews & Ratings' },
  ]

  const stats = [
    { value: '2', suffix: language === 'ru' ? ' недели' : language === 'uz' ? ' hafta' : ' weeks', label: language === 'ru' ? 'Срок разработки' : language === 'uz' ? 'Ishlab chiqish muddati' : 'Development Time' },
    { value: '100', suffix: '%', label: language === 'ru' ? 'Ваш бренд' : language === 'uz' ? 'Sizning brendingiz' : 'Your Brand' },
    { value: '24/7', suffix: '', label: language === 'ru' ? 'Поддержка' : language === 'uz' ? "Qo'llab-quvvatlash" : 'Support' },
  ]

  const whiteLabelPriceUZS = 13000000

  return (
    <>
      <SEO 
        title={language === 'uz' ? "White Label ilova" : language === 'en' ? 'White Label App' : 'White Label приложение'}
        description={language === 'uz' 
          ? "O'z brendingiz bilan iOS va Android uchun mobil ilova - 2 haftada ishga tushirish"
          : language === 'en'
          ? 'Mobile app for iOS and Android with your brand - launch in 2 weeks'
          : 'Мобильное приложение для iOS и Android под вашим брендом — запуск за 2 недели'}
        keywords={language === 'uz'
          ? "white label ilova, brendlangan ilova, restoran uchun mobil ilova, iOS Android ilova, O'zbekiston"
          : language === 'en'
          ? 'white label app, branded app, mobile app for restaurant, iOS Android app, custom food delivery app, Uzbekistan'
          : 'white label приложение, брендированное приложение, мобильное приложение для ресторана, iOS Android приложение, своё приложение доставки, Узбекистан'}
      />
      <div className="min-h-screen">
        {/* Hero Section with Phone Mockups */}
        <section className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 pt-28 pb-20 lg:pt-36 lg:pb-32">
          {/* Background decorations */}
          <div className="absolute inset-0">
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-400/10 rounded-full translate-y-1/2 -translate-x-1/2" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-radial from-white/5 to-transparent rounded-full" />
          </div>
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Content */}
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="text-white text-center lg:text-left"
              >
                <motion.span 
                  className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white text-sm font-medium px-4 py-1.5 rounded-full mb-6"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <Sparkles className="w-4 h-4" />
                  {t('whitelabel.badge')}
                </motion.span>
                
                <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 leading-tight">
                  {language === 'ru' ? 'Своё мобильное приложение под вашим брендом' 
                   : language === 'uz' ? "O'z brendingiz ostida mobil ilova" 
                   : 'Your Own Branded Mobile App'}
                </h1>
                
                <p className="text-xl text-white/80 mb-8 max-w-xl mx-auto lg:mx-0">
                  {language === 'ru' 
                    ? 'Полностью брендированное приложение в App Store и Google Play. Без упоминания Delever. Запуск за 2 недели.' 
                    : language === 'uz' 
                    ? "App Store va Google Play'da to'liq brendlangan ilova. Delever eslatmasiz. 2 haftada ishga tushirish."
                    : 'Fully branded app in App Store and Google Play. No Delever mention. Launch in 2 weeks.'}
                </p>
                
                {/* Stats */}
                <div className="flex flex-wrap justify-center lg:justify-start gap-6 mb-8">
                  {stats.map((stat, idx) => (
                    <motion.div 
                      key={idx}
                      className="text-center"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + idx * 0.1 }}
                    >
                      <div className="text-3xl lg:text-4xl font-bold">
                        {stat.value}<span className="text-white/70">{stat.suffix}</span>
                      </div>
                      <div className="text-white/60 text-sm">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                    <Button 
                      size="lg" 
                      onClick={() => setContactFormOpen(true)}
                      className="bg-white text-purple-600 hover:bg-white/90"
                    >
                      {language === 'ru' ? 'Заказать приложение' : language === 'uz' ? 'Ilova buyurtma qilish' : 'Order App'}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </motion.div>
                  <div className="text-center sm:text-left">
                    <div className="text-2xl lg:text-3xl font-bold">{formatPrice(whiteLabelPriceUZS)}</div>
                    <div className="text-white/60 text-sm">{t('pricing.oneTime')}</div>
                  </div>
                </div>
              </motion.div>
              
              {/* Phone Mockups */}
              <motion.div 
                className="relative flex justify-center"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                {/* Main Phone */}
                <div className="relative z-20">
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="relative w-56 lg:w-64"
                  >
                    <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent rounded-[3rem] blur-2xl scale-110" />
                    <div className="relative bg-gray-900 rounded-[3rem] p-2 shadow-2xl">
                      <div className="bg-gradient-to-b from-white to-gray-100 rounded-[2.5rem] aspect-[9/19] overflow-hidden">
                        {/* App Header */}
                        <div className="bg-gradient-to-r from-purple-500 to-indigo-600 p-4 pb-8">
                          <div className="flex items-center justify-between mb-4">
                            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                              <Smartphone className="w-5 h-5 text-white" />
                            </div>
                            <div className="text-white font-bold">
                              {language === 'ru' ? 'Ваш Бренд' : language === 'uz' ? 'Sizning Brendingiz' : 'Your Brand'}
                            </div>
                            <div className="w-8 h-8 bg-white/20 rounded-full" />
                          </div>
                          <div className="bg-white/20 rounded-xl p-3">
                            <div className="text-white/80 text-xs mb-1">🔍</div>
                            <div className="h-2 bg-white/30 rounded w-3/4" />
                          </div>
                        </div>
                        
                        {/* Categories */}
                        <div className="p-4 -mt-4">
                          <div className="flex gap-2 mb-4 overflow-hidden">
                            {['🍕', '🍔', '🍜', '🥗'].map((emoji, i) => (
                              <div key={i} className={`w-14 h-14 rounded-2xl flex items-center justify-center text-xl ${i === 0 ? 'bg-purple-100' : 'bg-gray-100'}`}>
                                {emoji}
                              </div>
                            ))}
                          </div>
                          
                          {/* Menu Items */}
                          <div className="space-y-3">
                            {[1, 2].map((i) => (
                              <div key={i} className="bg-white rounded-xl p-3 shadow-sm flex gap-3">
                                <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl" />
                                <div className="flex-1">
                                  <div className="h-2.5 bg-gray-200 rounded w-24 mb-2" />
                                  <div className="h-2 bg-gray-100 rounded w-16 mb-2" />
                                  <div className="text-purple-600 font-bold text-sm">$12.99</div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      {/* Notch */}
                      <div className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-gray-900 rounded-full" />
                    </div>
                  </motion.div>
                </div>
                
                {/* Second Phone (iOS) */}
                <motion.div 
                  className="absolute -left-4 lg:-left-8 top-12 z-10"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                >
                  <div className="w-44 lg:w-52 opacity-80">
                    <div className="bg-gray-900 rounded-[2.5rem] p-1.5 shadow-xl">
                      <div className="bg-gradient-to-b from-blue-500 to-blue-600 rounded-[2rem] aspect-[9/19] flex flex-col items-center justify-center p-4">
                        <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mb-2">
                          <Download className="w-6 h-6 text-white" />
                        </div>
                        <div className="text-white font-bold text-sm text-center">App Store</div>
                        <div className="text-white/60 text-xs">iOS</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
                
                {/* Third Phone (Android) */}
                <motion.div 
                  className="absolute -right-4 lg:-right-8 top-20 z-10"
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                >
                  <div className="w-40 lg:w-48 opacity-70">
                    <div className="bg-gray-900 rounded-[2rem] p-1.5 shadow-xl">
                      <div className="bg-gradient-to-b from-green-500 to-emerald-600 rounded-[1.5rem] aspect-[9/19] flex flex-col items-center justify-center p-4">
                        <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center mb-2">
                          <Download className="w-5 h-5 text-white" />
                        </div>
                        <div className="text-white font-bold text-xs text-center">Google Play</div>
                        <div className="text-white/60 text-[10px]">Android</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="container mx-auto max-w-5xl">
            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-brand-darkBlue mb-4">
                {language === 'ru' ? 'Что вы получаете' : language === 'uz' ? 'Siz nimaga ega bo\'lasiz' : 'What You Get'}
              </h2>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.map((feature, idx) => {
                const Icon = feature.icon
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{ y: -5 }}
                    className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-100 hover:shadow-xl transition-all"
                  >
                    <div className="flex items-start gap-4">
                      <motion.div 
                        className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white flex-shrink-0 shadow-lg`}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                      >
                        <Icon className="h-7 w-7" />
                      </motion.div>
                      <div>
                        <h3 className="font-bold text-brand-darkBlue text-lg mb-2">{t(feature.titleKey)}</h3>
                        <p className="text-brand-darkBlue/60">{t(feature.descKey)}</p>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* App Features Grid */}
        <section className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-purple-50 to-white">
          <div className="container mx-auto max-w-5xl">
            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-brand-darkBlue mb-4">
                {language === 'ru' ? 'Функции приложения' : language === 'uz' ? 'Ilova funksiyalari' : 'App Features'}
              </h2>
              <p className="text-brand-darkBlue/60 max-w-2xl mx-auto">
                {language === 'ru' 
                  ? 'Всё необходимое для успешного мобильного приложения доставки' 
                  : language === 'uz' 
                  ? "Muvaffaqiyatli yetkazib berish mobil ilovasi uchun zarur bo'lgan barcha narsalar"
                  : 'Everything you need for a successful delivery mobile app'}
              </p>
            </motion.div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {appFeatures.map((feature, idx) => {
                const Icon = feature.icon
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05 }}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="bg-white rounded-xl p-4 shadow-sm border border-purple-100 hover:shadow-lg hover:border-purple-200 transition-all text-center"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <Icon className="w-6 h-6 text-purple-600" />
                    </div>
                    <div className="text-sm font-medium text-brand-darkBlue">{feature.label}</div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8 bg-brand-darkBlue">
          <div className="container mx-auto max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                {language === 'ru' ? 'Готовы запустить своё приложение?' 
                 : language === 'uz' ? "O'z ilovangizni ishga tushirishga tayyormisiz?" 
                 : 'Ready to Launch Your App?'}
              </h2>
              <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
                {language === 'ru' 
                  ? 'Обсудим ваш проект и запустим приложение под вашим брендом за 2 недели' 
                  : language === 'uz' 
                  ? "Loyihangizni muhokama qilamiz va 2 hafta ichida brendingiz ostida ilovani ishga tushiramiz"
                  : "Let's discuss your project and launch an app under your brand in 2 weeks"}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                  <Button 
                    size="lg" 
                    onClick={() => setContactFormOpen(true)}
                    className="bg-white text-brand-darkBlue hover:bg-white/90"
                  >
                    {language === 'ru' ? 'Обсудить проект' : language === 'uz' ? 'Loyihani muhokama qilish' : 'Discuss Project'}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </motion.div>
                <div className="text-white">
                  <span className="text-2xl font-bold">{formatPrice(whiteLabelPriceUZS)}</span>
                  <span className="text-white/60 ml-2">{t('pricing.oneTime')}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>

      <ContactForm open={contactFormOpen} onOpenChange={setContactFormOpen} />
    </>
  )
}
