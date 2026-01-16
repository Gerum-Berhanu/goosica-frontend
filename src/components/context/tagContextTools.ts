import { cardsById, type OrderById } from "./songContextTools";
import type { TagContextType } from "./TagProvider";

export function groupByTag(cardsById: OrderById): TagContextType {
  const grouped: TagContextType = {
    t: [],
    q: [],
    f: [],
    d: [],
  };

  for (const id in cardsById) {
    for (const tag of cardsById[id].tags) {
      grouped[tag].push(id);
    }
  }

  return grouped;
}

export const initTagGroup = groupByTag(cardsById);