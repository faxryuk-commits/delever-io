import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Google Analytics 4
declare global {
  interface Window {
    gtag: (...args: unknown[]) => void
    dataLayer: unknown[]
  }
}

interface AnalyticsProps {
  measurementId?: string // GA4 Measurement ID (G-XXXXXXXXXX)
}

export function Analytics({ measurementId }: AnalyticsProps) {
  const location = useLocation()

  useEffect(() => {
    // Skip if no measurement ID or not in production
    if (!measurementId) return
    
    // Load GA4 script if not already loaded
    if (!document.getElementById('ga-script')) {
      const script = document.createElement('script')
      script.id = 'ga-script'
      script.async = true
      script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`
      document.head.appendChild(script)
      
      // Initialize dataLayer
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
  }, [measurementId])

  // Track page views on route change
  useEffect(() => {
    if (measurementId && window.gtag) {
      window.gtag('event', 'page_view', {
        page_title: document.title,
        page_location: window.location.href,
        page_path: location.pathname,
      })
    }
  }, [location, measurementId])

  return null
}

// Helper functions for tracking events
export const trackEvent = (
  eventName: string,
  eventParams?: Record<string, unknown>
) => {
  if (window.gtag) {
    window.gtag('event', eventName, eventParams)
  }
}

// Pre-defined events for common actions
export const trackEvents = {
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

