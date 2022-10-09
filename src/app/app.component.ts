import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { filter } from 'rxjs/operators';
import { useHash } from 'src/flags';
import { authCodeFlowConfig } from './auth-code-flow.config';
import { authConfig } from './auth.config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'wtf';

  constructor(private router: Router,  private oauthService: OAuthService) {
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

  private configureCodeFlow() {
    this.oauthService.configure(authCodeFlowConfig);
    this.oauthService.loadDiscoveryDocumentAndTryLogin().then((_) => {
      if (useHash) {
        this.router.navigate(['/']);
      }
    });

    // Optional
    this.oauthService.setupAutomaticSilentRefresh();
  }

  private configureImplicitFlow() {
    this.oauthService.configure(authConfig);
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
