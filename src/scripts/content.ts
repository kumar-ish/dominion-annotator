import {
  type UserConfig,
  type Cards,
  type Card,
  CardProperties,
} from "../shared/types";

import _cards from "../cards.json";

const cards = _cards as Cards;
const cardByUrl: Map<string, Card> = new Map();

chrome.runtime.onMessage.addListener(function (
  config: UserConfig,
  _sender,
  _sendResponse,
) {
  const cardStack = document.querySelector(".card-stacks");
  if (cardStack === null) {
    return;
  }

  const cardElements = cardStack.getElementsByClassName(
    "card-stack-layer art-layer",
  );

  Array.prototype.forEach.call(cardElements, (e: HTMLElement) => {
    // Verify card has a background image
    const backgroundImage = e.computedStyleMap().get("background-image");
    if (backgroundImage === undefined) {
      return null;
    }
    const url = backgroundImage.toString();

    // Verify cards name can be matched
    const card = cardByUrl.has(url)
      ? cardByUrl.get(url)
      : cards.cards.find((card) => {
          const name =
            card.set.replace(" ", "-").toLowerCase() +
            "/" +
            card.name.replace(" ", "-").replace("'", "").toLowerCase();
          return url.includes(name);
        });
    if (card === undefined) {
      return;
    }

    cardByUrl.set(url, card);

    // Set opacity to 50% if _one_ of the properties of the union of
    // the selected properties is satisfied
    for (const _k in config) {
      const k = _k as CardProperties;

      if (config[k] && card[k]) {
        e.style.opacity = "50%";
        return;
      }
    }
    e.style.opacity = "100%";
  });
});
