import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, MenuItem, TextField } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import dayjs from "dayjs";
import qs from "query-string";

import { SearchType } from "../../../types/enums";
import { searchTypeMapping } from "../../../utils/functions";
import { DATE_FORMAT } from "../../../utils/const";

const Search = () => {
  const navigate = useNavigate();
  const [searchType, setSearchType] = useState(SearchType.ScenicSpot);
  const [searchKeyword, setSearchKeyword] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const query = {
      ...(searchKeyword ? { keyword: searchKeyword } : {}),
      ...(searchType === SearchType.Activity
        ? { date: dayjs().format(DATE_FORMAT) }
        : {}),
    };
    navigate(
      `/${searchType}${
        Object.keys(query).length > 0 ? "?" + qs.stringify(query) : ""
      }`
    );
  };

  return (
    <form
      className="pt-[19px] w-[350px] [&>*]:mb-[7px]"
      onSubmit={handleSubmit}
    >
      <div>
        <TextField
          style={{ height: "50px" }}
          select
          fullWidth
          value={searchType}
          onChange={(e) => setSearchType(e.target.value as SearchType)}
          InputProps={{ style: { height: "50px" } }}
        >
          {Object.values(SearchType).map((type) => (
            <MenuItem key={type} value={type}>
              {searchTypeMapping(type)}
            </MenuItem>
          ))}
        </TextField>
      </div>
      <div>
        <TextField
          fullWidth
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          placeholder="想找有趣的？請輸入關鍵字"
        />
      </div>
      <Button
        fullWidth
        type="submit"
        variant="contained"
        startIcon={<SearchIcon />}
        style={{
          height: "50px",
          backgroundColor: "#7F977B",
        }}
      >
        <p className="text-[16px] font-bold tracking-[1em]">搜尋</p>
      </Button>
    </form>
  );
};

export default Search;
