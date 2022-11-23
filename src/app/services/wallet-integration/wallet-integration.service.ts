import { Injectable } from '@angular/core';
import { Contract, ethers } from 'ethers';

@Injectable({
    providedIn: 'root'
})
export class WalletIntegrationService {
    private _provider: ethers.providers.Web3Provider = {} as ethers.providers.Web3Provider;
    private _signer: ethers.providers.JsonRpcSigner = {} as ethers.providers.JsonRpcSigner;
    private _erc20: Contract = {} as Contract;

    public get provider(): ethers.providers.Web3Provider {
        return this._provider;
    }

    public get signer(): ethers.providers.JsonRpcSigner {
        return this._signer;
    }

    public get erc20(): Contract {
        return this._erc20;
    }

    public async initMetaMaskConnection(): Promise<void> {
        // @ts-ignore
        this._provider = new ethers.providers.Web3Provider(window.ethereum);
        await this._provider.send('eth_requestAccounts', []);
        this._signer = this._provider.getSigner();
    }

    public connectToContract(): void {
        const abi = ['function symbol() view returns (string)'];
        const address = '0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6';
        this._erc20 = new ethers.Contract(address, abi, this._signer);
    }
}
