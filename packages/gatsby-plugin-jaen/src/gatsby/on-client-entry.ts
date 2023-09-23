import {GatsbyBrowser} from 'gatsby'
import {JaenPluginOptions} from './types'

export const onClientEntry: GatsbyBrowser['onClientEntry'] = async (
  _,
  pluginOptions: JaenPluginOptions
) => {
  // Get access to the cookie consent
  let cc = window.cookieConsent

  if (!cc) {
    cc = window.initCookieConsent()
  }

  // Check if analytics is enabled
  if (!cc.allowedCategory('analytics')) {
    const googleAnaltyticsTrackingId =
      pluginOptions.googleAnalytics?.trackingIds?.[0]

    if (googleAnaltyticsTrackingId) {
      // @ts-ignore
      window[`ga-disable-${googleAnaltyticsTrackingId}`] = true
    }
  }
}