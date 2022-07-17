import { useState, useEffect, FormEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Autocomplete, Button, TextField } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import qs from "query-string";
import dayjs from "dayjs";

import Breadcrumbs from "../../components/Breadcrumbs";
import { CITIES } from "../../utils/const";
import * as Type from "../../types/apiResult";
import * as C from "../../components/ListPage";
import topic01 from "../../images/topic/activity/01.svg";
import topic02 from "../../images/topic/activity/02.svg";
import topic03 from "../../images/topic/activity/03.svg";
import topic04 from "../../images/topic/activity/04.svg";
import topic05 from "../../images/topic/activity/05.svg";
import topic06 from "../../images/topic/activity/06.svg";
import { getActivityList } from "../../api/apis";
import { SearchType } from "../../types/enums";

const TOPICS = [
  { background: topic01, label: "節慶活動" },
  { background: topic02, label: "自行車活動" },
  { background: topic03, label: "遊憩活動" },
  { background: topic04, label: "產業文化活動" },
  { background: topic05, label: "年度活動" },
  { background: topic06, label: "四季活動" },
];

const ActivityListPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchCity, setSearchCity] = useState<null | typeof CITIES[number]>(
    null
  );
  const [searchDate, setSearchDate] = useState(dayjs().format("YYYY-MM-DD"));
  const [searchKeyword, setSearchKeyword] = useState("");
  const [activityList, setActivityList] = useState<Type.ActivityList>([]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const query = {
      ...(searchCity?.value ? { city: searchCity.value } : {}),
      ...(searchDate ? { date: searchDate } : {}),
      ...(searchKeyword ? { keyword: searchKeyword } : {}),
    };
    navigate(`/Activity?${qs.stringify(query)}`);
  };

  const handleSearchClass = (topic: string) => {
    const query = { ...qs.parse(location.search), topic };
    navigate(`/Activity?${qs.stringify(query)}`);
  };

  useEffect(() => {
    const city = qs.parse(location.search)?.city as string;
    const date = qs.parse(location.search)?.date as string;
    const keyword = qs.parse(location.search)?.keyword as string;
    const topic = qs.parse(location.search)?.topic as string;
    const targetCity = CITIES.find((c) => c.value === city);
    if (targetCity) {
      setSearchCity(targetCity);
    }
    if (date) {
      setSearchDate(date);
    }
    if (keyword) {
      setSearchKeyword(keyword);
    }
    getActivityList(
      targetCity?.value || "",
      `Picture/PictureUrl1 ne null and City ne null${
        keyword
          ? ` and (indexOf(ActivityName, '${keyword}') gt -1 or indexOf(Description, '${keyword}') gt -1)`
          : ""
      }${date ? ` and StartTime le ${date} and EndTime ge ${date}` : ""}${
        topic ? ` and (Class1 eq '${topic}' or Class2 eq '${topic}')` : ""
      }`
    )
      .then((r: Type.ActivityList) => setActivityList(r))
      .catch((err) => console.error(err));
  }, [location]);

  return (
    <div className="mt-[60px] mb-[108px]">
      <Breadcrumbs
        routes={[
          { label: "首頁", link: "/" },
          { label: "節慶活動", link: "/Activity" },
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
        <div className="w-[240px]">
          <TextField
            fullWidth
            type="date"
            value={searchDate}
            onChange={(e) => setSearchDate(e.target.value)}
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
      {activityList.length > 0 && (
        <C.Result list={activityList} type={SearchType.Activity} />
      )}
    </div>
  );
};

export default ActivityListPage;
