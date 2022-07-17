import { ReactNode } from "react";
import * as Type from "../types/apiResult";

export const Container = ({ children }: { children: ReactNode }) => (
  <div className="mt-[60px] mb-[120px]">{children}</div>
);

export const Banner = ({
  src,
  alt,
}: {
  src: Type.Picture["PictureUrl1"];
  alt: Type.Picture["PictureDescription1"];
}) => (
  <img
    src={src}
    alt={alt || ""}
    className="w-full h-[400px] my-[30px] object-cover rounded-[24px]"
  />
);

export const Name = ({ name }: { name: Type.Name }) => (
  <p className="mb-[15px] text-[36px] leading-[52px] font-light">{name}</p>
);

export const Tags = ({ children }: { children: ReactNode }) => (
  <div className="flex [&>*]:mr-[10px] mb-[30px]">{children}</div>
);

export const Description = ({
  type,
  description,
}: {
  type: string;
  description: Type.Description;
}) => (
  <div className="mb-[60px]">
    <p className="mb-[10px] text-[20px] leading-[29px] font-bold">
      {type}介紹：
    </p>
    <p className="text-[18px] leading-[31px] font-light">{description}</p>
  </div>
);

export const InfoContainer = ({ children }: { children: ReactNode }) => (
  <div className="mb-[60px] flex justify-between items-center">{children}</div>
);

export const DetailContainer = ({ children }: { children: ReactNode }) => (
  <ul className="flex flex-col w-[540px] bg-[#F9F9F9] p-[30px] rounded-[12px] justify-between">
    {children}
  </ul>
);

export const GoogleMap = ({ query }: { query: string }) => (
  <div className="rounded-[12px] overflow-hidden">
    <iframe
      width="540"
      height="250"
      src={`https://maps.google.com/maps?q=${query}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
      scrolling="no"
      title="map"
    />
  </div>
);
