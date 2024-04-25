/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";
import {
    RemotePlayerInterface,
    RemotePlayerMoved
} from "@workadventure/iframe-api-typings/play/src/front/Api/Iframe/Players/RemotePlayer";
import {
    loadingConfigurationLayerStore
} from "@workadventure/scripting-api-extra/dist/Iframes/Configuration/Stores/LayersStore";

console.log('Script started successfully');

let currentPopup: any = undefined;

// Waiting for the API to be ready
WA.onInit().then(  async () => {

    console.log('Scripting API ready');
    console.log('Player tags: ',WA.players.tags)

    await WA.players.configureTracking();
    const players = WA.players.list();
    for (const player of players) {
        console.log(`Player ${player.name} score is ${player.state.score}`);
    }

    let noteWebsite: any;
    WA.ui.onRemotePlayerClicked.subscribe((remotePlayer: RemotePlayerInterface) => {
        const action = remotePlayer.addAction('En savoir plus', async () => {
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


    console.log('Player tags: ',WA.player.tags)


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
