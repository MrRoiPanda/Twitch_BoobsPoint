changeIcon()

function changeIcon() {
    var svg = document.getElementsByName("ScIconSVG-sc-1q25cff-1 dSicFr");
    var parent = svg.parentNode;
    parent.removeChild(svg);

    down.innerHTML = "SVG Deleted.";

    var img = document.createElement("img");
    img.src = "img/icon.png";

    document.getElementsByClassName("ScAspectRatio-sc-18km980-1 hTTohL tw-aspect").appendChild(img)
    down.innerHTML = "Image Element Added.";
    
}

