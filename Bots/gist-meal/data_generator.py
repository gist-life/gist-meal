import os
import json
from datetime import date, timedelta

import get_url as URL
import get_meal as MEAL

def get_meals(start: date) -> list[dict[str, list[str]]]:
    url = URL.find_url(start)

    while len(meal := MEAL.get_meal(url)) == 0:
        print('retrying...')
        pass

    return meal

def get_meals_by(url: str) -> list[dict[str, list[str]]]:
    while len(meal := MEAL.get_meal(url)) == 0:
        print('retrying...')
        pass

    return meal

if __name__ == '__main__':
    from_dt = date(2025, 1, 6)
    to_dt = date.today()

    for start_dt in [from_dt + timedelta(days=i) for i in range(0, (to_dt - from_dt).days + 1, 7)]:
        meals = get_meals(start_dt)
        for i in range(7):
            dt = start_dt + timedelta(days=i)
            with open(f'D:/Repo/gist-meal/Bots/gist-meal/Database/{dt.year}-{dt.month}-{dt.day}.json', 'w', encoding='utf-8') as f:
                json.dump(meals[i], f, ensure_ascii=False, indent=4)
            print(f'save {dt=}')