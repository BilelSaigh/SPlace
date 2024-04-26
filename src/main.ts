/// <reference types="@workadventure/iframe-api-typings" />

import { ActionMessage } from "@workadventure/iframe-api-typings";

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

              let save = WA.state.likeCounts;
              
              console.log("save", save);

               if(save === '{}'){
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

// Attente de l'initialisation de l'API
WA.onInit().then(() => {
  
  let noteWebsite: any;

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

}).catch(e => console.error(e));

export {};
