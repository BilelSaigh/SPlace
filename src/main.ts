/// <reference types="@workadventure/iframe-api-typings" />

import {RemotePlayer} from "@workadventure/iframe-api-typings/play/src/front/Api/Iframe/Players/RemotePlayer";
import {bootstrapExtra} from "@workadventure/scripting-api-extra/dist";

console.log('Script started successfully');

let currentPopup: any = undefined;

// Waiting for the API to be ready
WA.onInit().then(  async () => {
    await WA.player.state.saveVariable("tags", WA.player.tags, {
        public: true,
        persist: true,
        scope: "world",
    });
    let noteWebsite: any;
    WA.ui.onRemotePlayerClicked.subscribe( async (remotePlayer: RemotePlayer)  => {
        console.log(remotePlayer.state.tags)
        let tags = remotePlayer.state.tags as string[];
        //verifier si le joueur est un model pour afficher les informations
        if (tags.includes('model')) {
            await WA.players.configureTracking();
            const player = WA.players.get(remotePlayer.playerId);
            if (player !== undefined) {
                remotePlayer.addAction('En savoir plus', async () => {
                    await WA.player.state.saveVariable("clickID", player.playerId, {
                        public: true,
                        persist: true,
                        scope: "world",
                    });
                    noteWebsite = await WA.ui.website.open({
                        url: `./form.html#param=${encodeURIComponent(player.name)}`,
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
                    setTimeout(() => {
                        noteWebsite.close();
                        }   , 5000)
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
