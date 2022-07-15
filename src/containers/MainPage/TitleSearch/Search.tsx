import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Autocomplete, Button, MenuItem, TextField } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";

import { SearchType } from "../../../types/enums";
import { searchTypeMapping } from "../../../utils/functions";
import { CITIES } from "../../../utils/const";

const Search = () => {
  const navigate = useNavigate();
  const [searchType, setSearchType] = useState(SearchType.ScenicSpot);
  const [searchCity, setSearchCity] = useState<null | typeof CITIES[number]>(
    null
  );

  const handleSubmit = () =>
    navigate(
      `/${searchType}${searchCity?.value ? `?city=${searchCity.value}` : ""}`
    );

  return (
    <div className="pt-[19px] w-[350px] [&>*]:mb-[7px]">
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
              // InputProps={{ style: { height: "50px" } }}
            />
          )}
        />
      </div>
      <Button
        fullWidth
        variant="contained"
        startIcon={<SearchIcon />}
        style={{
          height: "50px",
          backgroundColor: "#7F977B",
        }}
        onClick={handleSubmit}
      >
        <p className="text-[16px] font-bold tracking-[1em]">搜尋</p>
      </Button>
    </div>
  );
};

export default Search;
