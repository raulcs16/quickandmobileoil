import Image from "next/image";
interface LogoProps {
  width: number;
}
export default function Logo(props: LogoProps) {
  return (
    <Image
      src={"/logo192.png"}
      alt={"Quick And Mobile Logo"}
      width={props.width}
      height={props.width}
    ></Image>
  );
}
