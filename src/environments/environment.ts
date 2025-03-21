// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    userName: "APPWEB",
    password: btoa("123456"),
    apiUrl: "https://4ca8-2800-b70-1f-21-5465-1564-8ae2-9493.ngrok-free.app/",
    // apiUrl: "http://154.38.170.172:3001/",

    firebase: {
        apiKey: "AIzaSyDkyPExAdBeFj2sZqDvILFLL6-Im_7lDKU",
        authDomain: "gastrosena-55a47.firebaseapp.com",
        projectId: "gastrosena-55a47",
        storageBucket: "gastrosena-55a47.firebasestorage.app",
        messagingSenderId: "1070294567195",
        appId: "1:1070294567195:web:ad8edffa80b6bf1905ebbe",
        measurementId: "G-PMBY8Z51CX"
      }


};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
