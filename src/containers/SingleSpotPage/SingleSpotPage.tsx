import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { getList } from "../../api/apis";
import Breadcrumbs from "../../components/Breadcrumbs";
import Card from "../../components/Card";
import Tag from "../../components/Tag";
import Title from "../../components/Title";
import * as Type from "../../types/apiResult";
import { SearchType } from "../../types/enums";
import { cityNameMapping } from "../../utils/functions";

const InfoListItem = ({
  label,
  content,
}: {
  label: string;
  content?: string;
}) => {
  const aStyle = "text-[#6E7D60] text-[18px] break-words underline";
  return content ? (
    <li className="flex items-center not-last:mb-[13px]">
      <span className="text-[20px] font-bold whitespace-nowrap">{label}：</span>
      {label === "景點地址" ? (
        <a
          href={`https://maps.google.com/maps?q=${content}`}
          target="_blank"
          rel="noreferrer"
          className={aStyle}
        >
          {content}
        </a>
      ) : label === "官方網站" ? (
        <a href={content} target="_blank" rel="noreferrer" className={aStyle}>
          {content}
        </a>
      ) : (
        <span className="text-[18px] break-words">{content}</span>
      )}
    </li>
  ) : (
    <></>
  );
};

const SpotPage = () => {
  const { spotId } = useParams();
  const [spot, setSpot] = useState<null | Type.Spot>(null);
  const [recommendList, setRecommendList] = useState<Type.SpotList>([]);

  useEffect(() => {
    getList(SearchType.ScenicSpot, "", `ScenicSpotID eq '${spotId}'`)
      .then((r: Type.SpotList) => setSpot(r[0]))
      .catch((err) => console.error(err));
  }, [spotId]);

  useEffect(() => {
    getList(
      SearchType.ScenicSpot,
      spot?.City ? cityNameMapping(spot.City) : "",
      `Picture/PictureUrl1 ne null and ScenicSpotID ne '${spotId}'`
    )
      .then((r: Type.SpotList) => setRecommendList(r.slice(0, 4)))
      .catch((err) => console.error(err));
  }, [spot]);

  return (
    <div className="mt-[60px] mb-[120px]">
      <Breadcrumbs
        routes={[
          { label: "首頁", link: "/" },
          { label: "探索景點", link: "/ScenicSpot" },
          ...(spot?.City
            ? [
                {
                  label: spot.City,
                  link: `/ScenicSpot/${cityNameMapping(spot.City)}`,
                },
              ]
            : []),
          { label: spot?.ScenicSpotName || "", link: "" },
        ]}
      />
      <img
        src={spot?.Picture.PictureUrl1}
        alt={spot?.Picture.PictureDescription1 || ""}
        className="w-full h-[400px] my-[30px] object-cover rounded-[24px]"
      />
      <p className="mb-[15px] text-[36px] leading-[52px] font-light">
        {spot?.ScenicSpotName}
      </p>
      <div className="flex [&>*]:mr-[10px] mb-[30px]">
        {spot?.Class1 && <Tag label={spot.Class1} />}
        {spot?.Class2 && <Tag label={spot.Class2} />}
        {spot?.Class3 && <Tag label={spot.Class3} />}
      </div>
      <div className="mb-[60px]">
        <p className="mb-[10px] text-[20px] leading-[29px] font-bold">
          景點介紹：
        </p>
        <p className="text-[18px] leading-[31px] font-light">
          {spot?.DescriptionDetail}
        </p>
      </div>
      <div className="mb-[60px] flex justify-between items-center">
        <ul className="flex flex-col w-[540px] bg-[#F9F9F9] p-[30px] rounded-[12px] justify-between">
          <InfoListItem label="開放時間" content={spot?.OpenTime} />
          <InfoListItem label="服務電話" content={spot?.Phone} />
          <InfoListItem label="景點地址" content={spot?.Address} />
          <InfoListItem label="官方網站" content={spot?.WebsiteUrl} />
          <InfoListItem label="票價資訊" content={spot?.TicketInfo} />
          <InfoListItem label="注意事項" content={spot?.Remarks} />
        </ul>
        <div className="rounded-[12px] overflow-hidden">
          <iframe
            width="540"
            height="250"
            src={`https://maps.google.com/maps?q=${spot?.Position.PositionLat},${spot?.Position.PositionLon}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
            scrolling="no"
            title="map"
          />
        </div>
      </div>
      {spot?.City && (
        <Title
          title="還有這些不能錯過的景點"
          linkText={`更多${spot.City}景點`}
          linkHref={`/ScenicSpot/${cityNameMapping(spot.City)}`}
        />
      )}
      <ul className="flex justify-between">
        {recommendList.map((item) => (
          <Card
            type={SearchType.ScenicSpot}
            id={item.ScenicSpotID}
            pictureUrl={item.Picture.PictureUrl1}
            name={item.ScenicSpotName}
            city={item.City}
          />
        ))}
      </ul>
    </div>
  );
};

export default SpotPage;
