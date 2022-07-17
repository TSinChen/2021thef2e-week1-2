import Card from "./Card";
import * as Type from "../types/apiResult";
import { SearchType } from "../types/enums";

export const Title = ({ title }: { title: string }) => (
  <div className="mb-[12px] text-[36px] font-light leading-[52px]">{title}</div>
);

export const Topic = ({
  background,
  label,
  onClick,
}: {
  background: string;
  label: string;
  onClick: () => void;
}) => (
  <li
    style={{ backgroundImage: `url('${background}')` }}
    className="bg-no-repeat bg-center bg-100% hover:bg-110% text-[#fff] w-[255px] h-[124px] flex justify-center items-center text-[24px] font-bold leading-[34.75px] mb-[12px] mr-[30px] [&:nth-child(4n)]:mr-0 cursor-pointer rounded-[24px] duration-200"
    onClick={onClick}
  >
    <span>{label}</span>
  </li>
);

export const Topics = ({
  topics,
  onClick,
}: {
  topics: {
    background: string;
    label: string;
  }[];
  onClick: (label: string) => void;
}) => (
  <div>
    <Title title="熱門主題" />
    <ul className="flex flex-wrap">
      {topics.map((topic) => (
        <Topic
          key={topic.label}
          background={topic.background}
          label={topic.label}
          onClick={() => onClick(topic.label)}
        />
      ))}
    </ul>
  </div>
);

export const Result = ({
  list,
  type,
}: {
  list: Type.SpotList | Type.ActivityList | Type.RestaurantList;
  type: SearchType;
}) => {
  return (
    <div>
      <Title title="搜尋結果" />
      <ul className="flex flex-wrap">
        {list.map((item) => {
          const liStyle = "mb-[36px] [&:nth-last-child(-n+4)]:mb-0";

          switch (type) {
            case SearchType.ScenicSpot:
              const spotItem = item as Type.Spot;
              return (
                <Card
                  type={SearchType.ScenicSpot}
                  id={spotItem.ScenicSpotID}
                  pictureUrl={spotItem.Picture.PictureUrl1}
                  name={spotItem.ScenicSpotName}
                  city={spotItem.City}
                  liStyle={liStyle}
                />
              );
            case SearchType.Activity:
              const activityItem = item as Type.Activity;
              return (
                <Card
                  type={SearchType.Activity}
                  id={activityItem.ActivityID}
                  pictureUrl={activityItem.Picture.PictureUrl1}
                  name={activityItem.ActivityName}
                  city={activityItem.City}
                  liStyle={liStyle}
                />
              );
            case SearchType.Restaurant:
              const restaurantItem = item as Type.Restaurant;
              return (
                <Card
                  type={SearchType.Restaurant}
                  id={restaurantItem.RestaurantID}
                  pictureUrl={restaurantItem.Picture.PictureUrl1}
                  name={restaurantItem.RestaurantName}
                  city={restaurantItem.City}
                  liStyle={liStyle}
                />
              );
            default:
              return <></>;
          }
        })}
      </ul>
    </div>
  );
};
