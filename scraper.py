import requests
import sys
import os
import json
from bs4 import BeautifulSoup

LINK = "https://wiki.dominionstrategy.com/index.php/List_of_cards"
PAGE = "page.html"
OUTPUT_JSON_FILENAME = "src/cards.json"


def main():
    if not os.path.isfile(PAGE):
        res = requests.get(LINK)

        if res.status_code != 200:
            print(f"Failed with HTML status code {res.status_code}")
            sys.exit(1)

        with open(PAGE, "w+") as f:
            f.write(str(res.content))

    text = None
    with open(PAGE, "r") as f:
        text = f.read()

    soup = BeautifulSoup(text, features="html.parser")
    table = soup.find("table")

    head, *rows = table.find_all("tr")

    def clean(x):
        return x.encode("utf-8").decode("unicode_escape").strip()

    def format_head_cell(x: str):
        return x.lower().replace(" ", "").replace("/", "_")

    head_titles = [
        "".join(
            [
                format_head_cell(clean(y.string))
                for y in x.descendants
                if y is not None and y.string is not None
            ]
        )
        for x in head.find_all("th")
        if x.string is not None
    ]
    set_index = head_titles.index("set")

    cards = [
        dict(
            zip(
                head_titles,
                [
                    clean("".join(x.strings))
                    if i != set_index
                    else clean("".join(x.strings)).split(",")[0]
                    for i, x in enumerate(row.find_all("td"))
                ],
            )
        )
        for row in rows
    ]

    for c in cards:
        assert len(c) == len(head_titles)

    with open(OUTPUT_JSON_FILENAME, "w") as fp:
        json.dump({"cards": cards}, fp)
    print("Finished :)")


if __name__ == "__main__":
    main()
