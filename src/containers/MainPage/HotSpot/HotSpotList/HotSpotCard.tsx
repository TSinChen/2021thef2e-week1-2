import { Spot } from "../../../../types/apiResult";
import Card from "../../../../components/Card";
import { SearchType } from "../../../../types/enums";

type Props = {
  spot: Spot;
};

const HotSpotCard = ({ spot }: Props) => (
  <Card
    type={SearchType.ScenicSpot}
    id={spot.ScenicSpotID}
    pictureUrl={spot.Picture.PictureUrl1}
    name={spot.ScenicSpotName}
    city={spot.City}
  />
);

export default HotSpotCard;
