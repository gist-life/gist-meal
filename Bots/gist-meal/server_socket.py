import socket
import traceback
import json
from datetime import date

import get_url as URL
import get_meal as MEAL

def get_meal(dt: date) -> dict[str, list[str]]:
    url = URL.find_url(dt)

    while len(meal := MEAL.get_meal(url)) == 0:
        print('retrying...')
        pass

    return meal[dt.weekday()]

HOST = 'localhost'
PORT = 5000

with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as server_socket:
    server_socket.bind((HOST, PORT))
    server_socket.listen()
    print(f'파이썬 서버 실행 중... {HOST}:{PORT}')

    while True:
        conn, addr = server_socket.accept()

        with conn:
            try:
                data: str = conn.recv(4096).decode('utf-8').strip()
                print(f'{data=}')   # 사이트 코드

                if not data:
                    continue

                if data == "shutdown":
                    conn.sendall("서버를 종료합니다.".encode('utf-8'))
                    break

                date_obj = json.loads(data)
                target_date = date(date_obj['year'], date_obj['month'], date_obj['day'])
                meal = get_meal(target_date)

                conn.sendall(json.dumps(meal).encode('utf-8'))
                print(f'{addr}로 응답을 보냈습니다.')
            except:
                conn.sendall(traceback.format_exc().encode('utf-8'))