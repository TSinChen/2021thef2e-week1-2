import axios from "./axios";
import { SearchType } from "./../types/enums";
import * as Type from "../types/apiResult";

export const getSpotList = async (
  city: string,
  filter: string
): Promise<Type.SpotList> => {
  return axios
    .get(
      `/v2/Tourism/${SearchType.ScenicSpot}${city ? `/${city}` : ""}?$top=20${
        filter ? `&$filter=${filter}` : ""
      }`
    )
    .then((res) => Type.SpotListSchema.parse(res.data))
    .catch((err) => Promise.reject(err));
};

export const getSingleSpotById = async (
  id: Type.Spot["ScenicSpotID"]
): Promise<Type.Spot> => {
  return axios
    .get(
      `/v2/Tourism/${SearchType.ScenicSpot}?$top=20&$filter=ScenicSpotID eq '${id}'`
    )
    .then((res) => Type.SpotListSchema.parse(res.data)[0])
    .catch((err) => Promise.reject(err));
};

export const getActivityList = async (
  city: string,
  filter: string
): Promise<Type.ActivityList> => {
  return axios
    .get(
      `/v2/Tourism/${SearchType.Activity}${city ? `/${city}` : ""}?$top=20${
        filter ? `&$filter=${filter}` : ""
      }`
    )
    .then((res) => Type.ActivityListSchema.parse(res.data))
    .catch((err) => Promise.reject(err));
};

export const getSingleActivityById = async (
  id: Type.Activity["ActivityID"]
): Promise<Type.Activity> => {
  return axios
    .get(
      `/v2/Tourism/${SearchType.Activity}?$top=20&$filter=ActivityID eq '${id}'`
    )
    .then((res) => Type.ActivityListSchema.parse(res.data)[0])
    .catch((err) => Promise.reject(err));
};

export const getRestaurantList = async (
  city: string,
  filter: string
): Promise<Type.RestaurantList> => {
  return axios
    .get(
      `/v2/Tourism/${SearchType.Restaurant}${city ? `/${city}` : ""}?$top=20${
        filter ? `&$filter=${filter}` : ""
      }`
    )
    .then((res) => Type.RestaurantListSchema.parse(res.data))
    .catch((err) => Promise.reject(err));
};

export const getSingleRestaurantById = async (
  id: Type.Restaurant["RestaurantID"]
): Promise<Type.Restaurant> => {
  return axios
    .get(
      `/v2/Tourism/${SearchType.Restaurant}?$top=20&$filter=RestaurantID eq '${id}'`
    )
    .then((res) => Type.RestaurantListSchema.parse(res.data)[0])
    .catch((err) => Promise.reject(err));
};
