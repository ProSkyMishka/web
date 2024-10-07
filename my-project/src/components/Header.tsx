export interface Props {
  title: string;
}

export const Header = ({ title }: Props) => {
  return <header>{title}</header>;
};
