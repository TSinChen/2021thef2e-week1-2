import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "./style.scss";

type Props = {
  imgs: { src: string; link?: { label: string; href: string } }[];
};

const Carousel = ({ imgs }: Props) => (
  <div className="rounded-[24px] overflow-hidden">
    <Swiper
      slidesPerView={1}
      loop={imgs.length > 1}
      initialSlide={1}
      navigation={true}
      pagination={{ clickable: true }}
      modules={[Navigation, Pagination]}
      watchOverflow={imgs.length === 1}
    >
      {imgs.map((img) => (
        <SwiperSlide key={img.src}>
          <div
            style={{ backgroundImage: `url('${img.src}')` }}
            className="bg-no-repeat bg-center bg-100% w-full h-[400px] flex justify-center items-center text-white text-[28px] font-bold"
          >
            {img.link ? (
              <a
                href={img.link.href}
                className="w-full h-full flex justify-center items-center"
              >
                {img.link.label}
              </a>
            ) : (
              <></>
            )}
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  </div>
);

export default Carousel;
