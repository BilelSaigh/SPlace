/// <reference types="@workadventure/iframe-api-typings" />



console.log('Script started successfully');

// Waiting for the API to be ready
WA.onInit().then(async () => {
    let url = new URL(window.location.href);

    let param = url.searchParams.get("param");
    console.log(param);

    let cardTitle = document.querySelector('.card-title') as HTMLElement;

    cardTitle.textContent = param;
    console.log("ROOM CREEATED..");
    WA.nav.goToRoom('conference');

}).catch(e => console.error(e));

export {};