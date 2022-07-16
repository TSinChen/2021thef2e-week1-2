import dayjs from "dayjs";
import { ChevronRight } from "@mui/icons-material";

import { Activity } from "../../../../types/apiResult";
import POINTER from "../../../../images/map-pointer-gray.svg";

type Props = {
  activity: Activity;
};

const ActivityCard = ({ activity }: Props) => {
  return (
    <li className="flex w-[540px] h-[160px] bg-[#F9F9F9] border-[1px] border-[#E5E5E5] rounded-[12px] overflow-hidden first:mb-[12px] group">
      <div className="w-[160px] overflow-hidden">
        <img
          src={activity.Picture.PictureUrl1}
          alt={activity.ActivityName}
          className="w-full h-full object-cover group-hover:scale-110 duration-200"
        />
      </div>
      <div className="flex flex-1 pt-[16px] pb-[18px] px-[30px] flex-col">
        <p className="text-custom-gray-1">{`${dayjs(activity.StartTime).format(
          "YYYY/MM/DD"
        )} - ${dayjs(activity.EndTime).format("YYYY/MM/DD")}`}</p>
        <p className="mb-[17px] text-[22px] font-bold text-custom-gray-2 leading-[32px] line-clamp-2">
          {activity.ActivityName}
        </p>
        <div className="mt-auto flex justify-between items-center">
          <p className="flex text-custom-gray-1">
            <img src={POINTER} alt="" className="mr-[4px]" />
            <span>{activity.City}</span>
          </p>
          <a href="/" className="text-[#7F977B] flex items-center">
            <span className="font-medium ">詳細介紹</span>
            <ChevronRight />
          </a>
        </div>
      </div>
    </li>
  );
};

export default ActivityCard;
