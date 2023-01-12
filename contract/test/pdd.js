const { assert } = require("chai");

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

    it('correct answer test', async () => {
        const instance = await PDDLibTest.deployed();
        
        let dna = 12121134121;
        let c = await instance.commitAnswerTest.call(dna, [2,3,1,0], {from:accounts[0]});
        let c2 = await instance.commitAnswerTest.call(dna, [3,2,1,0], {from:accounts[1]});

        assert.isTrue(c);
        assert.isTrue(!c2);

        dna = 3311312;
        c = await instance.commitAnswerTest.call(dna, [0,1]);
        c2 = await instance.commitAnswerTest.call(dna, [1,0]);
        
        assert.isTrue(c);
        assert.isTrue(!c2);

        dna = 3311322;
        c = await instance.commitAnswerTest.call(dna, [0,1]);
        c2 = await instance.commitAnswerTest.call(dna, [1,0]);
        
        assert.isTrue(!c);
        assert.isTrue(c2);

        dna = 3331311;
        c = await instance.commitAnswerTest.call(dna, [0,1]);
        c2 = await instance.commitAnswerTest.call(dna, [1,0]);
        
        assert.isTrue(c);
        assert.isTrue(c2);
    });

    it('carRacing test', async () => {
        // const instance = await TokenOwnership.deployed();
        // await instance.createCar("Приора", {from:accounts[0]})
        // await instance.startRace(0,{from:accounts[0]})
          
        // //let c = await instance.startRace();
        
        // //console.log(web3.utils.BN(c).toString())
        
    });
});