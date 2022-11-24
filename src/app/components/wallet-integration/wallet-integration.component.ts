import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { WalletIntegrationService } from '../../services/wallet-integration/wallet-integration.service';
import { NgIf } from '@angular/common';

@Component({
    standalone: true,
    selector: 'app-wallet-integration',
    templateUrl: './wallet-integration.component.html',
    styleUrls: ['./wallet-integration.component.scss'],
    imports: [
        NgIf
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WalletIntegrationComponent implements OnInit {
    public explorerUrl = 'https://goerli.etherscan.io/tx/';
    public txHash = '';

    constructor(private walletIntegrationService: WalletIntegrationService,
                private cdr: ChangeDetectorRef) {
    }

    public ngOnInit(): void {
        this.walletIntegrationService.initMetaMaskConnection()
            .then(() => {
                this.walletIntegrationService.connectToContract();
                this.walletIntegrationService.approveContract()
                    .then((state) => {
                        this.txHash = state.hash;
                        this.cdr.detectChanges();
                    });
            });
    }
}
