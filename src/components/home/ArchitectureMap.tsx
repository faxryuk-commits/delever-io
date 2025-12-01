import { useState } from 'react'
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
  Send
} from 'lucide-react'
import { useLocale } from '@/i18n/LocaleContext'

// Главные модули вокруг центра
const mainModules = [
  { 
    id: 'pos', 
    label: 'POS', 
    color: '#3B82F6', // blue
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
    color: '#F97316', // orange
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
    color: '#EF4444', // red
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
    id: 'analitic', 
    label: 'Analitic', 
    color: '#002A47', // brand
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
    color: '#002A47', // brand
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
    color: '#3B82F6', // blue
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
    color: '#10B981', // green
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
    color: '#8B5CF6', // purple
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

export function ArchitectureMap() {
  const { t } = useLocale()
  const [activeModule, setActiveModule] = useState<string | null>(null)
  const [isAnimating] = useState(true)

  const subModuleRadius = 100

  return (
    <section className="py-20 lg:py-32 bg-gradient-to-b from-white to-brand-lightBlue/20 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-brand-darkBlue mb-4">
            {t('architecture.title')}
          </h2>
          <p className="text-lg text-brand-darkBlue/60 max-w-2xl mx-auto">
            {t('architecture.subtitle')}
          </p>
        </motion.div>

        <div className="relative w-full max-w-5xl mx-auto aspect-square">
          {/* Connection Lines */}
          <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }}>
            {mainModules.map((module, idx) => {
              const angle = (module.angle * Math.PI) / 180
              const x1 = 50
              const y1 = 50
              const x2 = 50 + Math.cos(angle) * 25
              const y2 = 50 + Math.sin(angle) * 25
              
              return (
                <motion.line
                  key={module.id}
                  x1={`${x1}%`}
                  y1={`${y1}%`}
                  x2={`${x2}%`}
                  y2={`${y2}%`}
                  stroke={module.color}
                  strokeWidth="2"
                  strokeDasharray="5,5"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.4 }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                />
              )
            })}
          </svg>

          {/* Center Logo */}
          <motion.div 
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            <motion.div 
              className="w-32 h-32 lg:w-40 lg:h-40 bg-white rounded-3xl shadow-2xl flex items-center justify-center border-4 border-brand-darkBlue/10"
              animate={isAnimating ? { 
                boxShadow: [
                  "0 0 0 0 rgba(0, 42, 71, 0.2)",
                  "0 0 0 20px rgba(0, 42, 71, 0)",
                ]
              } : {}}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="text-center">
                <div className="w-16 h-16 lg:w-20 lg:h-20 mx-auto bg-brand-darkBlue rounded-2xl flex items-center justify-center mb-2">
                  <span className="text-white text-3xl lg:text-4xl font-bold">D</span>
                </div>
                <span className="text-brand-darkBlue font-bold text-lg">delever</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Main Modules */}
          {mainModules.map((module, idx) => {
            const angle = (module.angle * Math.PI) / 180
            const x = 50 + Math.cos(angle) * 32
            const y = 50 + Math.sin(angle) * 32
            const Icon = module.icon
            const isActive = activeModule === module.id

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
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3 + idx * 0.1, type: "spring" }}
              >
                <motion.button
                  className="relative"
                  onMouseEnter={() => setActiveModule(module.id)}
                  onMouseLeave={() => setActiveModule(null)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* Module Circle */}
                  <motion.div
                    className="w-20 h-20 lg:w-24 lg:h-24 rounded-full flex items-center justify-center text-white font-bold shadow-lg cursor-pointer"
                    style={{ backgroundColor: module.color }}
                    animate={isActive ? { scale: 1.15 } : { scale: 1 }}
                  >
                    <div className="text-center">
                      <Icon className="w-6 h-6 lg:w-8 lg:h-8 mx-auto mb-1" />
                      <span className="text-xs lg:text-sm">{module.label}</span>
                    </div>
                  </motion.div>

                  {/* Sub Modules */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        className="absolute"
                        style={{
                          left: '50%',
                          top: '50%',
                        }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        {module.subModules.map((sub, subIdx) => {
                          const subAngle = ((module.angle + 180 + (subIdx - (module.subModules.length - 1) / 2) * 25) * Math.PI) / 180
                          const subX = Math.cos(subAngle) * subModuleRadius
                          const subY = Math.sin(subAngle) * subModuleRadius
                          const SubIcon = sub.icon

                          return (
                            <motion.div
                              key={sub.label}
                              className="absolute bg-white rounded-lg shadow-lg px-3 py-2 whitespace-nowrap border border-gray-100"
                              style={{
                                left: subX,
                                top: subY,
                                transform: 'translate(-50%, -50%)',
                                borderLeftColor: module.color,
                                borderLeftWidth: 3,
                              }}
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              exit={{ scale: 0, opacity: 0 }}
                              transition={{ delay: subIdx * 0.05 }}
                            >
                              <div className="flex items-center gap-2">
                                <SubIcon className="w-4 h-4" style={{ color: module.color }} />
                                <span className="text-xs font-medium text-brand-darkBlue">{sub.label}</span>
                              </div>
                            </motion.div>
                          )
                        })}

                        {/* Extra items for Order module */}
                        {module.channels && module.channels.map((channel, chIdx) => {
                          const chAngle = ((module.angle + (chIdx - (module.channels!.length - 1) / 2) * 20) * Math.PI) / 180
                          const chX = Math.cos(chAngle) * (subModuleRadius + 40)
                          const chY = Math.sin(chAngle) * (subModuleRadius + 40)
                          const ChIcon = channel.icon

                          return (
                            <motion.div
                              key={channel.label}
                              className="absolute bg-orange-50 rounded-lg shadow-md px-2 py-1.5 whitespace-nowrap border border-orange-200"
                              style={{
                                left: chX,
                                top: chY,
                                transform: 'translate(-50%, -50%)',
                              }}
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              exit={{ scale: 0, opacity: 0 }}
                              transition={{ delay: 0.2 + chIdx * 0.03 }}
                            >
                              <div className="flex items-center gap-1.5">
                                <ChIcon className="w-3 h-3 text-orange-500" />
                                <span className="text-[10px] font-medium text-orange-700">{channel.label}</span>
                              </div>
                            </motion.div>
                          )
                        })}

                        {/* Extra items for Logistics module */}
                        {module.extras && module.extras.map((extra, exIdx) => {
                          const exAngle = ((module.angle + (exIdx - (module.extras!.length - 1) / 2) * 20) * Math.PI) / 180
                          const exX = Math.cos(exAngle) * (subModuleRadius + 40)
                          const exY = Math.sin(exAngle) * (subModuleRadius + 40)
                          const ExIcon = extra.icon

                          return (
                            <motion.div
                              key={extra.label}
                              className="absolute bg-emerald-50 rounded-lg shadow-md px-2 py-1.5 whitespace-nowrap border border-emerald-200"
                              style={{
                                left: exX,
                                top: exY,
                                transform: 'translate(-50%, -50%)',
                              }}
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              exit={{ scale: 0, opacity: 0 }}
                              transition={{ delay: 0.2 + exIdx * 0.03 }}
                            >
                              <div className="flex items-center gap-1.5">
                                <ExIcon className="w-3 h-3 text-emerald-500" />
                                <span className="text-[10px] font-medium text-emerald-700">{extra.label}</span>
                              </div>
                            </motion.div>
                          )
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              </motion.div>
            )
          })}

          {/* Animated Particles */}
          {isAnimating && [...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-brand-darkBlue/20 rounded-full"
              style={{ left: '50%', top: '50%' }}
              animate={{
                x: [0, Math.cos((i * 45 * Math.PI) / 180) * 200],
                y: [0, Math.sin((i * 45 * Math.PI) / 180) * 200],
                opacity: [1, 0],
                scale: [1, 0.5],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.3,
                ease: "linear"
              }}
            />
          ))}
        </div>

        {/* Legend */}
        <motion.div 
          className="mt-12 flex flex-wrap justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          {mainModules.map((module) => {
            const Icon = module.icon
            return (
              <div 
                key={module.id}
                className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-gray-100"
              >
                <div 
                  className="w-6 h-6 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: module.color }}
                >
                  <Icon className="w-3 h-3 text-white" />
                </div>
                <span className="text-sm font-medium text-brand-darkBlue">{module.label}</span>
              </div>
            )
          })}
        </motion.div>

        <motion.p 
          className="text-center text-sm text-brand-darkBlue/50 mt-6"
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

