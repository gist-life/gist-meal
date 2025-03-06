import re
import socket
import traceback
from collections import defaultdict
from re import Match

from selenium import webdriver
from selenium.webdriver.chrome.webdriver import WebDriver
from selenium.webdriver.common.by import By
from selenium.webdriver.remote.webelement import WebElement
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait

HOST = 'localhost'
PORT = 65432

matcher: dict[float, str] = {
    110.413: 'date',
    126.826: 'breakfast_1',
    126.723: 'breakfast_1',
    139.089: 'breakfast_2',
    151.455: 'breakfast_3',
    163.82: 'breakfast_4',
    176.186: 'breakfast_5',
    188.245: 'breakfast_6',
    200.423: 'simple_breakfast_1',
    212.482: 'simple_breakfast_2',
    224.337: 'simple_breakfast_3',
    236.498: 'rich_lunch_1',
    248.864: 'rich_lunch_2',
    261.229: 'lunch_1',
    273.288: 'lunch_2',
    285.143: 'lunch_3',
    296.997: 'lunch_4',
    308.878: 'lunch_5',
    320.732: 'lunch_6',
    332.587: 'lunch_7',
    344.748: 'dinner_1',
    356.807: 'dinner_2',
    368.662: 'dinner_3',
    368.764: 'dinner_3',
    380.516: 'dinner_4',
    380.618: 'dinner_4',
    392.371: 'dinner_5',
    404.225: 'dinner_6',
    416.097: 'dinner_7',
}

def get_meal() -> defaultdict[str, list[str]]:
    driver: WebDriver = webdriver.Chrome()
    driver.get("https://www.gist.ac.kr/kr/html/sub05/050602.html?mode=V&no=215761")

    iframe: WebElement = WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.CSS_SELECTOR, "iframe")))
    driver.switch_to.frame(iframe)

    text_layer: WebElement = WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.CSS_SELECTOR, '#pageContainer1 > div.text_layer')))
    text_tags: list[WebElement] = text_layer.find_elements(By.TAG_NAME, 'div')
    texts_by_pos: defaultdict[float, list[str]] = defaultdict(list[str])

    for tag in text_tags:
        style: str | None = tag.get_attribute('style')
        if style is None:
            continue

        m: Match[str] | None = re.search(r'top:\s*(\d+\.?\d*)px', style)
        if m is None:
            continue

        text = tag.text
        top = float(m.group(1))

        texts_by_pos[top].append(text)

    meal = defaultdict(list[str])

    for top, text in texts_by_pos.items():
        if top in matcher:
            meal[matcher[top]].extend(text)

    return meal

with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as server_socket:
    server_socket.bind((HOST, PORT))
    server_socket.listen()
    print(f'파이썬 서버 실행 중... {HOST}:{PORT}')

    while True:
        conn, addr = server_socket.accept()

        with conn:
            try:
                data: str = conn.recv(4096).decode('utf-8').strip()
                print(f'{data=}')

                if not data:
                    continue

                if data == "shutdown":
                    conn.sendall("서버를 종료합니다.".encode('utf-8'))
                    break

                # conn.sendall(str(get_meal()).encode('utf-8'))
                conn.sendall("Hello From Python!".encode('utf-8'))
                print(f'{addr}로 응답을 보냈습니다.')
            except:
                conn.sendall(traceback.format_exc().encode('utf-8'))