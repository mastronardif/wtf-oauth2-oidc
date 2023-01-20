import { authConfig } from '../auth.config';
import { Component, OnInit } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { authCodeFlowConfig } from '../auth-code-flow.config';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { GlobalsrvService } from '../service/globalsrv.service';
import { HttpClient } from '@angular/common/http';

@Component({
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  loginFailed: boolean = false;
  // @ts-expect-error
  userProfile: object;
  // @ts-expect-error
  usePopup: boolean;
  // @ts-expect-error
  login: false;

  private envSelected: string | undefined;
  constructor(private router : Router,
    private gs: GlobalsrvService,
    private route: ActivatedRoute,
    private oauthService: OAuthService,
    private http: HttpClient
  ) {
    this.gs.getEnv().subscribe((env) => {
      this.envSelected = env;
      console.log(env);
    });
  }

  get hasValidAccessToken() {
    return this.oauthService.hasValidAccessToken();
  }

  get hasValidIdToken() {
    return this.oauthService.hasValidIdToken();
  }

  ngOnInit() {
    //
    //alert('home:ngOnInit this.envSelected= ' + this.envSelected);
    console.log('\t HomeComponent: ngOnInit()'+ this.envSelected);

    type ObjectKey = keyof typeof environment;
    const myVar = this.envSelected as ObjectKey;
    console.log(environment[myVar]);

    //const token = this.route.snapshot.queryParamMap.get('token');
    this.route.fragment.subscribe((fragment) => {
      console.log("My hash fragment is here => ", fragment)
    })

    console.log(this.router.url);
    const token = this.route.snapshot.queryParamMap.get('access_token');
    console.log('token =', token);


    //this.helper_getEnvSection(this.envSelected)

    // this.ls.getEnv().subscribe((lan) => {
    //   console.log(`\n\t ************* env= ${lan}`);
    // console.log(environment.authConfig);
    // console.log(environment['authConfig']);
    // console.log(environment[lan]);

    //  type ObjectKey = keyof typeof environment;
    //  const myVar = lan as ObjectKey;
    //  console.log(environment[myVar]);

    // type ObjectKey22 = keyof typeof environment;
    // console.log(environment[myVar as ObjectKey22]);
    // });

    //
    this.route.params.subscribe((p) => {
      this.login = p['login'];
    });

    // This would directly (w/o user interaction) redirect the user to the
    // login page if they are not already logged in.
    /*
        this.oauthService.loadDiscoveryDocumentAndTryLogin().then(_ => {
            if (!this.oauthService.hasValidIdToken() || !this.oauthService.hasValidAccessToken()) {
              this.oauthService.initImplicitFlow('some-state');
            }
        });
    */
  }

  async pgLogin() {
    alert('pgLogin');
    this.http.get('http://localhost:3000/login00').subscribe(data => {
      console.log('aqaqaqaqaqaqqqaqaqa');
    });


  }

  async loginImplicit() {
    // Tweak config for implicit flow
    //environment[env]
    type ObjectKey = keyof typeof environment;
    const myVar = this.envSelected as ObjectKey;
    console.log(environment[myVar]);
    //console.log(environment[this.envSelected? 'authConfig00' :'authConfig00']);

    const authConfig99 = this.envSelected == '*internal' ? authConfig : (environment[myVar] as AuthConfig);
    //this.oauthService.configure(authConfig);
    this.oauthService.configure(authConfig99);
    await this.oauthService.loadDiscoveryDocument();
    sessionStorage.setItem('flow', 'implicit');

    this.oauthService.initLoginFlow('/some-state;p1=1;p2=2?p3=3&p4=4');
    // the parameter here is optional. It's passed around and can be used after logging in
  }

  async loginImplicitInPopup() {
    // Tweak config for implicit flow
    type ObjectKey = keyof typeof environment;
    const myVar = this.envSelected as ObjectKey;
    console.log(environment[myVar]);
    const authConfig99 = this.envSelected == '*internal' ? authConfig : (environment[myVar] as AuthConfig);

    this.oauthService.configure(authConfig99);
    //this.oauthService.configure(authConfig);
    await this.oauthService.loadDiscoveryDocument();
    sessionStorage.setItem('flow', 'implicit');

    this.oauthService.initLoginFlowInPopup().then(() => {
      this.loadUserProfile();
    });
    // the parameter here is optional. It's passed around and can be used after logging in
  }

  async loginCode() {
    // Tweak config for code flow
    type ObjectKey = keyof typeof environment;
    const myVar = this.envSelected as ObjectKey;
    console.log(environment[myVar]);
    const authConfig99 = this.envSelected == '*internal' ? authCodeFlowConfig : (environment[myVar] as AuthConfig);
    this.oauthService.configure(authConfig99); //authCodeFlowConfig);
    await this.oauthService.loadDiscoveryDocument();
    sessionStorage.setItem('flow', 'code');

    this.oauthService.initLoginFlow('/some-state;p1=1;p2=2?p3=3&p4=4');
    // the parameter here is optional. It's passed around and can be used after logging in
  }

  async loginCodeInPopup() {
    // Tweak config for code flow

    type ObjectKey = keyof typeof environment;
    const myVar = this.envSelected as ObjectKey;
    console.log(environment[myVar]);
    const authConfig99 = this.envSelected == '*internal' ? authCodeFlowConfig : (environment[myVar] as AuthConfig);
    this.oauthService.configure(authConfig99);
    //this.oauthService.configure(authCodeFlowConfig);
    await this.oauthService.loadDiscoveryDocument();
    sessionStorage.setItem('flow', 'code');

    this.oauthService.initLoginFlowInPopup().then(() => {
      this.loadUserProfile();
    });
  }

  logout() {
    // this.oauthService.logOut();
    this.oauthService.revokeTokenAndLogout();
  }

  loadUserProfile(): void {
    this.oauthService.loadUserProfile().then((up) => (this.userProfile = up));
  }

  startAutomaticRefresh(): void {
    this.oauthService.setupAutomaticSilentRefresh();
  }

  stopAutomaticRefresh(): void {
    this.oauthService.stopAutomaticRefresh();
  }

  get givenName() {
    var claims = this.oauthService.getIdentityClaims();
    if (!claims) return null;
    // @ts-expect-error
    return claims['given_name'];
  }

  get familyName() {
    var claims = this.oauthService.getIdentityClaims();
    if (!claims) return null;
    // @ts-expect-error
    return claims['family_name'];
  }

  refresh() {
    this.oauthService.oidc = true;

    if (
      !this.oauthService.useSilentRefresh &&
      this.oauthService.responseType === 'code'
    ) {
      this.oauthService
        .refreshToken()
        .then((info) => console.debug('refresh ok', info))
        .catch((err) => console.error('refresh error', err));
    } else {
      this.oauthService
        .silentRefresh()
        .then((info) => console.debug('silent refresh ok', info))
        .catch((err) => console.error('silent refresh error', err));
    }
  }

  set requestAccessToken(value: boolean) {
    this.oauthService.requestAccessToken = value;
    localStorage.setItem('requestAccessToken', '' + value);
  }

  get requestAccessToken() {
    // @ts-expect-error
    return this.oauthService.requestAccessToken;
  }

  set useHashLocationStrategy(value: boolean) {
    const oldValue = localStorage.getItem('useHashLocationStrategy') === 'true';
    if (value !== oldValue) {
      localStorage.setItem('useHashLocationStrategy', value ? 'true' : 'false');
      window.location.reload();
    }
  }

  get useHashLocationStrategy() {
    return localStorage.getItem('useHashLocationStrategy') === 'true';
  }

  get id_token() {
    return this.oauthService.getIdToken();
  }

  get access_token() {
    return this.oauthService.getAccessToken();
  }

  get id_token_expiration() {
    return this.oauthService.getIdTokenExpiration();
  }

  get access_token_expiration() {
    return this.oauthService.getAccessTokenExpiration();
  }

}
