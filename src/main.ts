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
    let actionMessage: ActionMessage | undefined;

    WA.room.area.onEnter("likeZone").subscribe(() => {
        console.log("oui");

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
  }, 5000); // Afficher les classements toutes les 5 secondes

}).catch(e => console.error(e));

export {};
