import { useState, useEffect } from "react";
import dayjs from "dayjs";

import * as Type from "../../../../types/apiResult";
import { getList } from "../../../../api/apis";
import { SearchType } from "../../../../types/enums";
import { DATE_FORMAT } from "../../../../utils/const";
import ActivityCard from "./ActivityCard";

const ActivityList = () => {
  const [activityList, setActivityList] = useState<Type.ActivityList>([]);

  useEffect(() => {
    const startDateMax = dayjs().add(7, "day").format(DATE_FORMAT);
    const endDateMin = dayjs().add(1, "day").format(DATE_FORMAT);

    getList(
      SearchType.Activity,
      "",
      `StartTime le ${startDateMax} and EndTime ge ${endDateMin} and Picture/PictureUrl1 ne null`
    )
      .then((r: Type.ActivityList) => setActivityList(r.slice(0, 4)))
      .catch((err) => console.error(err));
  }, []);

  return (
    <ul className="flex justify-between flex-wrap">
      {activityList.map((activity) => (
        <ActivityCard key={activity.ActivityID} activity={activity} />
      ))}
    </ul>
  );
};

export default ActivityList;
