declare global {
  interface Window {
    fbq: any;
  }
}

export const FB_PIXEL_ID = '1182980840066132'

export const pageview = () => {
  window.fbq('track', 'PageView')
}

export const signup = (data: { name: string, contact: string }) => {
  window.fbq('track', 'Lead', data)
}