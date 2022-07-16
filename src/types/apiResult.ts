import { z } from "zod";

const IdSchema = z.string();
export type Id = z.infer<typeof IdSchema>;

const NameSchema = z.ostring();
export type Name = z.infer<typeof NameSchema>;

const CitySchema = z.ostring();
export type City = z.infer<typeof CitySchema>;

const DescriptionSchema = z.ostring();
export type Description = z.infer<typeof DescriptionSchema>;

const PictureSchema = z.object({
  PictureUrl1: z.ostring(),
  PictureDescription1: z.ostring(),
  PictureUrl2: z.ostring(),
  PictureDescription2: z.ostring(),
  PictureUrl3: z.ostring(),
  PictureDescription3: z.ostring(),
});
export type Picture = z.infer<typeof PictureSchema>;

const PositionSchema = z.object({
  PositionLon: z.onumber(),
  PositionLat: z.onumber(),
  GeoHash: z.ostring(),
});

const ActivitySchema = z.object({
  ActivityID: IdSchema,
  ActivityName: NameSchema,
  Description: DescriptionSchema,
  Particpation: z.ostring(),
  Location: z.ostring(),
  Address: z.ostring(),
  Phone: z.ostring(),
  Organizer: z.ostring(),
  StartTime: z.ostring(),
  EndTime: z.ostring(),
  Cycle: z.ostring(),
  NonCycle: z.ostring(),
  WebsiteUrl: z.ostring(),
  Picture: PictureSchema,
  Position: PositionSchema,
  Class1: z.ostring(),
  Class2: z.ostring(),
  MapUrl: z.ostring(),
  TravelInfo: z.ostring(),
  ParkingInfo: z.ostring(),
  Charge: z.ostring(),
  Remarks: z.ostring(),
  City: CitySchema,
  SrcUpdateTime: z.string(),
  UpdateTime: z.string(),
});
export type Activity = z.infer<typeof ActivitySchema>;
export type ActivityList = Activity[];

const SpotSchema = z.object({
  ScenicSpotID: IdSchema,
  ScenicSpotName: NameSchema,
  DescriptionDetail: z.ostring(),
  Description: DescriptionSchema,
  Phone: z.ostring(),
  Address: z.ostring(),
  ZipCode: z.ostring(),
  TravelInfo: z.ostring(),
  OpenTime: z.ostring(),
  Picture: PictureSchema,
  MapUrl: z.ostring(),
  Position: PositionSchema,
  Class1: z.ostring(),
  Class2: z.ostring(),
  Class3: z.ostring(),
  Level: z.ostring(),
  WebsiteUrl: z.ostring(),
  ParkingInfo: z.ostring(),
  ParkingPosition: PositionSchema,
  TicketInfo: z.ostring(),
  Remarks: z.ostring(),
  Keyword: z.ostring(),
  City: CitySchema,
  SrcUpdateTime: z.string(),
  UpdateTime: z.string(),
});
export type Spot = z.infer<typeof SpotSchema>;
export type SpotList = Spot[];

const RestaurantSchema = z.object({
  RestaurantID: IdSchema,
  RestaurantName: NameSchema,
  Description: DescriptionSchema,
  Address: z.ostring(),
  ZipCode: z.ostring(),
  Phone: z.ostring(),
  OpenTime: z.ostring(),
  WebsiteUrl: z.ostring(),
  Picture: PictureSchema,
  ParkingPosition: PositionSchema,
  ParkingInfo: z.ostring(),
  City: CitySchema,
  SrcUpdateTime: z.string(),
  UpdateTime: z.string(),
});
export type Restaurant = z.infer<typeof RestaurantSchema>;
export type RestaurantList = Restaurant[];
