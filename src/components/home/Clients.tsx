
const clients = [
  'Pizza Hut',
  'Dodo Pizza',
  'EVOS',
  'GIPPO',
  'MAXWAY',
  'Yaponamama',
  'Oqtepa Lavash',
  'KFC',
]

export function Clients() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white border-y border-brand-lightTeal/10">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-brand-darkBlue mb-2 tracking-tight">
            Поддерживаемые ведущие сети ресторанов
          </h2>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {clients.map((client, idx) => (
            <div
              key={idx}
              className="text-xl md:text-2xl font-semibold text-brand-darkBlue/50 hover:text-brand-darkBlue/80 transition-colors"
            >
              {client}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

