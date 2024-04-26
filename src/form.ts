/// <reference types="@workadventure/iframe-api-typings" />



console.log('Script started successfully');


// Waiting for the API to be ready
WA.onInit().then(() => {

    console.log("ROOM CREEATED..");
    WA.nav.goToRoom('conference');

}).catch(e => console.error(e));

export {};