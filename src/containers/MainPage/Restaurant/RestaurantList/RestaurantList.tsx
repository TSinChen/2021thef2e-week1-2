import { useState, useEffect } from "react";

import * as Type from "../../../../types/apiResult";
import { getRestaurantList } from "../../../../api/apis";
import { SearchType } from "../../../../types/enums";
import RestaurantCard from "./RestaurantCard";

const RestaurantList = () => {
  const [restaurantList, setRestaurantList] = useState<Type.RestaurantList>([]);

  useEffect(() => {
    getRestaurantList("", `Picture/PictureUrl1 ne null and City ne null`)
      .then((r: Type.RestaurantList) => setRestaurantList(r.slice(0, 4)))
      .catch((err) => console.error(err));
  }, []);

  return (
    <ul className="flex justify-between">
      {restaurantList.map((restaurant) => (
        <RestaurantCard key={restaurant.RestaurantID} restaurant={restaurant} />
      ))}
    </ul>
  );
};

export default RestaurantList;
