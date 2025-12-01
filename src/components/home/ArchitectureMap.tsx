import { useState, useEffect, useRef } from 'react'
import { motion, useAnimation, useInView } from 'framer-motion'
import { 
  Monitor, 
  ShoppingCart, 
  ChefHat, 
  BarChart3, 
  Megaphone, 
  CreditCard, 
  Truck, 
  Users,
  ArrowRight,
  Zap
} from 'lucide-react'
import { useLocale } from '@/i18n/LocaleContext'
import { Logo } from '../Logo'

interface Module {
  id: string
  label: string
  labelEn: string
  color: string
  icon: typeof Monitor
  description: string
  descriptionEn: string
}

const modules: Module[] = [
  { id: 'pos', label: 'POS', labelEn: 'POS', color: '#3B82F6', icon: Monitor, description: 'Управление точками продаж', descriptionEn: 'Point of Sale Management' },
  { id: 'order', label: 'Заказы', labelEn: 'Orders', color: '#F97316', icon: ShoppingCart, description: 'Все каналы в одном месте', descriptionEn: 'All channels in one place' },
  { id: 'kitchen', label: 'Кухня', labelEn: 'Kitchen', color: '#EF4444', icon: ChefHat, description: 'KDS и управление кухней', descriptionEn: 'KDS and kitchen management' },
  { id: 'analytics', label: 'Аналитика', labelEn: 'Analytics', color: '#8B5CF6', icon: BarChart3, description: 'Данные для решений', descriptionEn: 'Data for decisions' },
  { id: 'marketing', label: 'Маркетинг', labelEn: 'Marketing', color: '#EC4899', icon: Megaphone, description: 'Привлечение и удержание', descriptionEn: 'Acquisition & retention' },
  { id: 'payment', label: 'Платежи', labelEn: 'Payments', color: '#0EA5E9', icon: CreditCard, description: 'Все способы оплаты', descriptionEn: 'All payment methods' },
  { id: 'logistics', label: 'Логистика', labelEn: 'Logistics', color: '#10B981', icon: Truck, description: 'Доставка и курьеры', descriptionEn: 'Delivery & couriers' },
  { id: 'customers', label: 'Клиенты', labelEn: 'Customers', color: '#F59E0B', icon: Users, description: 'CRM и лояльность', descriptionEn: 'CRM & loyalty' },
]

export function ArchitectureMap() {
  const { language } = useLocale()
  const [activeIndex, setActiveIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })
  const controls = useAnimation()

  // Auto-rotate modules
  useEffect(() => {
    if (isHovered) return
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % modules.length)
    }, 2500)
    return () => clearInterval(interval)
  }, [isHovered])

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])

  const activeModule = modules[activeIndex]

  return (
    <section 
      ref={containerRef}
      className="py-24 lg:py-40 relative overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(0, 42, 71, 0.15), transparent)'
      }}
    >
      {/* Background grid */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 42, 71, 1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 42, 71, 1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={controls}
          variants={{
            visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
          }}
        >
          <motion.div 
            className="inline-flex items-center gap-2 px-4 py-2 bg-brand-darkBlue/5 rounded-full mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={controls}
            variants={{
              visible: { opacity: 1, scale: 1, transition: { delay: 0.2 } }
            }}
          >
            <Zap className="w-4 h-4 text-brand-darkBlue" />
            <span className="text-sm font-medium text-brand-darkBlue">
              {language === 'ru' ? 'Единая экосистема' : 'Unified Ecosystem'}
            </span>
          </motion.div>
          <h2 className="text-4xl lg:text-6xl font-bold text-brand-darkBlue mb-6 tracking-tight">
            {language === 'ru' ? 'Всё для бизнеса' : 'Everything for Business'}
            <br />
            <span className="text-brand-darkBlue/40">
              {language === 'ru' ? 'в одной платформе' : 'in One Platform'}
            </span>
          </h2>
        </motion.div>

        {/* Main Architecture View */}
        <div 
          className="relative max-w-5xl mx-auto"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Orbital Container */}
          <div className="relative aspect-square max-w-3xl mx-auto">
            
            {/* Outer orbit ring */}
            <motion.div
              className="absolute inset-0 rounded-full border border-brand-darkBlue/10"
              initial={{ scale: 0, opacity: 0 }}
              animate={controls}
              variants={{
                visible: { scale: 1, opacity: 1, transition: { duration: 0.8, delay: 0.3 } }
              }}
            />
            
            {/* Middle orbit ring */}
            <motion.div
              className="absolute inset-[15%] rounded-full border border-brand-darkBlue/10"
              initial={{ scale: 0, opacity: 0 }}
              animate={controls}
              variants={{
                visible: { scale: 1, opacity: 1, transition: { duration: 0.8, delay: 0.4 } }
              }}
            />

            {/* Inner orbit ring with glow */}
            <motion.div
              className="absolute inset-[30%] rounded-full border-2 border-brand-darkBlue/20"
              initial={{ scale: 0, opacity: 0 }}
              animate={controls}
              variants={{
                visible: { scale: 1, opacity: 1, transition: { duration: 0.8, delay: 0.5 } }
              }}
              style={{
                boxShadow: '0 0 60px rgba(0, 42, 71, 0.1)'
              }}
            />

            {/* Rotating data flow lines */}
            <motion.div
              className="absolute inset-0"
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            >
              {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
                <motion.div
                  key={angle}
                  className="absolute left-1/2 top-1/2 w-1 h-1 bg-brand-darkBlue/30 rounded-full"
                  style={{
                    transform: `rotate(${angle}deg) translateY(-${180 + i * 5}px)`,
                  }}
                  animate={{
                    opacity: [0.2, 0.6, 0.2],
                    scale: [1, 1.5, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </motion.div>

            {/* Center Logo */}
            <motion.div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
              initial={{ scale: 0 }}
              animate={controls}
              variants={{
                visible: { scale: 1, transition: { type: "spring", stiffness: 200, delay: 0.6 } }
              }}
            >
              {/* Pulse rings */}
              <motion.div
                className="absolute inset-0 -m-4 rounded-full bg-brand-darkBlue/5"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 0, 0.5],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <motion.div
                className="absolute inset-0 -m-8 rounded-full bg-brand-darkBlue/5"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 0, 0.3],
                }}
                transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
              />

              {/* Logo container */}
              <motion.div 
                className="relative w-32 h-32 lg:w-44 lg:h-44 bg-white rounded-3xl shadow-2xl flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
                style={{
                  boxShadow: '0 25px 80px rgba(0, 42, 71, 0.2)'
                }}
              >
                <Logo height={60} />
              </motion.div>
            </motion.div>

            {/* Module Nodes on orbit */}
            {modules.map((module, index) => {
              const angle = (index * 360 / modules.length - 90) * (Math.PI / 180)
              const radius = 42 // percentage from center
              const x = 50 + Math.cos(angle) * radius
              const y = 50 + Math.sin(angle) * radius
              const Icon = module.icon
              const isActive = index === activeIndex

              return (
                <motion.div
                  key={module.id}
                  className="absolute z-10"
                  style={{
                    left: `${x}%`,
                    top: `${y}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={controls}
                  variants={{
                    visible: { 
                      scale: 1, 
                      opacity: 1, 
                      transition: { delay: 0.8 + index * 0.1, type: "spring" } 
                    }
                  }}
                >
                  {/* Connection line to center */}
                  <svg 
                    className="absolute pointer-events-none"
                    style={{
                      width: '200px',
                      height: '200px',
                      left: '50%',
                      top: '50%',
                      transform: 'translate(-50%, -50%)',
                    }}
                  >
                    <motion.line
                      x1="100"
                      y1="100"
                      x2={100 + Math.cos(angle + Math.PI) * 80}
                      y2={100 + Math.sin(angle + Math.PI) * 80}
                      stroke={isActive ? module.color : '#002A4720'}
                      strokeWidth={isActive ? 2 : 1}
                      strokeDasharray={isActive ? "0" : "4,4"}
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                    />
                    {isActive && (
                      <motion.circle
                        r="3"
                        fill={module.color}
                        animate={{
                          cx: [100, 100 + Math.cos(angle + Math.PI) * 80],
                          cy: [100, 100 + Math.sin(angle + Math.PI) * 80],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "linear"
                        }}
                      />
                    )}
                  </svg>

                  {/* Module button */}
                  <motion.button
                    className="relative group"
                    onClick={() => setActiveIndex(index)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {/* Glow effect */}
                    <motion.div
                      className="absolute inset-0 rounded-2xl blur-xl"
                      style={{ backgroundColor: module.color }}
                      animate={{ 
                        opacity: isActive ? 0.4 : 0,
                        scale: isActive ? 1.3 : 1
                      }}
                      transition={{ duration: 0.3 }}
                    />

                    {/* Module circle */}
                    <motion.div
                      className="relative w-16 h-16 lg:w-20 lg:h-20 rounded-2xl flex items-center justify-center text-white shadow-lg transition-shadow"
                      style={{ 
                        backgroundColor: isActive ? module.color : '#ffffff',
                        boxShadow: isActive 
                          ? `0 10px 40px ${module.color}50` 
                          : '0 4px 20px rgba(0,0,0,0.1)'
                      }}
                      animate={{
                        scale: isActive ? 1.1 : 1,
                      }}
                    >
                      <Icon 
                        className="w-7 h-7 lg:w-8 lg:h-8" 
                        style={{ color: isActive ? '#ffffff' : module.color }}
                        strokeWidth={1.5}
                      />
                    </motion.div>

                    {/* Label */}
                    <motion.div
                      className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap"
                      animate={{ opacity: isActive ? 1 : 0.6 }}
                    >
                      <span 
                        className="text-xs lg:text-sm font-semibold"
                        style={{ color: isActive ? module.color : '#002A47' }}
                      >
                        {language === 'ru' ? module.label : module.labelEn}
                      </span>
                    </motion.div>
                  </motion.button>
                </motion.div>
              )
            })}
          </div>

          {/* Active Module Info Card */}
          <motion.div
            className="mt-16 max-w-md mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            key={activeModule.id}
            transition={{ duration: 0.3 }}
          >
            <div 
              className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100"
              style={{ borderTopColor: activeModule.color, borderTopWidth: 3 }}
            >
              <div className="flex items-center gap-4 mb-3">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${activeModule.color}15` }}
                >
                  <activeModule.icon className="w-6 h-6" style={{ color: activeModule.color }} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-brand-darkBlue">
                    {language === 'ru' ? activeModule.label : activeModule.labelEn}
                  </h3>
                  <p className="text-brand-darkBlue/60 text-sm">
                    {language === 'ru' ? activeModule.description : activeModule.descriptionEn}
                  </p>
                </div>
              </div>
              <button className="w-full mt-4 flex items-center justify-center gap-2 py-3 rounded-xl bg-brand-darkBlue/5 hover:bg-brand-darkBlue/10 transition-colors text-brand-darkBlue font-medium text-sm">
                {language === 'ru' ? 'Подробнее о модуле' : 'Learn more'}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </div>

        {/* Bottom Navigation Dots */}
        <div className="flex justify-center gap-2 mt-12">
          {modules.map((module, index) => (
            <button
              key={module.id}
              onClick={() => setActiveIndex(index)}
              className="group relative p-2"
            >
              <motion.div
                className="w-2.5 h-2.5 rounded-full transition-colors"
                style={{ 
                  backgroundColor: index === activeIndex ? module.color : '#002A4730'
                }}
                animate={{
                  scale: index === activeIndex ? 1.3 : 1,
                }}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
