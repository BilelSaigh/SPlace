/// <reference types="@workadventure/iframe-api-typings" />



console.log('Script started successfully');

// Waiting for the API to be ready
WA.onInit().then(async () => {
    let url = window.location;
    console.log(url)

    let param = url.searchParams.get("param");
    let poram = decodeURIComponent(url.hash.split('=')[1]);


    console.log(param);
    console.log(poram);

    let cardTitle = document.querySelector('.card-title') as HTMLElement;

    cardTitle.textContent = param;
    console.log(cardTitle)
    console.log("ROOM CREEATED..");
    WA.nav.goToRoom('conference');

}).catch(e => console.error(e));

export {};