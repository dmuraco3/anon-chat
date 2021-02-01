var socket = io(window.location.href.split("/")[window.location.href.split("/").length - 2]);
socket.on('connect', function(){
    console.log("connected")
    socket.emit('update_rooms')
})
socket.on('message', function(data) {
    console.log(data)
    PublicRoomsTable(data)
})


function PublicRoomsTable(data) {
    keys = Object.keys(data)

    table = document.getElementById("public-rooms-table")
    table.innerHTML = ''
    table.innerHTML += `
    <caption align="top">Public Rooms</caption>
    <tr>
        <th class="table-header">Room ID</th>
        <th class="table-header">Users Online </th>
        <th></th>
    </tr>
    `
    for (index = 0; index < keys.length; index++) { 
        console.log(keys[index]);
        console.log(data[keys[index]]) 
        table.innerHTML += `
        <tr>
            <td>${keys[index]}</td>
            <td>${data[keys[index]]['users']}</td>
            <td onclick="JoinRoomFromTable(${"'" + keys[index] + "'"})" class="join">Join</td>
        </tr>
        `
    } 
}

function JoinRoomFromTable(room){
    window.location.href = (window.location.protocol) + "//" + (window.location.host) + "/" + (room)
}

document.addEventListener('beforeunload', function() {
    socket.disconnect()
})