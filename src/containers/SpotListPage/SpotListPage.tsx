import { useState, useEffect, FormEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const [searchCity, setSearchCity] = useState<null | typeof CITIES[number]>(
    null
  );
  const [searchKeyword, setSearchKeyword] = useState("");
  const [spotList, setSpotList] = useState<Type.SpotList>([]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const query = {
      ...(searchCity?.value ? { city: searchCity.value } : {}),
      ...(searchKeyword ? { keyword: searchKeyword } : {}),
    };
    navigate(`/ScenicSpot?${qs.stringify(query)}`);
  };

  const handleSearchClass = (topic: string) => {
    const query = { ...qs.parse(location.search), topic };
    navigate(`/ScenicSpot?${qs.stringify(query)}`);
  };

  useEffect(() => {
    const city = qs.parse(location.search)?.city as string;
    const keyword = qs.parse(location.search)?.keyword as string;
    const topic = qs.parse(location.search)?.topic as string;
    const targetCity = CITIES.find((c) => c.value === city);
    if (targetCity) {
      setSearchCity(targetCity);
    }
    if (keyword) {
      setSearchKeyword(keyword);
    }
    getSpotList(
      targetCity?.value || "",
      `Picture/PictureUrl1 ne null and City ne null${
        keyword
          ? ` and (indexOf(Keyword, '${keyword}') gt -1 or indexOf(ScenicSpotName, '${keyword}') gt -1 or indexOf(Description, '${keyword}') gt -1)`
          : ""
      }${
        topic
          ? ` and (Class1 eq '${topic}' or Class2 eq '${topic}' or Class3 eq '${topic}')`
          : ""
      }`
    )
      .then((r: Type.SpotList) => setSpotList(r))
      .catch((err) => console.error(err));
  }, [location]);

  return (
    <div className="mt-[60px] mb-[108px]">
      <Breadcrumbs
        routes={[
          { label: "首頁", link: "/" },
          { label: "探索景點", link: "/ScenicSpot" },
        ]}
      />
      <C.FormContainer onSubmit={handleSubmit}>
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
                label="搜尋縣市"
              />
            )}
          />
        </div>
        <div className="w-[600px]">
          <TextField
            fullWidth
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
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
      </C.FormContainer>
      <C.Topics topics={TOPICS} onClick={handleSearchClass} />
      <C.Result list={spotList} type={SearchType.ScenicSpot} />
    </div>
  );
};

export default SpotListPage;
