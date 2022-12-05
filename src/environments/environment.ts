// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  PORTAL_API_URL: 'https://app-eus-cms-internal-portalapi-dev.azurewebsites.net/',
  AUTH_API_URL: 'https://app-eus-cms-internal-usermgmt-dev.azurewebsites.net/',
  USER_API_URL: 'https://app-eus-cms-internal-usermgmt-dev.azurewebsites.net/api/',
  DIAGNOSTIC_API_URL: 'https://app-eus-cms-internal-usermgmt-dev.azurewebsites.net/',
  ASSET_API_URL: 'https://app-eus-cms-internal-assets-dev.azurewebsites.net/api/',
  REPORT_API_URL: 'https://app-eus-cms-internal-report-dev.azurewebsites.net/api/',
  PRICING_API_URL: 'https://pricing-service.azurewebsites.net/api/',
  NOTIFICATION_API_URL:
    'https://notification-appservices.azurewebsites.net/api/',
  imagePath: '',
  onProd: 0,
  isPlatform: 'Development Platform',
  isPlatformMsg: '',
  versionNumber: 'Dev v 1.0',
  PASSWORD_PRIVATE_KEY: '',

}
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
