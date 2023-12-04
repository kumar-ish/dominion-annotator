type CardMetadata = "name" | "set" | "types" | "cost" | "text";

type CardProperties =
  | "actions_villagers"
  | "cards"
  | "buys"
  | "coins_coffers"
  | "trash_return"
  | "exile"
  | "junk"
  | "gain"
  | "victorypoints";

type UserConfig = Record<CardProperties, boolean>;

export interface Card
  extends Record<CardProperties, string>,
    Record<CardMetadata, string> {}

export interface Cards {
  cards: Card[];
}
