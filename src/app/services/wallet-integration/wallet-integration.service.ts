import { Injectable } from '@angular/core';
import { Contract, ethers } from 'ethers';

@Injectable({
    providedIn: 'root'
})
export class WalletIntegrationService {
    private provider: ethers.providers.Web3Provider = {} as ethers.providers.Web3Provider;
    private signer: ethers.providers.JsonRpcSigner = {} as ethers.providers.JsonRpcSigner;
    private erc20: Contract = {} as Contract;

    private readonly address = '0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6';
    private readonly abi = ['function approve(address _spender, uint256 _value) public returns (any state)'];

    public async initMetaMaskConnection(): Promise<void> {
        // @ts-ignore
        this.provider = new ethers.providers.Web3Provider(window.ethereum);
        await this.provider.send('eth_requestAccounts', []);
        this.signer = this.provider.getSigner();
    }

    public connectToContract(): void {
        this.erc20 = new ethers.Contract(this.address, this.abi, this.signer);
    }

    public async approveContract(): Promise<any> {
        return await this.erc20['approve'](this.address, ethers.utils.parseUnits('1.0', 'wei'));
    }

    public listenIsTransactionMined(txHash: string, listener: () => void): void {
        this.provider.once(txHash, listener);
    }

    public async getNonce(txHash: string): Promise<ethers.providers.TransactionResponse> {
        return await this.provider.getTransaction(txHash);
    }
}
