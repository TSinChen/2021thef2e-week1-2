import Title from "../../../components/Title";
import RestaurantList from "./RestaurantList/RestaurantList";

const Restaurant = () => {
  return (
    <div>
      <Title
        title="一再回訪美食"
        linkText="查看更多美食"
        linkHref="/Restaurant"
      />
      <RestaurantList />
    </div>
  );
};

export default Restaurant;
