import { SearchType } from "../types/enums";

export const searchTypeMapping = (type: SearchType) => {
  switch (type) {
    case SearchType.ScenicSpot:
      return "探索景點";
    case SearchType.Activity:
      return "節慶活動";
    case SearchType.Restaurant:
      return "品嚐美食";
  }
};
