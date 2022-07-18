import { ReactNode, FormEvent } from "react";

import Card from "./Card";
import * as Type from "../types/apiResult";
import { SearchType } from "../types/enums";
import NO_DATA from "../images/no-data.svg";

export const FormContainer = ({
  children,
  onSubmit,
}: {
  children: ReactNode;
  onSubmit: (e: FormEvent) => void;
}) => (
  <form
    className="mt-[40px] mb-[48px] mx-[10px] flex [&>*]:mr-[15px] last:mr-0"
    onSubmit={onSubmit}
  >
    {children}
  </form>
);

export const Title = ({ title }: { title: string }) => (
  <div className="my-[12px] text-[36px] font-light leading-[52px]">{title}</div>
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
    className="bg-no-repeat bg-center bg-100% hover:bg-110% text-white w-[255px] h-[124px] flex justify-center items-center text-[24px] font-bold leading-[34.75px] mb-[12px] mr-[30px] [&:nth-child(4n)]:mr-0 cursor-pointer rounded-[24px] duration-200"
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
      {list.length > 0 ? (
        <ul className="flex flex-wrap">
          {list.map((item) => {
            const liStyle = "mb-[36px] [&:nth-last-child(-n+4)]:mb-0";
            switch (type) {
              case SearchType.ScenicSpot:
                const spotItem = item as Type.Spot;
                return (
                  <Card
                    key={spotItem.ScenicSpotID}
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
                    key={activityItem.ActivityID}
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
                    key={restaurantItem.RestaurantID}
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
      ) : (
        <div className="pt-[68px] pb-[23px] flex flex-col items-center">
          <img src={NO_DATA} alt="" className="w-[80px] mb-[11px]" />
          <div className="flex flex-col items-center text-center">
            <p className="text-[#7F977B] text-[20px] font-bold leading-[34px]">
              目前查無資料
              <br />
              請重新搜尋
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
