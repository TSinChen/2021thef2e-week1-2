import POINTER from "../images/map-pointer-gray.svg";
import * as Type from "../types/apiResult";
import { SearchType } from "../types/enums";

type Props = {
  type: SearchType;
  id: Type.Id;
  pictureUrl: Type.Picture["PictureUrl1"];
  name: Type.Name;
  city: Type.City;
  liStyle?: string;
};

const Card = ({ type, id, pictureUrl, name, city, liStyle }: Props) => {
  return (
    <li
      className={`w-[255px] mr-[30px] [&:nth-child(4n)]:mr-0 group${
        liStyle ? ` ${liStyle}` : ""
      }`}
    >
      <a href={`/${type}/${id}`}>
        <div className="w-full h-[200px] mb-[10px] rounded-[20px] overflow-hidden">
          <img
            src={pictureUrl}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-110 duration-200"
          />
        </div>
        <p className="mb-[6px] text-[22px] leading-[32px] font-bold text-custom-gray-2 line-clamp-1">
          {name}
        </p>
        <p className="flex text-custom-gray-1">
          <img src={POINTER} alt="" className="mr-[4px]" />
          <span>{city}</span>
        </p>
      </a>
    </li>
  );
};

export default Card;
