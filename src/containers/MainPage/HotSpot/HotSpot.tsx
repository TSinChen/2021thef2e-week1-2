import Title from "../../../components/Title";
import HotSpotList from "./HotSpotList/HotSpotList";

const HotSpot = () => {
  return (
    <div>
      <Title title="熱門打卡景點" linkText="查看更多景點" linkHref="/" />
      <HotSpotList />
    </div>
  );
};

export default HotSpot;
