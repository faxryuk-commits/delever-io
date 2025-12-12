import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { Toaster } from 'sonner'
import * as Tooltip from '@radix-ui/react-tooltip'
import { LocaleProvider } from './i18n/LocaleContext'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { ScrollToTop } from './components/ScrollToTop'
import { ChatWidget } from './components/ChatWidget'
import { CookieConsent } from './components/CookieConsent'
import { SEO } from './components/SEO'
import { Analytics as GoogleAnalytics } from './components/Analytics'
import { Home } from './pages/Home'
import { Products } from './pages/Products'
import { Pricing } from './pages/Pricing'
import { Channels } from './pages/products/Channels'
import { Operations } from './pages/products/Operations'
import { Analytics as AnalyticsPage } from './pages/products/Analytics'
import { Marketing } from './pages/products/Marketing'
import { Integrations } from './pages/Integrations'
import { Partners } from './pages/Partners'
import { About } from './pages/About'
import { WhiteLabel } from './pages/WhiteLabel'
import { Aggregators } from './pages/Aggregators'
import { ESG } from './pages/ESG'
import { Investors } from './pages/Investors'
import { AIMarketing } from './pages/AIMarketing'
import { MenuDoctor } from './pages/MenuDoctor'
import { Clients } from './pages/Clients'
import { SiteMap } from './pages/SiteMap'
import { CaseStudies } from './pages/CaseStudies'
import { CaseStudyRoute } from './pages/case-studies/[slug]'
import { NotFound } from './pages/NotFound'
import { AnnouncementBar } from './components/AnnouncementBar'

// SEO Pages (dynamic)
import { IntegrationPage } from './pages/integrations/[slug]'
import { AggregatorPage } from './pages/aggregators/[slug]'
import { DeliveryPage } from './pages/delivery/[slug]'
import { SolutionPage } from './pages/solutions/[slug]'
import { ComparePage } from './pages/compare/[slug]'
import { GuidesHub } from './pages/guides/index'
import { GuidePage } from './pages/guides/[slug]'
import { DynamicGeoPage } from './pages/geo/[slug]'

function App() {
  return (
    <HelmetProvider>
    <LocaleProvider>
      <Tooltip.Provider>
        <BrowserRouter>
        <ScrollToTop />
        <SEO />
        <GoogleAnalytics measurementId="G-CWX242TQDH" yandexId={105636261} />
        <div className="min-h-screen flex flex-col bg-white">
            <AnnouncementBar />
            <Header />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/channels" element={<Channels />} />
                <Route path="/products/operations" element={<Operations />} />
                <Route path="/products/analytics" element={<AnalyticsPage />} />
                <Route path="/products/marketing" element={<Marketing />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/integrations" element={<Integrations />} />
                <Route path="/partners" element={<Partners />} />
                <Route path="/about" element={<About />} />
                <Route path="/white-label" element={<WhiteLabel />} />
                <Route path="/aggregators" element={<Aggregators />} />
                <Route path="/esg" element={<ESG />} />
                <Route path="/investors" element={<Investors />} />
                <Route path="/ai-marketing" element={<AIMarketing />} />
                <Route path="/menu-doctor" element={<MenuDoctor />} />
                <Route path="/clients" element={<Clients />} />
                <Route path="/case-studies" element={<CaseStudies />} />
                <Route path="/case-studies/:slug" element={<CaseStudyRoute />} />
                <Route path="/sitemap-preview" element={<SiteMap />} />
                
                {/* SEO Pages - Integrations */}
                <Route path="/integrations/:slug" element={<IntegrationPage />} />
                
                {/* SEO Pages - Aggregators */}
                <Route path="/aggregators/:slug" element={<AggregatorPage />} />
                
                {/* SEO Pages - Delivery Services */}
                <Route path="/delivery/:slug" element={<DeliveryPage />} />
                
                {/* SEO Pages - Business Solutions */}
                <Route path="/solutions/:slug" element={<SolutionPage />} />
                
                {/* SEO Pages - Geo */}
                
                {/* SEO Pages - Comparison */}
                <Route path="/compare/:slug" element={<ComparePage />} />
                
                {/* Knowledge Hub - Guides */}
                <Route path="/guides" element={<GuidesHub />} />
                <Route path="/guides/*" element={<GuidePage />} />
                
                {/* Geo Pages - Programmatic SEO */}
                <Route path="/geo/*" element={<DynamicGeoPage />} />
                
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
          <ChatWidget />
          <CookieConsent />
          <Toaster position="top-right" />
        </BrowserRouter>
      </Tooltip.Provider>
    </LocaleProvider>
    </HelmetProvider>
  )
}

export default App

