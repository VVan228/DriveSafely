export default class ContractService {

    static contract;

    static async getUserAddress() {
        let userAddress;
        await window.ethereum.request({method: 'eth_requestAccounts'}).then(result => userAddress = result[0])
        return userAddress;
    }

}
