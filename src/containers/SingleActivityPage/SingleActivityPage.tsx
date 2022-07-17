import { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";

import { getActivityList, getSingleActivityById } from "../../api/apis";
import Breadcrumbs from "../../components/Breadcrumbs";
import Card from "../../components/Card";
import Tag from "../../components/Tag";
import Title from "../../components/Title";
import * as Type from "../../types/apiResult";
import { SearchType } from "../../types/enums";
import { cityNameMapping } from "../../utils/functions";
import * as C from "../../components/SingleDataPage";
import Carousel from "../../components/Carousel/Carousel";

const DATE_FORMAT = "YYYY/MM/DD HH:mm";

const InfoListItem = ({
  label,
  content,
}: {
  label: string;
  content?: string;
}) => {
  const aStyle = "text-[#6E7D60] text-[18px] break-words underline";
  return content ? (
    <li className="flex items-center not-last:mb-[13px]">
      <span className="text-[20px] font-bold whitespace-nowrap">{label}：</span>
      {label === "活動地點" ? (
        <a
          href={`https://maps.google.com/maps?q=${content}`}
          target="_blank"
          rel="noreferrer"
          className={aStyle}
        >
          {content}
        </a>
      ) : label === "官方網站" ? (
        <a href={content} target="_blank" rel="noreferrer" className={aStyle}>
          {content}
        </a>
      ) : (
        <span className="text-[18px] break-words">{content}</span>
      )}
    </li>
  ) : (
    <></>
  );
};

const SingleActivityPage = () => {
  const { activityId } = useParams();
  const [activity, setActivity] = useState<null | Type.Activity>(null);
  const [recommendList, setRecommendList] = useState<Type.ActivityList>([]);
  const pictures = useMemo(() => {
    const pictures = [];
    if (activity?.Picture?.PictureUrl1) {
      pictures.push({ src: activity.Picture.PictureUrl1 });
    }
    if (activity?.Picture?.PictureUrl2) {
      pictures.push({ src: activity.Picture.PictureUrl2 });
    }
    if (activity?.Picture?.PictureUrl3) {
      pictures.push({ src: activity.Picture.PictureUrl3 });
    }
    return pictures;
  }, [activity]);

  useEffect(() => {
    getSingleActivityById(activityId as string)
      .then((r: Type.Activity) => setActivity(r))
      .catch((err) => console.error(err));
  }, [activityId]);

  useEffect(() => {
    getActivityList(
      activity?.City ? cityNameMapping(activity.City) : "",
      `Picture/PictureUrl1 ne null and City ne null and ActivityID ne '${activityId}'`
    )
      .then((r: Type.ActivityList) => setRecommendList(r.slice(0, 4)))
      .catch((err) => console.error(err));
  }, [activity]);

  return (
    <C.Container>
      <Breadcrumbs
        routes={[
          { label: "首頁", link: "/" },
          { label: "節慶活動", link: "/Activity" },
          ...(activity?.City
            ? [
                {
                  label: activity.City,
                  link: `/Activity?city=${cityNameMapping(activity.City)}`,
                },
              ]
            : []),
          { label: activity?.ActivityName || "", link: "" },
        ]}
      />
      <C.CarouselContainer>
        <Carousel imgs={pictures} />
      </C.CarouselContainer>
      <C.Name name={activity?.ActivityName} />
      <C.Tags>
        {activity?.Class1 && <Tag label={activity.Class1} />}
        {activity?.Class2 && <Tag label={activity.Class2} />}
      </C.Tags>
      <C.Description type="活動" description={activity?.Description} />
      <C.InfoContainer>
        <C.DetailContainer>
          <InfoListItem
            label="活動時間"
            content={`${dayjs(activity?.StartTime).format(
              DATE_FORMAT
            )} - ${dayjs(activity?.EndTime).format(DATE_FORMAT)}`}
          />
          <InfoListItem label="聯絡電話" content={activity?.Phone} />
          <InfoListItem label="主辦單位" content={activity?.Organizer} />
          <InfoListItem label="活動地點" content={activity?.Address} />
          <InfoListItem label="官方網站" content={activity?.WebsiteUrl} />
          <InfoListItem label="活動費用" content={activity?.Charge} />
          <InfoListItem label="注意事項" content={activity?.Remarks} />
        </C.DetailContainer>
        <C.GoogleMap
          query={`${activity?.Position?.PositionLat},${activity?.Position?.PositionLon}`}
        />
      </C.InfoContainer>
      {activity?.City && (
        <Title
          title="還有這些不能錯過的活動"
          linkText={`更多${activity.City}景點`}
          linkHref={`/Activity?city=${cityNameMapping(activity.City)}`}
        />
      )}
      <ul className="flex">
        {recommendList.map((item) => (
          <Card
            key={item.ActivityID}
            type={SearchType.Activity}
            id={item.ActivityID}
            pictureUrl={item.Picture.PictureUrl1}
            name={item.ActivityName}
            city={item.City}
          />
        ))}
      </ul>
    </C.Container>
  );
};

export default SingleActivityPage;
