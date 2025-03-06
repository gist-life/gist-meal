import json
import socket

config = {
    'address': '0.0.0.0',
    'port': 5000,
}

sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
sock.bind((config['address'], config['port']))


def reply(room, msg):
    message = json.dumps({'event': 'sendText', 'data': {'room': room, 'msg': msg}}, ensure_ascii=False)
    sock.sendto(message.encode('utf-8'), addr)


def markAsRead(room):
    message = json.dumps({'event': 'markAsRead', 'data': {"room": room}}, ensure_ascii=False)
    sock.sendto(message.encode('utf-8'), addr)


# Code Here
def response(room, msg, sender, isGroupChat, profileImage, packageName, isMention=None, logId=None, channelId=None,
             userHash=None):
    if msg == "ping":
        reply(room, "pong!")

    if msg == "mark":
        markAsRead(room)


def handle_message(data):
    parsed_data = json.loads(data.decode())
    event = parsed_data['event']
    data = parsed_data['data']
    print(event, data)  # todo: debug
    if event == 'chat':
        response(**data)


while True:
    data, addr = sock.recvfrom(65535)
    handle_message(data)