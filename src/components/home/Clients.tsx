import { useLocale } from '@/i18n/LocaleContext'

// Клиенты с логотипами
// Загрузите логотипы в public/logos/ с именами: pizza-hut.png, dodo-pizza.png, evos.png, gippo.png, maxway.png, yaponamama.png
const clients = [
  { name: 'Pizza Hut', logo: '/logos/pizza-hut.png' },
  { name: 'Dodo Pizza', logo: '/logos/dodo-pizza.png' },
  { name: 'EVOS', logo: '/logos/evos.png' },
  { name: 'GIPPO', logo: '/logos/gippo.png' },
  { name: 'MAXWAY', logo: '/logos/maxway.png' },
  { name: 'Yaponamama', logo: '/logos/yaponamama.png' },
]

export function Clients() {
  const { t } = useLocale()

  return (
    <section className="py-10 px-4 sm:px-6 lg:px-8 bg-white border-b border-brand-lightTeal/10">
      <div className="container mx-auto max-w-5xl">
        <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-6">
          <span className="text-xs text-brand-darkBlue/40 uppercase tracking-wider font-medium">
            {t('clients.title')}
          </span>
          {clients.map((client, idx) => (
            <div
              key={idx}
              className="relative h-8 w-auto flex items-center"
            >
              <img
                src={client.logo}
                alt={client.name}
                className="h-8 w-auto object-contain grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                onError={(e) => {
                  // Fallback на текст если логотип не найден
                  const target = e.target as HTMLImageElement
                  target.style.display = 'none'
                  const span = document.createElement('span')
                  span.className = 'text-base font-semibold text-brand-darkBlue/35'
                  span.textContent = client.name
                  target.parentElement?.appendChild(span)
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
