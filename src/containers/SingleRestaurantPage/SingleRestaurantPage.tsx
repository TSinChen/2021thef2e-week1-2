import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { getRestaurantList } from "../../api/apis";
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
      {label === "餐廳地址" ? (
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

const SingleRestaurantPage = () => {
  const { restaurantId } = useParams();
  const [restaurant, setRestaurant] = useState<null | Type.Restaurant>(null);
  const [recommendList, setRecommendList] = useState<Type.RestaurantList>([]);

  useEffect(() => {
    getRestaurantList("", `RestaurantID eq '${restaurantId}'`)
      .then((r: Type.RestaurantList) => setRestaurant(r[0]))
      .catch((err) => console.error(err));
  }, [restaurantId]);

  useEffect(() => {
    getRestaurantList(
      restaurant?.City ? cityNameMapping(restaurant.City) : "",
      `Picture/PictureUrl1 ne null and RestaurantID ne '${restaurantId}'`
    )
      .then((r: Type.RestaurantList) => setRecommendList(r.slice(0, 4)))
      .catch((err) => console.error(err));
  }, [restaurant]);

  return (
    <C.Container>
      <Breadcrumbs
        routes={[
          { label: "首頁", link: "/" },
          { label: "在地美食", link: "/Restaurant" },
          ...(restaurant?.City
            ? [
                {
                  label: restaurant.City,
                  link: `/Restaurant?city=${cityNameMapping(restaurant.City)}`,
                },
              ]
            : []),
          { label: restaurant?.RestaurantName || "", link: "" },
        ]}
      />
      <C.Banner
        src={restaurant?.Picture.PictureUrl1}
        alt={restaurant?.Picture?.PictureDescription1}
      />
      <C.Name name={restaurant?.RestaurantName} />
      <C.Tags>{restaurant?.Class && <Tag label={restaurant.Class} />}</C.Tags>
      <C.Description type="餐廳" description={restaurant?.Description} />
      <C.InfoContainer>
        <C.DetailContainer>
          <InfoListItem label="營業時間" content={restaurant?.OpenTime} />
          <InfoListItem label="聯絡電話" content={restaurant?.Phone} />
          <InfoListItem label="餐廳地址" content={restaurant?.Address} />
          <InfoListItem label="官方網站" content={restaurant?.WebsiteUrl} />
        </C.DetailContainer>
        <C.GoogleMap
          query={`${restaurant?.Position?.PositionLat},${restaurant?.Position?.PositionLon}`}
        />
      </C.InfoContainer>
      {restaurant?.City && (
        <Title
          title="還有這些不能錯過的美食"
          linkText={`更多${restaurant.City}美食`}
          linkHref={`/Restaurant?city=${cityNameMapping(restaurant.City)}`}
        />
      )}
      <ul className="flex">
        {recommendList.map((item) => (
          <Card
            key={item.RestaurantID}
            type={SearchType.Restaurant}
            id={item.RestaurantID}
            pictureUrl={item.Picture.PictureUrl1}
            name={item.RestaurantName}
            city={item.City}
          />
        ))}
      </ul>
    </C.Container>
  );
};

export default SingleRestaurantPage;
