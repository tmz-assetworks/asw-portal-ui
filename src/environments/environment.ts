// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  origin: 'https://app-eus-cms-internal-portalapi-dev.azurewebsites.net/',
  originAuth: 'https://app-eus-cms-internal-usermgmt-dev.azurewebsites.net/',
  localOrigin: 'https://app-eus-cms-internal-usermgmt-dev.azurewebsites.net/api/',
  originDiagnostic: 'https://app-eus-cms-internal-ocpp-dev.azurewebsites.net/',
  assetLocalOrigin: 'https://app-eus-cms-internal-assets-dev.azurewebsites.net/api/',
  reportLocalOrigin: 'https://app-eus-cms-internal-report-dev.azurewebsites.net/api/',
  AssetPricing: 'https://pricing-service.azurewebsites.net/api/',
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
