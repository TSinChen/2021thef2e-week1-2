import { useState, useEffect } from "react";

import * as Type from "../../../../types/apiResult";
import { getSpotList } from "../../../../api/apis";
import HotSpotCard from "./HotSpotCard";

const HotSpotList = () => {
  const [spotList, setSpotList] = useState<Type.SpotList>([]);

  useEffect(() => {
    getSpotList("", `Picture/PictureUrl1 ne null and City ne null`)
      .then((r: Type.SpotList) => setSpotList(r.slice(0, 4)))
      .catch((err) => console.error(err));
  }, []);

  return (
    <ul className="flex justify-between">
      {spotList.map((spot) => (
        <HotSpotCard key={spot.ScenicSpotID} spot={spot} />
      ))}
    </ul>
  );
};

export default HotSpotList;
