import { Injectable } from '@angular/core';
import { ethers } from 'ethers';

@Injectable({
    providedIn: 'root'
})
export class WalletIntegrationService {
    private _provider: ethers.providers.Web3Provider = {} as ethers.providers.Web3Provider;
    private _signer: ethers.providers.JsonRpcSigner = {} as ethers.providers.JsonRpcSigner;

    public get provider(): ethers.providers.Web3Provider {
        return this._provider;
    }

    public get signer(): ethers.providers.JsonRpcSigner {
        return this._signer;
    }

    public async initMetaMaskConnection(): Promise<void> {
        // @ts-ignore
        this._provider = new ethers.providers.Web3Provider(window.ethereum);
        await this._provider.send('eth_requestAccounts', []);
        this._signer = this._provider.getSigner();
    }
}
