const { assert } = require("chai");

const TokenOwnership = artifacts.require("TokenOwnership");
const PDDLibTest = artifacts.require("PDDLibTest");
const truffleAssert = require('truffle-assertions');


contract('PDDLib', (accounts) => {
    it('raceHandler test', async () => {
        const instance = await TokenOwnership.deployed();
        const instance2 = await PDDLibTest.deployed();
        await instance.createCar("Приора", { from: accounts[0] })
        await instance.findRoom(accounts[0], 0, { from: accounts[0] });
        room = await instance.openedRooms(0);
        playerCount = room.cross.playersNeeded;

        
        c = await instance.cars(0)
        let roomDNA = c.vin%100
        for (var i = 1; i < playerCount; i++) {
            await instance.createCar("Приора" + i, { from: accounts[i] });
            

            c = await instance.cars(i)
            roomDNA+=c.vin%100
        }
        
        roomDNA = await instance2.generateRoom(
            room.cross.crossId,
            room.cross.playersNeeded,
            String(roomDNA));
        roomDNA = web3.utils.BN(roomDNA).toString()

        //console.log(roomDNA)
        for (var i = 1; i < playerCount; i++) {
            await instance.findRoom(accounts[i], i, { from: accounts[i] });
        }
        
        res = []
        for(let i = 0; i < playerCount; i++){
            ans = []
            for (let j = 0; j < playerCount; j++) {
                ans.push(j);
            }

            c = await instance.commitAnswer(room.id, ans, { from: accounts[i] });
        }

        await truffleAssert.passes(
            instance.getClosedRoom(room.id)
        );

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