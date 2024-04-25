/// <reference types="@workadventure/iframe-api-typings" />

import {RemotePlayer} from "@workadventure/iframe-api-typings/play/src/front/Api/Iframe/Players/RemotePlayer";
import {bootstrapExtra} from "@workadventure/scripting-api-extra/dist";

console.log('Script started successfully');

let currentPopup: any = undefined;

// Waiting for the API to be ready
WA.onInit().then(  async () => {

    console.log('Scripting API ready');
    console.log('Tags: ', WA.player.tags);
    console.log('Player: ', WA.player);
    let noteWebsite: any;
    console.log('model')
    if (WA.player.tags.includes('member')) {
        console.log('Player is a model');
        WA.ui.onRemotePlayerClicked.subscribe((remotePlayer: RemotePlayer) => {
            console.log('Remote player clicked', remotePlayer);
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
        });


    }




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
