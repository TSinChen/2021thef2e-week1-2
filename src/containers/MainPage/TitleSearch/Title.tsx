import POINTER from "../../../images/map-pointer-yellow.svg";

const Title = () => {
  return (
    <div className="flex flex-col">
      <div className="text-[48px] font-light leading-[70px] text-custom-gray-3">
        <p>
          探索
          <span className="underline decoration-[#E0DA48] decoration-2 decoration underline-offset-[10px]">
            台灣之美
          </span>
        </p>
        <p>讓我們更親近這片土地</p>
      </div>
      <div className="flex items-end pt-[17px] text-custom-gray-1">
        <img src={POINTER} alt="" className="mr-[6px] self-center" />
        <p className="text-[20px] mr-[8px]">台灣旅遊景點導覽</p>
        <p className="text-[18px] font-['Playfair_Display'] font-bold">
          Taiwan Travel Guide
        </p>
      </div>
    </div>
  );
};

export default Title;
