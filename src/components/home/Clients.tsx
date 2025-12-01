import { useLocale } from '@/i18n/LocaleContext'

const clients = [
  'Pizza Hut',
  'Dodo Pizza',
  'EVOS',
  'GIPPO',
  'MAXWAY',
  'Yaponamama',
]

export function Clients() {
  const { t } = useLocale()

  return (
    <section className="py-8 px-4 sm:px-6 lg:px-8 bg-white border-b border-brand-lightTeal/10">
      <div className="container mx-auto max-w-5xl">
        <div className="flex flex-wrap justify-center items-center gap-x-10 gap-y-4">
          <span className="text-xs text-brand-darkBlue/40 uppercase tracking-wider font-medium">
            {t('clients.title')}:
          </span>
          {clients.map((client, idx) => (
            <span
              key={idx}
              className="text-base font-semibold text-brand-darkBlue/35 hover:text-brand-darkBlue/60 transition-colors"
            >
              {client}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
