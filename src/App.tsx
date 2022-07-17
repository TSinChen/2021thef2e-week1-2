import { Fragment } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./styles/index.css";
import Header from "./containers/Header";
import Footer from "./containers/Footer";
import MainPage from "./containers/MainPage/MainPage";
import SingleSpotPage from "./containers/SingleSpotPage/SingleSpotPage";
import SingleActivityPage from "./containers/SingleActivityPage/SingleActivityPage";
import SingleRestaurantPage from "./containers/SingleRestaurantPage/SingleRestaurantPage";
import SpotListPage from "./containers/SpotListPage/SpotListPage";
import ActivityListPage from "./containers/ActivityListPage/ActivityListPage";

function App() {
  return (
    <Fragment>
      <Header />
      <BrowserRouter>
        <main className="max-w-[1200px] mx-auto px-[45px]">
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/ScenicSpot/:spotId" element={<SingleSpotPage />} />
            <Route
              path="/Activity/:activityId"
              element={<SingleActivityPage />}
            />
            <Route
              path="/Restaurant/:restaurantId"
              element={<SingleRestaurantPage />}
            />
            <Route path="/ScenicSpot" element={<SpotListPage />} />
            <Route path="/Activity" element={<ActivityListPage />} />
          </Routes>
        </main>
      </BrowserRouter>
      <Footer />
    </Fragment>
  );
}

export default App;
