nick = prompt("enter nickname")
if(nick != null){
    loc = window.location.href
    loc = loc.split("/")
    room_id = loc[loc.length - 1]
    document.getElementsByTagName("title")[0].innerHTML = room_id
    var socket = io(window.location.href.split("/")[window.location.href.split("/").length - 2]);
    socket.on('connect', function(){
        socket.emit('join', {data: {room: room_id, nick: nick}})
    })
    socket.on('message', function(data) {
        chat = document.getElementById("chat")
        if(data['message']){
            data["message"].replace("<", "&lt")
            console.log(message)

            container = document.createElement("div")

            Name = document.createElement("div")
            Name.className = "name"
            Name.textContent = `${data["nick"]}`


            Message = document.createElement("div")
            Message.className = "message"

            P = document.createElement("p")
            console.log(data['message'])
            P.innerHTML += `${data["message"]}`
            console.log(P.innerHTML)
            Message.appendChild(P)

            container.appendChild(Name)
            container.appendChild(Message)

            chat.appendChild(container)
            document.querySelectorAll('pre code').forEach((block) => {
                hljs.highlightBlock(block);
            });
        }
        else {
            if(data.includes("disconnected")){
                console.log("discon")
            }
            if(!data.includes(nick)){
                chat.innerHTML += `
                <div>
                    <div class="notif" style="color: green;">*</div>
                    <div class="message" style="color: green;"><p>${data}</p></div>
                </div>
                `;
            }
        }
        chat.scrollTop = chat.scrollHeight - chat.clientHeight
    })
}
else {

}
console.log("socket")

function sendChat(event) {
    if(event.keyCode == "13"){
        message = document.getElementById("message").value
        socket.emit('send_chat', {data: {message: message}})
        document.getElementById("message").value = ""
        document.getElementById('message').style.height = "30px"
        document.activeElement.blur()
    }
}

var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
}

let emoji = {
    Emojis: {
        "Smileys & Emotion": {
            "grinning face": "😀",
            "grinning face with smiling eyes": "😄",
            "beaming face with smiling eyes": "😁"
        },
        "face-affection": {
            "smiling face with hearts": "🥰",
            "smiling face with heart-eyes": "😍",
            "star-struck": "🤩"
        }
    },
    randomEmoji: function() {
        emoji.emojiButton = document.getElementById("emoji-button")
        keys = Object.keys(emoji.Emojis)
        randProp = emoji.Emojis[keys[ keys.length * Math.random() << 0]];
        keys = Object.keys(randProp)
        randEmoji = randProp[keys[keys.length * Math.random() << 0]]
        emoji.emojiButton.innerHTML = randEmoji
        
    },
    addEmoji: function() {
        function handleTransform() {
            if(document.getElementById("addEmoji") != null){
                posX = (document.getElementById("emoji-button").getBoundingClientRect().left) + (+ window.scrollX)
                posY = (document.getElementById("emoji-button").getBoundingClientRect().top) + (+ window.scrollX)
                document.getElementById("addEmoji").style.left = String(posX - 55) + "px"
                document.getElementById("addEmoji").style.top = String(posY - 105) + "px"
            }
        }
        if(document.getElementById("addEmoji") == null){
            posX = (document.getElementById("emoji-button").getBoundingClientRect().left) + (+ window.scrollX)
            posY = (document.getElementById("emoji-button").getBoundingClientRect().top) + (+ window.scrollX)
            console.log(posX + ":" + posY)
            elem = document.createElement("div")
            elem.id = "addEmoji"
            elem.innerHTML += `
                <a>gnar gnar</a>
            `
            document.body.appendChild(elem)
            elem.style.left = String(posX - 55) + "px"
            elem.style.top = String(posY - 105) + "px"
            window.addEventListener("resize", handleTransform)

        }
        else if(document.getElementById("addEmoji") != null){
            document.getElementById("addEmoji").remove()
            window.removeEventListener("resize", handleTransform)
        }
    }
}

window.addEventListener('beforeunload', function() {
    socket.disconnect()
})

window.addEventListener("load", function() {
    if(!isMobile.any()) {
        document.getElementById("emoji-container").innerHTML += '<a id="emoji-button" onclick="emoji.addEmoji();"></a>'
        emoji.randomEmoji()
        emoji.emojiButton.addEventListener("mouseover", function() {
            emoji.randomEmoji()
        })
    }
})