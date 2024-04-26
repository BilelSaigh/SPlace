/// <reference types="@workadventure/iframe-api-typings" />

import {RemotePlayer} from "@workadventure/iframe-api-typings/play/src/front/Api/Iframe/Players/RemotePlayer";
import {bootstrapExtra} from "@workadventure/scripting-api-extra/dist";

console.log('Script started successfully');

let currentPopup: any = undefined;

// Waiting for the API to be ready
WA.onInit().then(  async () => {

    console.log('Scripting API ready');
    console.log('My Tags', WA.player.tags);
    let noteWebsite: any;
    WA.ui.onRemotePlayerClicked.subscribe( async (remotePlayer: RemotePlayer)  => {
        console.log("Model ?? ", WA.player.tags.includes('model'))
        //verifier si le joueur est un model pour afficher les informations
        if (WA.player.tags.includes('model')) {
            await WA.players.configureTracking();
            console.log('Remote player clicked', remotePlayer.playerId);
            const player = WA.players.get(remotePlayer.playerId);
            console.log("Player : " , player)
            if (player !== undefined) {
                let cardTitleElement = document.querySelector('.card-title');
                if (cardTitleElement) {
                    cardTitleElement.textContent = `${player.name}`;
                }
                let cardTextElement = document.querySelector('.card-text');
                if (cardTextElement) {
                    cardTextElement.textContent = `Lors de mes shows pv, je suis souvent en lingerie sexy, en tenue de soubrette, en tenue de secrétaire, en tenue d'infirmière, en tenue d'écolière, en tenue de sportive, en tenue de policière, en tenue de militaire`;
                }
                remotePlayer.addAction('En savoir plus', async () => {

                    noteWebsite = await WA.ui.website.open({
                        url: "./form.html",
                        position: {
                            vertical: "middle",
                            horizontal: "middle",
                        },
                        size: {
                            height: "30vh",
                            width: "80vh",
                        },
                        margin: {
                            top: "10vh",
                        },
                        allowApi: true,
                    })
                })
            }

        }
    });


    WA.room.onEnterLayer("formLayer").subscribe(async () => {
        noteWebsite = await WA.ui.website.open({
            url: "./form.html",
            position: {
                vertical: "top",
                horizontal: "middle",
            },
            size: {
                height: "30vh",
                width: "80vh",
            },
            margin: {
                top: "10vh",
            },
            allowApi: true,
        });
    });
    WA.room.onLeaveLayer("formLayer").subscribe(() => {
        noteWebsite.close();
    });




    WA.room.area.onEnter('clock').subscribe(() => {
        const today = new Date();
        const time = today.getHours() + ":" + today.getMinutes();
        currentPopup = WA.ui.openPopup("clockPopup", "It's " + time, []);
    })


    WA.room.area.onLeave('clock').subscribe(closePopup)

    // The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure
    bootstrapExtra().then(() => {
        console.log('Scripting API Extra ready');
    }).catch(e => console.error(e));

}).catch(e => console.error(e));

function closePopup(){
    if (currentPopup !== undefined) {
        currentPopup.close();
        currentPopup = undefined;
    }
}

export {};
