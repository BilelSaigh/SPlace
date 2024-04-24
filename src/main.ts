/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";
import { parseCronExpression } from "cron-schedule";
import { TimerBasedCronScheduler as scheduler } from "cron-schedule/schedulers/timer-based.js";


console.log('Script started successfully');

let currentPopup: any = undefined;

// Waiting for the API to be ready
WA.onInit().then(() => {
    console.log('Scripting API ready');
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

    // At 19:00, hide the laptops
    const cronStartNight = parseCronExpression('0 19 * * *');
    scheduler.setInterval(cronStartNight, () => {
        WA.room.hideLayer("above/laptops");
    });

    // At 7:00, show the laptops
    const cronStartDay = parseCronExpression('0 7 * * *');
    scheduler.setInterval(cronStartDay, () => {
        WA.room.showLayer("above/laptops");
    });

    // If the player enters the room between 19:00 and 7:00, hide the laptops
    const now = new Date();
    const startNight = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 19, 0, 0);
    const startDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 7, 0, 0);
    if (now > startNight || now < startDay) {
        WA.room.hideLayer("above/laptops");
    }

}).catch(e => console.error(e));

function closePopup(){
    if (currentPopup !== undefined) {
        currentPopup.close();
        currentPopup = undefined;
    }
}

export {};
