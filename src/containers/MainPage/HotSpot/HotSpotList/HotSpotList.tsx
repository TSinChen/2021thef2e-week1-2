import { useState, useEffect } from "react";

import * as Type from "../../../../types/apiResult";
import { getList } from "../../../../api/apis";
import { SearchType } from "../../../../types/enums";
import HotSpotCard from "./HotSpotCard";

const HotSpotList = () => {
  const [spotList, setSpotList] = useState<Type.SpotList>([]);

  useEffect(() => {
    getList(
      SearchType.ScenicSpot,
      "",
      `Picture/PictureUrl1 ne null and City ne null`
    )
      .then((r: Type.SpotList) => setSpotList(r.slice(0, 4)))
      .catch((err) => console.error(err));
  }, []);

  return (
    <ul className="flex justify-between">
      {spotList.map((spot) => (
        <HotSpotCard spot={spot} />
      ))}
    </ul>
  );
};

export default HotSpotList;
