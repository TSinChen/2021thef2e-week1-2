import { Restaurant } from "../../../../types/apiResult";
import Card from "../../../../components/Card";
import { SearchType } from "../../../../types/enums";

type Props = {
  restaurant: Restaurant;
};

const RestaurantCard = ({ restaurant }: Props) => (
  <Card
    type={SearchType.Restaurant}
    id={restaurant.RestaurantID}
    pictureUrl={restaurant.Picture.PictureUrl1}
    name={restaurant.RestaurantName}
    city={restaurant.City}
  />
);

export default RestaurantCard;
