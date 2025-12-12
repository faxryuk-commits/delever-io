import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Google Analytics 4 & Yandex Metrika
declare global {
  interface Window {
    gtag: (...args: unknown[]) => void
    dataLayer: unknown[]
    ym: (...args: unknown[]) => void
  }
}

interface AnalyticsProps {
  measurementId?: string // GA4 Measurement ID (G-XXXXXXXXXX)
  yandexId?: number // Yandex Metrika ID
}

export function Analytics({ measurementId, yandexId }: AnalyticsProps) {
  const location = useLocation()

  useEffect(() => {
    // Google Analytics 4
    if (measurementId && !document.getElementById('ga-script')) {
      const script = document.createElement('script')
      script.id = 'ga-script'
      script.async = true
      script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`
      document.head.appendChild(script)
      
      window.dataLayer = window.dataLayer || []
      window.gtag = function gtag() {
        window.dataLayer.push(arguments)
      }
      window.gtag('js', new Date())
      window.gtag('config', measurementId, {
        page_title: document.title,
        page_location: window.location.href,
        page_path: location.pathname,
      })
    }
    
    // Yandex Metrika
    if (yandexId && !document.getElementById('ym-script')) {
      const script = document.createElement('script')
      script.id = 'ym-script'
      script.type = 'text/javascript'
      script.innerHTML = `
        (function(m,e,t,r,i,k,a){
          m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
          m[i].l=1*new Date();
          for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
          k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
        })(window, document, 'script', 'https://mc.yandex.ru/metrika/tag.js', 'ym');
        ym(${yandexId}, 'init', {
          clickmap: true,
          trackLinks: true,
          accurateTrackBounce: true,
          webvisor: true,
          ecommerce: 'dataLayer'
        });
      `
      document.head.appendChild(script)
      
      // Fallback noscript image
      const noscript = document.createElement('noscript')
      noscript.innerHTML = `<div><img src="https://mc.yandex.ru/watch/${yandexId}" style="position:absolute; left:-9999px;" alt="" /></div>`
      document.body.appendChild(noscript)
    }
  }, [measurementId, yandexId])

  // Track page views on route change
  useEffect(() => {
    // Google Analytics
    if (measurementId && window.gtag) {
      window.gtag('event', 'page_view', {
        page_title: document.title,
        page_location: window.location.href,
        page_path: location.pathname,
      })
    }
    
    // Yandex Metrika
    if (yandexId && window.ym) {
      window.ym(yandexId, 'hit', location.pathname, {
        title: document.title
      })
    }
  }, [location, measurementId, yandexId])

  return null
}

// Yandex Metrika ID for reachGoal
const YM_ID = 105636261

// Helper functions for tracking events
export const trackEvent = (
  eventName: string,
  eventParams?: Record<string, unknown>
) => {
  console.log('📊 Track Event:', eventName, eventParams)
  
  // Google Analytics - используем beacon для гарантированной отправки
  if (window.gtag) {
    window.gtag('event', eventName, {
      ...eventParams,
      send_to: 'G-CWX242TQDH',
      transport_type: 'beacon', // Гарантирует отправку даже при закрытии страницы
    })
    console.log('✅ GA4 event sent:', eventName)
  } else {
    console.warn('⚠️ gtag not available')
  }
  
  // Yandex Metrika - reachGoal для целей
  if (window.ym) {
    window.ym(YM_ID, 'reachGoal', eventName, eventParams)
    console.log('✅ Yandex goal sent:', eventName)
  } else {
    console.warn('⚠️ ym not available')
  }
}

// Pre-defined events for common actions
export const trackEvents = {
  // CTA button clicks (open form)
  ctaClick: (buttonLocation: string) =>
    trackEvent('cta_click', { button_location: buttonLocation }),
  
  // Form opens
  formOpen: (formLocation: string) =>
    trackEvent('form_open', { form_location: formLocation }),
  
  // Form submissions
  contactFormSubmit: (formLocation: string) => 
    trackEvent('generate_lead', { form_location: formLocation }),
  
  demoRequest: () => 
    trackEvent('demo_request', { method: 'form' }),
  
  // Calculator interactions
  downloadProposal: (planName: string, totalPrice: number) => 
    trackEvent('download_proposal', { plan_name: planName, value: totalPrice }),
  
  calculatorComplete: (situation: string, planName: string) => 
    trackEvent('calculator_complete', { situation, plan_name: planName }),
  
  // Navigation
  externalLinkClick: (linkUrl: string, linkText: string) => 
    trackEvent('external_link_click', { link_url: linkUrl, link_text: linkText }),
  
  // Engagement
  scrollDepth: (percent: number) => 
    trackEvent('scroll_depth', { percent }),
  
  timeOnPage: (seconds: number, pagePath: string) => 
    trackEvent('time_on_page', { seconds, page_path: pagePath }),
}

