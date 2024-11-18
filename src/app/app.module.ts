import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LocalStorageService } from "./shared/services/local-storage.service";

export function appInitializer(localStorageService: LocalStorageService) {
  return () => localStorageService.initMockData();
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializer,
      multi: true,
      deps: [LocalStorageService]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
