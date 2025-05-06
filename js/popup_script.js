document.addEventListener('DOMContentLoaded', function() {
    var actionButton = document.getElementById('actionButton');
    if (actionButton) {
        actionButton.addEventListener('click', function() {
            // Recherche l'onglet actif qui est une page Twitch.tv
            chrome.tabs.query({active: true, currentWindow: true, url: "*://*.twitch.tv/*"}, function(tabs) {
                if (tabs.length > 0) {
                    chrome.tabs.sendMessage(tabs[0].id, {action: "callChangeIcon"}, function(response) {
                        if (chrome.runtime.lastError) {
                            console.error("Popup script error: " + chrome.runtime.lastError.message);
                            // Ici, tu pourrais mettre à jour l'interface de la popup pour afficher une erreur
                            // par exemple, si le script de contenu n'est pas injecté ou ne répond pas.
                        } else if (response && response.status) {
                            console.log("Popup script: Message envoyé, réponse du script de contenu:", response.status);
                        } else {
                            console.log("Popup script: Message envoyé, pas de statut spécifique dans la réponse du script de contenu.");
                        }
                    });
                } else {
                    console.warn("Popup script: Aucun onglet Twitch.tv actif trouvé. Le bouton ne fonctionnera que sur une page Twitch.");
                    // Optionnel: informer l'utilisateur dans la popup (ex: changer le texte d'un paragraphe)
                    // Par exemple: document.querySelector('p').textContent = "Veuillez ouvrir un onglet Twitch.tv.";
                }
            });
        });
    } else {
        console.error("Popup script: Bouton avec l'ID 'actionButton' non trouvé.");
    }
});