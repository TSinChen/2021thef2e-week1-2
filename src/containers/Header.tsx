import LOGO from "../images/logo-desktop.svg";

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
    title: "品嘗美食",
    link: "#",
  },
];

const Header = () => {
  return (
    <header className="flex mx-auto px-[calc((100vw-1200px)/2+45px)] py-[24px] justify-between items-center border-b-[1px] border-[#e5e5e5]">
      <a href="/">
        <img src={LOGO} alt="台灣走走" />
      </a>
      <ul className="flex">
        {NAV_ITEMS.map((nav) => (
          <li key={nav.title} className="pr-[20px] last:pr-0">
            <a href={nav.link} className="text-custom-gray-1 text-[18px]">
              {nav.title}
            </a>
          </li>
        ))}
      </ul>
    </header>
  );
};

export default Header;
