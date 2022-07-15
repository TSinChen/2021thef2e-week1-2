import axios from "./axios";
import { SearchType } from "./../types/enums";

export const getList = async (
  type: SearchType,
  city: string,
  filter: string
) => {
  return axios
    .get(
      `/v2/Tourism/${type}${city ? `/${city}` : ""}?$top=10${
        filter ? `&$filter=${filter}` : ""
      }`
    )
    .then((res) => res.data)
    .catch((err) => Promise.reject(err));
};
