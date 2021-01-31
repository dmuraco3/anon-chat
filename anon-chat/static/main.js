function joinroom() {
    //room_id = document.getElementById("ID").value
    loc = window.location.href
    loc = loc.split("/")
    room_id = loc[loc.length - 1]
    nick = prompt("enter nickname")
    var socket = io(window.location.href.split("/")[window.location.href.split("/").length - 2]);
    socket.on('connect', function(){
        socket.emit('join', {data: {room: room_id, nick: nick}})
    })
    socket.on('message', function(data) {
        chat = document.getElementById("chat")
        chat.innerHTML += data;
        chat.innerHTML += "<br>";
    })
    console.log("socket")
    return socket
}


function PublicRoomsTable() {
    table = document.getElementById("public-rooms-table")
    table.innerHTML = ''
    table.innerHTML += `
    <caption align="top">Public Rooms</caption>
    <tr>
        <th class="table-header">Room ID</th>
        <th class="table-header">Users Online </th>
        <th></th>
    </tr>
    <tr>
        <td>qbcsaf</td>
        <td>2</td>
        <td onclick="alert('clicked')" class="join">Join</td>
    </tr>
    <tr>
        <td>qbcsaf</td>
        <td>2</td>
        <td onclick="alert('clicked')" class="join">Join</td>
    </tr>
    `
}

function JoinRoomFromTable(index){
    return
}

document.addEventListener('DOMContentLoaded', function(){
    PublicRoomsTable()
})
