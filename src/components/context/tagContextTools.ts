import { initSongsById, type OrderById } from "./songContextTools";
import type { TagContextType } from "./TagProvider";

export function groupByTag(initSongsById: OrderById): TagContextType {
  const grouped: TagContextType = {
    t: [],
    q: [],
    f: [],
    d: [],
  };

  for (const id in initSongsById) {
    for (const tag of initSongsById[id].tags) {
      grouped[tag].push(id);
    }
  }

  return grouped;
}

export const initTagGroup = groupByTag(initSongsById);