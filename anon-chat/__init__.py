from flask import Flask, render_template, abort, session
from flask_socketio import SocketIO, emit, send, join_room, leave_room, rooms
import json
import os

app = Flask(__name__)
app.secret_key = os.urandom(32)
socketio = SocketIO(app)

users = {}

@app.route("/")
def home():
    return render_template("/main/index.html")

@app.route("/private")
def private():
    return render_template("/private/index.html")

@app.route("/<room_id>")
def chat_room(room_id):
    with open("/home/dylan/Desktop/anon-chat/anon-chat/rooms.json") as file:
        data = json.load(file)
        file.close()
    for num in data:
        if room_id == data[num]["room_id"]:
            return render_template("/chat/index.html")
        
        if data[num] == data[str(len(data))]:
            if room_id != data[num]:
                return "room does not exist"


@socketio.on('join')
def join(data):
    session['nick'] = data['data']['nick']
    session['room'] = data['data']['room']
    join_room(session['room'])
    print(rooms())
    send(session['nick'] + " has entered the room.", room=session['room'])

@socketio.on('disconnect')
def disconnect():
    send(session['nick'] + " has left the room.", room=session['room'])
    leave_room(session['room'])
    print(session['nick'], "left the chat")

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