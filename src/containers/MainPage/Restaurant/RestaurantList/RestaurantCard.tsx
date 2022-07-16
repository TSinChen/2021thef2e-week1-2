import { Restaurant } from "../../../../types/apiResult";
import POINTER from "../../../../images/map-pointer-gray.svg";

type Props = {
  restaurant: Restaurant;
};

const RestaurantCard = ({ restaurant }: Props) => {
  return (
    <li className="w-[255px] group">
      <a href="/">
        <div className="w-[100%] h-[200px] mb-[10px] rounded-[20px] overflow-hidden">
          <img
            src={restaurant.Picture.PictureUrl1}
            alt={restaurant.RestaurantName}
            className="w-[100%] h-[100%] object-cover group-hover:scale-110 duration-200"
          />
        </div>
        <p className="mb-[6px] text-[22px] leading-[32px] font-bold text-custom-gray-2 line-clamp-1">
          {restaurant.RestaurantName}
        </p>
        <p className="flex text-custom-gray-1">
          <img src={POINTER} alt="" className="mr-[4px]" />
          <span>{restaurant.City}</span>
        </p>
      </a>
    </li>
  );
};

export default RestaurantCard;
