import React from 'react';
import App from './App';
import {createRoot} from "react-dom/client";

createRoot(document.getElementById('root')).render(<App/>); // createRoot(container!) if you use TypeScript

// var driveSafely, userAccount, web3;
//
// async function startApp()  {
//     const driveSafelyAddress = Constants.CONTRACT_ADDRESS;
//     const abi = await JSON.parse(JSON.stringify(contractJson));
//     // console.log(abi)
//
//
//     driveSafely = new web3.eth.Contract(abi, driveSafelyAddress);
//
//     var accountInterval = setInterval(function() {
//         if (web3.eth.accounts[0] !== userAccount) {
//             userAccount = web3.eth.accounts[0];
//             // Call a function to update the UI with the new account
//             getCarsByOwner(userAccount)
//                 .then(displayCars);
//         }
//     }, 100);
// }
//
// function getCarParameters(id) {
//     return driveSafely.methods.cars(id).call();
// }
//
// function carToOwner(id) {
//     return driveSafely.methods.carToOwner(id).call();
// }
//
// function  getCarsByOwner(owner) {
//     return driveSafely.methods.getCarsByOwner(owner).call();
// }
//
// function displayCars(carsId) {
//     for (var carId of carsId) {
//         getCarParameters(carsId)
//             .then(function (car) {
//                 console.log(car.model + " " + car.vin + " " + car.carLevel);
//             });
//     }
// }
//
// function checkAndInstantiateWeb3() {
//     try {
//         if (window.web3 !== 'undefined') {
//             return new Web3(window.web3.currentProvider);
//         } else {
//             console.log("Install MetaMask!");
//             return new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
//         }
//     } catch(e) {
//         console.error("Sorry, can't find any web3 provider:", e.message)
//     }
// }
//
// window.addEventListener('load', function() {
//     web3 = checkAndInstantiateWeb3();
//     startApp();
// })


