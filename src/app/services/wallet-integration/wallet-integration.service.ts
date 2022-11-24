import { Injectable } from '@angular/core';
import { Contract, ethers } from 'ethers';

@Injectable({
    providedIn: 'root'
})
export class WalletIntegrationService {
    private _provider: ethers.providers.Web3Provider = {} as ethers.providers.Web3Provider;
    private _signer: ethers.providers.JsonRpcSigner = {} as ethers.providers.JsonRpcSigner;
    private _erc20: Contract = {} as Contract;

    private readonly address = '0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6';
    private readonly abi = ['function approve(address _spender, uint256 _value) public returns (any state)'];

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
        this._erc20 = new ethers.Contract(this.address, this.abi, this._signer);
    }


    public async approveContract(): Promise<any> {
        return await this.erc20['approve'](this.address, ethers.utils.parseUnits('1.0', 'wei'));
    }
}
