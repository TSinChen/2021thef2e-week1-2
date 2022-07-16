import { useState, useEffect } from "react";

import * as Type from "../../../../types/apiResult";
import { getList } from "../../../../api/apis";
import { SearchType } from "../../../../types/enums";
import RestaurantCard from "./RestaurantCard";

const RestaurantList = () => {
  const [restaurantList, setRestaurantList] = useState<Type.RestaurantList>([]);

  useEffect(() => {
    getList(
      SearchType.Restaurant,
      "",
      `Picture/PictureUrl1 ne null and City ne null`
    )
      .then((r: Type.RestaurantList) => setRestaurantList(r.slice(0, 4)))
      .catch((err) => console.error(err));
  }, []);

  return (
    <ul className="flex justify-between">
      {restaurantList.map((restaurant) => (
        <RestaurantCard restaurant={restaurant} />
      ))}
    </ul>
  );
};

export default RestaurantList;
