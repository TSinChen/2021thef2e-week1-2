import { useState, useEffect } from "react";

import Carousel from "../../../components/Carousel/Carousel";
import * as Type from "../../../types/apiResult";
import { getSpotList } from "../../../api/apis";

const PreviewCarousel = () => {
  const [imgs, setImgs] = useState<
    {
      src: string;
      link: { label: string; href: string };
    }[]
  >([]);

  useEffect(() => {
    getSpotList("", "Picture/PictureUrl1 ne null and City ne null")
      .then((r: Type.SpotList) =>
        setImgs(
          r.slice(0, 6).map((spot) => ({
            src: spot.Picture.PictureUrl1 || "",
            link: {
              label: `${spot.City || ""}｜${spot.ScenicSpotName || ""}`,
              href: `/ScenicSpot/${spot.ScenicSpotID}`,
            },
          }))
        )
      )
      .catch((err) => console.error(err));
  }, []);

  return imgs.length > 0 ? <Carousel imgs={imgs} /> : <></>;
};

export default PreviewCarousel;
