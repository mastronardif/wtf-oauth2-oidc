// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  environment: 'Local',

  ////// authPasswordFlowConfig BEGIN
  //authPasswordFlowConfig
  authPasswordFlowConfig00:  {
    // Url of the Identity Provider
    issuer: 'https://steyer-identity-server.azurewebsites.net/identity',

    // URL of the SPA to redirect the user to after login
    redirectUri: window.location.origin + '/index.html',

    // URL of the SPA to redirect the user after silent refresh
    silentRefreshRedirectUri: window.location.origin + '/silent-refresh.html',

    // The SPA's id. The SPA is registerd with this id at the auth-server
    clientId: 'demo-resource-owner',

    dummyClientSecret: 'geheim',

    // set the scope for the permissions the client should request
    // The first three are defined by OIDC. The 4th is a usecase-specific one
    scope: 'openid profile email voucher',

    showDebugInformation: true,

    oidc: false,
  },

  // authPasswordFlowConfig:  {
  //   issuer: 'https://dev-uxby36t5.us.auth0.com/',
  //   domain: "dev-uxby36t5.us.auth0.com",
  //   audience: "https://dev-uxby36t5.us.auth0.com/api/v2/",
  //   response_type: 'code',

  //   customQueryParams: { audience: 'https://dev-uxby36t5.us.auth0.com/api/v2/' },
  //   redirectUri: window.location.origin + '/index.html',
  //   silentRefreshRedirectUri: window.location.origin + '/silent-refresh.html',
  //   clientId: 'otKjaLWq3l8EaU8MiZRq3an8h7AO7w5l',
  //   dummyClientSecret: 'iAwtr8s6NfgwoqQtrUTS4rZVnBPyBzme_eA0mI2VhBrW9LyV7BNGT4q0XdtgHuET',
  //   ClientSecret: 'iAwtr8s6NfgwoqQtrUTS4rZVnBPyBzme_eA0mI2VhBrW9LyV7BNGT4q0XdtgHuET',
  //   scope: 'openid profile email',
  //   clearHashAfterLogin: true,
  //   showDebugInformation: true,
  //   oidc: false,
  // },

  authPasswordFlowConfig12:  {
    issuer: 'https://philly-vanilly.auth0.com/',
    customQueryParams: { audience: 'https://philly-vanilly.auth0.com/api/v2/' },
    redirectUri: `${origin}/index.html`,
    silentRefreshRedirectUri: `${origin}/silent-refresh.html`,
    clientId: 'r4gL1ntxR2lnodnu81WFnWNOWdO5SFuV',
    scope: 'openid profile email',
    clearHashAfterLogin: true,
    showDebugInformation: true
  },
  ////// authPasswordFlowConfig END


  ////// authConfig (implicit flow) BEGIN
authConfig00: {
  // Url of the Identity Provider
  issuer: 'https://FUCKMEidsvr4.azurewebsites.net',

  // URL of the SPA to redirect the user to after login
  // redirectUri: window.location.origin
  //   + ((localStorage.getItem('useHashLocationStrategy') === 'true')
  //     ? '/#/index.html'
  //     : '/index.html'),

  redirectUri: window.location.origin + '/index.html',

  // URL of the SPA to redirect the user after silent refresh
  silentRefreshRedirectUri: window.location.origin + '/silent-refresh.html',

  // The SPA's id. The SPA is registerd with this id at the auth-server
  clientId: 'implicit',

  // set the scope for the permissions the client should request
  // The first three are defined by OIDC. The 4th is a usecase-specific one
  scope: 'openid profile email api',

  // silentRefreshShowIFrame: true,

  showDebugInformation: true,

  sessionChecksEnabled: true,

  // timeoutFactor: 0.01,
},

"philly-vanilly.auth0.com": {
  // Url of the Identity Provider
  issuer: 'https://philly-vanilly.auth0.com/',
  customQueryParams: { audience: 'https://philly-vanilly.auth0.com/api/v2/' },

  // URL of the SPA to redirect the user to after login
  // redirectUri: window.location.origin
  //   + ((localStorage.getItem('useHashLocationStrategy') === 'true')
  //     ? '/#/index.html'
  //     : '/index.html'),

  redirectUri: window.location.origin + '/index.html',

  // URL of the SPA to redirect the user after silent refresh
  silentRefreshRedirectUri: window.location.origin + '/silent-refresh.html',

  // The SPA's id. The SPA is registerd with this id at the auth-server
  clientId: 'r4gL1ntxR2lnodnu81WFnWNOWdO5SFuV',

  // set the scope for the permissions the client should request
  // The first three are defined by OIDC. The 4th is a usecase-specific one
  scope: 'openid profile email',

  // silentRefreshShowIFrame: true,
  clearHashAfterLogin: true,
  showDebugInformation: true,

  sessionChecksEnabled: true,
// responseType: 'code',
  // timeoutFactor: 0.01,
},

"dev-uxby36t5.us.auth0.com": {
  issuer: 'https://dev-uxby36t5.us.auth0.com/',
  domain: "dev-uxby36t5.us.auth0.com",
  audience: "https://dev-uxby36t5.us.auth0.com/api/v2/",
  response_type: 'code',

  customQueryParams: { audience: 'https://dev-uxby36t5.us.auth0.com/api/v2/' },
  redirectUri: window.location.origin + '/index.html',
  silentRefreshRedirectUri: window.location.origin + '/silent-refresh.html',
  clientId: 'otKjaLWq3l8EaU8MiZRq3an8h7AO7w5l',
  dummyClientSecret: 'iAwtr8s6NfgwoqQtrUTS4rZVnBPyBzme_eA0mI2VhBrW9LyV7BNGT4q0XdtgHuET',
  ClientSecret: 'iAwtr8s6NfgwoqQtrUTS4rZVnBPyBzme_eA0mI2VhBrW9LyV7BNGT4q0XdtgHuET',
  scope: 'openid profile email',
  clearHashAfterLogin: true,
  showDebugInformation: true,
  oidc: false,
},
"oauth2-mock-server": {
  issuer: 'http://localhost:8080',
  domain: "http://localhost:8080",
  audience: "https://WTFdev-uxby36t5.us.auth0.com/api/v2/",
  ZZresponse_type: 'code',

  customQueryParams: { audience: 'https://dev-uxby36t5.us.auth0.com/api/v2/' },
  redirectUri: window.location.origin + '/index.html',
  silentRefreshRedirectUri: window.location.origin + '/silent-refresh.html',
  clientId: 'aaaa',
  dummyClientSecret: 'ffff',
  ClientSecret: 'what',
  scope: 'openid profile email',
  clearHashAfterLogin: true,
  showDebugInformation: true,
  oidc: false,
},
"PG": {
 // Url of the Identity Provider
 issuer: 'http://localhost:3000',
 ZZcustomQueryParams: { audience: 'https://philly-vanilly.auth0.com/api/v2/' },

 // URL of the SPA to redirect the user to after login
 // redirectUri: window.location.origin
 //   + ((localStorage.getItem('useHashLocationStrategy') === 'true')
 //     ? '/#/index.html'
 //     : '/index.html'),

 redirectUri: window.location.origin + '/index.html',

 // URL of the SPA to redirect the user after silent refresh
 silentRefreshRedirectUri: window.location.origin + '/silent-refresh.html',

 // The SPA's id. The SPA is registerd with this id at the auth-server
 clientId: 'express-client',
 dummyClientSecret: 'express-secret',
 //ClientSecret: 'express-secret',
 //clientId: 'demo-resource-owner',
 //dummyClientSecret: 'geheim',

 // set the scope for the permissions the client should request
 // The first three are defined by OIDC. The 4th is a usecase-specific one
 scope: 'openid profile email',

 // silentRefreshShowIFrame: true,
 clearHashAfterLogin: true,
 ZZshowDebugInformation: true,

 sessionChecksEnabled: true,
 responseType: 'code',
 oidc: false,
 // timeoutFactor: 0.01,
},
"oathapp4000": {
  // Url of the Identity Provider
  issuer: 'http://localhost:4000/',
  ZZcustomQueryParams: {
    client_id: "131630161401-tjinjoqp0m7hjcppupur9qlgpjsmql6r.apps.googleusercontent.com",
    redirect_uri: "http://localhost:4000/api/callback",
  },

  // URL of the SPA to redirect the user to after login
  // redirectUri: window.location.origin
  //   + ((localStorage.getItem('useHashLocationStrategy') === 'true')
  //     ? '/#/index.html'
  //     : '/index.html'),

  redirectUri: window.location.origin + '/index.html',

  // URL of the SPA to redirect the user after silent refresh
  silentRefreshRedirectUri: window.location.origin + '/silent-refresh.html',

  // The SPA's id. The SPA is registerd with this id at the auth-server
  clientId: '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',

  // set the scope for the permissions the client should request
  // The first three are defined by OIDC. The 4th is a usecase-specific one
  scope: 'openid profile email',

  // silentRefreshShowIFrame: true,
  clearHashAfterLogin: true,
  ZZshowDebugInformation: true,

  sessionChecksEnabled: true,
  responseType: 'code',
  // timeoutFactor: 0.01,
 }


////// authConfig (implicit flow) END
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
