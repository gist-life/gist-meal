import re
from collections import defaultdict

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

def get_meal(url: str) -> list[dict[str, list[str]]]:
    driver = webdriver.Chrome()
    driver.get(url)

    iframe = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.CSS_SELECTOR, "iframe"))  # 혹은 By.XPATH, By.ID 등
    )
    driver.switch_to.frame(iframe)

    text_layer = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.CSS_SELECTOR, '#pageContainer1 > div.textLayer'))
    )

    text_tags = text_layer.find_elements(By.TAG_NAME, 'div')

    weekday_tags = [tag for tag in text_tags if re.match(r'\d{1,2}월 \d{1,2}일 \(\w\)', tag.text) is not None]

    lefts = []

    for t in weekday_tags:
        style = t.get_attribute('style')
        left_ = re.search(r'left:\s*(\d+\.?\d*)px', style)
        if left_ is None:
            print('left', style)
            continue
        lefts.append(float(left_.group(1)))

    def find_closest_left(left: float, lefts: list[float]) -> float:
        return min(lefts, key=lambda x: abs(x - left))

    tags_by_left = defaultdict(list)

    for tag in text_tags:
        style = tag.get_attribute('style')
        if style is None:
            continue

        left_ = re.search(r'left:\s*(\d+\.?\d*)px', style)
        if left_ is None:
            continue
        left = float(left_.group(1))

        closest_left = find_closest_left(left, lefts)
        if abs(closest_left - left) > 30:
            continue

        tags_by_left[closest_left].append(tag)

    strs_by_left = defaultdict(list)
    # tags_by_left 에 넣을 때 top값이 비슷하면 string concat

    for left, tags in tags_by_left.items():
        tags = sorted(tags, key=lambda x: float(re.search(r'top:\s*(\d+\.?\d*)px', x.get_attribute('style')).group(1)))

        last_top = None
        for tag in tags:
            top_ = re.search(r'top:\s*(\d+\.?\d*)px', tag.get_attribute('style'))
            if top_ is None:
                continue

            top = float(top_.group(1))
            if tag.text == "---":
                strs_by_left[left].extend(["---"] * 2)
            elif last_top is not None and abs(top - last_top) < 5:
                strs_by_left[left][-1] += tag.text
            else:
                strs_by_left[left].append(tag.text)

            last_top = top

    meal_lists = [week_meal[1:] for week_meal in strs_by_left.values()]

    def list_to_dict(meal_list: list[str]) -> dict[str, list[str]]:
        return {
            'breakfast': meal_list[:6],
            'simple_breakfast': meal_list[6:9],
            'rich_lunch': meal_list[9:11],
            'lunch': meal_list[11:18],
            'dinner': meal_list[18:25]
        }

    return [list_to_dict(week_meal) for week_meal in meal_lists]
