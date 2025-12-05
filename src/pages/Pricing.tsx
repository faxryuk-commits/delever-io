import { SmartCalculator } from '@/components/SmartCalculator'
import { SEO } from '@/components/SEO'
import { useLocale } from '@/i18n/LocaleContext'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Smartphone, ArrowRight, Check, Sparkles } from 'lucide-react'

export function Pricing() {
  const { language, formatPrice } = useLocale()
  
  const whiteLabelFeatures = language === 'ru' 
    ? ['iOS + Android', 'Ваш бренд', 'Push-уведомления', 'Онлайн оплата', 'Программа лояльности', 'Запуск за 2 недели']
    : language === 'uz'
    ? ['iOS + Android', "Sizning brendingiz", 'Push-bildirishnomalar', "Onlayn to'lov", 'Sadoqat dasturi', '2 haftada ishga tushirish']
    : ['iOS + Android', 'Your Brand', 'Push Notifications', 'Online Payment', 'Loyalty Program', 'Launch in 2 weeks']
  
  return (
    <div className="min-h-screen pt-20 pb-8 lg:pt-24 lg:pb-12 bg-gradient-to-b from-brand-lightBlue/20 to-white">
      <SEO 
        title={language === 'en' ? 'Pricing & Plans' : language === 'uz' ? 'Tariflar va narxlar' : 'Тарифы и цены'}
        description={language === 'en'
          ? 'Delever pricing plans from $99/month. Calculate your costs and savings. Free ROI calculator included.'
          : language === 'uz'
          ? "Delever tariflari oyiga 1,300,000 so'mdan. Xarajatlar va tejamkorlikni hisoblang."
          : 'Тарифы Delever от 1,300,000 сум/месяц. Рассчитайте стоимость и экономию. Бесплатный калькулятор ROI.'
        }
        keywords={language === 'en'
          ? 'delever pricing, delivery software cost, restaurant software price, ROI calculator'
          : 'цены delever, стоимость ПО для доставки, цена софта для ресторанов, калькулятор ROI'
        }
      />
      <SmartCalculator />
      
      {/* White Label App Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto"
        >
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 p-8 lg:p-12">
            {/* Background decorations */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-400/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl" />
            
            <div className="relative z-10 grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Content */}
              <div className="text-white">
                <motion.div 
                  className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-medium mb-6"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <Sparkles className="w-4 h-4" />
                  {language === 'ru' ? 'White Label' : language === 'uz' ? 'White Label' : 'White Label'}
                </motion.div>
                
                <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                  {language === 'ru' ? 'Своё мобильное приложение' : language === 'uz' ? "O'z mobil ilovangiz" : 'Your Own Mobile App'}
                </h2>
                
                <p className="text-white/80 text-lg mb-6">
                  {language === 'ru' 
                    ? 'Брендированное приложение под вашим именем в App Store и Google Play' 
                    : language === 'uz' 
                    ? "App Store va Google Play'da o'z nomingiz bilan brendlangan ilova"
                    : 'Branded app under your name in App Store and Google Play'}
                </p>
                
                <div className="grid grid-cols-2 gap-3 mb-8">
                  {whiteLabelFeatures.map((feature, idx) => (
                    <motion.div 
                      key={idx}
                      className="flex items-center gap-2"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                    >
                      <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                        <Check className="w-3 h-3" />
                      </div>
                      <span className="text-sm">{feature}</span>
                    </motion.div>
                  ))}
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                  <div>
                    <div className="text-3xl lg:text-4xl font-bold">
                      {formatPrice(13000000)}
                    </div>
                    <div className="text-white/60 text-sm">
                      {language === 'ru' ? 'единоразово' : language === 'uz' ? 'bir martalik' : 'one-time'}
                    </div>
                  </div>
                  
                  <Link to="/white-label">
                    <motion.button
                      className="flex items-center gap-2 bg-white text-purple-600 px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {language === 'ru' ? 'Подробнее' : language === 'uz' ? 'Batafsil' : 'Learn More'}
                      <ArrowRight className="w-4 h-4" />
                    </motion.button>
                  </Link>
                </div>
              </div>
              
              {/* Phone Mockups */}
              <div className="relative flex justify-center lg:justify-end">
                <motion.div
                  className="relative"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  {/* Phone Frame */}
                  <div className="relative w-48 lg:w-56">
                    <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent rounded-[2.5rem] blur-xl" />
                    <div className="relative bg-gray-900 rounded-[2.5rem] p-2 shadow-2xl">
                      <div className="bg-gradient-to-b from-purple-500 to-indigo-600 rounded-[2rem] aspect-[9/19] flex flex-col items-center justify-center p-4 overflow-hidden">
                        {/* App Screen Content */}
                        <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mb-3">
                          <Smartphone className="w-6 h-6 text-white" />
                        </div>
                        <div className="text-white font-bold text-center text-sm mb-1">
                          {language === 'ru' ? 'Ваш Бренд' : language === 'uz' ? 'Sizning Brendingiz' : 'Your Brand'}
                        </div>
                        <div className="text-white/60 text-xs text-center">
                          {language === 'ru' ? 'Доставка еды' : language === 'uz' ? 'Ovqat yetkazish' : 'Food Delivery'}
                        </div>
                        
                        {/* Mini menu items */}
                        <div className="mt-4 w-full space-y-2">
                          {[1, 2, 3].map((i) => (
                            <div key={i} className="bg-white/10 rounded-lg p-2 flex items-center gap-2">
                              <div className="w-8 h-8 bg-white/20 rounded-lg" />
                              <div className="flex-1">
                                <div className="h-2 bg-white/30 rounded w-16 mb-1" />
                                <div className="h-1.5 bg-white/20 rounded w-10" />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      {/* Notch */}
                      <div className="absolute top-4 left-1/2 -translate-x-1/2 w-20 h-5 bg-gray-900 rounded-full" />
                    </div>
                  </div>
                  
                  {/* Second phone (smaller, behind) */}
                  <div className="absolute -right-8 top-8 lg:-right-12 lg:top-12 w-36 lg:w-44 opacity-60">
                    <div className="bg-gray-900 rounded-[2rem] p-1.5 shadow-xl">
                      <div className="bg-gradient-to-b from-green-500 to-emerald-600 rounded-[1.5rem] aspect-[9/19] flex items-center justify-center">
                        <div className="text-white/80 text-xs font-medium">Android</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
