/// <reference types="@workadventure/iframe-api-typings" />

console.log('Script started successfully');

// Waiting for the API to be ready
WA.onInit().then(async () => {
    let url = window.location.href;
    let hash = window.location.hash;
    let param = decodeURIComponent(hash.split('=')[1]);

    let cardTitle = document.querySelector('.card-title') as HTMLElement;
    cardTitle.textContent = param;

    console.log("ROOM CREEATED..");
    WA.nav.goToRoom('conference');

}).catch(e => console.error(e));

export {};