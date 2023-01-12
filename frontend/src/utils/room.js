export const getRoomInfo = (roomDna) => {
    let dna = getDnaValues(roomDna)
    let crossType = dna[0]
    let roadTypes = [0,0,0,0]
    roadTypes[dna[1]]=1
    roadTypes[dna[2]]=1
    dna = dna.slice(3)
    let roads = [0, 0, 0, 0]
    let cars = []
    for(let i=0; i<dna.length; i+=2){
        let x,y
        if(dna[i]==1){
            x = 35.5 -10*roads[0]
            y = 41
            roads[0]++
        }else if(dna[i]==2){
            x = 51.5
            y = 31 - 13*roads[1]
            roads[1]++
        }else if(dna[i]==3){
            x = 59.5 + 10*roads[2]
            y = 51
            roads[2]++
        }else if(dna[i]==4){
            x = 43.5
            y = 61 + 13*roads[3]
            roads[3]++
        }
        cars.push({
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
