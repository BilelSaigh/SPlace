/// <reference types="@workadventure/iframe-api-typings" />

import {ActionMessage} from "@workadventure/iframe-api-typings";

console.log('Script started successfully');

// Waiting for the API to be ready
WA.onInit().then(() => {
  let actionMessage: ActionMessage | undefined;
  let likeCount = 0;
 

  WA.room.area.onEnter("likeZone").subscribe(() => {
    console.log("oui");
    
    // Display the action message
    function genMessage() {
        actionMessage = WA.ui.displayActionMessage({
        type: "message",
        message: "Press SPACE to LIKE",
        callback: () => {
            likeCount++;
            console.log(`*****${actionMessage} ${likeCount}******`);

            genMessage();
        }
        });
    }

    genMessage();    
  });

  // When someone leaves the likeZone area
  WA.room.area.onLeave("likeZone").subscribe(() => {
    if (actionMessage !== undefined) {
      // Hide the action message
      actionMessage.remove();
      actionMessage = undefined;
    }
  });

}).catch(e => console.error(e));

export {};