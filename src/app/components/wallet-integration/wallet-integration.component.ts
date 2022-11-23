import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { WalletIntegrationService } from '../../services/wallet-integration/wallet-integration.service';

@Component({
    standalone: true,
    selector: 'app-wallet-integration',
    templateUrl: './wallet-integration.component.html',
    styleUrls: ['./wallet-integration.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WalletIntegrationComponent implements OnInit {
    constructor(private walletIntegrationService: WalletIntegrationService) {
    }

    public ngOnInit(): void {
        this.walletIntegrationService.initMetaMaskConnection()
            .then(() => this.walletIntegrationService.connectToContract());
    }
}
