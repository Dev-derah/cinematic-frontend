import Image from "next/image";
import { useRouter } from "next/navigation";
import logo from "../../public/CINEMATIC_AI.png"
type Props = {
  height: number
  width: number
}

export default function Logo({height,width}: Props) {
  const router = useRouter();
  return (
    <Image
      src={logo}
      className="h-auto w-auto mx-auto"
      height={height}
      width={width}
      alt="Cinematic AI LOGO"
      onClick={() => router.push("/")}
    />
  );
}
