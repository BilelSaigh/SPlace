/// <reference types="@workadventure/iframe-api-typings" />

console.log('Script started successfully');

// Waiting for the API to be ready
WA.onInit().then(async () => {
    let hash = window.location.hash;
    let param = decodeURIComponent(hash.split('=')[1]);

    let cardTitle = document.querySelector('.card-title') as HTMLElement;
    let cardText = document.querySelector('.card-text') as HTMLElement;
    cardTitle.textContent = param;
    cardText.textContent = `Bonjour, je suis ${param}, une experte spécialisée dans les jeux de domination et de soumission, ainsi que dans le sadomasochisme. 
                            Avec moi, plonges dans un univers où les limites sont repoussées et les désirs les plus sombres explorés.
                            Que tu cherches l'excitation des insultes cinglantes, la délicieuse torture du sadomasochisme ou la soumission totale à mes ordres, je suis là pour t'offrir une expérience inoubliable et intense. 
                            Oserais-tu t'aventurer dans mes jeux de pouvoir ?`;


}).catch(e => console.error(e));

export {};