// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // origin: 'http://51.141.73.41:6010/',
  // originAuth: 'http://51.141.73.41:8081/',
  // localOrigin: 'http://51.141.73.41:8081/api/',
  // origin: 'http://51.141.73.41:6010/',
  // originAuth: 'http://51.141.73.41:6008/',
  // localOrigin: 'http://51.141.73.41:6008/api/',
  origin: 'http://51.142.150.252:6010/',
  originAuth: 'http://51.142.150.252:6008/',
  localOrigin: 'http://51.142.150.252:6008/api/',
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
