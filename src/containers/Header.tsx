import { useState } from "react";

import LOGO_DESKTOP from "../images/logo-desktop.svg";
import LOGO_MOBILE from "../images/logo-mobile.svg";

const NAV_ITEMS = [
  {
    title: "探索景點",
    link: "/ScenicSpot",
  },
  {
    title: "節慶活動",
    link: "/Activity",
  },
  {
    title: "品嚐美食",
    link: "/Restaurant",
  },
];

const Header = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <header className="flex mx-auto px-[calc((100vw-1200px)/2+45px)] py-[24px] justify-between items-center border-b-[1px] border-[#e5e5e5] sm:px-[8px] sm:py-[17px] sm:relative sm:justify-center">
      <a href="/">
        <img src={LOGO_DESKTOP} alt="台灣走走" className="sm:hidden" />
        <img src={LOGO_MOBILE} alt="台灣走走" className="sm-min:hidden" />
      </a>
      <div
        className="bg-[#A8B8A5] w-[50px] h-[50px] rounded-[12px] absolute right-[8px] z-20"
        onClick={() => setIsNavOpen((prev) => !prev)}
      >
        <div className="w-[30px] h-[4px] bg-white absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-[1px] before:content-[''] before:bg-white before:absolute before:w-[20px] before:h-full before:top-[-9px] before:right-0 before:rounded-[1px] after:content-[''] after:bg-white after:absolute after:w-[20px] after:h-full after:top-[9px] after:right-0 after:rounded-[1px]" />
      </div>
      <ul
        className={`flex ${
          isNavOpen ? "" : "sm:hidden "
        }sm:flex-col sm:absolute sm:z-10 sm:top-[calc(100%+1px)] sm:right-0 sm:bg-white sm:justify-center sm:items-center sm:border-l-[1px] sm:border-[#e5e5e5]`}
      >
        {NAV_ITEMS.map((nav) => (
          <li
            key={nav.title}
            className="pr-[20px] last:pr-0 sm:pr-0 sm:w-full text-center"
          >
            <a
              href={nav.link}
              className="text-custom-gray-1 text-[18px] sm:p-[20px] sm:flex sm:border-b-[1px] sm:border-[#e5e5e5]"
            >
              {nav.title}
            </a>
          </li>
        ))}
      </ul>
    </header>
  );
};

export default Header;
