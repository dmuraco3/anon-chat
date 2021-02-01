const { table } = require("console")

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
            chat.innerHTML += data['nick'] + " : " + data['message']
            chat.innerHTML += "<br>";
        }
        else {
            chat.innerHTML += data;
            chat.innerHTML += "<br>";
        }
    })
}
else {

}
console.log("socket")

function sendChat(event) {
    if(event.keyCode == "13"){
        event.preventDefault()
        message = document.getElementById("message").innerHTML
        socket.emit('send_chat', {data: {message: message}})
        document.getElementById("message").innerHTML = ""
    }
}

function randomEmoji() {
    document.get
}

window.addEventListener('beforeunload', function() {
    socket.disconnect()
})

