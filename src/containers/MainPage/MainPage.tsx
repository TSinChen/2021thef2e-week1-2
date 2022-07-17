import TitleSearch from "./TitleSearch/TitleSearch";
import PreviewCarousel from "./PreviewCarousel/PreviewCarousel";
import RecentActivity from "./RecentActivity/RecentActivity";
import HotSpot from "./HotSpot/HotSpot";
import Restaurant from "./Restaurant/Restaurant";

const MainPage = () => (
  <div className="[&>*]:mb-[36px] mb-[144px]">
    <TitleSearch />
    <PreviewCarousel />
    <RecentActivity />
    <HotSpot />
    <Restaurant />
  </div>
);

export default MainPage;
