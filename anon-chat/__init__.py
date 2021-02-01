from flask import Flask, render_template, abort, session
from flask_socketio import SocketIO, emit, send, join_room, leave_room
import json
import os

app = Flask(__name__)
app.secret_key = os.urandom(32)
socketio = SocketIO(app)

rooms = {
    "lounge": {
        "users": 0
    },
    "programming": {
        "users": 0
    }
}
always_open = ["lounge", "programming"]

@app.route("/")
def home():
    return render_template("/main/index.html")

@app.route("/private")
def private():
    return render_template("/private/index.html")

@app.route("/<room_id>")
def chat_room(room_id):
    counter = 1
    for key in rooms:
        if room_id == key:
            return render_template("/chat/index.html")
        
        if counter == len(rooms):
            if room_id != key:
                return render_template("/chat/index.html")
        counter += 1


@socketio.on('join')
def join(data):
    session['nick'] = data['data']['nick']
    session['room'] = data['data']['room']
    join_room(session['room'])
    try:
        rooms[session['room']]['users'] += 1
    except KeyError:
        rooms[session['room']] = {}
        rooms[session['room']]['users'] = 0
        rooms[session['room']]['users'] += 1

    print(rooms)
    send(session['nick'] + " has entered the room.", room=session['room'])
    return rooms

@socketio.on('disconnect')
def disconnect():
    try:
        send(session['nick'] + " has left the room.", room=session['room'])
        leave_room(session['room'])
        rooms[session['room']]['users'] -= 1
        if rooms[session['room']]['users'] == 0:
            if session['room'] in always_open:
                pass
            else:
                del(rooms[session['room']])  
        return rooms
    except KeyError:
        pass

@socketio.on('update_rooms')
def update_rooms():
    print(rooms)
    send(rooms)

@socketio.on('send_chat')
def send_chat(data):
    message = {}
    if session['room']:
        message['nick'] = session['nick']
        message['message'] = data['data']['message']
        send(message, room=session['room'])

if __name__ == "__main__":
    app.run(host="0.0.0.0" , debug=True)
    socketio.run(app)