import { authPasswordFlowConfig } from '../auth-password-flow.config';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { Component, OnInit } from '@angular/core';
import { environment } from "src/environments/environment";
//import { HttpHeaders } from '@angular/common/http';
import { FlightService } from '../flight-booking/services/flight.service';

@Component({
  selector: 'app-password-flow-login',
  templateUrl: './password-flow-login.component.html',
})
export class PasswordFlowLoginComponent implements OnInit {
  userName: string | undefined;
  password: string | undefined;
  loginFailed: boolean = false;
  userProfile: object | undefined;

  constructor(private oauthService: OAuthService) {
    // Tweak config for password flow
    // This is just needed b/c this demo uses both,
    // implicit flow as well as password flow

    console.log('PasswordFlowLoginComponent: constructor');
    const envSelected = sessionStorage.getItem('envSel');
    type ObjectKey = keyof typeof environment;
    console.log('envSelected= ', envSelected);
    const myVar = envSelected as ObjectKey;
    console.log('myVar= ', myVar);
    console.log(environment[myVar]);
    const authConfig99 = envSelected == '*internal' ? authPasswordFlowConfig : (environment[myVar] as AuthConfig);

    this.oauthService.configure(authConfig99); // authPasswordFlowConfig);
    this.oauthService.loadDiscoveryDocument();
  }

  ngOnInit() {
    console.log('\t PasswordFlowLoginComponent: ngOnInit()');
    console.log(environment);
  }

  loadUserProfile(): void {
    this.oauthService.loadUserProfile().then((up) => (this.userProfile = up));
  }

  get access_token() {
    return this.oauthService.getAccessToken();
  }

  get access_token_expiration() {
    return this.oauthService.getAccessTokenExpiration();
  }

  get givenName() {
    var claims = this.oauthService.getIdentityClaims();
    if (!claims) return null;
    return claims['given_name' as keyof typeof claims];
    //return claims['given_name'];
    //const value = object[key as keyof typeof object];
  }

  get familyName() {
    var claims = this.oauthService.getIdentityClaims();
    if (!claims) return null;
    // @ts-expect-error
    return claims['family_name'];
  }

  get identityClaims() {
    var claims = this.oauthService.getIdentityClaims();
    if (!claims) return null;

    return claims;
  }

  loginWithPassword() {
    console.log('PasswordFlowLoginComponent: loginWithPassword');
    //PG case.    //this.wtfOauthService(); return;
    this.oauthService
      .fetchTokenUsingPasswordFlow(
        // @ts-expect-error
        this.userName,
        this.password
      )
      .then(() => {
        console.debug('successfully logged in');
        this.loginFailed = false;
      })
      .catch((err) => {
        console.error('error logging in', err);
        this.loginFailed = true;
      });
  }

//   wtfOauthService() {
//     console.log('wtfOauthService');
//     console.log(this.oauthService);

//     // express-client:express-secret
//     const btoaToken = btoa('express-client:express-secret');
//     console.log('btoken= ', btoaToken); //ZXhwcmVzcy1jbGllbnQ6ZXhwcmVzcy1zZWNyZXQ=

//     let headers = new HttpHeaders()

// headers=headers.append('content-type','application/json')
// headers=headers.append('Access-Control-Allow-Origin', '*')
// //headers=headers.append('Authorization', 'Basic ZXhwcmVzcy1jbGllbnQ6ZXhwcmVzcy1zZWNyZXQ=')
// //headers=headers.append('Authorization', `Basic ${btoaToken}`)
// headers=headers.append('client_secret', 'express-secret')  //wtf
// headers=headers.append('content-type','application/x-www-form-urlencoded')

//     //let headers = new HttpHeaders().set('Accept', 'application/json');
//     // @ts-expect-error
//     //this.oauthService.fetchTokenUsingPasswordFlow( this.userName, this.password, headers);
//     this.oauthService.fetchTokenUsingPasswordFlow(this.userName, this.password, headers )
//     .then(() => {
//       console.debug('successfully logged in');
//       this.loginFailed = false;
//     })
//     .catch((err) => {
//       console.error('error logging in', err);
//       this.loginFailed = true;
//     });


//   }

  logout() {
    console.error('PasswordFlowLoginComponent: logout');
    this.oauthService.logOut(true);
  }

  //
  usePG() {
    const token = this.oauthService.getAccessToken();

    // var value = {from: 'sssss', to: 'ttttt'};
    // this.flightService.find(value.from, value.to);
    // console.log('flights = ', this.flightService.flights);

    alert('  usePG() '+ this.oauthService.getAccessToken());
  }
  //
}
