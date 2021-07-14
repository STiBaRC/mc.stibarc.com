function $(id) {
    if (id.startsWith(".")) {
        return document.getElementsByClassName(id.substring(1));
    } else {
        return document.getElementById(id);
    }
}

function getAllUrlParams() {
    var queries = location.search.slice(1).split("&");
    var obj = {};
    for (var i in queries) {
        if (queries[i] != "") {
            var tmp = queries[i].split("=");
            obj[decodeURIComponent(tmp[0])] = decodeURIComponent(tmp[1]);
        }
    }
    return obj;
}

var page = getAllUrlParams().page;

var loading = true;
var loadingTime;

function stopLoadingAnimation() {
    loading = false;
    clearTimeout(loadingTime);
}

function startLoadingAnimation() {
    loading = true;
    loadingAnimation();
}

function loadingAnimation() {
    loadingTime = setTimeout(() => {
        $("ping").style.backgroundPosition = "10px -2px";
        loadingTime = setTimeout(() => {
            $("ping").style.backgroundPosition = "10px -10px";
            loadingTime = setTimeout(() => {
                $("ping").style.backgroundPosition = "10px -18px";
                loadingTime = setTimeout(() => {
                    $("ping").style.backgroundPosition = "10px -26px";
                    loadingTime = setTimeout(() => {
                        $("ping").style.backgroundPosition = "10px -34px";
                        loadingTime = setTimeout(() => {
                            $("ping").style.backgroundPosition = "10px -26px";
                            loadingTime = setTimeout(() => {
                                $("ping").style.backgroundPosition = "10px -18px";
                                loadingTime = setTimeout(() => {
                                    $("ping").style.backgroundPosition = "10px -10px";
                                    if (loading) {
                                        loadingAnimation();
                                    }
                                }, 85);
                            }, 85);
                        }, 85);
                    }, 85);
                }, 85);
            }, 85);
        }, 85);
    }, 85);
}

loadingAnimation();

function setPingInfo(time) {
    if (time < 150) {
        $("ping").style.backgroundPosition = "0 -2px";
    } else if (time < 300) {
        $("ping").style.backgroundPosition = "0 -10px";
    } else if (time < 600) {
        $("ping").style.backgroundPosition = "0 -18px";
    } else if (time < 1000) {
        $("ping").style.backgroundPosition = "0 -26px";
    } else if (time >= 1000) {
        $("ping").style.backgroundPosition = "0 -34px";
    } else {
        $("ping").style.backgroundPosition = "0 -42px";
    }
}

function setStatus(data) {
    stopLoadingAnimation();
    setPingInfo(0);
    $("name").title = data.ip + ":" + data.port;
    $("motd").innerHTML = data.motd.html;
    $("playerCount").innerHTML = "";
    var playerCount = document.createElement("span");
    var online = document.createElement("span");
    online.setAttribute("class", "online");
    online.appendChild(document.createTextNode(data.players.online));
    playerCount.appendChild(online);
    var spacer = document.createElement("span");
    spacer.appendChild(document.createTextNode("/"));
    playerCount.appendChild(spacer);
    var max = document.createElement("span");
    max.setAttribute("class", "max");
    max.appendChild(document.createTextNode(data.players.max));
    playerCount.appendChild(max);
    $("playerCount").appendChild(playerCount);
    $("serverIcon").src = data.icon;
    /* Online players */
    var playersOnline = data.players.list;
    $("onlinePlayers").innerHTML = "";
    var playerList = document.createElement("span");
    if (data.players.online == 0) {
        var noPlayers = document.createElement("span");
        noPlayers.appendChild(document.createTextNode("None"));
        playerList.appendChild(noPlayers);
    } else {
        for (var i = 0; i < playersOnline.length; i++) {
            var username = playersOnline[i];
            var tooltip = document.createElement("span");
            tooltip.setAttribute("class", "tooltip");
            var playerPfp = document.createElement("img");
            playerPfp.src = "https://minotar.net/avatar/" + username + "/16.png";
            tooltip.appendChild(playerPfp);
            var tooltipDesc = document.createElement("span");
            tooltipDesc.appendChild(document.createTextNode(username));
            tooltip.appendChild(tooltipDesc);
            playerList.appendChild(tooltip);
        }
    }
    $("onlinePlayers").appendChild(playerList);
}

function setInfo(data) {
    $("info-ip").textContent = data.ip + ":" + data.port;
    $("info-version").textContent = data.version;
}

fetch("https://api.mcsrvstat.us/2/mc.stibarc.com")
    .then((response) => response.json())
    .then((data) => {
        setStatus(data);
        setInfo(data);
    })
    .catch((error) => {
        console.log(error);
        stopLoadingAnimation();
        setPingInfo(error);
    });

var click_stereo = new Audio();
click_stereo.src = "data:audio/ogg;base64,T2dnUwACAAAAAAAAAACIPQAAAAAAANeRDzsBHgF2b3JiaXMAAAAAAkSsAAAAAAAAAPQBAAAAAAC4AU9nZ1MAAAAAAAAAAAAAiD0AAAEAAADXPiESES3/////////////////////A3ZvcmJpcx0AAABYaXBoLk9yZyBsaWJWb3JiaXMgSSAyMDA3MDYyMgAAAAABBXZvcmJpcylCQ1YBAAgAAIAiTBjEgNCQVQAAEAAAoKw3lnvIvffee4GoRxR7iL333nvjrEfQeoi599577r2nGnvLvffecyA0ZBUAAAQAgCkImnLgQuq99x4Z5hFRGirHvfceGYWJMJQZhT2V2lrrIZPcQuo95x4IDVkFAAACAEAIIYQUUkghhRRSSCGFFFJIKaWYYooppphiyimnHHPMMccggw466KSTUEIJKaRQSiqppJRSSi3WWnPuvQfdc+9B+CCEEEIIIYQQQgghhBBCCEJDVgEAIAAABEIIIWQQQgghhBRSSCGmmGLKKaeA0JBVAAAgAIAAAAAASZEUy7EczdEczfEczxElURIl0TIt01I1UzM9VVRF1VRVV1VdXXdt1XZt1ZZt11Zt1XZt1VZtWbZt27Zt27Zt27Zt27Zt27ZtIDRkFQAgAQCgIzmSIymSIimS4ziSBISGrAIAZAAABACgKIrjOI7kSI4laZJmeZZniZqomZroqZ4KhIasAgAAAQAEAAAAAADgeIrneI5neZLneI5neZqnaZqmaZqmaZqmaZqmaZqmaZqmaZqmaZqmaZqmaZqmaZqmaZqmaZqmaZqmaUBoyCoAQAIAQMdxHMdxHMdxHEdyJAcIDVkFAMgAAAgAQFIkx3IsR3M0x3M8R3REx3RMyZRUybVcCwgNWQUAAAIACAAAAAAAQBMsRVM8x5M8zxM1z9M0zRNNUTRN0zRN0zRN0zRN0zRN0zRN0zRN0zRN0zRN0zRN0zRN0zRN0zRNUxSB0JBVAAAEAAAhnWaWaoAIM5BhIDRkFQCAAAAAGKEIQwwIDVkFAAAEAACIoeQgmtCa8805DprloKkUm9PBiVSbJ7mpmJtzzjnnnGzOGeOcc84pypnFoJnQmnPOSQyapaCZ0JpzznkSmwetqdKac84Z55wOxhlhnHPOadKaB6nZWJtzzlnQmuaouRSbc86JlJsntblUm3POOeecc84555xzzqlenM7BOeGcc86J2ptruQldnHPO+WSc7s0J4ZxzzjnnnHPOOeecc84JQkNWAQBAAAAEYdgYxp2CIH2OBmIUIaYhkx50jw6ToDHIKaQejY5GSqmDUFIZJ6V0gtCQVQAAIAAAhBBSSCGFFFJIIYUUUkghhhhiiCGnnHIKKqikkooqyiizzDLLLLPMMsusw84667DDEEMMMbTSSiw11VZjjbXmnnOuOUhrpbXWWiullFJKKaUgNGQVAAACAEAgZJBBBhmFFFJIIYaYcsopp6CCCggNWQUAAAIACAAAAPAkzxEd0REd0REd0REd0REdz/EcURIlURIl0TItUzM9VVRVV3ZtWZd127eFXdh139d939eNXxeGZVmWZVmWZVmWZVmWZVmWZQlCQ1YBACAAAABCCCGEFFJIIYWUYowxx5yDTkIJgdCQVQAAIACAAAAAAEdxFMeRHMmRJEuyJE3SLM3yNE/zNNETRVE0TVMVXdEVddMWZVM2XdM1ZdNVZdV2Zdm2ZVu3fVm2fd/3fd/3fd/3fd/3fd/XdSA0ZBUAIAEAoCM5kiIpkiI5juNIkgSEhqwCAGQAAAQAoCiO4jiOI0mSJFmSJnmWZ4maqZme6amiCoSGrAIAAAEABAAAAAAAoGiKp5iKp4iK54iOKImWaYmaqrmibMqu67qu67qu67qu67qu67qu67qu67qu67qu67qu67qu67qu67pAaMgqAEACAEBHciRHciRFUiRFciQHCA1ZBQDIAAAIAMAxHENSJMeyLE3zNE/zNNETPdEzPVV0RRcIDVkFAAACAAgAAAAAAMCQDEuxHM3RJFFSLdVSNdVSLVVUPVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVdU0TdM0gdCQlQAAGQAAw7Tk0nLPjaBIKke11pJR5STFHBqKoIJWcw0VNIhJiyFiCiEmMZYOOqac1BpTKRlzVHNsIVSISQ06plIpBi0IQkNWCAChGQAOxwEkywIkSwMAAAAAAAAASdMAzfMAy/MAAAAAAAAAQNI0wPI0QPM8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkTQM0zwM0zwMAAAAAAAAAzfMATxQBTxQBAAAAAAAAwPI8wBM9wBNFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcTQM0zwM0zwMAAAAAAAAAy/MATxQBzxMBAAAAAAAAQPM8wBNFwBNFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAQ4AAAEWQqEhKwKAOAEAhyRBkiBJ0DSAZFnQNGgaTBMgWRY0DZoG0wQAAAAAAAAAAABA8jRoGjQNogiQNA+aBk2DKAIAAAAAAAAAAAAgaRo0DZoGUQRImgZNg6ZBFAEAAAAAAAAAAADQTBOiCFGEaQI804QoQhRhmgAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAACAAQcAgAATykChISsCgDgBAIeiWBYAADiSY1kAAOA4kmUBAIBlWaIIAACWpYkiAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAIABBwCAABPKQKEhKwGAKAAAh6JYFnAcywKOY1lAkiwLYFkAzQNoGkAUAYAAAIACBwCAABs0JRYHKDRkJQAQBQDgUBTL0jRR5DiWpWmiyJEsS9NEkWVpmueZJjTN80wRoud5pgnP8zzThGmKoqoCUTRNAQAABQ4AAAE2aEosDlBoyEoAICQAwOE4luV5ouh5omiaqspxLMvzRFEUTVNVVZXjaJbniaIomqaqqirL0jTPE0VRNE1VVV1omueJoiiapqq6LjzP80RRFE1TVV0Xnud5oiiKpqmqrgtRFEXTNE1VVVXXBaJomqapqqrqukAURdM0VVVVXReIoiiapqqqrusC0zRNVVVV15VdgGmqqqq6rusCVFVVXdd1ZRmgqqrquq4rywDXdV3XlWVZBuC6ruvKsiwAAODAAQAgwAg6yaiyCBtNuPAAFBqyIgCIAgAAjGFKMaUMYxJCCqFhTEJIIWRSUioppQpCKiWVUkFIpaRSMkotpZZSBSGVkkqpIKRSUikFAIAdOACAHVgIhYasBADyAAAIY5RijDHnJEJKMeaccxIhpRhzzjmpFGPOOeeclJIx55xzTkrpmHPOOSelZMw555yTUjrnnHPOSSmldM4556SUUkLoHHRSSimdcw5CAQBABQ4AAAE2imxOMBJUaMhKACAVAMDgOJalaZ4niqZpSZKmeZ7niaaqapKkaZ4niqapqjzP80RRFE1TVXme54miKJqmqnJdURRF0zRNVSXLomiKpqmqqgvTNE3TVFXXhWmapmmqquvCtlVVVV3XdWHbqqqqruvKwHVd13VlGciu67quLAsAAE9wAAAqsGF1hJOiscBCQ1YCABkAAIQxCCmEEFLIIKQQQkgphZAAAIABBwCAABPKQKEhKwGAVAAAgBBrrbXWWmsNY9Zaa6211hLnrLXWWmuttdZaa6211lprrbXWWmuttdZaa6211lprrbXWWmuttdZaa6211lprrbXWWmuttdZaa6211lprrbXWWmuttdZaa6211lprrbXWWmuttdZaa621VgAgdoUDwE6EDasjnBSNBRYashIACAcAAIxBiDHoJJRSSoUQY9BJSKW1GCuEGINQSkqttZg85xyEUlpqLcbkOecgpNRajDEm10JIKaWWYouxuBZCKim11mKsyRiVUmotthhr7cWolEpLMcYYazDG5tRajDHWWosxOrcSS4wxxlqEEcbFFmOstdcijBGyxdJarbUGY4yxubXYas25GCOMri21VmvNBQCYPDgAQCXYOMNK0lnhaHChISsBgNwAAAIhpRhjzDnnnHMOQgipUow55xyEEEIIoZRSUqUYc845CCGEUEIppaSMMeYchBBCCKWUUkppKWXMOQghhFBKKaWU0lLrnHMQQgillFJKKSWl1DnnIIRQSimllFJKSi2EEEIooZRSSimllJRSSiGEUEoppZRSSimppZRCCKWUUkoppZRSUkophRBCKaWUUkoppaSUWiullFJKKaWUUkpJLbWUUiillFJKKaWUklpKKaVSSimllFJKKSWl1FJKpZRSSimllFJKS6mllEoppZRSSimllJRSSimlVEoppZRSSikppdRaSimllEoppZRSWmsppZZSKqWUUkoppbTUWmsttZRKKaWUUkpprbWUUkoplVJKKaWUUgAA0IEDAECAEZUWYqcZVx6BIwoZJqBCQ1YCAGQAAAyjlFJJLUWCIqUYpJZCJRVzUFKKKHMOUqypQs4g5iSVijGElINUMgeVUsxBCiFlTCkGrZUYOsaYo5hqKqFjDAAAAEEAAIGQCQQKoMBABgAcICRIAQCFBYYOESJAjAID4+LSBgAgCJEZIhGxGCQmVANFxXQAsLjAkA8AGRobaRcX0GWAC7q460AIQQhCEIsDKCABByfc8MQbnnCDE3SKSh0IAAAAAIADADwAACQbQERENHMcHR4fICEiIyQlT2dnUwABAAAAAAAAAACIPQAAAgAAABfUxJ4BPCYnKAIAAAAA4AYAHwAASQoQERHNHEeHxwdIiMgISYnJCUoAACCAAAAAAAAIIAABAQEAAAAAgAAAAAABAU9nZ1MABCwwAAAAAAAAiD0AAAMAAABhsOwRHEpJSv9V/1M4OTY4TVxUU/9k/z3/OOYBAQEBAQG0IfdAxPfKZnmJYcWn6FBNSabfFydDBG2u0K1fhmBETaSb83pdU308+3fTPP1y9WPx+qd1Tfe4fpJtgoDOzoEUho5vD9He15CjCQweR3DO1ekZeFzi+a9O83ecTonclhd73c2Kt3Mcc89FtX1bYo75XFz/9nCeD13u3vuwQcnK+aV8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";
click_stereo.volume = 0.15;
const mcButtons = $(".button");
document.addEventListener("click", function (event) {
    if (mcButtons.length > 0) {
        for (var i = 0; i < mcButtons.length; i++) {
            var buttonClicked = mcButtons[i].contains(event.target);
            if (buttonClicked) {
                click_stereo.play();
                click_stereo.currentTime = 0;
            }
        }
    }
});

/* pages */

function rules() {
    window.history.pushState('rules', 'Rules - STiBaRC MC', '?page=rules');
    document.title = "Rules - STiBaRC MC";
    $("home").style.display = "none";
    $("rules").style.display = "block";
}

function home() {
    window.history.pushState('home', 'STiBaRC MC', '?page=home');
    document.title = "STiBaRC MC";
    $("home").style.display = "block";
    $("rules").style.display = "none";
}

function updatePage() {
    if(page == "rules") {
        rules();
    } else {
        home();
    }
}

window.onpopstate = function(e){
    if(e.state){
        page = e.state;
        updatePage();
    }
}

updatePage();