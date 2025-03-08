import re
from datetime import date

import requests
from bs4 import BeautifulSoup, Tag

def get_date_from_box(box: Tag) -> tuple[date, date]:
    title = box.select('div > a > div.bd_entry > h2 > span')[0]
    matched = re.search(r'제2학생식당주간식단표\((\d{2,4})\.(\d{1,2})\.(\d{1,2})[-~](\d{2,4})\.(\d{1,2})\.(\d{1,2})\)', title.text)

    if matched is None:
        raise ValueError(f'Invalid title ({title.text})')

    from_year = int(matched.group(1))
    if from_year < 100 or from_year < 1000:
        from_year += 2000

    to_year = int(matched.group(4))
    if to_year < 100 or to_year < 1000:
        to_year += 2000

    from_date = date(from_year, int(matched.group(2)), int(matched.group(3)))
    to_date = date(to_year, int(matched.group(5)), int(matched.group(6)))

    return from_date, to_date

def find_url(target: date) -> str:
    page = 1

    while True:
        url = f'https://www.gist.ac.kr/kr/html/sub05/050602.html?mode=L&GotoPage={page}'

        response = requests.get(url)
        soup = BeautifulSoup(response.content, 'html.parser')

        boxes = sorted(soup.select('#txt > div.bd_container.bd_list > div.bd_list_wrap.col1.grid > div'), key=get_date_from_box)
        # print(f'{page=}, {get_date_from_box(boxes[0])[0]}~{get_date_from_box(boxes[-1])[1]}')

        if get_date_from_box(boxes[0])[0] <= target <= get_date_from_box(boxes[-1])[1]:
            for box in boxes:
                from_date, to_date = get_date_from_box(box)
                if from_date <= target <= to_date:
                    return 'https://www.gist.ac.kr/kr/html/sub05/050602.html' + box.select('div > a')[0]['href']

        page += 1
