import { ChevronRight } from "@mui/icons-material";

type Props = {
  title: string;
  linkText: string;
  linkHref: string;
};

const Title = ({ title, linkText, linkHref }: Props) => {
  return (
    <div className="flex justify-between items-center mx-[15px] mb-[12px]">
      <div className="text-[36px] font-light leading-[52px]">{title}</div>
      <a href={linkHref} className="text-custom-orange">
        <span>{linkText}</span>
        <ChevronRight />
      </a>
    </div>
  );
};

export default Title;
