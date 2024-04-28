/// <reference types="@workadventure/iframe-api-typings" />

import {RemotePlayer} from "@workadventure/iframe-api-typings/play/src/front/Api/Iframe/Players/RemotePlayer";
import { ActionMessage } from "@workadventure/iframe-api-typings";
import {bootstrapExtra} from "@workadventure/scripting-api-extra/dist";

console.log('Script started successfully');

// Structure de données pour stocker les likes associés aux utilisateurs
const likeCounts: Record<string, number> = {};

// Générer un message d'action
function genMessage() {
    return WA.ui.displayActionMessage({
        type: "message",
        message: "Press SPACE to LIKE",
        callback: () => {
            const userName = WA.player.name;
            WA.player.state.loadVariable('likeCounts')
            if(!WA.player.state.hasVariable('likeCounts')){              
                WA.state.saveVariable('likeCounts', {})
            }else{
                let save: Record<string, number> = WA.state.loadVariable('likeCounts') as Record<string, number> || {};
              
              console.log("save", save);

                if(Object.keys(save).length === 0){
                    save = {};
                }
              
              
              if(save.hasOwnProperty(WA.player.name)){
                //console.log("moqq", save.hasOwnProperty(WA.player.name)); //return true
                save[WA.player.name] = save[WA.player.name] + 1;
                WA.state.saveVariable('likeCounts', save)
              }else{
                save[WA.player.name] = 0;
                WA.state.saveVariable('likeCounts', save)
              }
              console.log(WA.state.loadVariable('likeCounts'));
            
            }
        
            
            likeCounts[userName] = (likeCounts[userName] || 0) + 1;
            console.log(`***** ${userName} has ${likeCounts[userName]} likes ******`);
            genMessage();
        }
    });
}

// Fonction pour récupérer le classement
function getRankings(): string[] {
    // Convertir l'objet de likes en tableau d'objets [userName, likeCount]
    const likeEntries = Object.entries(likeCounts);

    // Trier les utilisateurs par nombre de likes décroissant
    likeEntries.sort((a, b) => b[1] - a[1]);

    // Renvoyer uniquement les identifiants d'utilisateur dans l'ordre de classement
    return likeEntries.map(entry => entry[0]);
}

let currentPopup: any = undefined;

WA.onInit().then(  async () => {

  WA.state.onVariableChange('likeCounts').subscribe((data: unknown) => {
    console.log('data' +data);
    
  })
  
    let actionMessage: ActionMessage | undefined;

    WA.room.area.onEnter("likeZone").subscribe(() => {
        // Afficher le message d'action
        actionMessage = genMessage();
    });

    // Lorsque quelqu'un quitte la zone de likeZone
    WA.room.area.onLeave("likeZone").subscribe(() => {
        if (actionMessage !== undefined) {
            // Masquer le message d'action
            actionMessage.remove();
            actionMessage = undefined;
        }
    });

    setInterval(() => {
      const rankings = getRankings();
      console.log("Rankings:");
      rankings.forEach((userName, index) => {
          console.log(`${index + 1}. ${userName} - ${likeCounts[userName]} likes`);
      });
  }, 10000); // Afficher les classements toutes les 5 secondes

  WA.state.onVariableChange('likeCounts').subscribe((data: unknown) => {
    console.log(data);
  }) 



    await WA.player.state.saveVariable("tags", WA.player.tags, {
        public: true,
        persist: true,
        scope: "world",
    });


    let noteWebsite: any;
    let streamWebsite: any;
    WA.ui.onRemotePlayerClicked.subscribe( async (remotePlayer: RemotePlayer)  => {
        console.log(remotePlayer.state.tags)
        let tags = remotePlayer.state.tags as string[];
        if (tags.includes('model')) {
            await WA.players.configureTracking();
            const player = WA.players.get(remotePlayer.playerId);
            if (player !== undefined) {
                remotePlayer.addAction('Un moment avec '+player.name + " ?", async () => {
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
                        }   , 9000)
                })
            }
        }
    });

    WA.room.onEnterLayer("streamNote").subscribe(async () => {
        console.log("Entering visibleNote layer");

        streamWebsite = await WA.ui.website.open({
            url: "./stream.html",
            position: {
                vertical: "top",
                horizontal: "middle",
            },
            size: {
                height: "90%",
                width: "80%",
            },
            margin: {
                top: "10vh",
            },
            allowApi: true,
        });

    });

    WA.room.onLeaveLayer("streamNote").subscribe(() => {
        streamWebsite.close();
    });

    WA.room.area.onEnter('clock').subscribe(() => {
        const today = new Date();
        const time = today.getHours() + ":" + today.getMinutes();
        currentPopup = WA.ui.openPopup("clockPopup", "It's " + time, []);
    })

    WA.room.area.onLeave('clock').subscribe(closePopup)

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
