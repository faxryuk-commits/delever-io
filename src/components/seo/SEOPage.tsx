import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Check, 
  ArrowRight, 
  ChevronDown, 
  ChevronUp,
  Zap,
  Clock,
  Shield,
  Star,
  MessageSquare
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { ContactForm } from '@/components/ContactForm'
import { SEO } from '@/components/SEO'
import { useLocale } from '@/i18n/LocaleContext'
import { trackEvents } from '@/components/Analytics'
import type { SEOPageData } from '@/data/seo-pages'

interface SEOPageProps {
  data: SEOPageData
}

export function SEOPage({ data }: SEOPageProps) {
  const [contactFormOpen, setContactFormOpen] = useState(false)
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)
  const { language } = useLocale()

  // Получаем локализованный контент
  const title = data.title[language as keyof typeof data.title] || data.title.ru
  const description = data.description[language as keyof typeof data.description] || data.description.ru
  const keywords = data.keywords[language as keyof typeof data.keywords] || data.keywords.ru
  const h1 = data.h1[language as keyof typeof data.h1] || data.h1.ru
  const intro = data.intro[language as keyof typeof data.intro] || data.intro.ru
  const features = data.features[language as keyof typeof data.features] || data.features.ru
  const benefits = data.benefits[language as keyof typeof data.benefits] || data.benefits.ru

  // CTA texts
  const ctaTexts = {
    ru: {
      startFree: 'Начать бесплатно',
      contactSales: 'Связаться с нами',
      viewDemo: 'Смотреть демо',
      features: 'Возможности',
      benefits: 'Преимущества',
      faq: 'Часто задаваемые вопросы',
      relatedPages: 'Связанные страницы',
      howItWorks: 'Как это работает',
      step1: 'Оставьте заявку',
      step1desc: 'Заполните форму или позвоните нам',
      step2: 'Настройка за 1 день',
      step2desc: 'Мы настроим интеграцию и обучим команду',
      step3: 'Начните работу',
      step3desc: 'Принимайте заказы автоматически',
      trustedBy: 'Нам доверяют',
      readyToStart: 'Готовы начать?',
      readyDesc: 'Запустите доставку за 1 день с Delever'
    },
    en: {
      startFree: 'Start Free',
      contactSales: 'Contact Sales',
      viewDemo: 'View Demo',
      features: 'Features',
      benefits: 'Benefits',
      faq: 'Frequently Asked Questions',
      relatedPages: 'Related Pages',
      howItWorks: 'How It Works',
      step1: 'Submit a Request',
      step1desc: 'Fill out the form or call us',
      step2: 'Setup in 1 Day',
      step2desc: 'We set up integration and train your team',
      step3: 'Start Working',
      step3desc: 'Accept orders automatically',
      trustedBy: 'Trusted By',
      readyToStart: 'Ready to Start?',
      readyDesc: 'Launch delivery in 1 day with Delever'
    },
    uz: {
      startFree: 'Bepul boshlash',
      contactSales: 'Biz bilan bog\'lanish',
      viewDemo: 'Demoni ko\'rish',
      features: 'Imkoniyatlar',
      benefits: 'Afzalliklar',
      faq: 'Ko\'p beriladigan savollar',
      relatedPages: 'Bog\'liq sahifalar',
      howItWorks: 'Bu qanday ishlaydi',
      step1: 'So\'rov qoldiring',
      step1desc: 'Shaklni to\'ldiring yoki bizga qo\'ng\'iroq qiling',
      step2: '1 kunda sozlash',
      step2desc: 'Biz integratsiyani sozlaymiz va jamoangizni o\'rgatamiz',
      step3: 'Ishni boshlang',
      step3desc: 'Buyurtmalarni avtomatik qabul qiling',
      trustedBy: 'Bizga ishonadi',
      readyToStart: 'Boshlashga tayyormisiz?',
      readyDesc: 'Delever bilan 1 kunda yetkazib berishni ishga tushiring'
    }
  }
  const texts = ctaTexts[language as keyof typeof ctaTexts] || ctaTexts.ru

  // Clients logos
  const clients = ['EVOS', 'Yaponamama', 'Maxway', 'Les Ailes', 'Brasserie', 'Pizza Hut']

  // Track CTA click
  const handleCTAClick = (action: string) => {
    trackEvents.ctaClick(`${action}_${data.slug.replace(/\//g, '_')}`)
    setContactFormOpen(true)
  }

  return (
    <>
      <SEO 
        title={title}
        description={description}
        keywords={keywords}
      />

      <div className="min-h-screen pt-28 pb-16">
        {/* Hero Section */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumbs */}
            <nav className="flex items-center gap-2 text-sm text-brand-darkBlue/60 mb-6">
              <Link to="/" className="hover:text-brand-blue">Delever</Link>
              <span>/</span>
              {data.category === 'integration' && (
                <>
                  <Link to="/integrations" className="hover:text-brand-blue">
                    {language === 'en' ? 'Integrations' : language === 'uz' ? 'Integratsiyalar' : 'Интеграции'}
                  </Link>
                  <span>/</span>
                </>
              )}
              {data.category === 'solution' && (
                <>
                  <Link to="/products" className="hover:text-brand-blue">
                    {language === 'en' ? 'Solutions' : language === 'uz' ? 'Yechimlar' : 'Решения'}
                  </Link>
                  <span>/</span>
                </>
              )}
              <span className="text-brand-darkBlue">{h1}</span>
            </nav>

            {/* Logo if exists */}
            {data.logo && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mb-6"
              >
                <img 
                  src={data.logo} 
                  alt={h1}
                  className="h-16 w-auto object-contain rounded-xl"
                  loading="lazy"
                />
              </motion.div>
            )}

            {/* Icon if no logo */}
            {!data.logo && data.icon && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${data.color} flex items-center justify-center text-4xl mb-6 shadow-lg`}
              >
                {data.icon}
              </motion.div>
            )}

            {/* H1 */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl lg:text-5xl font-bold text-brand-darkBlue mb-6"
            >
              {h1}
            </motion.h1>

            {/* Intro */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-brand-darkBlue/70 mb-8 leading-relaxed"
            >
              {intro}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap gap-4"
            >
              <Button 
                size="lg"
                onClick={() => handleCTAClick('hero_start_free')}
              >
                {texts.startFree}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => handleCTAClick('hero_contact_sales')}
              >
                {texts.contactSales}
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-brand-darkBlue mb-8 flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${data.color} flex items-center justify-center`}>
                <Zap className="h-5 w-5 text-white" />
              </div>
              {texts.features}
            </h2>

            <div className="grid sm:grid-cols-2 gap-4">
              {features.map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-start gap-3 p-4 bg-white rounded-xl border border-brand-lightTeal/30 hover:shadow-md transition-shadow"
                >
                  <div className={`w-6 h-6 rounded-full bg-gradient-to-br ${data.color} flex items-center justify-center flex-shrink-0`}>
                    <Check className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-brand-darkBlue">{feature}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="bg-gradient-to-b from-brand-lightBlue/20 to-white py-16 mb-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-brand-darkBlue mb-8 text-center">
                {texts.howItWorks}
              </h2>

              <div className="grid md:grid-cols-3 gap-8">
                {[
                  { icon: MessageSquare, title: texts.step1, desc: texts.step1desc },
                  { icon: Clock, title: texts.step2, desc: texts.step2desc },
                  { icon: Zap, title: texts.step3, desc: texts.step3desc }
                ].map((step, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.2 }}
                    className="text-center"
                  >
                    <div className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br ${data.color} flex items-center justify-center mb-4 shadow-lg`}>
                      <step.icon className="h-8 w-8 text-white" />
                    </div>
                    <div className="text-3xl font-bold text-brand-darkBlue mb-2">{idx + 1}</div>
                    <h3 className="font-semibold text-brand-darkBlue mb-2">{step.title}</h3>
                    <p className="text-sm text-brand-darkBlue/60">{step.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-brand-darkBlue mb-8 flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${data.color} flex items-center justify-center`}>
                <Star className="h-5 w-5 text-white" />
              </div>
              {texts.benefits}
            </h2>

            <div className="grid sm:grid-cols-2 gap-4">
              {benefits.map((benefit, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className={`p-6 rounded-2xl bg-gradient-to-br ${data.color} text-white`}
                >
                  <div className="flex items-center gap-3">
                    <Shield className="h-6 w-6 flex-shrink-0" />
                    <span className="font-medium">{benefit}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Trusted By */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-lg font-medium text-brand-darkBlue/60 mb-6">{texts.trustedBy}</h3>
            <div className="flex flex-wrap justify-center gap-8">
              {clients.map((client, idx) => (
                <div 
                  key={idx}
                  className="text-xl font-bold text-brand-darkBlue/40"
                >
                  {client}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        {data.faq.length > 0 && (
          <section className="container mx-auto px-4 sm:px-6 lg:px-8 mb-16">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-brand-darkBlue mb-8 flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${data.color} flex items-center justify-center`}>
                  <MessageSquare className="h-5 w-5 text-white" />
                </div>
                {texts.faq}
              </h2>

              <div className="space-y-4">
                {data.faq.map((item, idx) => {
                  const question = item.question[language as keyof typeof item.question] || item.question.ru
                  const answer = item.answer[language as keyof typeof item.answer] || item.answer.ru
                  const isExpanded = expandedFaq === idx

                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      className="border border-brand-lightTeal/30 rounded-xl overflow-hidden"
                    >
                      <button
                        onClick={() => setExpandedFaq(isExpanded ? null : idx)}
                        className="w-full flex items-center justify-between p-4 text-left bg-white hover:bg-brand-lightBlue/10 transition-colors"
                      >
                        <span className="font-medium text-brand-darkBlue pr-4">{question}</span>
                        {isExpanded ? (
                          <ChevronUp className="h-5 w-5 text-brand-darkBlue/60 flex-shrink-0" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-brand-darkBlue/60 flex-shrink-0" />
                        )}
                      </button>
                      {isExpanded && (
                        <div className="p-4 pt-0 bg-white">
                          <p className="text-brand-darkBlue/70">{answer}</p>
                        </div>
                      )}
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </section>
        )}

        {/* Related Pages */}
        {data.relatedPages.length > 0 && (
          <section className="container mx-auto px-4 sm:px-6 lg:px-8 mb-16">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-xl font-bold text-brand-darkBlue mb-6">{texts.relatedPages}</h2>
              <div className="flex flex-wrap gap-3">
                {data.relatedPages.map((slug, idx) => (
                  <Link
                    key={idx}
                    to={`/${slug}`}
                    className="px-4 py-2 bg-brand-lightBlue/20 text-brand-darkBlue rounded-full hover:bg-brand-lightBlue/40 transition-colors text-sm"
                  >
                    {slug.split('/').pop()?.replace(/-/g, ' ')}
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Final CTA */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`p-8 md:p-12 rounded-3xl bg-gradient-to-br ${data.color} text-white text-center`}
            >
              <h2 className="text-3xl font-bold mb-4">{texts.readyToStart}</h2>
              <p className="text-white/80 mb-8 max-w-xl mx-auto">{texts.readyDesc}</p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button 
                  size="lg"
                  className="bg-white text-brand-darkBlue hover:bg-white/90"
                  onClick={() => handleCTAClick('final_cta_start')}
                >
                  {texts.startFree}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Link to="/pricing">
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="border-white text-white hover:bg-white/10"
                  >
                    {language === 'en' ? 'View Pricing' : language === 'uz' ? 'Narxlarni ko\'rish' : 'Смотреть тарифы'}
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>

      <ContactForm 
        open={contactFormOpen} 
        onOpenChange={setContactFormOpen}
        tag={`seo-${data.slug.replace(/\//g, '-')}`}
      />
    </>
  )
}
