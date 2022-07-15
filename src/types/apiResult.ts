import { z } from "zod";

const PictureSchema = z.object({
  PictureUrl1: z.ostring(),
  PictureDescription1: z.ostring(),
  PictureUrl2: z.ostring(),
  PictureDescription2: z.ostring(),
  PictureUrl3: z.ostring(),
  PictureDescription3: z.ostring(),
});

const PositionSchema = z.object({
  PositionLon: z.onumber(),
  PositionLat: z.onumber(),
  GeoHash: z.ostring(),
});

const ActivitySchema = z.object({
  ActivityID: z.string(),
  ActivityName: z.ostring(),
  Description: z.ostring(),
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
  City: z.ostring(),
  SrcUpdateTime: z.string(),
  UpdateTime: z.string(),
});
export type Activity = z.infer<typeof ActivitySchema>;
export type ActivityList = Activity[];
