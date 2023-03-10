function importAll(r) {
    return r.keys().map(r);
}

function choose(choices) {
    var index = Math.floor(Math.random() * choices.length);
    return choices[index];
}


const images = importAll(require.context('../images/cars', false, /\.(png|jpe?g|svg)$/));



export const getRoomInfo = (roomDna, _cars) => {
    let dna = getDnaValues(roomDna)
    let crossType = dna[0]
    let roadTypes = []
    roadTypes.push({
        position: {
            x: 36.5,
            y: 33.25
        },
        rotation: 90,
        isMain: false
    })
    roadTypes.push({
        position:{
            x: 59,
            y: 34
        },
        rotation: 0,
        isMain: false
    })

    roadTypes.push({
        position:{
            x: 58,
            y: 61
        },
        rotation: 270,
        isMain: false
    })
    roadTypes.push({
        position: {
            x: 36.5,
            y: 60.5
        },
        rotation: 180,
        isMain: false
    })
    roadTypes[dna[1]-1].isMain=true
    roadTypes[dna[2]-1].isMain=true
    dna = dna.slice(3)
    let roads = [0, 0, 0, 0]
    let cars = []
    for(let i=0; i<dna.length; i+=2){
        let x,y
        if(dna[i]==1){
            x = 34 -10*roads[0]
            y = 41
            roads[0]++
        }else if(dna[i]==2){
            x = 51.5
            y = 29 - 13*roads[1]
            roads[1]++
        }else if(dna[i]==3){
            x = 61 + 10*roads[2]
            y = 51
            roads[2]++
        }else if(dna[i]==4){
            x = 43.5
            y = 63 + 13*roads[3]
            roads[3]++
        }
        cars.push({
            image: choose(images),
            index: i/2,
            direction: dna[i+1],
            rotation: 180 - 90*dna[i],
            position: {"x": x, "y":y}
        })
    }
    return {
        "crossType": crossType,
        "mainSignIndicator": roadTypes,
        "listOfCars": cars
    }
}

function getDnaValues(roomDna){
    return roomDna.toString().split("").reverse()
}
// <div id={"road1"}
//      style={{backgroundColor:"blue", opacity: "0.3", position: "absolute",
//          padding:"0 1% 0 1%", display: "flex", flexDirection: "column", width: "8%", left:"50%", top:"60%"}}>
//     {roomCarsInRoad1.map(car => car)}
// </div>
