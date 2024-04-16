type TitleProps = {
  title: string;
};

export const PageTitle = ({ title }: TitleProps) => {
  return <h1 className="mb-2 text-lg font-semibold font-sans">{title}</h1>;
};
