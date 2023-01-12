const TokenOwnership = artifacts.require("TokenOwnership");

contract('PDDLib', (accounts) => {
    it('creates one car', async () => {
        const instance = await TokenOwnership.deployed();
        console.log(await instance.isCorrectAnswer(12121134121,[2,4,1,3]));
    });
});