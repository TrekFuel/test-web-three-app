import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    standalone: true,
    selector: 'app-wallet-integration',
    templateUrl: './wallet-integration.component.html',
    styleUrls: ['./wallet-integration.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WalletIntegrationComponent {
}
