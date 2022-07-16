import { Fragment } from "react";

type Props = {
  routes: { label: string; link: string }[];
};

const Breadcrumbs = ({ routes }: Props) => {
  return (
    <div className="flex text-[#6E7D60] leading-[1.75]">
      {routes.map((route, index) =>
        index === routes.length - 1 ? (
          <p key={route.link} className="text-custom-gray-1">
            {route.label}
          </p>
        ) : (
          <Fragment key={route.link}>
            <a href={route.link}>{route.label}</a>
            <p className="mx-[8px] text-custom-gray-1">/</p>
          </Fragment>
        )
      )}
    </div>
  );
};

export default Breadcrumbs;
