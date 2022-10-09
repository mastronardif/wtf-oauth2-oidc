import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { OAuthModule } from 'angular-oauth2-oidc';
import { useHash } from 'src/flags';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { APP_ROUTES } from './app.routes';
import { BASE_URL } from './app.tokens';
import { HomeComponent } from './home/home.component';
import { PasswordFlowLoginComponent } from './password-flow-login/password-flow-login.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PasswordFlowLoginComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(APP_ROUTES, { useHash }),
    OAuthModule.forRoot()
  ],
  providers: [
       // (useHash) ? { provide: LocationStrategy, useClass: HashLocationStrategy } : [],
    // {provide: AuthConfig, useValue: authConfig },
    // { provide: OAuthStorage, useValue: localStorage },
    // { provide: ValidationHandler, useClass: JwksValidationHandler },
    // Enabled the custom date time provider will make the sample fail to login, since the demo Idp time is correctly synced to the world time.
    // { provide: DateTimeProvider, useClass: CustomDateTimeProvider },
    { provide: BASE_URL, useValue: 'http://www.angular.at' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
