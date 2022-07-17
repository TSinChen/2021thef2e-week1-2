export const Topic = ({
  background,
  label,
  onClick,
}: {
  background: string;
  label: string;
  onClick: () => void;
}) => (
  <li
    style={{ backgroundImage: `url('${background}')` }}
    className="bg-no-repeat bg-center bg-100% hover:bg-110% text-[#fff] w-[255px] h-[124px] flex justify-center items-center text-[24px] font-bold leading-[34.75px] mb-[12px] mr-[30px] [&:nth-child(4n)]:mr-0 cursor-pointer rounded-[24px] duration-200"
    onClick={onClick}
  >
    <span>{label}</span>
  </li>
);

export const Title = ({ title }: { title: string }) => (
  <div className="mb-[12px] text-[36px] font-light leading-[52px]">{title}</div>
);
