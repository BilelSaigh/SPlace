/// <reference types="@workadventure/iframe-api-typings" />

import {ActionMessage} from "@workadventure/iframe-api-typings";

console.log('Script started successfully');

// Waiting for the API to be ready
WA.onInit().then(() => {
  let actionMessage: ActionMessage | undefined;
  let likeCount = 0;
  // When someone enters the bellZone area

  let stopLike = false;

  WA.room.area.onEnter("bellZone").subscribe(() => {
    console.log("oui");
    
    // Display the action message
    function genMessage() {
        actionMessage = WA.ui.displayActionMessage({
        type: "message",
        message: "Press SPACE to LIKE",
        callback: () => {
            likeCount++;
            // When space is pressed, we send a "bell-rang" signal to everyone on the map.
            console.log(`*****${actionMessage} ${likeCount}******`);

            genMessage();
        }
        });
    }

    genMessage();    
  });

  // When someone leaves the bellZone area
  WA.room.area.onLeave("bellZone").subscribe(() => {
    if (actionMessage !== undefined) {
      // Hide the action message
      actionMessage.remove();
      actionMessage = undefined;
    }
  });

}).catch(e => console.error(e));

export {};