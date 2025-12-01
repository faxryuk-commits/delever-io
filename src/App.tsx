import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'sonner'
import * as Tooltip from '@radix-ui/react-tooltip'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { Home } from './pages/Home'
import { Products } from './pages/Products'
import { Pricing } from './pages/Pricing'
import { Channels } from './pages/products/Channels'
import { Operations } from './pages/products/Operations'
import { Analytics } from './pages/products/Analytics'
import { Marketing } from './pages/products/Marketing'
import { Integrations } from './pages/Integrations'
import { Partners } from './pages/Partners'
import { About } from './pages/About'
import { NotFound } from './pages/NotFound'

function App() {
  return (
    <Tooltip.Provider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col bg-white">
            <Header />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/channels" element={<Channels />} />
                <Route path="/products/operations" element={<Operations />} />
                <Route path="/products/analytics" element={<Analytics />} />
                <Route path="/products/marketing" element={<Marketing />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/integrations" element={<Integrations />} />
                <Route path="/partners" element={<Partners />} />
                <Route path="/about" element={<About />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        <Toaster position="top-right" />
      </BrowserRouter>
    </Tooltip.Provider>
  )
}

export default App

