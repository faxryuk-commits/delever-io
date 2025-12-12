// Реальные клиенты Delever для social proof и SEO
// Отфильтровано из базы ~1000 регистраций

export interface Client {
  name: string
  slug: string
  category: 'pizza' | 'burger' | 'sushi' | 'chicken' | 'lavash' | 'national' | 'cafe' | 'dessert' | 'delivery' | 'chain'
  logo?: string
  featured: boolean // показывать в главных секциях
  caseStudy?: boolean // есть ли кейс
  locations?: number // количество точек
}

// Топ клиенты для hero секций
export const featuredClients: Client[] = [
  { name: 'EVOS', slug: 'evos', category: 'chain', featured: true, caseStudy: true, locations: 50 },
  { name: 'Yaponamama', slug: 'yaponamama', category: 'sushi', featured: true, caseStudy: true, locations: 30 },
  { name: 'Maxway', slug: 'maxway', category: 'lavash', featured: true, caseStudy: true, locations: 40 },
  { name: 'Bellissimo', slug: 'bellissimo', category: 'pizza', featured: true, locations: 25 },
  { name: 'Oqtepa Lavash', slug: 'oqtepa-lavash', category: 'lavash', featured: true, locations: 20 },
  { name: 'Brasserie', slug: 'brasserie', category: 'cafe', featured: true, locations: 5 },
  { name: 'Chocolocma', slug: 'chocolocma', category: 'dessert', featured: true, locations: 15 },
  { name: 'Dodo Pizza', slug: 'dodo-pizza', category: 'pizza', featured: true, locations: 10 },
]

// Пиццерии
export const pizzaClients: Client[] = [
  { name: 'Dodo Pizza', slug: 'dodo-pizza', category: 'pizza', featured: true, locations: 10 },
  { name: 'Pizza Hut', slug: 'pizza-hut', category: 'pizza', featured: true, locations: 5 },
  { name: 'Papa Johns', slug: 'papa-johns', category: 'pizza', featured: true, locations: 8 },
  { name: 'Bellissimo', slug: 'bellissimo', category: 'pizza', featured: true, locations: 25 },
  { name: 'Roma Pizza', slug: 'roma-pizza', category: 'pizza', featured: false, locations: 3 },
  { name: 'New York Pizza', slug: 'new-york-pizza', category: 'pizza', featured: false, locations: 2 },
  { name: 'Chicago Pizza', slug: 'chicago-pizza', category: 'pizza', featured: false },
  { name: 'Mono Pizza', slug: 'mono-pizza', category: 'pizza', featured: false },
  { name: 'Moskovskiy Pizza', slug: 'moskovskiy-pizza', category: 'pizza', featured: false },
  { name: 'Oppa Pizza', slug: 'oppa-pizza', category: 'pizza', featured: false },
  { name: 'Pizza Square', slug: 'pizza-square', category: 'pizza', featured: false },
  { name: 'Secret Pizza', slug: 'secret-pizza', category: 'pizza', featured: false },
  { name: 'FiboPizza', slug: 'fibo-pizza', category: 'pizza', featured: false },
  { name: 'AloPizza', slug: 'alo-pizza', category: 'pizza', featured: false },
]

// Бургеры
export const burgerClients: Client[] = [
  { name: 'Black Star Burger', slug: 'black-star-burger', category: 'burger', featured: true },
  { name: 'Hardees', slug: 'hardees', category: 'burger', featured: true, locations: 3 },
  { name: 'Best Burger', slug: 'best-burger', category: 'burger', featured: false },
  { name: '571 Burger', slug: '571-burger', category: 'burger', featured: false },
  { name: 'BBQ Burger', slug: 'bbq-burger', category: 'burger', featured: false },
  { name: 'All Off Burger', slug: 'all-off-burger', category: 'burger', featured: false },
  { name: 'Asl Burger', slug: 'asl-burger', category: 'burger', featured: false },
  { name: 'Green Burger', slug: 'green-burger', category: 'burger', featured: false },
  { name: 'Loftburger', slug: 'loftburger', category: 'burger', featured: false },
  { name: 'MC Burger', slug: 'mc-burger', category: 'burger', featured: false },
  { name: 'Seven Burger', slug: 'seven-burger', category: 'burger', featured: false },
  { name: 'Time Burger', slug: 'time-burger', category: 'burger', featured: false },
  { name: 'World Burger', slug: 'world-burger', category: 'burger', featured: false },
  { name: 'Zest Burger', slug: 'zest-burger', category: 'burger', featured: false },
  { name: 'Shef Burger', slug: 'shef-burger', category: 'burger', featured: false },
  { name: 'Brodway Burger', slug: 'brodway-burger', category: 'burger', featured: false },
  { name: 'Ham Ham Burger', slug: 'ham-ham-burger', category: 'burger', featured: false },
]

// Суши и азиатская кухня
export const sushiClients: Client[] = [
  { name: 'Yaponamama', slug: 'yaponamama', category: 'sushi', featured: true, caseStudy: true, locations: 30 },
  { name: 'Sushi Co', slug: 'sushi-co', category: 'sushi', featured: false },
  { name: 'Sushi House', slug: 'sushi-house', category: 'sushi', featured: false },
  { name: 'SushiJo', slug: 'sushi-jo', category: 'sushi', featured: false },
  { name: 'Sushimoto', slug: 'sushimoto', category: 'sushi', featured: false },
  { name: 'SUSHI SARA', slug: 'sushi-sara', category: 'sushi', featured: false },
  { name: 'Wasabi', slug: 'wasabi', category: 'sushi', featured: false },
  { name: 'Miyabi', slug: 'miyabi', category: 'sushi', featured: false },
  { name: 'Takumi', slug: 'takumi', category: 'sushi', featured: false },
  { name: 'Gekko', slug: 'gekko', category: 'sushi', featured: false },
  { name: 'Kitsu Rolls', slug: 'kitsu-rolls', category: 'sushi', featured: false },
  { name: 'iRamen', slug: 'iramen', category: 'sushi', featured: false },
  { name: 'Kung Fu Malatang', slug: 'kung-fu-malatang', category: 'sushi', featured: false },
  { name: 'Wok Point', slug: 'wok-point', category: 'sushi', featured: false },
  { name: 'Tok Poki', slug: 'tok-poki', category: 'sushi', featured: false },
  { name: 'Okadzaki', slug: 'okadzaki', category: 'sushi', featured: false },
  { name: 'Seoul', slug: 'seoul', category: 'sushi', featured: false },
  { name: 'Yoko', slug: 'yoko', category: 'sushi', featured: false },
]

// Лаваш и фастфуд
export const lavashClients: Client[] = [
  { name: 'Maxway', slug: 'maxway', category: 'lavash', featured: true, caseStudy: true, locations: 40 },
  { name: 'EVOS', slug: 'evos', category: 'lavash', featured: true, caseStudy: true, locations: 50 },
  { name: 'Oqtepa Lavash', slug: 'oqtepa-lavash', category: 'lavash', featured: true, locations: 20 },
  { name: 'Grand Lavash', slug: 'grand-lavash', category: 'lavash', featured: false },
  { name: 'Lavash Center', slug: 'lavash-center', category: 'lavash', featured: false },
  { name: 'Enjoy Lavash', slug: 'enjoy-lavash', category: 'lavash', featured: false },
  { name: 'Sodiq Lavash', slug: 'sodiq-lavash', category: 'lavash', featured: false },
  { name: 'Mara Doner', slug: 'mara-doner', category: 'lavash', featured: false },
  { name: 'Bayram Doner', slug: 'bayram-doner', category: 'lavash', featured: false },
  { name: 'Doneria', slug: 'doneria', category: 'lavash', featured: false },
  { name: 'Ali Doner', slug: 'ali-doner', category: 'lavash', featured: false },
  { name: 'Mazzali Doner', slug: 'mazzali-doner', category: 'lavash', featured: false },
  { name: 'Donerci Hamdi Usta', slug: 'donerci-hamdi-usta', category: 'lavash', featured: false },
  { name: 'Muhteshem Doner', slug: 'muhteshem-doner', category: 'lavash', featured: false },
]

// Курица
export const chickenClients: Client[] = [
  { name: 'Chicken Republic', slug: 'chicken-republic', category: 'chicken', featured: true },
  { name: 'Good Chicken', slug: 'good-chicken', category: 'chicken', featured: false },
  { name: 'Dudu Chicken', slug: 'dudu-chicken', category: 'chicken', featured: false, locations: 3 },
  { name: 'Jonon Chicken', slug: 'jonon-chicken', category: 'chicken', featured: false },
  { name: 'Lazzat Chicken', slug: 'lazzat-chicken', category: 'chicken', featured: false },
  { name: 'Mazza Chicken', slug: 'mazza-chicken', category: 'chicken', featured: false },
  { name: 'Sardor Chicken', slug: 'sardor-chicken', category: 'chicken', featured: false },
  { name: 'CTR Chicken', slug: 'ctr-chicken', category: 'chicken', featured: false },
  { name: 'Dots Chicken', slug: 'dots-chicken', category: 'chicken', featured: false },
  { name: 'Nihol Jo\'ja', slug: 'nihol-joja', category: 'chicken', featured: false },
  { name: 'Chicken By Loook', slug: 'chicken-by-loook', category: 'chicken', featured: false },
]

// Национальная кухня
export const nationalClients: Client[] = [
  { name: 'Gijduvon', slug: 'gijduvon', category: 'national', featured: true, locations: 5 },
  { name: 'Chorsu Milliy Taomlar', slug: 'chorsu-milliy', category: 'national', featured: false },
  { name: 'Milliy Taomlar', slug: 'milliy-taomlar', category: 'national', featured: false },
  { name: 'Registan Osh', slug: 'registan-osh', category: 'national', featured: false },
  { name: 'King Plov', slug: 'king-plov', category: 'national', featured: false },
  { name: 'ThePlov', slug: 'the-plov', category: 'national', featured: false },
  { name: 'Plov City', slug: 'plov-city', category: 'national', featured: false },
  { name: 'SQ Plov', slug: 'sq-plov', category: 'national', featured: false },
  { name: 'Bodomzor Somsa', slug: 'bodomzor-somsa', category: 'national', featured: false },
  { name: 'Qarsillama Somsa', slug: 'qarsillama-somsa', category: 'national', featured: false },
  { name: 'Samsariya', slug: 'samsariya', category: 'national', featured: false },
  { name: 'Tandir', slug: 'tandir', category: 'national', featured: false },
  { name: 'Proshashlyk', slug: 'proshashlyk', category: 'national', featured: false },
  { name: 'Beshqozon', slug: 'beshqozon', category: 'national', featured: false },
  { name: 'Mumtoz Uzbek Food', slug: 'mumtoz', category: 'national', featured: false },
  { name: 'Ishtixon Zig\'ir Osh', slug: 'ishtixon', category: 'national', featured: false },
  { name: 'Altyn Palau', slug: 'altyn-palau', category: 'national', featured: false },
]

// Кафе и рестораны
export const cafeClients: Client[] = [
  { name: 'Brasserie', slug: 'brasserie', category: 'cafe', featured: true, locations: 5 },
  { name: 'Traveler\'s Coffee', slug: 'travelers-coffee', category: 'cafe', featured: true },
  { name: 'Cambridge Cafe', slug: 'cambridge-cafe', category: 'cafe', featured: false },
  { name: 'Gracia', slug: 'gracia', category: 'cafe', featured: false },
  { name: 'Amici', slug: 'amici', category: 'cafe', featured: false },
  { name: 'La Terrassa', slug: 'la-terrassa', category: 'cafe', featured: false },
  { name: 'Palermo', slug: 'palermo', category: 'cafe', featured: false, locations: 3 },
  { name: 'Stuzzico', slug: 'stuzzico', category: 'cafe', featured: false },
  { name: 'Perfetto', slug: 'perfetto', category: 'cafe', featured: false },
  { name: 'Italiano', slug: 'italiano', category: 'cafe', featured: false },
  { name: 'Dolcetta', slug: 'dolcetta', category: 'cafe', featured: false },
  { name: 'Cremona', slug: 'cremona', category: 'cafe', featured: false },
  { name: 'Bistoria', slug: 'bistoria', category: 'cafe', featured: false },
  { name: 'Coffee Star', slug: 'coffee-star', category: 'cafe', featured: false },
  { name: 'Ibis Styles', slug: 'ibis-styles', category: 'cafe', featured: false },
]

// Десерты
export const dessertClients: Client[] = [
  { name: 'Chocolocma', slug: 'chocolocma', category: 'dessert', featured: true, locations: 15 },
  { name: 'Pinkberry', slug: 'pinkberry', category: 'dessert', featured: true },
  { name: 'ColdStone', slug: 'coldstone', category: 'dessert', featured: false },
  { name: 'Chocco Berry', slug: 'chocco-berry', category: 'dessert', featured: false },
  { name: 'dipndip', slug: 'dipndip', category: 'dessert', featured: false },
  { name: 'Croissant', slug: 'croissant', category: 'dessert', featured: false },
  { name: 'Ekleriston', slug: 'ekleriston', category: 'dessert', featured: false },
  { name: 'Aziza Cake', slug: 'aziza-cake', category: 'dessert', featured: false },
  { name: 'Breadly', slug: 'breadly', category: 'dessert', featured: false },
  { name: 'CAKEASIA', slug: 'cakeasia', category: 'dessert', featured: false },
]

// Доставка и маркеты
export const deliveryClients: Client[] = [
  { name: 'Zipbox', slug: 'zipbox', category: 'delivery', featured: false },
  { name: 'EzozGo', slug: 'ezozgo', category: 'delivery', featured: false },
  { name: 'Feedup', slug: 'feedup', category: 'delivery', featured: false },
  { name: 'Tez Store', slug: 'tez-store', category: 'delivery', featured: false },
  { name: 'Healthy Food', slug: 'healthy-food', category: 'delivery', featured: false },
  { name: 'Diet Cafe', slug: 'diet-cafe', category: 'delivery', featured: false },
  { name: 'CosmoBox', slug: 'cosmobox', category: 'delivery', featured: false },
  { name: 'Easy Box', slug: 'easy-box', category: 'delivery', featured: false },
]

// Все клиенты
export const allClients: Client[] = [
  ...featuredClients,
  ...pizzaClients.filter(c => !featuredClients.find(f => f.slug === c.slug)),
  ...burgerClients,
  ...sushiClients.filter(c => !featuredClients.find(f => f.slug === c.slug)),
  ...lavashClients.filter(c => !featuredClients.find(f => f.slug === c.slug)),
  ...chickenClients,
  ...nationalClients,
  ...cafeClients.filter(c => !featuredClients.find(f => f.slug === c.slug)),
  ...dessertClients.filter(c => !featuredClients.find(f => f.slug === c.slug)),
  ...deliveryClients,
]

// Статистика
export const clientStats = {
  total: allClients.length,
  totalLocations: allClients.reduce((sum, c) => sum + (c.locations || 1), 0),
  categories: {
    pizza: pizzaClients.length,
    burger: burgerClients.length,
    sushi: sushiClients.length,
    lavash: lavashClients.length,
    chicken: chickenClients.length,
    national: nationalClients.length,
    cafe: cafeClients.length,
    dessert: dessertClients.length,
    delivery: deliveryClients.length,
  }
}

// Получить клиентов по категории
export function getClientsByCategory(category: Client['category']): Client[] {
  return allClients.filter(c => c.category === category)
}

// Получить featured клиентов
export function getFeaturedClients(): Client[] {
  return allClients.filter(c => c.featured)
}

// Названия категорий для UI
export const categoryNames = {
  ru: {
    pizza: 'Пиццерии',
    burger: 'Бургерные',
    sushi: 'Суши и азиатская кухня',
    lavash: 'Лаваш и фастфуд',
    chicken: 'Курица',
    national: 'Национальная кухня',
    cafe: 'Кафе и рестораны',
    dessert: 'Десерты',
    delivery: 'Доставка и маркеты',
    chain: 'Сети ресторанов'
  },
  en: {
    pizza: 'Pizzerias',
    burger: 'Burger Restaurants',
    sushi: 'Sushi & Asian',
    lavash: 'Lavash & Fast Food',
    chicken: 'Chicken',
    national: 'National Cuisine',
    cafe: 'Cafes & Restaurants',
    dessert: 'Desserts',
    delivery: 'Delivery & Markets',
    chain: 'Restaurant Chains'
  },
  uz: {
    pizza: 'Pizzeriyalar',
    burger: 'Burger restoranlar',
    sushi: 'Sushi va Osiyo taomlari',
    lavash: 'Lavash va fast food',
    chicken: 'Tovuq',
    national: 'Milliy taomlar',
    cafe: 'Kafe va restoranlar',
    dessert: 'Desertlar',
    delivery: 'Yetkazib berish va marketlar',
    chain: 'Restoran tarmoqlari'
  }
}
