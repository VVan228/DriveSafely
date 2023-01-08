export default class ContractService {

    static async getUserAddress() {
        let res;
        window.ethereum.request({method: 'eth_requestAccounts'}).then(result => {
                res = result[0]
            }
        )
        return res;
    }

}
