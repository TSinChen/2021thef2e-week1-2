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
import * as C from "../../components/SingleDataPage";

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
    <C.Container>
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
      <C.Banner
        src={spot?.Picture.PictureUrl1}
        alt={spot?.Picture.PictureDescription1}
      />
      <C.Name name={spot?.ScenicSpotName} />
      <C.Tags>
        {spot?.Class1 && <Tag label={spot.Class1} />}
        {spot?.Class2 && <Tag label={spot.Class2} />}
        {spot?.Class3 && <Tag label={spot.Class3} />}
      </C.Tags>
      <C.Description type="景點" description={spot?.DescriptionDetail} />
      <C.InfoContainer>
        <C.DetailContainer>
          <InfoListItem label="開放時間" content={spot?.OpenTime} />
          <InfoListItem label="服務電話" content={spot?.Phone} />
          <InfoListItem label="景點地址" content={spot?.Address} />
          <InfoListItem label="官方網站" content={spot?.WebsiteUrl} />
          <InfoListItem label="票價資訊" content={spot?.TicketInfo} />
          <InfoListItem label="注意事項" content={spot?.Remarks} />
        </C.DetailContainer>
        <C.GoogleMap
          query={`${spot?.Position.PositionLat},${spot?.Position.PositionLon}`}
        />
      </C.InfoContainer>
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
    </C.Container>
  );
};

export default SpotPage;
