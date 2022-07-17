import { useState, useEffect, FormEvent } from "react";
import { useLocation } from "react-router-dom";
import { Autocomplete, Button, TextField } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import qs from "query-string";

import Breadcrumbs from "../../components/Breadcrumbs";
import { CITIES } from "../../utils/const";
import * as Type from "../../types/apiResult";
import * as C from "../../components/ListPage";
import topic01 from "../../images/topic/spot/01.svg";
import topic02 from "../../images/topic/spot/02.svg";
import topic03 from "../../images/topic/spot/03.svg";
import topic04 from "../../images/topic/spot/04.svg";
import topic05 from "../../images/topic/spot/05.svg";
import topic06 from "../../images/topic/spot/06.svg";
import topic07 from "../../images/topic/spot/07.svg";
import { getSpotList } from "../../api/apis";
import Card from "../../components/Card";
import { SearchType } from "../../types/enums";

const TOPICS = [
  { background: topic01, label: "自然風景類" },
  { background: topic02, label: "觀光工廠類" },
  { background: topic03, label: "遊憩類" },
  { background: topic04, label: "休閒農業類" },
  { background: topic05, label: "生態類" },
  { background: topic06, label: "溫泉類" },
  { background: topic07, label: "古蹟類" },
];

const SpotListPage = () => {
  const location = useLocation();
  const [searchCity, setSearchCity] = useState<null | typeof CITIES[number]>(
    null
  );
  const [keyword, setKeyword] = useState("");
  const [spotList, setSpotList] = useState<Type.SpotList>([]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    getSpotList(
      searchCity?.value || "",
      `Picture/PictureUrl1 ne null${
        keyword ? ` and indexOf(Keyword, '${keyword}') gt -1` : ""
      }`
    )
      .then((r: Type.SpotList) => setSpotList(r))
      .catch((err) => console.error(err));
  };

  const handleSearchClass = (topic: string) => {
    getSpotList(
      "",
      `Picture/PictureUrl1 ne null and City ne null and (Class1 eq '${topic}' or Class2 eq '${topic}' or Class3 eq '${topic}')`
    )
      .then((r: Type.SpotList) => setSpotList(r))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    const city = qs.parse(location.search)?.city;
    const targetCity = CITIES.find((c) => c.value === city);
    if (typeof city === "string" && targetCity) {
      setSearchCity(targetCity);
      getSpotList(
        targetCity.value,
        `Picture/PictureUrl1 ne null and City ne null`
      )
        .then((r: Type.SpotList) => setSpotList(r))
        .catch((err) => console.error(err));
    }
  }, [location]);

  return (
    <div className="mt-[60px] mb-[108px]">
      <Breadcrumbs
        routes={[
          { label: "首頁", link: "/" },
          { label: "探索景點", link: "/ScenicSpot" },
        ]}
      />
      <form
        className="mt-[40px] mb-[60px] mx-[10px] flex justify-between"
        onSubmit={handleSubmit}
      >
        <div className="w-[240px]">
          <Autocomplete
            fullWidth
            options={CITIES}
            value={searchCity}
            onChange={(_, value) => setSearchCity(value)}
            renderInput={(params) => (
              <TextField
                {...params}
                inputProps={{
                  ...params.inputProps,
                }}
              />
            )}
          />
        </div>
        <div className="w-[600px]">
          <TextField
            fullWidth
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="想找有趣的？請輸入關鍵字"
          />
        </div>
        <Button
          type="submit"
          variant="contained"
          startIcon={<SearchIcon />}
          style={{
            width: "210px",
            backgroundColor: "#7F977B",
            borderRadius: "6px",
          }}
        >
          <p className="text-[16px] font-bold tracking-[1em]">搜尋</p>
        </Button>
      </form>
      {!(spotList.length > 0) && (
        <div>
          <C.Title title="熱門主題" />
          <ul className="flex flex-wrap">
            {TOPICS.map((topic) => (
              <C.Topic
                key={topic.label}
                background={topic.background}
                label={topic.label}
                onClick={() => handleSearchClass(topic.label)}
              />
            ))}
          </ul>
        </div>
      )}
      {spotList.length > 0 && (
        <div>
          <C.Title title="搜尋結果" />
          <ul className="flex flex-wrap">
            {spotList.map((spot) => (
              <Card
                key={spot.ScenicSpotID}
                type={SearchType.ScenicSpot}
                id={spot.ScenicSpotID}
                pictureUrl={spot.Picture.PictureUrl1}
                name={spot.ScenicSpotName}
                city={spot.City}
                liStyle={"mb-[36px] [&:nth-last-child(-n+4)]:mb-0"}
              />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SpotListPage;
