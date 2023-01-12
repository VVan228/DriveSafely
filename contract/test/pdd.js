const TokenOwnership = artifacts.require("TokenOwnership");

contract('PDDLib', (accounts) => {
    it('raceHandler test', async () => {
        const instance = await TokenOwnership.deployed();
        await instance.createCar("Приора", { from: accounts[0] })
        await instance.findRoom(0, { from: accounts[0] });
        room = await instance.openedRooms(0);
        playerCount = room.cross.playersNeeded;
        for (var i = 1; i < playerCount; i++) {
            await instance.createCar("Приора" + i, { from: accounts[i] });
            await instance.findRoom(i, { from: accounts[i] });
        }
        ans = []
        for (let i = 0; i < playerCount; i++) {
            ans.push(i);
        }
        c = await instance.commitAnswer(room.id, ans, { from: accounts[0] });
        // console.log(c);

    });

    it('carRacing test', async () => {
        const instance = await TokenOwnership.deployed();

    });
    it('carRacing test', async () => {
        const instance = await TokenOwnership.deployed();

    });
});