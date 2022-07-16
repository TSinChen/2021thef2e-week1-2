type Props = {
  label: string;
};

const Tag = ({ label }: Props) => {
  return (
    <div className="px-[15px] py-[5px] text-[#BEA363] text-[20px] leading-[29px] border-[1px] border-[#BEA363] rounded-[30px]">
      # {label}
    </div>
  );
};
export default Tag;
