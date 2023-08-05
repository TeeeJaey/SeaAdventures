const start = () => {
    let treasureFound = false;
    let treasureGrabEnabled = false;

    let chatIndex = 0;
    let chatList = [
        "Hey there...",
        "I need your help.",
        "There is a treasure down here somewhere",
        "But there are sharks in the sea",
        "Can you go down & check, please?",
        "Thanks!",
        ". . .",
        ". . .",
        "I'll wait here...",
        "Not much I can do from here anyway, right?",
        ". . .",
    ];

    function isTreasureFound() {
        var rect = document.querySelector(".sunken-ship").getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    let chestState = "open";
    const chestElement = document.querySelector(".chest");
    const boatElement = document.querySelector(".boat");

    const chestMoveCallback = chestMoveEvent => {
        chestElement.style.left = chestMoveEvent.clientX - 50 + "px";
        chestElement.style.top = chestMoveEvent.clientY - 50 + "px";
    };

    const boatClickCallback = boatClickEvent => {
        chestElement.removeEventListener("click", chestClickCallback);
        document.removeEventListener("mousemove", chestMoveCallback);
        boatElement.removeEventListener("click", boatClickCallback);
        chestElement.style.display = "none";
        boatElement.style.background = "url(./assets/boat_treasure.png)";
        chatList = [
            "AHH WOAH! you did it!",
            "Thank you so much!",
            "I am rich!!!  All Thanks to you",
            "Here you go..something for your effort.",
            ". . .",
            "You don't want it?",
            "Ok then, good bye!",
        ];
        setChatText(0);
    };

    const chestClickCallback = chestClickEvent => {
        if (chestState === "open") {
            chestElement.style.cursor = "grab";
            chestElement.src = "assets/chest_close.png";
            chestClosed = true;
            chestState = "closed";
        } else if (chestState === "closed") {
            chestState = "moving";
            chestElement.style.cursor = "grabbing";
            chestElement.style.position = "fixed";
            chestElement.style.bottom = "auto";
            chestElement.style.right = "auto";
            document.addEventListener("mousemove", chestMoveCallback);
            boatElement.addEventListener("click", boatClickCallback);
        }
    };

    function enableTreasureGrab() {
        treasureGrabEnabled = true;
        chestElement.style.cursor = "pointer";
        chestElement.addEventListener("click", chestClickCallback);
        console.log("enableTreasureGrab");
    }

    function setChatText(index) {
        if (index >= chatList.length) index = chatList.length - 1;
        chatIndex = index;
        document.getElementById("chat-text").innerText = chatList[chatIndex];
    }

    document.getElementById("chat-text").addEventListener("click", e => {
        chatIndex++;
        setChatText(chatIndex);

        if (chatIndex >= 13 && !treasureGrabEnabled) {
            enableTreasureGrab();
        }
    });

    document.addEventListener("scroll", e => {
        if (!treasureFound) {
            treasureFound = isTreasureFound();
            if (treasureFound) {
                chatList.push(
                    ...[
                        "Oh! You found it?",
                        "Great... I knew you could do it.",
                        "Could you please bring it up for me?",
                        ". . .",
                        "I'll be right here...",
                        ". . .",
                    ],
                );
            }
        }
    });
};
