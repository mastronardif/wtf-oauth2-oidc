import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { filter } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { useHash } from 'src/flags';
import { authCodeFlowConfig } from './auth-code-flow.config';
import { authConfig } from './auth.config';
import { GlobalsrvService } from './service/globalsrv.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'wtf';
  public envs = ['*internal', 'dev-uxby36t5.us.auth0.com', 'philly-vanilly.auth0.com', 'authConfig','authConfig00','authConfig11', 'idsvr4'];
  public envsSel = 0;
  //private envSelected = '';

  constructor(private gs:GlobalsrvService, private router: Router,  private oauthService: OAuthService) {
    //this.ls.updateLan(this.envs[0]);
    this.setEnv(0);

    // alert('app constructor '+ this.envsSel);
    console.log('app constructor '+ this.envsSel);

    // Remember the selected configuration
    if (sessionStorage.getItem('flow') === 'code') {
      this.configureCodeFlow();
    } else {
      this.configureImplicitFlow();
    }

    // Automatically load user profile
    this.oauthService.events
      .pipe(filter((e) => e.type === 'token_received'))
      .subscribe((_) => {
        console.debug('state', this.oauthService.state);
        this.oauthService.loadUserProfile();

        const scopes = this.oauthService.getGrantedScopes();
        console.debug('scopes', scopes);
      });
  }

  setEnv(idx: number): void {
    this.envsSel = idx;
    sessionStorage.setItem('envSel', this.envs[this.envsSel]);
    this.gs.updateEnv(this.envs[idx]); //assuming you injected ls:LanService in constructor
    //setEnv(this.envs[idx]);
  }

  private configureCodeFlow() {
    //alert('configureCodeFlow, '+ this.envs[this.envsSel]); //this.envSelected);
    console.log('configureCodeFlow, '+ this.envs[this.envsSel]);
    // '*internal'
    type ObjectKey = keyof typeof environment;
    const myVar = this.envs[ this.envsSel] as ObjectKey;
    console.log(environment[myVar]);
    const authConfig99 = this.envsSel == 0 ? authCodeFlowConfig : (environment[myVar] as AuthConfig);
    this.oauthService.configure(authConfig99); //authCodeFlowConfig);authConfig99);
    this.oauthService.loadDiscoveryDocumentAndTryLogin().then((_) => {
      if (useHash) {
        this.router.navigate(['/']);
      }
    });

    // Optional
    this.oauthService.setupAutomaticSilentRefresh();
  }

  private configureImplicitFlow() {
    //alert('app: configureImplicitFlow, '+ this.envsSel +', '+ sessionStorage.getItem('env'));
    console.log('app: configureImplicitFlow, '+ this.envsSel +', '+ sessionStorage.getItem('env'));
    // '*internal'
    type ObjectKey = keyof typeof environment;
    const myVar = this.envs[ this.envsSel] as ObjectKey;
    const authConfig99 = this.envsSel == 0 ? authConfig: environment[myVar] as AuthConfig;

    this.oauthService.configure(authConfig99);
    //this.oauthService.configure(authConfig);
    // this.oauthService.tokenValidationHandler = new JwksValidationHandler();

    this.oauthService.loadDiscoveryDocumentAndTryLogin().then((_) => {
      if (useHash) {
        this.router.navigate(['/']);
      }
    });

    // Optional
    this.oauthService.setupAutomaticSilentRefresh();

    // Display all events
    this.oauthService.events.subscribe((e) => {
      // tslint:disable-next-line:no-console
      console.debug('oauth/oidc event', e);
    });

    this.oauthService.events
      .pipe(filter((e) => e.type === 'session_terminated'))
      .subscribe((e) => {
        // tslint:disable-next-line:no-console
        console.debug('Your session has been terminated!');
      });
  }



}
