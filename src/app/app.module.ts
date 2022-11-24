import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WalletIntegrationComponent } from './components/wallet-integration/wallet-integration.component';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        WalletIntegrationComponent
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
