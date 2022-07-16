import TitleSearch from "./TitleSearch/TitleSearch";
import RecentActivity from "./RecentActivity/RecentActivity";
import HotSpot from "./HotSpot/HotSpot";
import Restaurant from "./Restaurant/Restaurant";

const MainPage = () => (
  <div className="[&>*]:mb-[36px]">
    <TitleSearch />
    <RecentActivity />
    <HotSpot />
    <Restaurant />
  </div>
);

export default MainPage;
