import { Spot } from "../../../../types/apiResult";
import POINTER from "../../../../images/map-pointer-gray.svg";

type Props = {
  spot: Spot;
};

const HotSpotCard = ({ spot }: Props) => {
  return (
    <li className="w-[255px] group">
      <a href="/">
        <div className="w-[100%] h-[200px] mb-[10px] rounded-[20px] overflow-hidden">
          <img
            src={spot.Picture.PictureUrl1}
            alt={spot.ScenicSpotName}
            className="w-[100%] h-[100%] object-cover group-hover:scale-110 duration-200"
          />
        </div>
        <p className="mb-[6px] text-[22px] leading-[32px] font-bold text-custom-gray-2 line-clamp-1">
          {spot.ScenicSpotName}
        </p>
        <p className="flex text-custom-gray-1">
          <img src={POINTER} alt="" className="mr-[4px]" />
          <span>{spot.City}</span>
        </p>
      </a>
    </li>
  );
};

export default HotSpotCard;
