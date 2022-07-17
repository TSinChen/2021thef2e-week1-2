import Title from "../../../components/Title";
import ActivityList from "./ActivityList/ActivityList";

const RecentActivity = () => {
  return (
    <div>
      <Title title="近期活動" linkText="查看更多活動" linkHref="/Activity" />
      <ActivityList />
    </div>
  );
};

export default RecentActivity;
