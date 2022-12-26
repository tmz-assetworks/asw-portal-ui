// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  PORTAL_API_URL: 'https://asw-portal-rest-service.azurewebsites.net/',
  USER_API_URL: 'https://user-mgmt-service.azurewebsites.net/api/',
  DIAGNOSTIC_API_URL: 'https://ocpp-core.azurewebsites.net/',
  ASSET_API_URL: 'https://assets-service.azurewebsites.net/api/',
  REPORT_API_URL: 'https://asw-report-service.azurewebsites.net/api/',
  PRICING_API_URL: 'https://pricing-service.azurewebsites.net/api/',
  NOTIFICATION_API_URL:
    'https://notification-appservices.azurewebsites.net/api/',
  imagePath: '',
  onProd: 0,
  isPlatform: 'Development Platform',
  isPlatformMsg: '',
  versionNumber: 'Dev v 1.0',
  ENCRYPT_KEY: 'E534C8DF286CD5931069B522E695D4F1',
}

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
