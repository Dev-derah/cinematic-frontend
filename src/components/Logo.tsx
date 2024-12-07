import Image from "next/image";
import { useRouter } from "next/navigation";
type Props = {
  height: number
  width: number
}

export default function Logo({height,width}: Props) {
  const router = useRouter();
  return (
    <Image
      src={"/Cinematic_AI.png"}
      className="h-auto w-auto mx-auto"
      height={height}
      width={width}
      alt="Cinematic AI LOGO"
      onClick={() => router.push("/")}
    />
  );
}
