import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Monitor, 
  ShoppingCart, 
  ChefHat, 
  BarChart3, 
  Megaphone, 
  CreditCard, 
  Truck, 
  Users,
  Warehouse,
  Tag,
  Package,
  ClipboardList,
  Phone,
  Tablet,
  QrCode,
  Smartphone,
  Globe,
  Bike,
  MapPin,
  Clock,
  Building2,
  UserCheck,
  Briefcase,
  DollarSign,
  LayoutDashboard,
  Link2,
  Gift,
  Bell,
  Percent,
  Banknote,
  Bitcoin,
  Eye,
  Settings,
  TrendingUp,
  Map,
  Compass,
  MessageSquare,
  Star,
  Activity,
  Layers,
  Send,
  LucideIcon
} from 'lucide-react'
import { useLocale } from '@/i18n/LocaleContext'

interface SubModule {
  label: string
  icon: LucideIcon
}

interface MainModule {
  id: string
  label: string
  color: string
  gradient: string
  angle: number
  icon: LucideIcon
  subModules: SubModule[]
  channels?: SubModule[]
  extras?: SubModule[]
}

// Главные модули вокруг центра
const mainModules: MainModule[] = [
  { 
    id: 'pos', 
    label: 'POS', 
    color: '#3B82F6',
    gradient: 'from-blue-500 to-blue-600',
    angle: 315, 
    icon: Monitor,
    subModules: [
      { label: 'Warehouse', icon: Warehouse },
      { label: 'Price Management', icon: Tag },
      { label: 'Product Management', icon: Package },
      { label: 'Order management', icon: ClipboardList },
    ]
  },
  { 
    id: 'order', 
    label: 'Order', 
    color: '#F97316',
    gradient: 'from-orange-500 to-orange-600',
    angle: 0, 
    icon: ShoppingCart,
    subModules: [
      { label: '3rd Party aggregators', icon: Layers },
      { label: 'Ecommerce Platform', icon: Globe },
      { label: 'Marketplace', icon: ShoppingCart },
      { label: 'Food delivery Apps', icon: Smartphone },
    ],
    channels: [
      { label: 'Call Center', icon: Phone },
      { label: 'Kiosk', icon: Tablet },
      { label: 'QR Menu', icon: QrCode },
      { label: 'Application', icon: Smartphone },
      { label: 'Web Site', icon: Globe },
      { label: 'Own deliver', icon: Bike },
    ]
  },
  { 
    id: 'kitchen', 
    label: 'Kitchen', 
    color: '#EF4444',
    gradient: 'from-red-500 to-red-600',
    angle: 45, 
    icon: ChefHat,
    subModules: [
      { label: 'POS', icon: Monitor },
      { label: 'Forecast Service', icon: TrendingUp },
      { label: 'Product service', icon: Package },
      { label: 'Courier service', icon: Truck },
      { label: 'Kitchen display', icon: Monitor },
    ]
  },
  { 
    id: 'analytic', 
    label: 'Analytics', 
    color: '#002A47',
    gradient: 'from-brand-darkBlue to-slate-700',
    angle: 225, 
    icon: BarChart3,
    subModules: [
      { label: 'Product', icon: Package },
      { label: 'Locations', icon: MapPin },
      { label: 'Times', icon: Clock },
      { label: 'Branches', icon: Building2 },
      { label: 'Customers', icon: UserCheck },
      { label: 'Employees', icon: Briefcase },
      { label: 'Revenues', icon: DollarSign },
      { label: 'Dashboards', icon: LayoutDashboard },
    ]
  },
  { 
    id: 'marketing', 
    label: 'Marketing', 
    color: '#8B5CF6',
    gradient: 'from-violet-500 to-violet-600',
    angle: 90, 
    icon: Megaphone,
    subModules: [
      { label: 'Deep links', icon: Link2 },
      { label: 'Referrals', icon: Gift },
      { label: 'Notifications', icon: Bell },
      { label: 'Discount & Promo', icon: Percent },
    ]
  },
  { 
    id: 'payment', 
    label: 'Payment', 
    color: '#0EA5E9',
    gradient: 'from-sky-500 to-sky-600',
    angle: 180, 
    icon: CreditCard,
    subModules: [
      { label: 'Cash', icon: Banknote },
      { label: 'Card', icon: CreditCard },
      { label: 'Crypto', icon: Bitcoin },
    ]
  },
  { 
    id: 'logistics', 
    label: 'Logistics', 
    color: '#10B981',
    gradient: 'from-emerald-500 to-emerald-600',
    angle: 135, 
    icon: Truck,
    subModules: [
      { label: 'Dispatching', icon: Send },
      { label: 'Monitoring', icon: Eye },
      { label: 'Managing', icon: Settings },
      { label: 'Predictions', icon: TrendingUp },
    ],
    extras: [
      { label: 'Courier APP', icon: Smartphone },
      { label: '3rd Party services', icon: Layers },
      { label: 'Maps', icon: Map },
      { label: 'Area', icon: Compass },
    ]
  },
  { 
    id: 'customers', 
    label: 'Customers', 
    color: '#EC4899',
    gradient: 'from-pink-500 to-pink-600',
    angle: 270, 
    icon: Users,
    subModules: [
      { label: 'CRM', icon: Users },
      { label: 'Communications', icon: MessageSquare },
      { label: 'Reviews', icon: Star },
      { label: 'RFM Analytics', icon: BarChart3 },
      { label: 'Activity triggers', icon: Activity },
    ]
  },
]

// Компонент анимированной линии связи
function ConnectionLine({ module, isActive }: { module: MainModule; isActive: boolean }) {
  const angle = (module.angle * Math.PI) / 180
  const x1 = 50
  const y1 = 50
  const x2 = 50 + Math.cos(angle) * 28
  const y2 = 50 + Math.sin(angle) * 28

  return (
    <g>
      {/* Основная линия */}
      <motion.line
        x1={`${x1}%`}
        y1={`${y1}%`}
        x2={`${x2}%`}
        y2={`${y2}%`}
        stroke={module.color}
        strokeWidth={isActive ? 3 : 2}
        strokeOpacity={isActive ? 0.8 : 0.3}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />
      {/* Анимированная точка на линии */}
      <motion.circle
        r="3"
        fill={module.color}
        initial={{ opacity: 0 }}
        animate={{
          opacity: isActive ? [0, 1, 0] : 0,
          cx: [`${x1}%`, `${x2}%`],
          cy: [`${y1}%`, `${y2}%`],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </g>
  )
}

// Компонент модуля
function ModuleNode({ 
  module, 
  isActive, 
  onHover 
}: { 
  module: MainModule
  isActive: boolean
  onHover: (id: string | null) => void 
}) {
  const angle = (module.angle * Math.PI) / 180
  const x = 50 + Math.cos(angle) * 32
  const y = 50 + Math.sin(angle) * 32
  const Icon = module.icon
  const subModuleRadius = 90

  return (
    <motion.div
      className="absolute z-10"
      style={{ 
        left: `${x}%`, 
        top: `${y}%`,
        transform: 'translate(-50%, -50%)'
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ 
        delay: 0.2 + mainModules.indexOf(module) * 0.08, 
        type: "spring",
        stiffness: 200,
        damping: 20
      }}
    >
      <motion.div
        className="relative cursor-pointer"
        onMouseEnter={() => onHover(module.id)}
        onMouseLeave={() => onHover(null)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Glow effect */}
        <motion.div
          className="absolute inset-0 rounded-full blur-xl"
          style={{ backgroundColor: module.color }}
          animate={{ 
            opacity: isActive ? 0.4 : 0,
            scale: isActive ? 1.5 : 1
          }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Module Circle */}
        <motion.div
          className={`relative w-20 h-20 lg:w-24 lg:h-24 rounded-full bg-gradient-to-br ${module.gradient} flex items-center justify-center text-white font-bold shadow-xl`}
          animate={{ 
            scale: isActive ? 1.1 : 1,
            boxShadow: isActive 
              ? `0 0 30px ${module.color}50` 
              : '0 10px 30px rgba(0,0,0,0.2)'
          }}
          transition={{ duration: 0.3 }}
        >
          <div className="text-center">
            <Icon className="w-6 h-6 lg:w-7 lg:h-7 mx-auto mb-0.5" strokeWidth={2} />
            <span className="text-[10px] lg:text-xs font-semibold">{module.label}</span>
          </div>
        </motion.div>

        {/* Sub Modules */}
        <AnimatePresence>
          {isActive && (
            <motion.div
              className="absolute left-1/2 top-1/2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {module.subModules.map((sub, subIdx) => {
                const totalSubs = module.subModules.length
                const subAngle = ((module.angle + 180 + (subIdx - (totalSubs - 1) / 2) * 30) * Math.PI) / 180
                const subX = Math.cos(subAngle) * subModuleRadius
                const subY = Math.sin(subAngle) * subModuleRadius
                const SubIcon = sub.icon

                return (
                  <motion.div
                    key={sub.label}
                    className="absolute whitespace-nowrap"
                    style={{
                      left: subX,
                      top: subY,
                      transform: 'translate(-50%, -50%)',
                    }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ 
                      delay: subIdx * 0.03,
                      type: "spring",
                      stiffness: 300,
                      damping: 25
                    }}
                  >
                    <div 
                      className="bg-white rounded-xl shadow-lg px-3 py-2 border-l-4 flex items-center gap-2"
                      style={{ borderLeftColor: module.color }}
                    >
                      <SubIcon className="w-4 h-4" style={{ color: module.color }} />
                      <span className="text-xs font-medium text-brand-darkBlue">{sub.label}</span>
                    </div>
                  </motion.div>
                )
              })}

              {/* Channels for Order module */}
              {module.channels?.map((channel, chIdx) => {
                const totalChannels = module.channels!.length
                const chAngle = ((module.angle + (chIdx - (totalChannels - 1) / 2) * 18) * Math.PI) / 180
                const chX = Math.cos(chAngle) * (subModuleRadius + 50)
                const chY = Math.sin(chAngle) * (subModuleRadius + 50)
                const ChIcon = channel.icon

                return (
                  <motion.div
                    key={channel.label}
                    className="absolute whitespace-nowrap"
                    style={{
                      left: chX,
                      top: chY,
                      transform: 'translate(-50%, -50%)',
                    }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ delay: 0.15 + chIdx * 0.02 }}
                  >
                    <div className="bg-orange-50 rounded-lg shadow-md px-2.5 py-1.5 border border-orange-200 flex items-center gap-1.5">
                      <ChIcon className="w-3.5 h-3.5 text-orange-500" />
                      <span className="text-[10px] font-medium text-orange-700">{channel.label}</span>
                    </div>
                  </motion.div>
                )
              })}

              {/* Extras for Logistics module */}
              {module.extras?.map((extra, exIdx) => {
                const totalExtras = module.extras!.length
                const exAngle = ((module.angle + (exIdx - (totalExtras - 1) / 2) * 18) * Math.PI) / 180
                const exX = Math.cos(exAngle) * (subModuleRadius + 50)
                const exY = Math.sin(exAngle) * (subModuleRadius + 50)
                const ExIcon = extra.icon

                return (
                  <motion.div
                    key={extra.label}
                    className="absolute whitespace-nowrap"
                    style={{
                      left: exX,
                      top: exY,
                      transform: 'translate(-50%, -50%)',
                    }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ delay: 0.15 + exIdx * 0.02 }}
                  >
                    <div className="bg-emerald-50 rounded-lg shadow-md px-2.5 py-1.5 border border-emerald-200 flex items-center gap-1.5">
                      <ExIcon className="w-3.5 h-3.5 text-emerald-500" />
                      <span className="text-[10px] font-medium text-emerald-700">{extra.label}</span>
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}

export function ArchitectureMap() {
  const { t } = useLocale()
  const [activeModule, setActiveModule] = useState<string | null>(null)
  const [autoRotateIndex, setAutoRotateIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  // Автоматическая ротация модулей
  useEffect(() => {
    if (isPaused || activeModule) return
    
    const interval = setInterval(() => {
      setAutoRotateIndex((prev) => (prev + 1) % mainModules.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [isPaused, activeModule])

  const currentActiveModule = activeModule || mainModules[autoRotateIndex].id

  return (
    <section 
      className="py-20 lg:py-32 bg-gradient-to-b from-white via-brand-lightBlue/10 to-white overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => {
        setIsPaused(false)
        setActiveModule(null)
      }}
    >
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.span 
            className="inline-block px-4 py-1.5 bg-brand-darkBlue/10 rounded-full text-sm font-medium text-brand-darkBlue mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            {t('architecture.title')}
          </motion.span>
          <h2 className="text-3xl lg:text-5xl font-bold text-brand-darkBlue mb-4">
            Единая экосистема для бизнеса
          </h2>
          <p className="text-lg text-brand-darkBlue/60 max-w-2xl mx-auto">
            {t('architecture.subtitle')}
          </p>
        </motion.div>

        <div className="relative w-full max-w-4xl mx-auto aspect-square">
          {/* Background decorative elements */}
          <div className="absolute inset-0">
            <motion.div 
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] lg:w-[500px] lg:h-[500px] rounded-full border border-brand-darkBlue/5"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
            />
            <motion.div 
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] lg:w-[380px] lg:h-[380px] rounded-full border border-brand-darkBlue/5"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            />
            <motion.div 
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] lg:w-[260px] lg:h-[260px] rounded-full border border-brand-darkBlue/5"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
          </div>

          {/* Connection Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
            {mainModules.map((module) => (
              <ConnectionLine 
                key={module.id} 
                module={module} 
                isActive={currentActiveModule === module.id}
              />
            ))}
          </svg>

          {/* Center Logo */}
          <motion.div 
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.3 }}
          >
            {/* Pulse rings */}
            {[1, 2, 3].map((ring) => (
              <motion.div
                key={ring}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-brand-darkBlue/20"
                style={{ width: 120 + ring * 20, height: 120 + ring * 20 }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0, 0.5],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: ring * 0.5,
                  ease: "easeInOut"
                }}
              />
            ))}
            
            <motion.div 
              className="relative w-28 h-28 lg:w-36 lg:h-36 bg-white rounded-3xl shadow-2xl flex items-center justify-center border-2 border-brand-darkBlue/10"
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-center">
                <motion.div 
                  className="w-14 h-14 lg:w-18 lg:h-18 mx-auto bg-gradient-to-br from-brand-darkBlue to-slate-700 rounded-2xl flex items-center justify-center mb-1"
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                >
                  <span className="text-white text-2xl lg:text-3xl font-bold">D</span>
                </motion.div>
                <span className="text-brand-darkBlue font-bold text-sm lg:text-base">delever</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Main Modules */}
          {mainModules.map((module) => (
            <ModuleNode
              key={module.id}
              module={module}
              isActive={currentActiveModule === module.id}
              onHover={setActiveModule}
            />
          ))}

          {/* Floating particles */}
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 bg-brand-darkBlue/20 rounded-full"
              style={{ 
                left: `${20 + Math.random() * 60}%`, 
                top: `${20 + Math.random() * 60}%` 
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>

        {/* Legend */}
        <motion.div 
          className="mt-16 flex flex-wrap justify-center gap-3"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          {mainModules.map((module) => {
            const Icon = module.icon
            const isActive = currentActiveModule === module.id
            return (
              <motion.button
                key={module.id}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full transition-all ${
                  isActive 
                    ? 'bg-brand-darkBlue text-white shadow-lg' 
                    : 'bg-white text-brand-darkBlue shadow-sm border border-gray-100 hover:border-brand-darkBlue/20'
                }`}
                onClick={() => setActiveModule(isActive ? null : module.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div 
                  className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    isActive ? 'bg-white/20' : ''
                  }`}
                  style={{ backgroundColor: isActive ? undefined : module.color }}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-white'}`} />
                </div>
                <span className="text-sm font-medium">{module.label}</span>
              </motion.button>
            )
          })}
        </motion.div>

        <motion.p 
          className="text-center text-sm text-brand-darkBlue/40 mt-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7 }}
        >
          {t('architecture.hint')}
        </motion.p>
      </div>
    </section>
  )
}
