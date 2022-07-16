import TitleSearch from "./TitleSearch/TitleSearch";
import RecentActivity from "./RecentActivity/RecentActivity";
import HotSpot from "./HotSpot/HotSpot";

const MainPage = () => (
  <div className="[&>*]:mb-[36px]">
    <TitleSearch />
    <RecentActivity />
    <HotSpot />
  </div>
);

export default MainPage;
