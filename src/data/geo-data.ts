// GEO Data — Все города присутствия Delever
// Используется для programmatic SEO генерации страниц

export interface City {
  slug: string
  name: { ru: string; en: string; uz: string }
  country: string
  countrySlug: string
  population: string // для контента
  restaurantCount: string // примерное количество ресторанов
  isActive: boolean // активный рынок Delever
  timezone: string
}

export interface Country {
  slug: string
  name: { ru: string; en: string; uz: string }
  flag: string
  currency: { code: string; symbol: string; name: { ru: string; en: string; uz: string } }
  isActive: boolean
}

// ============================================
// СТРАНЫ
// ============================================
export const countries: Country[] = [
  {
    slug: 'uzbekistan',
    name: { ru: 'Узбекистан', en: 'Uzbekistan', uz: 'O\'zbekiston' },
    flag: '🇺🇿',
    currency: { code: 'UZS', symbol: 'сум', name: { ru: 'узбекский сум', en: 'Uzbek sum', uz: 'o\'zbek so\'mi' } },
    isActive: true
  },
  {
    slug: 'kazakhstan',
    name: { ru: 'Казахстан', en: 'Kazakhstan', uz: 'Qozog\'iston' },
    flag: '🇰🇿',
    currency: { code: 'KZT', symbol: '₸', name: { ru: 'казахстанский тенге', en: 'Kazakh tenge', uz: 'qozog\'iston tengesi' } },
    isActive: true
  },
  {
    slug: 'uae',
    name: { ru: 'ОАЭ', en: 'UAE', uz: 'BAA' },
    flag: '🇦🇪',
    currency: { code: 'AED', symbol: 'د.إ', name: { ru: 'дирхам ОАЭ', en: 'UAE Dirham', uz: 'BAA dirhami' } },
    isActive: true
  },
  {
    slug: 'qatar',
    name: { ru: 'Катар', en: 'Qatar', uz: 'Qatar' },
    flag: '🇶🇦',
    currency: { code: 'QAR', symbol: 'ر.ق', name: { ru: 'катарский риал', en: 'Qatari Riyal', uz: 'Qatar riyoli' } },
    isActive: true
  },
  {
    slug: 'azerbaijan',
    name: { ru: 'Азербайджан', en: 'Azerbaijan', uz: 'Ozarbayjon' },
    flag: '🇦🇿',
    currency: { code: 'AZN', symbol: '₼', name: { ru: 'азербайджанский манат', en: 'Azerbaijani Manat', uz: 'Ozarbayjon manati' } },
    isActive: true
  },
  {
    slug: 'kyrgyzstan',
    name: { ru: 'Кыргызстан', en: 'Kyrgyzstan', uz: 'Qirg\'iziston' },
    flag: '🇰🇬',
    currency: { code: 'KGS', symbol: 'с', name: { ru: 'кыргызский сом', en: 'Kyrgyz Som', uz: 'Qirg\'iziston somi' } },
    isActive: true
  },
  {
    slug: 'tajikistan',
    name: { ru: 'Таджикистан', en: 'Tajikistan', uz: 'Tojikiston' },
    flag: '🇹🇯',
    currency: { code: 'TJS', symbol: 'смн', name: { ru: 'таджикский сомони', en: 'Tajik Somoni', uz: 'Tojikiston somonisi' } },
    isActive: true
  },
  {
    slug: 'georgia',
    name: { ru: 'Грузия', en: 'Georgia', uz: 'Gruziya' },
    flag: '🇬🇪',
    currency: { code: 'GEL', symbol: '₾', name: { ru: 'грузинский лари', en: 'Georgian Lari', uz: 'Gruziya larisi' } },
    isActive: true
  }
]

// ============================================
// ГОРОДА — УЗБЕКИСТАН
// ============================================
export const uzbekistanCities: City[] = [
  {
    slug: 'tashkent',
    name: { ru: 'Ташкент', en: 'Tashkent', uz: 'Toshkent' },
    country: 'Узбекистан',
    countrySlug: 'uzbekistan',
    population: '2.9 млн',
    restaurantCount: '3000+',
    isActive: true,
    timezone: 'UTC+5'
  },
  {
    slug: 'samarkand',
    name: { ru: 'Самарканд', en: 'Samarkand', uz: 'Samarqand' },
    country: 'Узбекистан',
    countrySlug: 'uzbekistan',
    population: '550 тыс',
    restaurantCount: '500+',
    isActive: true,
    timezone: 'UTC+5'
  },
  {
    slug: 'bukhara',
    name: { ru: 'Бухара', en: 'Bukhara', uz: 'Buxoro' },
    country: 'Узбекистан',
    countrySlug: 'uzbekistan',
    population: '280 тыс',
    restaurantCount: '300+',
    isActive: true,
    timezone: 'UTC+5'
  },
  {
    slug: 'fergana',
    name: { ru: 'Фергана', en: 'Fergana', uz: 'Farg\'ona' },
    country: 'Узбекистан',
    countrySlug: 'uzbekistan',
    population: '350 тыс',
    restaurantCount: '400+',
    isActive: true,
    timezone: 'UTC+5'
  },
  {
    slug: 'namangan',
    name: { ru: 'Наманган', en: 'Namangan', uz: 'Namangan' },
    country: 'Узбекистан',
    countrySlug: 'uzbekistan',
    population: '600 тыс',
    restaurantCount: '450+',
    isActive: true,
    timezone: 'UTC+5'
  },
  {
    slug: 'andijan',
    name: { ru: 'Андижан', en: 'Andijan', uz: 'Andijon' },
    country: 'Узбекистан',
    countrySlug: 'uzbekistan',
    population: '450 тыс',
    restaurantCount: '400+',
    isActive: true,
    timezone: 'UTC+5'
  },
  {
    slug: 'nukus',
    name: { ru: 'Нукус', en: 'Nukus', uz: 'Nukus' },
    country: 'Узбекистан',
    countrySlug: 'uzbekistan',
    population: '320 тыс',
    restaurantCount: '200+',
    isActive: true,
    timezone: 'UTC+5'
  },
  {
    slug: 'karshi',
    name: { ru: 'Карши', en: 'Karshi', uz: 'Qarshi' },
    country: 'Узбекистан',
    countrySlug: 'uzbekistan',
    population: '280 тыс',
    restaurantCount: '250+',
    isActive: true,
    timezone: 'UTC+5'
  },
  {
    slug: 'jizzakh',
    name: { ru: 'Джизак', en: 'Jizzakh', uz: 'Jizzax' },
    country: 'Узбекистан',
    countrySlug: 'uzbekistan',
    population: '180 тыс',
    restaurantCount: '150+',
    isActive: true,
    timezone: 'UTC+5'
  },
  {
    slug: 'navoi',
    name: { ru: 'Навои', en: 'Navoi', uz: 'Navoiy' },
    country: 'Узбекистан',
    countrySlug: 'uzbekistan',
    population: '150 тыс',
    restaurantCount: '150+',
    isActive: true,
    timezone: 'UTC+5'
  },
  {
    slug: 'termez',
    name: { ru: 'Термез', en: 'Termez', uz: 'Termiz' },
    country: 'Узбекистан',
    countrySlug: 'uzbekistan',
    population: '140 тыс',
    restaurantCount: '100+',
    isActive: true,
    timezone: 'UTC+5'
  },
  {
    slug: 'urgench',
    name: { ru: 'Ургенч', en: 'Urgench', uz: 'Urganch' },
    country: 'Узбекистан',
    countrySlug: 'uzbekistan',
    population: '180 тыс',
    restaurantCount: '150+',
    isActive: true,
    timezone: 'UTC+5'
  },
  {
    slug: 'khiva',
    name: { ru: 'Хива', en: 'Khiva', uz: 'Xiva' },
    country: 'Узбекистан',
    countrySlug: 'uzbekistan',
    population: '60 тыс',
    restaurantCount: '100+',
    isActive: true,
    timezone: 'UTC+5'
  }
]

// ============================================
// ГОРОДА — КАЗАХСТАН
// ============================================
export const kazakhstanCities: City[] = [
  {
    slug: 'almaty',
    name: { ru: 'Алматы', en: 'Almaty', uz: 'Olma-ota' },
    country: 'Казахстан',
    countrySlug: 'kazakhstan',
    population: '2.1 млн',
    restaurantCount: '4000+',
    isActive: true,
    timezone: 'UTC+6'
  },
  {
    slug: 'astana',
    name: { ru: 'Астана', en: 'Astana', uz: 'Ostona' },
    country: 'Казахстан',
    countrySlug: 'kazakhstan',
    population: '1.3 млн',
    restaurantCount: '2000+',
    isActive: true,
    timezone: 'UTC+6'
  },
  {
    slug: 'shymkent',
    name: { ru: 'Шымкент', en: 'Shymkent', uz: 'Chimkent' },
    country: 'Казахстан',
    countrySlug: 'kazakhstan',
    population: '1.1 млн',
    restaurantCount: '1500+',
    isActive: true,
    timezone: 'UTC+5'
  },
  {
    slug: 'karaganda',
    name: { ru: 'Караганда', en: 'Karaganda', uz: 'Qorag\'andi' },
    country: 'Казахстан',
    countrySlug: 'kazakhstan',
    population: '500 тыс',
    restaurantCount: '800+',
    isActive: true,
    timezone: 'UTC+6'
  },
  {
    slug: 'aktobe',
    name: { ru: 'Актобе', en: 'Aktobe', uz: 'Oqto\'be' },
    country: 'Казахстан',
    countrySlug: 'kazakhstan',
    population: '500 тыс',
    restaurantCount: '600+',
    isActive: true,
    timezone: 'UTC+5'
  },
  {
    slug: 'atyrau',
    name: { ru: 'Атырау', en: 'Atyrau', uz: 'Atirau' },
    country: 'Казахстан',
    countrySlug: 'kazakhstan',
    population: '280 тыс',
    restaurantCount: '400+',
    isActive: true,
    timezone: 'UTC+5'
  },
  {
    slug: 'pavlodar',
    name: { ru: 'Павлодар', en: 'Pavlodar', uz: 'Pavlodar' },
    country: 'Казахстан',
    countrySlug: 'kazakhstan',
    population: '340 тыс',
    restaurantCount: '400+',
    isActive: true,
    timezone: 'UTC+6'
  },
  {
    slug: 'semey',
    name: { ru: 'Семей', en: 'Semey', uz: 'Semey' },
    country: 'Казахстан',
    countrySlug: 'kazakhstan',
    population: '350 тыс',
    restaurantCount: '350+',
    isActive: true,
    timezone: 'UTC+6'
  },
  {
    slug: 'taraz',
    name: { ru: 'Тараз', en: 'Taraz', uz: 'Taroz' },
    country: 'Казахстан',
    countrySlug: 'kazakhstan',
    population: '360 тыс',
    restaurantCount: '350+',
    isActive: true,
    timezone: 'UTC+6'
  },
  {
    slug: 'kostanay',
    name: { ru: 'Костанай', en: 'Kostanay', uz: 'Qo\'stanay' },
    country: 'Казахстан',
    countrySlug: 'kazakhstan',
    population: '240 тыс',
    restaurantCount: '250+',
    isActive: true,
    timezone: 'UTC+6'
  }
]

// ============================================
// ГОРОДА — ОАЭ
// ============================================
export const uaeCities: City[] = [
  {
    slug: 'dubai',
    name: { ru: 'Дубай', en: 'Dubai', uz: 'Dubay' },
    country: 'ОАЭ',
    countrySlug: 'uae',
    population: '3.5 млн',
    restaurantCount: '12000+',
    isActive: true,
    timezone: 'UTC+4'
  },
  {
    slug: 'abu-dhabi',
    name: { ru: 'Абу-Даби', en: 'Abu Dhabi', uz: 'Abu-Dabi' },
    country: 'ОАЭ',
    countrySlug: 'uae',
    population: '1.5 млн',
    restaurantCount: '5000+',
    isActive: true,
    timezone: 'UTC+4'
  },
  {
    slug: 'sharjah',
    name: { ru: 'Шарджа', en: 'Sharjah', uz: 'Sharja' },
    country: 'ОАЭ',
    countrySlug: 'uae',
    population: '1.4 млн',
    restaurantCount: '3000+',
    isActive: true,
    timezone: 'UTC+4'
  }
]

// ============================================
// ГОРОДА — КАТАР
// ============================================
export const qatarCities: City[] = [
  {
    slug: 'doha',
    name: { ru: 'Доха', en: 'Doha', uz: 'Do\'ha' },
    country: 'Катар',
    countrySlug: 'qatar',
    population: '2.4 млн',
    restaurantCount: '6000+',
    isActive: true,
    timezone: 'UTC+3'
  }
]

// ============================================
// ГОРОДА — АЗЕРБАЙДЖАН
// ============================================
export const azerbaijanCities: City[] = [
  {
    slug: 'baku',
    name: { ru: 'Баку', en: 'Baku', uz: 'Boku' },
    country: 'Азербайджан',
    countrySlug: 'azerbaijan',
    population: '2.3 млн',
    restaurantCount: '3000+',
    isActive: true,
    timezone: 'UTC+4'
  },
  {
    slug: 'ganja',
    name: { ru: 'Гянджа', en: 'Ganja', uz: 'Ganja' },
    country: 'Азербайджан',
    countrySlug: 'azerbaijan',
    population: '350 тыс',
    restaurantCount: '400+',
    isActive: true,
    timezone: 'UTC+4'
  }
]

// ============================================
// ГОРОДА — КЫРГЫЗСТАН
// ============================================
export const kyrgyzstanCities: City[] = [
  {
    slug: 'bishkek',
    name: { ru: 'Бишкек', en: 'Bishkek', uz: 'Bishkek' },
    country: 'Кыргызстан',
    countrySlug: 'kyrgyzstan',
    population: '1.1 млн',
    restaurantCount: '2000+',
    isActive: true,
    timezone: 'UTC+6'
  },
  {
    slug: 'osh',
    name: { ru: 'Ош', en: 'Osh', uz: 'O\'sh' },
    country: 'Кыргызстан',
    countrySlug: 'kyrgyzstan',
    population: '300 тыс',
    restaurantCount: '400+',
    isActive: true,
    timezone: 'UTC+6'
  }
]

// ============================================
// ГОРОДА — ТАДЖИКИСТАН
// ============================================
export const tajikistanCities: City[] = [
  {
    slug: 'dushanbe',
    name: { ru: 'Душанбе', en: 'Dushanbe', uz: 'Dushanbe' },
    country: 'Таджикистан',
    countrySlug: 'tajikistan',
    population: '900 тыс',
    restaurantCount: '1000+',
    isActive: true,
    timezone: 'UTC+5'
  }
]

// ============================================
// ГОРОДА — ГРУЗИЯ
// ============================================
export const georgiaCities: City[] = [
  {
    slug: 'tbilisi',
    name: { ru: 'Тбилиси', en: 'Tbilisi', uz: 'Tbilisi' },
    country: 'Грузия',
    countrySlug: 'georgia',
    population: '1.2 млн',
    restaurantCount: '3000+',
    isActive: true,
    timezone: 'UTC+4'
  },
  {
    slug: 'batumi',
    name: { ru: 'Батуми', en: 'Batumi', uz: 'Batumi' },
    country: 'Грузия',
    countrySlug: 'georgia',
    population: '180 тыс',
    restaurantCount: '800+',
    isActive: true,
    timezone: 'UTC+4'
  }
]

// ============================================
// ВСЕ ГОРОДА
// ============================================
export const allCities: City[] = [
  ...uzbekistanCities,
  ...kazakhstanCities,
  ...uaeCities,
  ...qatarCities,
  ...azerbaijanCities,
  ...kyrgyzstanCities,
  ...tajikistanCities,
  ...georgiaCities
]

// Получить город по slug
export function getCityBySlug(slug: string): City | undefined {
  return allCities.find(c => c.slug === slug)
}

// Получить страну по slug
export function getCountryBySlug(slug: string): Country | undefined {
  return countries.find(c => c.slug === slug)
}

// Получить города страны
export function getCitiesByCountry(countrySlug: string): City[] {
  return allCities.filter(c => c.countrySlug === countrySlug)
}

// Статистика
export const geoStats = {
  countries: countries.length,
  cities: allCities.length,
  activeCities: allCities.filter(c => c.isActive).length
}
