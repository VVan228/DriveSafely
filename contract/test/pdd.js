const TokenOwnership = artifacts.require("TokenOwnership");
const PDDLibTest = artifacts.require("PDDLibTest");

contract('PDDLib', (accounts) => {
    it('raceHandler test', async () => {
        const instance = await TokenOwnership.deployed();
        await instance.createCar("Приора", {from:accounts[0]})
        await instance.findRoom(0, {from:accounts[0]});
        room = await instance.openedRooms(0);
        playerCount = room.cross.playersNeeded;
        for(var i = 1; i<playerCount;i++){
            await instance.createCar("Приора"+i, {from:accounts[i]});
            await instance.findRoom(i, {from:accounts[i]});      
        }
        // console.log(room)
        ans = []
        for(let i = 0; i<playerCount;i++){
            ans.push(i);
        }
        c = await instance.commitAnswer(room.id,ans, {from:accounts[0]});
        // console.log(c);
        
    });

    it('carRacing test', async () => {
        const instance = await PDDLibTest.deployed();
        playerCount = 4;
        let dna = 12121134121;
        let k=12121134121
        for(let i =0;i<playerCount*2+2;i++){
            k=k/10;
        }
        assert.isTrue(k>0 && k<10);
        let c = await instance.commitAnswerTest(dna, [3,2,1,4], {from:accounts[0]});
        let c2 = await instance.commitAnswerTest(dna, [2,3,1,4], {from:accounts[1]});
        console.log(c);
        let solution = false;

    });
});