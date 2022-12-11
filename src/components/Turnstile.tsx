import { useEffect } from 'react'

interface Props {
  action?: string
  cData?: string
  callback?: (token: string) => void
  'error-callback'?: () => void
  'expired-callback'?: () => void
  theme?: 'light' | 'dark' | 'auto'
  tabindex?: number
  size?: 'normal' | 'invisible' | 'compact'
  'response-field'?: boolean
  'response-field-name'?: string
}

// options for turnstile.render
interface TurnstileOptions extends Props {
  sitekey: string
}

// adds turnstile types to window object
declare global {
  interface Window {
    turnstile: {
      render: (
        idOrContainer: string | HTMLElement,
        options: TurnstileOptions
      ) => string
      reset: (widgetIdOrContainer?: string | HTMLElement) => void
      getResponse: (
        widgetIdOrContainer: string | HTMLElement
      ) => string | undefined
      remove: (widgetIdOrContainer: string | HTMLElement) => void
    }
    onLoadTurnstileCallback: () => void
  }
}

const Turnstile = (props: Props) => {
  useEffect(() => {
    const script = document.createElement('script')
    script.src =
      'https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onLoadTurnstileCallback'
    script.async = true
    script.defer = true
    document.body.appendChild(script)

    const sitekey = import.meta.env.PUBLIC_TURNSTILE_SITEKEY

    window.onLoadTurnstileCallback = () => {
      window.turnstile.render('#turnstile-container', {
        sitekey: sitekey,
        'expired-callback': () => {
          window.turnstile.reset()
        },
        ...props
      })
    }

    return () => document.body.removeChild(script)
  }, [])

  return <div id="turnstile-container" />
}

export default Turnstile
