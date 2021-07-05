function $(id) {
    if (id.startsWith(".")) {
        return document.getElementsByClassName(id.substring(1));
    } else {
        return document.getElementById(id);
    }
}

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

function setInfo(data) {
    stopLoadingAnimation();
    setPingInfo(0);
    $("name").title = data.hostname;
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

fetch("https://api.mcsrvstat.us/2/mc.stibarc.com")
    .then((response) => response.json())
    .then((data) => setInfo(data))
    .catch((error) => {
        console.log(error);
        stopLoadingAnimation();
        setPingInfo(error);
    });
