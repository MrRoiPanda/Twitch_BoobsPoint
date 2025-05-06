// Voici les informations pour trouver le conteneneur de l'élement SVG 
// OuterHTML -> <div class="ScSvgWrapper-sc-wkgzod-0 dvYtkJ tw-svg"><svg width="20" height="20" viewBox="0 0 20 20"><path d="M11 11H9v2h2v-2Z"></path><path fill-rule="evenodd" d="M2 6v11h16V6a3 3 0 0 0-3-3H5a3 3 0 0 0-3 3Zm10-1H8v2h4V5Zm2 0v2h2V6a1 1 0 0 0-1-1h-1ZM4 9v6h12V9H4Zm1-4h1v2H4V6a1 1 0 0 1 1-1Z" clip-rule="evenodd"></path></svg></div>
// Selector -> #live-page-chat > div > div > div.Layout-sc-1xcs6mc-0.iTiPMO.chat-shell.chat-shell__expanded > div > div.Layout-sc-1xcs6mc-0.iynFwo.stream-chat > section > div > div.Layout-sc-1xcs6mc-0.kILIqT.chat-input > div:nth-child(2) > div.Layout-sc-1xcs6mc-0.eWfUfi.chat-input__buttons-container > div.Layout-sc-1xcs6mc-0.cNKHwD > div > div > div > div.Layout-sc-1xcs6mc-0.kxrhnx > div > div > div > button > div > div > div > div
// JsPath -> document.querySelector("#live-page-chat > div > div > div.Layout-sc-1xcs6mc-0.iTiPMO.chat-shell.chat-shell__expanded > div > div.Layout-sc-1xcs6mc-0.iynFwo.stream-chat > section > div > div.Layout-sc-1xcs6mc-0.kILIqT.chat-input > div:nth-child(2) > div.Layout-sc-1xcs6mc-0.eWfUfi.chat-input__buttons-container > div.Layout-sc-1xcs6mc-0.cNKHwD > div > div > div > div.Layout-sc-1xcs6mc-0.kxrhnx > div > div > div > button > div > div > div > div")

function changeIcon() {
    const iconWrapperSelector = "#live-page-chat > div > div > div.Layout-sc-1xcs6mc-0.iTiPMO.chat-shell.chat-shell__expanded > div > div.Layout-sc-1xcs6mc-0.iynFwo.stream-chat > section > div > div.Layout-sc-1xcs6mc-0.kILIqT.chat-input > div:nth-child(2) > div.Layout-sc-1xcs6mc-0.eWfUfi.chat-input__buttons-container > div.Layout-sc-1xcs6mc-0.cNKHwD > div > div > div > div.Layout-sc-1xcs6mc-0.kxrhnx > div > div > div > button > div > div > div > div";
    const iconWrapperDiv = document.querySelector(iconWrapperSelector);

    if (iconWrapperDiv) {
        // Attempt to remove any existing SVG element from the wrapper
        const existingSvgElement = iconWrapperDiv.querySelector("svg");
        if (existingSvgElement) {
            iconWrapperDiv.removeChild(existingSvgElement);
            console.log("Twitch_BoobsPoint: Existing SVG Element removed from wrapper.");
        }

        // Also remove any old "BoobsPoint Icon" img tag if it exists from previous versions
        const oldImg = iconWrapperDiv.querySelector("img[alt='BoobsPoint Icon']");
        if (oldImg) {
            iconWrapperDiv.removeChild(oldImg);
            console.log("Twitch_BoobsPoint: Old BoobsPoint img tag removed.");
        }

        // Fetch and add the new SVG from img/boobs.svg
        fetch(chrome.runtime.getURL("img/boobs.svg"))
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.text();
            })
            .then(svgText => {
                const parser = new DOMParser();
                const svgDoc = parser.parseFromString(svgText, "image/svg+xml");
                const newSvgElement = svgDoc.documentElement;

                if (newSvgElement && newSvgElement.tagName.toLowerCase() === 'svg') {
                    newSvgElement.style.width = "20px";
                    newSvgElement.style.height = "20px";
                    
                    // Add accessibility title
                    let titleElement = newSvgElement.querySelector("title");
                    if (!titleElement) {
                        titleElement = document.createElementNS("http://www.w3.org/2000/svg", "title");
                        newSvgElement.insertBefore(titleElement, newSvgElement.firstChild);
                    }
                    titleElement.textContent = "BoobsPoint Icon";

                    iconWrapperDiv.appendChild(newSvgElement);
                    console.log("Twitch_BoobsPoint: New SVG (boobs.svg) added to wrapper.");
                } else {
                    console.error("Twitch_BoobsPoint: Failed to parse boobs.svg or it is not a valid SVG element.");
                    if (svgDoc.querySelector("parsererror")) {
                        console.error("Parser error:", svgDoc.querySelector("parsererror").textContent);
                    }
                }
            })
            .catch(error => {
                console.error("Twitch_BoobsPoint: Error fetching or processing boobs.svg:", error);
            });

    } else {
        console.error("Twitch_BoobsPoint: Icon wrapper DIV not found with selector:", iconWrapperSelector, ". Cannot change icon.");
    }
}

// Écouteur de messages venant de la popup ou d'autres parties de l'extension
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log("app.js: Message reçu de", sender.tab ?
                    "un script de contenu:" + sender.tab.url :
                    "l\'extension");
        if (request.action == "callChangeIcon") {
            console.log("app.js: Appel de changeIcon() demandé.");
            changeIcon();
            sendResponse({status: "Icône changée"});
        } else {
            sendResponse({status: "Action non reconnue"});
        }
        return true; // Indique que vous allez répondre de manière asynchrone (même si c'est rapide ici)
    }
);
