import { useState, useEffect, FormEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Autocomplete, Button, TextField } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import qs from "query-string";

import Breadcrumbs from "../../components/Breadcrumbs";
import { CITIES } from "../../utils/const";
import * as Type from "../../types/apiResult";
import * as C from "../../components/ListPage";
import topic01 from "../../images/topic/restaurant/01.svg";
import topic02 from "../../images/topic/restaurant/02.svg";
import topic03 from "../../images/topic/restaurant/03.svg";
import topic04 from "../../images/topic/restaurant/04.svg";
import topic05 from "../../images/topic/restaurant/05.svg";
import topic06 from "../../images/topic/restaurant/06.svg";
import { getRestaurantList } from "../../api/apis";
import { SearchType } from "../../types/enums";

const TOPICS = [
  { background: topic01, label: "地方特產" },
  { background: topic02, label: "中式美食" },
  { background: topic03, label: "甜點冰品" },
  { background: topic04, label: "異國料理" },
  { background: topic05, label: "伴手禮" },
  { background: topic06, label: "素食" },
];

const RestaurantListPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchCity, setSearchCity] = useState<null | typeof CITIES[number]>(
    null
  );
  const [searchKeyword, setSearchKeyword] = useState("");
  const [restaurantList, setRestaurantList] = useState<Type.RestaurantList>([]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const query = {
      ...(searchCity?.value ? { city: searchCity.value } : {}),
      ...(searchKeyword ? { keyword: searchKeyword } : {}),
    };
    navigate(`/Restaurant?${qs.stringify(query)}`);
  };

  const handleSearchClass = (topic: string) => {
    const query = { ...qs.parse(location.search), topic };
    navigate(`/Restaurant?${qs.stringify(query)}`);
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
    getRestaurantList(
      targetCity?.value || "",
      `Picture/PictureUrl1 ne null and City ne null${
        keyword
          ? ` and (indexOf(RestaurantName, '${keyword}') gt -1 or indexOf(Description, '${keyword}') gt -1)`
          : ""
      }${topic ? ` and Class eq '${topic}'` : ""}`
    )
      .then((r: Type.RestaurantList) => setRestaurantList(r))
      .catch((err) => console.error(err));
  }, [location]);

  return (
    <div className="mt-[60px] mb-[108px]">
      <Breadcrumbs
        routes={[
          { label: "首頁", link: "/" },
          { label: "品嚐美食", link: "/Restaurant" },
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
      {restaurantList.length > 0 && (
        <C.Result list={restaurantList} type={SearchType.Restaurant} />
      )}
    </div>
  );
};

export default RestaurantListPage;
